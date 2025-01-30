from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import json
import logging
import random
import time
import re
from datetime import datetime
import google.generativeai as genai
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
socketio = SocketIO(app, cors_allowed_origins="*")

# Replace with your actual API keys
GOOGLE_API_KEY = 'AIzaSyDqCTTQrM6L_52Dxy82cCN-nnEms8bplZQ'
EVAL_API_KEY = 'AIzaSyDl0-uUAx5jhxYakfg0vkORw8CFndqukoQ'
genai.configure(api_key=GOOGLE_API_KEY)

# Declare the global session variable
session = None

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

LEVELS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

# Set up Google Generative AI model
generative_model = genai.GenerativeModel('gemini-1.5-pro')

MONGODB_URI = "mongodb+srv://imanjeetsingh01:Manjeet%4001@cluster0.wp2jb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

ACTIVE_SESSIONS = {}

def fetch_role_data_from_mongodb(OBJECT_ID):
    try:
        client = MongoClient(MONGODB_URI)
        db = client.get_database("test")  # Replace with your database name
        collection = db.get_collection("jobposteds")  # Replace with your collection name

        document = collection.find_one({"_id": ObjectId(OBJECT_ID)})
        if document:
            print("Role data fetched successfully from MongoDB.")
            role_data = {
                "job_title": document.get("jobTitle", ""),
                "job_position": document.get("designation", ""),
                "job_description": document.get("jobDescription", "").split("\n"),  # Split into list
                "main_skills": document.get("mainSkills", []),
                "sub_skills": document.get("subSkills", []),
                "depth_of_round": document.get("depthOfRound", {}).get("value", "1"),
                "goal_of_role": [document.get("goalOfRound", "")],
            }
            return role_data
        else:
            print("No role data found with the given ObjectID.")
            return None
    except Exception as e:
        print(f"Error fetching role data from MongoDB: {str(e)}")
        return None
    finally:
        client.close()

class AssessmentSession:
    def __init__(self, candidate_name, role_data):
        self.candidate_name = candidate_name
        self.job_title = role_data["job_title"]
        self.job_position = role_data["job_position"]
        self.job_description = role_data["job_description"]
        self.main_skills = role_data["main_skills"]
        self.sub_skills = role_data["sub_skills"]
        # Some older references used role_data["depth_of_round"]["level"], 
        # but from your existing fetch logic it’s a string. Adjust as needed:
        self.depth_of_round = role_data["depth_of_round"]  
        self.goal_of_role = role_data["goal_of_role"]

        # Decide initial level:
        if self.depth_of_round == "2":
            self.current_level = 2.0  # Start at advanced
        else:
            self.current_level = 1.0  # Fundamentals level

        self.total_score = 0
        self.questions_asked = 0
        self.start_time = datetime.now()
        self.assessment_results = []
        self.introduction_responses = {}
        self.session_id = f"{candidate_name}_{self.job_title.replace(' ', '_')}_{self.start_time.strftime('%Y%m%d_%H%M%S')}"

    def to_dict(self):
        return {
            "candidate_name": self.candidate_name,
            "job_title": self.job_title,
            "job_position": self.job_position,
            "job_description": self.job_description,
            "main_skills": self.main_skills,
            "sub_skills": self.sub_skills,
            "depth_of_round": self.depth_of_round,
            "goal_of_role": self.goal_of_role,
            "current_level": self.current_level,
            "total_score": self.total_score,
            "questions_asked": self.questions_asked,
            "start_time": self.start_time.isoformat(),
            "assessment_results": self.assessment_results,
            "introduction_responses": self.introduction_responses,
            "session_id": self.session_id
        }

