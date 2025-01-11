import React, { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useConversation } from "@11labs/react";
import { fetchTranscript } from '../webhooks/apiService';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [conversationId, setConversationId] = useState("");
    const [dataCollection, setDataCollection] = useState();
    const conversation = useConversation();
    const [jobCards, setJobCards] = useState({
            "Software Engineer": {
                postedDate: "10-Jan-2025",
                companyName: "Amazon",
                role: "Software Engineer",
                detail: ["Full-Time", "On-site", "Health Insurance", "Paid Time Off"],
                skills: ["JavaScript", "ReactJS", "NodeJS", "MongoDB"],
                currentStatus: {
                    "Candidates Applied": 15,
                    "Completed Interview": 5,
                }
            },
    
            "Data Scientist": {
                postedDate: "05-Jan-2025",
                companyName: "Google",
                role: "Data Scientist",
                detail: ["Full-Time", "Remote", "Gym Membership", "Stock Options"],
                skills: ["Python", "Machine Learning", "Data Analysis", "TensorFlow"],
                currentStatus: {
                    "Candidates Applied": 30,
                    "Completed Interview": 12,
                }
            },
    
            "UI/UX Designer": {
                postedDate: "02-Jan-2025",
                companyName: "Meta",
                role: "UI/UX Designer",
                detail: ["Contract", "Hybrid", "Work from Home Allowance"],
                skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
                currentStatus: {
                    "Candidates Applied": 10,
                    "Completed Interview": 3,
                }
            },
    
            "DevOps Engineer": {
                postedDate: "15-Dec-2024",
                companyName: "Microsoft",
                role: "DevOps Engineer",
                detail: ["Full-Time", "On-site", "401(k) Match", "Flexible Hours"],
                skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
                currentStatus: {
                    "Candidates Applied": 20,
                    "Completed Interview": 8,
                }
            },
        });
    
      const [jobPost, setJobPost] = useState({
        jobTitle: "",
        designation: "",
        jobType: "",
        workplaceType: "",
        jobDescription: "",
        mainSkills: [],
        subSkills: [],
        salaryRange: {},
        benefits: [],
        jobPortalsPosting: [],
      });

    const fetchJobPosts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/alljobsposted/jobs_posted`);
    
                if (response.status === 200) {
    
                    const jobs = response.data;
                    const jobData = [];
    
                    // Transform fetched data into jobCards format
    
                    jobs.forEach((job) => {
                        jobData.push({
                            jobTitle: job.jobTitle,
                            postId: job._id,
                            postedDate: new Date(job.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            }),
                            companyName: job.companyName || "Amazon",
                            role: job.jobTitle,
                            detail: [
                                job.jobType,
                                job.workplaceType,
                                ...(job.benefits || []),
                            ],
                            skills: job.mainSkills,
                            currentStatus: {
                                "Candidates Applied": 0,
                                "Completed Interview": 0,
                            },
                        });
                    });
    
                    // Update the state only if `jobData` contains items
                    if (jobData.length) {
                        setJobCards(jobData);
                    }
                }
            } catch (error) {
                console.error('Error fetching job posts:', error);
            }
        };


      const postJobCard = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_BASE_URL
            }/api/alljobsposted/upload_job_posted_laiyla`,
            jobPost
          );
    
          if (response.status === 200) {
            toast.success("Job post saved successfully!");
    
            setJobPost({
              jobTitle: "",
              designation: "",
              jobType: "",
              workplaceType: "",
              jobDescription: "",
              mainSkills: [],
              subSkills: [],
              salaryRange: {},
              benefits: [],
              jobPortalsPosting: [],
            });
            // Optionally, close the dialog after saving
            fetchJobPosts();
        }
        } catch (error) {
          console.error("Error saving job post:", error);
          // toast.error("Failed to save job post. Please try again.");
        }
      };
    
      const handleGenerateDescription = async (title, position) => {
        try {
          const res = await axios.post(
            "http://127.0.0.1:5000/generate_job_description",
            {
              job_title: title,
              position: position,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: false, // Ensure credentials are not included (if not needed)
            }
          );
    
          const data = res.data;
    
        //   if (res) {
            const response = {
              jobDescription: data.job_description || "Job Title and Level: Front End Developer Intern\n\nJob Overview/Summary:\n\nWe are seeking a motivated and eager Front End Developer Intern to join our team and contribute to the creation and maintenance of our web-based applications. As an intern, you will gain hands-on experience in front-end development and collaborate with experienced engineers to build user-friendly and visually appealing interfaces. This role is an excellent opportunity for aspiring developers to develop their technical skills and gain valuable industry experience.\n\nYour primary responsibilities will include working on various aspects of the front-end development lifecycle, including designing and implementing UI elements, optimizing performance, and ensuring cross-browser compatibility. You will work closely with designers and back-end developers to ensure a seamless user experience. This internship is a perfect stepping stone for individuals with a passion for front-end development and a desire to build their skills in a dynamic and supportive environment.\n\nKey Responsibilities:\n\n- Create and maintain responsive and user-friendly front-end interfaces using HTML, CSS, and JavaScript\n- Implement and optimize UI elements, including buttons, forms, and interactive components\n- Ensure cross-browser compatibility and adherence to industry best practices\n- Collaborate with designers and back-end developers to bridge the gap between UX and functionality\n- Stay up-to-date on the latest front-end development trends and technologies\n\nRequired Qualifications:\n\n- Pursuing a Bachelor's degree in Computer Science, Information Technology, or a related field\n- Strong understanding of front-end development principles and technologies (HTML, CSS, JavaScript)\n- Proficiency in at least one front-end JavaScript framework (e.g., React, Angular)\n- Willingness to learn new technologies and adapt to changing industry trends\n- Excellent communication and interpersonal skills with a passion for collaborating and sharing knowledge\n\nPreferred Qualifications:\n\n- Experience with design principles and user experience optimization\n- Understanding of responsive design and adaptive layouts\n- Knowledge of version control systems (e.g., Git)\n- Experience with CSS preprocessors (e.g., Sass, Less)\n- Strong problem-solving and debugging abilities\n\nCompany Culture and Values:\n\nAt [company name], we believe in fostering an inclusive and collaborative work environment where every individual feels valued and respected. Our team is committed to excellence, innovation, and delivering exceptional results. We strive to create a workplace where our employees can thrive both professionally and personally. We offer a competitive salary and benefits package, as well as opportunities for growth and development. We are confident that you will find our culture to be motivating, supportive, and fulfilling.",
              mainSkills: data.main_skills || [
                "Front-End Development",
                "HTML",
                "CSS",
                "JavaScript",
                "UI Design",
                "Cross-Browser Compatibility",
                "Responsive Design",
                "JavaScript Frameworks (React/Angular)",
                "UX Optimization",
                "Adaptive Layouts",
                "CSS Preprocessors (Sass/Less)",
                "Version Control (Git)",
                "Problem-Solving",
                "Debugging",
                "Communication"
            ],
              subSkills: data.sub_skills || [
                "Front-End Development",
                "HTML",
                "CSS",
                "JavaScript",
                "UI Design",
                "Cross-Browser Compatibility",
                "Communication",
                "JavaScript Frameworks (React/Angular)",
                "UX Optimization",
                "Adaptive Layouts",
                "CSS Preprocessors (Sass/Less)",
                "Version Control (Git)",
                "Problem-Solving",
                "Debugging"
            ],
            };

            setJobPost((prev) => ({ ...prev, ...response }));
        //   }
        } catch (error) {
          console.error("Error fetching job description:", error);
    
          if (error.response) {
            // Server responded with a status code other than 2xx
            alert(
              `Failed to generate job description: ${error.response.data.error || "Unknown error"
              }`
            );
          } else if (error.request) {
            // Request made but no response received
            alert("No response from the server. Please check the connection.");
          } else {
            // Other errors
            alert("Request failed. Please try again.");
          }
        }
      };
    
      const getTranscriptData = async () => {
        try {
          // Call fetchTranscript and wait for the promise to resolve
          const data = await fetchTranscript(conversationId); // Replace with actual conversation ID
          setDataCollection(data?.analysis.data_collection_results); // Store the data in the state
    
          if (
            data?.analysis.data_collection_results?.["Job title"]?.value &&
            data?.analysis.data_collection_results?.["Designation"]?.value
          ) {
            handleGenerateDescription(
              data?.analysis.data_collection_results?.["Job title"]?.value,
              data?.analysis.data_collection_results?.["Designation"]?.value
            );
          }
        } catch (error) {
          console.error("Error fetching transcript data:", error);
        }
      };

    return (
        <JobContext.Provider value={{ jobCards, setJobCards, fetchJobPosts, dataCollection, setDataCollection, 
        fetchTranscript, conversationId, setConversationId, conversation, jobPost, setJobPost, postJobCard, 
        handleGenerateDescription, getTranscriptData }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobContext = () => useContext(JobContext);