def generate_intro_questions():
    questions_prompt = f"""
    You are an advanced, professional AI interviewer. The candidate’s name is {session.candidate_name}.
    The role details are as follows:
      - Job Title: {session.job_title}
      - Position Level: {session.job_position}
      - Job Description: {session.job_description}

    You must produce exactly two parts in your response:
      1. A short, one-sentence greeting that addresses the candidate by name in a fresh, unique way,
         but **do NOT begin** with "Hello" or "Hi".
      2. Exactly two questions (each on its own separate line) relevant to the role and the candidate's background.

    Guidelines for these questions:
      - Combine these 5 topic points into exactly 2 questions:
        1) An ice-breaker about the candidate’s background.
        2) Their interest in the specific role.
        3) Their relevant experience.
        4) Their career goals.
        5) Their expectations from this role.
      - Do not number or bullet the questions in the output.
      - Each question should feel friendly yet professional, referencing the candidate’s name where appropriate.
      - Ensure the questions align with the job title ({session.job_title}), position level ({session.job_position}),
        and the job description ({session.job_description}).
      - Important: Do NOT output literal placeholders like '({session.candidate_name})'; use the actual candidate name.
    """
    try:
        questions_response = generative_model.generate_content(questions_prompt)
        lines = [q.strip() for q in questions_response.text.strip().split('\n') if q.strip()]
        questions = lines[1:3] if len(lines) > 2 else []
        
        emit('intro', questions)
        return {'intro_questions': questions}

    except Exception as e:
        logger.error(f"Error generating intro questions: {str(e)}")
        # fallback
        return {
            'intro_questions': [
                f"Could you tell me a bit about your background and what led you to apply for this {session.job_title} position?",
                f"What interests you most about this {session.job_title} role?"
            ]
        }

@socketio.on('intro_followup')
def generate_followup_for_intro(data):
    questionCount = data.get('questionCount') 
    candidate_response = data.get('candidate_response')
    
    if questionCount == 1:
        question = session.introduction_responses['intro_questions'][0]
    else:
        question = session.introduction_responses['intro_questions'][1]

    if not question:
        print("question cannot be empty. Exiting.")
        return
    if not candidate_response:
        print("candidate response cannot be empty. Exiting.")
        return
    
    followup_prompt = f"""
    You are analyzing an interaction with a candidate, where a question was asked, and the candidate provided a response. Your role is to evaluate the exchange, summarize the response, assess its relevance and depth, and formulate *one strict follow-up question. The follow-up question must probe deeper into the candidate’s knowledge, skills, or understanding, while remaining **strictly relevant* to the role’s requirements and responsibilities.

    Important Details:
      1. The candidate’s name is *{session.candidate_name}*.
      2. The original question asked is *{question}*.
      3. The candidate’s response is *{candidate_response}*.
      4. The follow-up question must *align strictly* with the *{session.job_title}, {session.job_position},* and *{session.job_description}*.

    ---

    Instructions:
    1. Generate a Follow-Up Question
      - Create one follow-up question based on *{candidate_response}*, referencing specific points or gaps.
      - The follow-up must:
        - Be directly tied to the *{session.job_title}, {session.job_position},* and *{session.job_description}*.
        - Probe deeper into the candidate’s technical, strategic, or analytical competencies.
        - Be clear, concise, and strictly relevant to the responsibilities and expectations of the role.
      - Avoid repeating topics already covered in the response.
      - Keep the tone professional, encouraging, and focused on discovery.

    2. Restate and Understand the Question
      - Summarize the purpose of *{question}*, noting whether it focuses on theoretical understanding, practical application, or role-specific skills.

    3. Summarize the Candidate’s Response
      - In *2–3 sentences, restate the key points from *{candidate_response}*.
      - Highlight any definitions, examples, or arguments shared by the candidate.

    4. Contextual Analysis
      - Assess the depth and relevance of the candidate’s response:
      - Did they fully address *{question}*?
      - Did they provide practical examples or theoretical context?
      - Highlight strengths (e.g., clarity, insight, examples) and weaknesses (e.g., missing details, lack of focus).
      - Explain how the response aligns with the broader significance of the concept, role, or industry.

      Output: Provide ONLY the follow-up question, with no additional commentary or explanation.
    """
    try:
        followup_response = generative_model.generate_content(followup_prompt)
        followup_question = followup_response.text.strip()
        emit('followup_question', followup_question)
    except Exception as e:
        logger.error(f"Error generating follow-up question: {str(e)}")
        emit('followup_question', "Could you elaborate further on your thoughts?")

@socketio.on('transition_prompt')
def generate_transition_prompt():
    transition_prompt = f"""
   Comprehensive Transition Prompt
    Objective:
    You are transitioning to a technical or domain-specific section of the interview with *{session.candidate_name}*, following an initial round of questions. The goal is to maintain a positive, professional, and conversational tone, acknowledging the completion of the first phase while smoothly introducing the next phase focused on technical skills or role-specific expertise.

    ---

    Instructions:

    1. Acknowledge the Completion of the Initial Phase
      - Start by thanking *{session.candidate_name}* for their responses so far.
      - Briefly highlight how their answers provided valuable insight into their background or approach.

    2. Introduce the Next Section
      - Clearly state that the next set of questions will focus on technical knowledge or role-specific skills relevant to their *{session.job_title} ({session.job_position})*.
      - Frame this phase as an opportunity to explore the *breadth and depth* of their expertise.

    3. Maintain an Encouraging and Collaborative Tone
      - Use friendly, welcoming language to ensure the candidate feels comfortable and engaged.
      - Encourage them to continue sharing their insights and thought processes.

    4. Be Concise and Clear
      - Limit the transition prompt to *one paragraph* (2–3 sentences).
      - Avoid redundancy or overly formal language—keep it natural and conversational.

    ---

    Expected Output Format

    A. single, concise paragraph (2–3 sentences) that:
      1. Thanks or acknowledges {session.candidate_name} for their responses.
      2. Clearly states that you are transitioning to technical or advanced questions relevant to their *{session.job_title} ({session.job_position})*.
      3. Maintains a positive and engaging tone.

    ---

    Example Transition Prompts
    Example 1: “Thank you, {session.candidate_name}, for sharing your thoughts and experiences so far. It’s been great learning about your background and approach to this role. Now, let’s transition into some technical questions that focus on your expertise as a {session.job_title} ({session.job_position}) and explore your skills in more detail.”

    Example 2: “Thanks, {session.candidate_name}, for your thoughtful answers so far—it’s been insightful hearing about your experiences and perspective. Let’s now dive into the technical aspects of the {session.job_title} ({session.job_position}) role, where we’ll explore your skills and problem-solving strategies further.”

    Example 3:“I really appreciate your insights so far, {session.candidate_name}! Your responses have provided great context. Now, let’s shift gears to focus on the technical side of things, diving deeper into your expertise as a {session.job_title} ({session.job_position}).”
    """
    try:
        transition_response = generative_model.generate_content(transition_prompt)
        transition_prompt_response = transition_response.text.strip()

        emit('transition', transition_prompt_response)
    except Exception as e:
        logger.error(f"Error generating transition prompt: {str(e)}")
        emit(
            'transition',
            f"Thank you, {session.candidate_name}, for sharing your background so far. "
            f"Now, let's move to the technical portion focused on your expertise for this {session.job_title} ({session.job_position})."
        )

def generate_question(role_data, current_level, previous_questions):
    primary_skill = random.choice(role_data['main_skills']) if role_data['main_skills'] else "the required skill"
    related_sub_skills = []
    if role_data['sub_skills']:
        related_sub_skills = random.sample(role_data['sub_skills'], min(2, len(role_data['sub_skills'])))

    prompt = f"""
    You are tasked with generating an interview/assessment question for a {role_data['job_title']} ({role_data['job_position']}) position. Please create a *unique* and *accurate* question {f"which align with the goal of role: {' '.join(role_data['goal_of_role'])} and even" if 'goal_of_role' in role_data and role_data['goal_of_role'] else ""} for the context provided at **level {current_level}**.
    The question should focus primarily on **{primary_skill}** while incorporating {" and ".join(related_sub_skills)} where relevant.

    Context:
      - Job Description: {' '.join(role_data['job_description'])}
      - Role Goals: {' '.join(role_data['goal_of_role'])}

    Use the following criteria to tailor the question for the specified level:
      - Level 1-1.5: Focus on basic definitions, identifying components, or listing key facts. Keep the question short (10-20 words) and direct.
      - Level 2-2.5: Test comprehension by asking for explanations, significance, or examples of concepts. Question length should be moderate (20-30 words).
      - Level 3-3.5: Challenge the learner with real-world applications or problem-solving scenarios using the concepts provided. Allow a bit more detail (30-40 words).
      - Level 4-4.5: Encourage analysis and interpretation, such as comparing concepts, identifying patterns, or drawing logical conclusions. The question can be more detailed (40-50 words).
      - Level 5: Test synthesis and evaluation skills, asking the learner to create new solutions, develop strategies, or critically assess the topic. Questions can be detailed but concise (50-60 words).

    Additional requirements:
      1. The question must be *original* and *non-redundant* with the following previously asked questions:
         {previous_questions}
      2. Ensure the question has sufficient complexity for the given level but stays within the length range for that level.
      3. The wording must be clear, concise, and free of unnecessary details.
      4. Question should be relevant to both the job role and the primary skill.
      5. Incorporate aspects of the related sub-skills if appropriate.
      6. Be specific and practical, avoiding overly theoretical questions.
      7. Focus on real-world applications relevant to the job role.
      8. Provide only the question text, without any prefixes or explanations.

    DO NOT include the words "Question:" or any numbering in your response.
    Provide only the question text as your response.
    """

    try:
        response = generative_model.generate_content(prompt)
        question = response.text.strip()
        if question not in previous_questions:
            emit('main_question', question)
            return question
    except Exception as e:
        logger.error(f"Error generating question: {str(e)}")

    # Fallback question if generation fails
    fallback = f"For a {role_data['job_title']} role, explain how you would apply {primary_skill} to solve a real-world problem."
    emit('main_question', fallback)
    return fallback

def generate_followup_question(role_data, current_level, primary_skill, previous_questions, response_context):
    prompt = f"""
    You are tasked with generating a follow-up question for the position **{role_data['job_title']} ({role_data['job_position']})** based on the candidate's previous response and focusing on primary skill **{primary_skill}**.

    Role Context:
      - Job Description: {' '.join(role_data['job_description'])}
      - Role Goals: {' '.join(role_data['goal_of_role'])}

    The follow-up question should align with **level {current_level}**, as described below:
      - Level 1-1.5: Ask for clarifications on basic definitions, identifying components, or listing key facts.
      - Level 2-2.5: Ask for explanations, significance, or examples of specific details mentioned in the response.
      - Level 3-3.5: Probe real-world applications or problem-solving scenarios using concepts mentioned in the response.
      - Level 4-4.5: Focus on analysis or interpretation of the response, like comparing ideas or drawing logical conclusions.
      - Level 5: Encourage synthesis and critical evaluation of the response, asking for strategies or innovations.

    Candidate's Previous Response:
    {response_context}

    Previous questions to avoid:
    {previous_questions}

    Requirements:
      1. Question should naturally flow from the candidate's response
      2. Stay relevant to both the job role and the primary skill being assessed
      3. Help evaluate deeper understanding of concepts mentioned in their response
      4. Be specific and targeted, avoiding general or unrelated topics
      5. Match the level-specific guidelines above
      6. Consider the practical aspects of the job role
      7. Use clear, concise, and professional wording.

    Provide only the follow-up question text, without any prefixes or explanations.
    """

    try:
        response = generative_model.generate_content(prompt)
        followup_question = response.text.strip()
        if followup_question not in previous_questions:
            return followup_question
    except Exception as e:
        logger.error(f"Error generating follow-up question: {str(e)}")

    # Fallback follow-up question
    return (
        f"Based on your previous answer, can you provide a specific example of how you would implement {primary_skill} "
        f"in a {role_data['job_title']} role while considering best practices and potential challenges?"
    )

def evaluate_response(question, response, current_level, response_time, role_data):
    prompt = f"""
    Instruction to the Model:
1. Read and understand the interview/assessment question and the corresponding candidate response.
2. Consider the job context, the primary skill, and the complexity level of the question (Levels 1 to 5).
3. Apply the four evaluation parameters (each weighted equally) to the candidate’s response.
4. Provide:
   * A brief rationale for each parameter (why you assigned the rating you did).
   * A numerical score (on a scale of 1 to 5) for each parameter.
   * An overall summary or conclusion based on the four parameter scores.
   * Include a **Score** section in your response.

1. Context of the Evaluation
   * Job Title: {role_data['job_title']}
   * Question Level: {current_level}
     * (Level 1-1.5 questions are very basic; Level 2-2.5 questions test comprehension; Level 3-3.5 questions focus on application; Level 4-4.5 questions require analysis; Level 5 questions demand synthesis and evaluation.)
   * Primary Skill Focus: {role_data['main_skills']}
   * Related Sub-Skills: {role_data['sub_skills']}
   * Job Description Summary: {role_data['job_description']}
   * Interview/Assessment Question: {question}
   * Candidate’s Response: {response}
   * Response Time: {response_time} seconds

2. Evaluation Parameters
You must rate the response using these four equally weighted parameters. Each parameter should be given a score from 1 to 5, where:
   * 1 = Insufficient/Mostly Incorrect
   * 2 = Partially Correct/Incomplete
   * 3 = Adequate/Meets Basic Expectations
   * 4 = Good/Thorough
   * 5 = Excellent/Highly Thorough

   # Important: Each parameter’s definition and rating scale must be interpreted in the context of the question’s level. For instance, a Level 1 question only requires basic definitions; a Level 5 question demands greater complexity, creativity, and synthesis.

   Parameter A: Accuracy & Relevance
     * Definition: The extent to which the candidate’s response is factually correct, directly addresses the question, and remains relevant to the specified primary skill (and related sub-skills, if applicable).
     * Evaluation Guidelines:
       1. Did the candidate address the key point(s) of the question?
       2. Are the statements in the response factually accurate?
       3. Did the candidate avoid irrelevant or incorrect details?

   Parameter B: Depth & Completeness
     * Definition: The level of detail and comprehensiveness in the candidate’s response, demonstrating familiarity with essential concepts or advanced knowledge (depending on question level).
     * Evaluation Guidelines:
       1. Does the response show basic or advanced understanding suitable for the level of the question?
       2. Does the candidate explore relevant examples, definitions, or reasoning (if asked for)?
       3. Is there any significant omission that undermines the response?

   Parameter C: Clarity & Organization
     * Definition: How well the candidate structures their response, presents ideas coherently, and communicates in a clear, organized manner.
     * Evaluation Guidelines:
       1. Is the response logically organized and easy to follow?
       2. Does the candidate articulate thoughts clearly without confusion?
       3. Is the flow of ideas consistent and well-sequenced?

   Parameter D: Analysis & Problem-Solving
     * Definition: The candidate’s ability to interpret, analyze, or propose solutions based on the skill or concept in question. (For lower-level questions, this might only be a minimal demonstration of applied knowledge; for higher-level questions, it involves critical thinking, synthesis, or strategic insight.)
     * Evaluation Guidelines:
       1. Does the candidate demonstrate reasoning or problem-solving relevant to the question’s complexity?
       2. Are they able to connect theoretical concepts to practical scenarios (for moderate to higher-level questions)?
       3. Do they show creativity, originality, or strategic thinking when required?

3. Step-by-Step Instructions to the Model
   1. Re-Read the Question and Response:
      * Review {question} at Level {current_level}.
      * Re-read the candidate’s response: {response}.
   2. Apply Each Parameter:
      * Assign a rating from 1 to 5 for each of the four parameters (A, B, C, D).
      * Provide a brief explanation (1-3 sentences) supporting your rating.
   3. Overall Synthesis:
      * Summarize the overall performance.
      * You may provide an overall rating (e.g., an average of the four parameters or a short concluding remark) based on how well the candidate met the question’s demands.
   4. Provide the following sections:

      **Score:** [Provide a numerical score from 0 to 100 based on parameter ratings]
      **Evaluation:** [Your detailed evaluation here, addressing each parameter (A, B, C, D)]
      **Feedback:** [Provide constructive feedback for improvement, tailored to the candidate’s response and the context of the question]

4. Important Notes and Guidelines
   * Consistency: Your ratings (1-5) must reflect the definitions and guidelines for each parameter.
   * Level Alignment: Always consider whether the response meets the expected complexity for the specific level. For example, a response that may be “good” for a Level 1 question could be inadequate for a Level 4 question.
   * Equal Weight: Each of the four parameters (A, B, C, D) is equally important. Do not assign different weightings.
   * Brevity & Precision: Keep your rationale concise but clear. Focus on why a specific score is given.
    """

    fallback_prompt = f"""
    Evaluation Template
    1. Context Recap
      * Job Title: {role_data['job_title']}
      * Question Level: {current_level}
      * Primary Skill: {role_data['main_skills']}
      * Related Sub-Skills: {role_data['sub_skills']}
      * Job Description: {role_data['job_description']}
      * Question: {question}
      * Candidate’s Response: {response}

    3. Instructions
      1) Provide:
        * A brief rationale for each parameter (why you assigned the rating you did).
        * A numerical score (on a scale of 1 to 5) for each parameter.
        * An overall summary or conclusion based on the four parameter scores.
        * Explicitly include the following sections in your response:
          - **Score:** [Provide a numerical score from 0 to 100 based on parameter ratings]
          - **Evaluation:** [Your detailed evaluation here, addressing each parameter (A, B, C, D)]
          - **Feedback:** [Provide actionable, constructive feedback for improvement, tailored to the candidate’s response and the context of the question]

    2. Parameter Assessments
      Scoring Scale (1 to 5)

      A. Accuracy & Relevance
        This parameter assesses how precisely the response aligns with the question's requirements and the primary skill focus. The evaluation is based on:

        - Whether the response directly addresses the question without deviating from the topic.
        - The factual correctness of the content, ensuring no inaccuracies or contradictions.
        - The exclusion of irrelevant or redundant information that does not contribute to the solution.

        Score: [Evaluate]
        Rationale: Address factual correctness, directness, and pertinence to the question and skill.

      B. Depth & Completeness
        This parameter evaluates the extent of detail and thoroughness in the response. The evaluation is based on:

        - Whether the response provides sufficient coverage of all key aspects of the question.
        - Inclusion of relevant examples, reasoning, or advanced concepts (where required by complexity level).
        - Avoidance of significant omissions that could weaken the overall completeness of the answer.

        Score: [Evaluate]
        Rationale: Comment on detail level, conceptual coverage, and any missing elements.

      C. Clarity & Organization
        This parameter measures the coherence, structure, and ease of understanding of the response. The evaluation is based on:

        - Logical organization of ideas, ensuring the response flows smoothly and is easy to follow.
        - Clear articulation of points, avoiding ambiguity or overly complex language.
        - Proper sequencing of thoughts, making the explanation straightforward and engaging.

        Score: [Evaluate]
        Rationale: Evaluate how clearly ideas are conveyed, structured, and sequenced.

      D. Analysis & Problem-Solving
        This parameter assesses the candidate’s ability to interpret, analyze, and propose solutions based on the given context. The evaluation is based on:

        - The application of reasoning, critical thinking, or strategic insight to address the question effectively.
        - Ability to connect theoretical concepts to real-world or practical scenarios, demonstrating applied knowledge.
        - Creativity or originality in the approach, especially for higher-level questions requiring innovative solutions.

        Score: [Evaluate]
        Rationale: Assess reasoning, critical thinking, and solution approach (as suited to the level).

      3. Overall Summary
        Provide a brief synthesis of the candidate’s performance across all parameters.
    """

    max_retries = 3
    for _ in range(max_retries):
        original_key = GOOGLE_API_KEY
        try:
            # Switch to EVAL_API_KEY for scoring
            genai.configure(api_key=EVAL_API_KEY)
            eval_model = genai.GenerativeModel('gemini-1.5-pro')

            evaluation = eval_model.generate_content(prompt)
            eval_text = evaluation.text.strip()

            logger.debug(f"Raw evaluation text:\n{eval_text}")

            # Look for numeric score in possible patterns
            score_patterns = [
                r'Score:\s*(\d+)',
                r'(\d+)/100',
                r'(\d+)\s*points',
                r'rating.*?(\d+)',
                r'grade.*?(\d+)'
            ]
            score = 0
            for pattern in score_patterns:
                match = re.search(pattern, eval_text, re.IGNORECASE | re.DOTALL)
                if match:
                    score = int(match.group(1))
                    break

            if score == 0:
                logging.warning("Failed to parse a valid score. Using fallback evaluation.")
                evaluation = eval_model.generate_content(fallback_prompt)
                eval_text = evaluation.text.strip()
                # Minimal fallback parse
                fallback_match = re.search(r'Score:\s*(\d+)', eval_text, re.IGNORECASE)
                if fallback_match:
                    score = int(fallback_match.group(1))

            return score
        except Exception as e:
            logger.error(f"Error evaluating response: {str(e)}")
            time.sleep(2)
        finally:
            # Restore original key
            genai.configure(api_key=original_key)

    return 0

def get_next_question_level(current_level: float, score: float) -> float:
    """
    Determines the next question level based on the candidate's performance score and current level.
    """
    das = score + 10 * (current_level - 1)
    if das >= 90:
        next_level = current_level + 1
    elif das >= 80:
        next_level = current_level + 0.5
    elif das >= 60:
        next_level = current_level
    elif das >= 40:
        next_level = current_level - 0.5
    else:
        next_level = current_level - 1

    if next_level < 1:
        next_level = 1
    elif next_level > 5:
        next_level = 5

    return next_level

def save_progress(session_obj):
    with open(f"{session_obj.session_id}_progress.json", "w") as f:
        json.dump(session_obj.to_dict(), f, indent=2)
    logger.info(f"Progress saved: {session_obj.session_id}")

# ------------------------------------------------------------------------------
# NEW SOCKET EVENTS FOR MAIN AND FOLLOW-UP QUESTIONS (Split from run_assessment)
# ------------------------------------------------------------------------------

@socketio.on('main_question')
def main_question(data):
    """
    Handles the generation, response-evaluation, and level adjustment for a "main" question.
    Flow:
      1) Evaluate the response of the previous follow-up question (if applicable).
      2) Generate the main question (avoiding repeats).
      3) Increment question number.
      4) Adjust the next level based on score.
      5) Save and emit results.
    """
    try:
        candidate_response = data.get('candidate_response', "")

        # If this is not the first question, evaluate the previous follow-up response
        if session.questions_asked > 0 and candidate_response:
            start_time = time.time()
            response_time = time.time() - start_time

            previous_followup_question = session.assessment_results[-1]['question'] if session.assessment_results else ""
            followup_score = evaluate_response(
                previous_followup_question,
                candidate_response,
                session.current_level,
                response_time,
                session.to_dict()
            )

            # Adjust total score
            session.total_score += followup_score or 0
            if session.total_score > 100:
                session.total_score = 100

            # Adjust level based on follow-up score
            new_level = get_next_question_level(session.current_level, followup_score)
            session.current_level = new_level

        # Generate the new main question
        previous_questions = [result['question'] for result in session.assessment_results]
        question = generate_question(
            session.to_dict(),
            session.current_level,
            previous_questions
        )

        print('question: ', question)


        # Increment question counter
        session.questions_asked += 1

        # Store assessment result
        assessment_result = {
            'question_number': session.questions_asked,
            'level': session.current_level,
            'question': question,
            'response': candidate_response,
            'score': followup_score if session.questions_asked > 1 else 0,  # No score for the first question
            'role_title': session.job_title,
            'main_skills': session.main_skills,
            'job_position': session.job_position,
            'depth_of_round': session.depth_of_round,
            'sub_skills': session.sub_skills
        }
        session.assessment_results.append(assessment_result)
        save_progress(session)

        emit('main_question_generated', question)

    except Exception as e:
        logger.error(f"Error in main_question: {str(e)}")
        emit('error', {"message": f"Error in main_question: {str(e)}"})


@socketio.on('follow_up_question')
def follow_up_question(data):
    """
    Handles the generation, response-evaluation, and level adjustment for a "follow-up" question.
    Flow:
      1) Evaluate the response of the previous main question.
      2) Generate a follow-up question if the score meets the criteria.
      3) Increment question number.
      4) Adjust the next level based on score.
      5) Save and emit results.
    """
    try:
        response_context = data.get('previous_response', "")

        if not response_context:
            emit('error', {"message": "No previous main question response provided."})
            return

        # Evaluate previous main question response
        start_time = time.time()
        response_time = time.time() - start_time

        previous_main_question = session.assessment_results[-1]['question'] if session.assessment_results else ""
        main_score = evaluate_response(
            previous_main_question,
            response_context,
            session.current_level,
            response_time,
            session.to_dict()
        )

        # Adjust total score
        session.total_score += main_score
        if session.total_score > 100:
            session.total_score = 100

        # Check if the score meets the criteria for a follow-up question
        if main_score < 50:  # Define threshold for follow-up criteria
            message = "Follow-up question is not required."
            emit('no_followup_needed', message)
            return

        # Adjust level based on main question response
        old_level = session.current_level
        new_level = get_next_question_level(session.current_level, main_score)
        session.current_level = new_level

        # Generate follow-up question
        primary_skill = random.choice(session.main_skills) if session.main_skills else "the required skill"
        previous_questions = [result['question'] for result in session.assessment_results]

        followup_question = generate_followup_question(
            session.to_dict(),
            session.current_level,
            primary_skill,
            previous_questions,
            response_context
        )

        # Increment question count
        session.questions_asked += 1

        # Store assessment result
        assessment_result = {
            'question_number': session.questions_asked,
            'level': old_level,
            'question': followup_question,
            'response_time': response_time,
            'score': main_score,
            'new_level': new_level,
            'role_title': session.job_title,
            'main_skills': session.main_skills,
            'job_position': session.job_position,
            'depth_of_round': session.depth_of_round,
            'sub_skills': session.sub_skills
        }
        session.assessment_results.append(assessment_result)
        save_progress(session)

        emit('followup_question_result', followup_question)

    except Exception as e:
        logger.error(f"Error in follow_up_question: {str(e)}")
        emit('error', {"message": f"Error in follow_up_question: {str(e)}"})

# --------------------------------------------------------------------------------
# START HANDLER (unchanged except it sets up the session and returns intro Q’s)
# --------------------------------------------------------------------------------

@socketio.on('start')
def start_assessment(data):
    candidate_name = data.get('candidate_name')
    OBJECT_ID = data.get('object_id')

    if not candidate_name:
        print("Candidate name cannot be empty. Exiting.")
        return
    if not OBJECT_ID:
        print("OBJECT_ID name cannot be empty. Exiting.")
        return

    role_data = fetch_role_data_from_mongodb(OBJECT_ID)
    if not role_data:
        return jsonify({"error": "Failed to fetch role data."}), 500

    global session
    session = AssessmentSession(candidate_name, role_data)

    try:
        introduction_responses = generate_intro_questions()
        session.introduction_responses = introduction_responses
        # Return or emit the 2-intro-questions
        emit('intro_questions_ready', introduction_responses)
    except Exception as e:
        logger.error(f"An error occurred during the assessment start: {str(e)}")
        progress_file = f"{session.session_id}_progress.json"
        with open(progress_file, "w") as f:
            json.dump(session.to_dict(), f, indent=4)
        emit('error', {
            "error": "An error occurred during the assessment start.",
            "details": str(e),
            "progress_file": progress_file
        })

@socketio.on('connect')
def handle_connect():
    print('A user connected')
    emit('connection_status', 'You are connected to the server.')

@socketio.on('disconnect')
def disconnect_user():
    print('User disconnected')

if __name__ == "__main__":
    socketio.run(app, debug=True, port=3000)
