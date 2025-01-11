import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import image1 from "../assets/image1.png";
import image2 from "../assets/Aspireit.png";
import image3 from "../assets/Ellipse 1872.svg";
import image4 from "../assets/Type=Layila.svg";
import googleMeet from "../assets/google-meet.svg";
import zoom from "../assets/zoom.svg";
import { useConversation } from "@11labs/react";
import Spline from "@splinetool/react-spline";
import { fetchTranscript } from "../webhooks/apiService";
// import startLiveTranscription, { stopLiveTranscription } from '../webhooks/ElevenLabsEmbed'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import { useJobContext } from "../Context/LaiylaJobPostContext";
import Navbar from "../Components/Navbar";

const RecruiterDashboard = () => {

  const fetchJobPosts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/alljobsposted/jobs_posted`
      );

      if (response.status === 200) {

        const jobs = response.data;
        const jobData = {};

        // Transform fetched data into jobCards format
        jobs.forEach((job) => {
          jobData[job.jobTitle] = {
            postedOn: new Date(job.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            progress: job.Progress,
          };
        });

        if (Object.keys(jobData).length) {
          // setJobCards(jobData);
        }
      }
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
  };

  // Fetch job posts on component mount
  useEffect(() => {
    fetchJobPosts();
  }, []);

  // main Varibles to change all
  // 1st
  const progress = {
    yesterdaysProgress: [
      {
        text: "The platform sourced 2500 candidates across LinkedIn, Naukri, and Indeed for the Software Engineer role.",
        icon: "./yesterday_progress_1.svg"
      },
      {
        text: "Conducted AI screening for 500 candidates, filtering them based on technical and soft skills.",
        icon: "./yesterday_progress_2.svg"
      },
      {
        text: "Completed AI interviews for 200 candidates, covering technical and behavioral rounds.",
        icon: "./yesterday_progress_3.svg"
      },
      {
        text: "Recommended Top 20 candidates for the Software Engineer role after an in-depth AI analysis.",
        icon: "./yesterday_progress_4.svg"
      }
    ],
    todaysGoals: [
      {
        text: "Review applications for Software Engineer (392 pending)",
        icon: "./yesterday_progress_1.svg"
      }, {
        text: "Post new job openings for UI/UX Designer and Data Scientist roles.",
        icon: "./yesterday_progress_2.svg"
      }, {
        text: "Schedule AI technical interviews for shortlisted Data Scientist candidates.",
        icon: "./yesterday_progress_3.svg"
      }, {
        text: "Generate a comprehensive report on hiring activity for this week.",
        icon: "./yesterday_progress_4.svg"
      },
    ]
  };
  // 2nd
  const [activeIndex, setActiveIndex] = useState(0); // Track active index
  const gradientIndex = activeIndex % 5;

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex); // Update active index
  };

  const [jobCards, setJobCards] = useState({
   "Sales Manager": {
      postedOn: "12th Dec 2024",
      progress: {
        jobPosted: 0,
        applicantsApplied: 0,
        selectionComplete: 0,
        aiInterviewRound: 0,
        aiTechnicalRound: 0,
        shortlistedCandidates: 0,
      },
    },
    "Data Scientist": {
      postedOn: "12th Dec 2024",
      progress: {
        jobPosted: 1,
        applicantsApplied: 0,
        selectionComplete: 0,
        aiInterviewRound: 0,
        aiTechnicalRound: 0,
        shortlistedCandidates: 0,
      },
    },
    "Ai Engineer": {
      postedOn: "12th Dec 2024",
      progress: {
        jobPosted: 1,
        applicantsApplied: 1301,
        selectionComplete: 0,
        aiInterviewRound: 0,
        aiTechnicalRound: 0,
        shortlistedCandidates: 0,
      },
    },
    "Marketing Manager": {
      postedOn: "12th Dec 2024",
      progress: {
        jobPosted: 1,
        applicantsApplied: 1278,
        selectionComplete: 1,
        aiInterviewRound: 0,
        aiTechnicalRound: 0,
        shortlistedCandidates: 0,
      },
    },
    "Sr. Account Manager": {
      postedOn: "12th Dec 2024",
      progress: {
        jobPosted: 1,
        applicantsApplied: 1278,
        selectionComplete: 1,
        aiInterviewRound: 1,
        aiTechnicalRound: 0,
        shortlistedCandidates: 0,
      },
    },
    "Software Developer": {
      postedOn: "12th Dec 2024",
      progress: {
        jobPosted: 1,
        applicantsApplied: 1278,
        selectionComplete: 1,
        aiInterviewRound: 1,
        aiTechnicalRound: 1,
        shortlistedCandidates: 0,
      },
    },
  });

  // 3rd
  const schedule = {
    meet: ["Dhaval Jha | UI/UX Designer | 24th Jan | 11AM"],
    zoom: ["Christine | AI Engineer | 24th Jan | 2PM"],
  };
  // 4th
  const [summaryText, setSummaryText] = useState([
    "Job Posted: Successfully posted the Software Engineer role.",
    "AI Screening: Software Engineer: Completed for 500 candidates; 200 moved to the next stage. Marketing Manager: Screening will begin once applications are received.",
    "AI Interviews: Software Engineer: Conducted for 50 shortlisted candidates. Marketing Manager: No interviews scheduled yet.",
    "Technical Round: Software Engineer: Evaluated 20 candidates in AI technical assessments.",
    "Shortlisted Candidates: Software Engineer: Finalized the top 20 candidates for review.",
    "All tasks are progressing well across roles, and we are on track to meet hiring goals.",
  ]);

  // <--------- Data Consts ----------->

  const gradients = [
    "linear-gradient(319deg, #D388FF 5.96%, #4B94F6 95.49%)",
    "linear-gradient(90deg, #B054F6 0%, #FE52B0 100%)",
    "linear-gradient(90deg, #2890FA 0%, #6ED6F5 100%)",
    "linear-gradient(90deg, #FF0F7B 0%, #F89B29 100%)",
    "linear-gradient(94deg, #420167 -0.62%, #241C70 16.07%, #063678 29.18%, #2061F8 62.03%, #2D79F5 84.23%, #0FB3D4 100%)",
  ];

  const pointColors = ["#D388FF", "#FE52B0", "#6ED6F5", "#FF0F7B", "#063678"];

  const scores = {
    "Sr. Account Manager": {
      aiTechnicalRoundAndInterview: {
        "Kunal P.": 98,
        "Muskan M.": 95,
        "Gautam K.": 90,
        "Payal R.": 89,
        "Kunal M.": 84,
        "Rahul V.": 80,
      },
      aiNonTechnicalRoundAndInterview: {
        "Aman S.": 95,
        "Riya T.": 89,
        "Vikas J.": 85,
        "Neha G.": 84,
        "Rahul V.": 80,
      },
    },
    "Marketing Manager": {
      aiNonTechnicalRoundAndInterview: {
        "Simran P.": 96,
        "Aarav G.": 88,
        "Nikita L.": 87,
        "Kartik N.": 85,
        "Rishi T.": 82,
      },
    },
    "Software Developer": {
      aiTechnicalRoundAndInterview: {
        "Divya R.": 99,
        "Aditya K.": 97,
        "Priya J.": 92,
        "Soham P.": 90,
        "Megha S.": 86,
        "Arjun V.": 81,
      },
      aiNonTechnicalRoundAndInterview: {
        "Harsh T.": 94,
        "Pooja D.": 91,
        "Naman V.": 87,
        "Ayesha K.": 85,
        "Dhruv M.": 83,
      },
    },
  };

  const [role, setRole] = useState(Object.keys(jobCards)[0]);

  const roundsList = [
    { label: "Job Posted", key: "jobPosted" },
    { label: "Applicants Applied", key: "applicantsApplied" },
    { label: "Selection Complete", key: "selectionComplete" },
    { label: "AI Interview Round", key: "aiInterviewRound" },
    { label: "AI Technical Round", key: "aiTechnicalRound" },
    { label: "Shortlisted Candidates", key: "shortlistedCandidates" },
  ];

  const options = [
    {
      value: "aiNonTechnicalRoundAndInterview",
      label: "AI Non-Technical Round & Interview",
    },
    {
      value: "aiTechnicalRoundAndInterview",
      label: "AI Technical Round & Interview",
    },
  ];

  const markLastActive = (roundData) => {
    let lastActive = null;

    for (const key in roundData) {
      // Skip 'postedOn' and find the latest non-zero value
      if (roundData[key] === 0) {
        lastActive = key;
        break;
      }
    }
    return lastActive || null;
  };

  // Dynamically update rounds with active state
  Object.keys(jobCards).forEach((role) => {
    const lastActiveRound = markLastActive(jobCards[role].progress);
    jobCards[role].isActive = lastActiveRound;
  });

  const textToShow = {
    jobPosted:
      "Your job has been successfully posted! Check out the dashboard or the Job Posting screen to track applications in real time.",
    applicantsApplied: `New applicants are rolling in! Review the profiles directly on your dashboard to start shortlisting.`,
    selectionComplete:
      "The selection process is complete! The top candidates have been identified for the next steps—check them out on the dashboard.",
    shortlistedCandidates:
      "Shortlisting complete! The top candidates are ready for your review—find them highlighted on the dashboard."
  };

  // <------------ Imp --------------->
  const roundsWithGraph = [
    "aiInterviewRound",
    "aiTechnicalRound",
  ];

  const [openSelect, setOpenSelect] = useState(false);
  const [option, setOption] = useState(options[0].value);

  const toggleDialogOption = () => {
    setOpenSelect(!openSelect);
  };

  const handleChangeOption = (selectedOption) => {
    setOption(selectedOption.value);
    toggleDialogOption();
  };

  const [currentScores, setCurrentScore] = useState();

  useEffect(() => {
    if (
      roundsWithGraph.includes(
        jobCards[Object.keys(jobCards)[activeIndex]].isActive
      )
    ) {
      setCurrentScore(scores[Object.keys(jobCards)[activeIndex]][option]);
    }
  }, [activeIndex, option]);

  const lineData = [
    {
      id: "Scores",
      color: "#A5A5CC",
      data: [
        { x: "", y: null }, // Invisible padding point on the left
        ...Object.entries(currentScores || {})
          .filter(([key]) => key !== "postedOn")
          .map(([name, score]) => ({
            x: name,
            y: score,
          })),
        { x: " ", y: null }, // Invisible padding point on the right
      ],
    },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "none",
      border: "none",
      color: "#F5F5F5",
      height: "36px",
      width: "full",
      minWidth: "280px",
      fontWeight: "400",
      boxShadow: "none",
      display: "flex",
      justifySelf: "center",
      justifyContent: "center",
      alignItems: "center",
      paddingRight: "25px",
      ":hover": {
        borderColor: "#EBEBEB",
      },
    }),
    input: (provided) => ({
      ...provided,
      caretColor: "transparent", // This removes the blinking cursor
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      width: "20px",
      height: "20px",
      position: "absolute",
      color: state.isDisabled ? "#A0A0A0" : "#0072DC",
      top: "27%",
      right: "10px",
      padding: "0",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      position: "fixed",
      backgroundColor: "#D7D7D7",
      borderRadius: "4px",
      zIndex: 999,
      top: "auto",
      left: "auto",
      fontSize: "18px",
      maxWidth: "280px",
      maxHeight: "280px",
      overflowY: "auto",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#161616",
      fontWeight: "400",
      fontSize: "18px",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? "#A0A0A0" : "#161616",
      fontSize: "14px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#C3C3EA" : state.isFocused ? "#E3E3EA" : "#EBEBEB",
      color: state.isSelected ? "#1E1E1E" : "#6F6F6F",
      fontWeight: "400",
      padding: "10px 20px",
      cursor: "pointer",
      ":active": {
        backgroundColor: "#EBEBEB",
      },
    }),
  };

  const [isSpeaking, setIsSpeaking] = useState(false); // Track speaking state
  const [aiVoice, setAiVoice] = useState(null);

  // Function to handle text-to-speech
  useEffect(()=>{
    const voices = window.speechSynthesis.getVoices();
    setAiVoice(voices[4]);
  },[aiVoice])

  const handleTextToSpeech = () => {
    if (!window.speechSynthesis) {
      alert("Speech Synthesis not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(summaryText.join(" "));

    utterance.voice = aiVoice;

    // Disable button during speech
    if (!isSpeaking) {
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance); // Start speaking
    } else {
      window.speechSynthesis.cancel(); // Stop the speech if already speaking
      setIsSpeaking(false);
    }

    // Re-enable after speech ends
    utterance.onend = () => {
      setIsSpeaking(false);
    };

  };

  // Function to handle copy-to-clipboard
  const handleCopyToClipboard = () => {
    const textToCopy = summaryText.join("\n");
    navigator.clipboard.writeText(textToCopy).then(
      () => toast.success("Summary copied"),
      (err) => alert("Failed to copy text: " + err)
    );
  };

  const suggestions = [
    {
      name: "Brooklyn Simmons",
      department: "Design",
      title: "UI Designer",
      completionDate: "19/11/24",
      postDate: "12/11/24",
      timing: "Low",
    },
    {
      name: "Ralph Edwards",
      department: "Development",
      title: "Front-end",
      completionDate: "19/11/24",
      postDate: "31/11/24",
      timing: "High",
    },
    {
      name: "Cody Fisher",
      department: "Design",
      title: "Motion Designer",
      completionDate: "19/11/24",
      postDate: "5/12/24",
      timing: "High",
    },
  ];

  const headers = [
    "Employee Name",
    "Department",
    "Job Title",
    "Completion Date",
    "Job Post Date",
    "Market Timing",
  ];

  const desc = [
    {
      num: '95%',
      text: 'Cost saved per hire',
      grad: 'linear-gradient(319deg, #D388FF 5.96%, #4B94F6 95.49%)',
    },
    {
      num: '132',
      text: 'Work hours saved this month',
      grad: 'linear-gradient(90deg, #B054F6 0%, #FE52B0 100%)',

    },
    {
      num: '1',
      text: ' HRs required to manage the pipeline',
      grad: 'linear-gradient(90deg, #2890FA 0%, #6ED6F5 100%)',
    }
  ]

  return (
    <div className="main-container min-h-[100vh] bg-[#F2F2F2] pb-24">
      <ToastContainer
        position="top-center" // Moves the toast to mid-top
        autoClose={2000}
      />

      {/* Navbar */}
      <Navbar />

      <div className="flex flex-col items-center mt-[3vh] px-[6vw]">

        {/* Header Details */}
        <div className='flex justify-center gap-12 w-[100%] h-[100%]' style={{ width: '100%', gap: 25, height: '100%', paddingBottom: 24, justifyContent: 'space-between', alignItems: 'center', display: 'flex', }}>
          {desc.map((data, index) => (
            <div key={index} style={{ fontFamily: 'SF UI Text', paddingLeft: 32, paddingRight: 32, paddingTop: 24, paddingBottom: 24, background: 'white', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)', borderRadius: 32, border: '0.50px #D388FF solid', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'flex', }}>
              <div style={{ background: data.grad, fontSize: 40, fontFamily: 'SF UI Text  !important', fontWeight: '700', lineHeight: 'auto', wordWrap: 'break-word', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', }}>
                {data.num}
              </div>
              <div style={{ flex: '1 1 0', height: 28, paddingTop: 4, paddingBottom: 4, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'flex', }}>
                <div style={{ flex: '1 1 0', background: data.grad, fontSize: 20, fontFamily: 'SF UI Text !important', fontWeight: '700', lineHeight: 'auto', wordWrap: 'break-word', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', }} >   {data.text} </div>
              </div>
            </div>
          ))}
        </div>


        <div
          className="overflow-hidden"
          style={{ width: "100%", height: 320, paddingLeft: 56, paddingRight: 56, paddingTop: 40, paddingBottom: 40, background: "linear-gradient(302deg, #5C9AFF 0%, #154DD1 75%), linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%)", boxShadow: "0px 0px 24px rgba(211, 136, 255, 0.45)", borderRadius: 32, border: "1px #DCFFFF solid", justifyContent: "flex-start", alignItems: "flex-start", gap: 40, display: "inline-flex", }}
        >
          {/* Yesterday's Progress Section */}
          <div
            style={{
              flex: "1 1 0",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 20,
              display: "inline-flex",
            }}
          >
            <div
              className="font-['SF UI  Display'] text-4xl"
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "700",
                lineHeight: "28px",
                wordWrap: "break-word",
              }}
            >
              Yesterday’s Progress
            </div>
            <div
              className="custom-scrollbar"
              style={{
                alignSelf: "stretch",
                height: 198,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 12,
                display: "flex",
                overflowY: "auto",
                paddingRight: 20,
                boxSizing: "border-box",
              }}
            >
              {progress.yesterdaysProgress.map((item, index) => (
                <div
                  key={index}
                  style={{
                    alignSelf: "stretch",
                    paddingLeft: 16,
                    paddingRight: 20,
                    paddingTop: 12,
                    paddingBottom: 12,
                    background: "rgba(255, 255, 255, 0.16)",
                    boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.25)",
                    borderRadius: 12,
                    backdropFilter: "blur(16px)",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 16,
                    display: "inline-flex",
                  }}
                >
                  <div style={{ width: 32, height: 32, position: "relative" }}>
                    <img src={item.icon} alt="" />
                  </div>
                  <div
                    className="font-['SF UI  Text'] text-[2vh]"
                    style={{
                      flex: "1 1 0",
                      color: "white",
                      fontWeight: "400",
                      lineHeight: "24px",
                      wordWrap: "break-word",
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Goals Section */}
          <div
            style={{
              flex: "1 1 0",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 20,
              display: "inline-flex",
            }}
          >
            <div
              className="font-['SF UI  Display'] text-4xl"
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "700",
                lineHeight: "28px",
                wordWrap: "break-word",
              }}
            >
              Today's Goals
            </div>
            <div
              className="custom-scrollbar"
              style={{
                alignSelf: "stretch",
                height: 198,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 12,
                display: "flex",
                overflowY: "auto",
                paddingRight: 20,
                boxSizing: "border-box",
              }}
            >
              {progress.todaysGoals.map((goal, index) => (
                <div
                  key={index}
                  style={{
                    alignSelf: "stretch",
                    paddingLeft: 20,
                    paddingTop: 12,
                    paddingBottom: 12,
                    background: "rgba(255, 255, 255, 0.16)",
                    boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.25)",
                    borderRadius: 12,
                    backdropFilter: "blur(16px)",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 16,
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{ width: 32, height: 32, position: "relative" }}
                    >
                      <img src={goal.icon} alt="" />
                    </div>
                  </div>
                  <div
                    className="font-['SF UI  Text'] text-[2vh]"
                    style={{
                      flex: "1 1 0",
                      color: "white",
                      fontWeight: "400",
                      lineHeight: "24px",
                      wordWrap: "break-word",
                    }}
                  >
                    {goal.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-[3vh] gap-12 w-[100%]">
          {/* <---------------- Score Graph -----------------> */}

          <div
            className="min-h-[540px] w-[50vw] py-[2vw] bg-white/30 rounded-[32px] shadow-[0px_0.5vw_1.5vw_0px_rgba(0,0,0,0.25)] border border-[#d388ff] backdrop-blur-lg flex-col justify-start items-start gap-[3vh] inline-flex"
            style={{ paddingInline: "clamp(10px,3vw,40px)" }}
          >
            <div className="self-stretch justify-between items-start inline-flex">
              <div className="w-full flex-col justify-start items-start gap-[1vh] inline-flex pl-2">
                <div className="justify-start items-center gap-[1vw] inline-flex">
                  <div
                    className="text-center text-[#bf4cf9] font-bold font-['SF UI Display']"
                    style={{
                      backgroundImage: gradients[gradientIndex], // Apply gradient as a background image
                      backgroundClip: "text", // Clip the background to the text
                      WebkitBackgroundClip: "text", // For webkit browsers
                      WebkitTextFillColor: "transparent", // For webkit browsers to make text transparent
                      transition: "background-image 0.5s ease", // Smooth transition for background image
                      fontSize: "clamp(28px,4vh,36px)",
                    }}
                  >
                    Top candidates
                  </div>
                </div>
                <div className="self-stretch flex-col justify-start items-start gap-[0.5vh] flex">
                  <div className="self-stretch justify-start items-center inline-flex whitespace-nowrap">
                    <div className="py-[0.5vh] justify-center items-center gap-[1vw] flex">
                      <div className="text-center text-[#6f6f6f] text-2xl font-normal font-[400] font-['SF UI Text'] leading-[2.8vh]">
                        Job designation&nbsp;
                      </div>
                    </div>
                    <div className="py-[0.5vh] justify-center items-center gap-[1vw] flex">
                      <div className="text-center text-[#6f6f6f] text-2xl font-normal  font-[400] font-['SF UI Text'] leading-[2.8vh]">
                        :&nbsp;
                      </div>
                    </div>
                    <div className="py-[0.5vh] justify-center items-center gap-[1vw] flex">
                      <div
                        className="text-center text-[#bf4cf9] text-2xl font-semibold font-['SF UI Text'] leading-[2.8vh] overflow-hidden whitespace-nowrap text-ellipsis max-w-[11vw]"
                        style={{
                          backgroundImage: gradients[gradientIndex], // Apply gradient as a background image
                          backgroundClip: "text", // Clip the background to the text
                          WebkitBackgroundClip: "text", // For webkit browsers
                          WebkitTextFillColor: "transparent", // For webkit browsers to make text transparent
                          transition: "background-image 0.5s ease", // Smooth transition for background image
                        }}
                      >
                        {Object.keys(jobCards)[activeIndex]}
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-[#6f6f6f] text-xl font-[400] font-['SF UI Text'] leading-[2.5vh]">
                    Posted On :{" "}
                    {jobCards[Object.keys(jobCards)[activeIndex]].postedOn}
                  </div>
                </div>
              </div>
              <div className="w-fit px-[1.5vh] mt-1 bg-neutral-100 rounded-[2.5vw] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] justify-start items-center gap-[1vw] flex">
                <Select
                  defaultValue={options[0]} // Set the default value to the first option
                  options={options}
                  styles={customStyles}
                  onChange={handleChangeOption}
                  value={options.find((option) => option.value === option)} // Ensure value fallback to first option
                  isDisabled={
                    !roundsWithGraph.includes(
                      jobCards[Object.keys(jobCards)[activeIndex]].isActive
                    )
                  }
                />
                {/* <div className="w-[3vw] h-[3vw] flex-col justify-center items-center gap-[1vw] inline-flex" /> */}
              </div>
            </div>
            <div className="w-[100%] h-full py-[2vh] bg-none rounded-[24px] shadow-[0px_0.5vw_1.5vw_0px_rgba(0,0,0,0.25)] border border-[#dcffff] flex-col justify-center items-center flex shrink">
              {/* responsive bar code place here */}
              {roundsWithGraph.includes(
                jobCards[Object.keys(jobCards)[activeIndex]].isActive
              ) ? (
                <ResponsiveLine
                  data={lineData}
                  margin={{ top: 40, right: 50, bottom: 60, left: 60 }}
                  xScale={{ type: "point" }}
                  yScale={{ type: "linear", min: 80, max: 100 }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 0,
                    tickPadding: 10,
                    legend: "Top Candidates",
                    legendPosition: "middle",
                    legendOffset: 45,
                  }}
                  axisLeft={{
                    tickSize: 0,
                    tickPadding: 5,
                    legend: "Scores",
                    legendPosition: "middle",
                    legendOffset: -45,
                    tickValues: [80, 85, 90, 95, 100],
                  }}
                  gridXValues={[]}
                  gridYValues={[80, 85, 90, 95, 100]}
                  pointSize={15}
                  pointColor={pointColors[gradientIndex]}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  animation={true}
                  colors={{ datum: "color" }}
                  theme={{
                    axis: {
                      ticks: {
                        text: {
                          fill: "#7d7da4",
                        },
                      },
                      legend: {
                        text: {
                          fontSize: 16,
                          fontWeight: "bold",
                          fill: "#55557C",
                        },
                      },
                    },
                  }}
                />
              ) : (
                <div className="justify-start items-center gap-[1vw] inline-flex px-8">
                  <div
                    className="text-center text-[#bf4cf9] text-[28px] font-bold font-['SF UI Display']"
                    style={{
                      backgroundImage: gradients[gradientIndex], // Apply gradient as a background image
                      backgroundClip: "text", // Clip the background to the text
                      WebkitBackgroundClip: "text", // For webkit browsers
                      WebkitTextFillColor: "transparent", // For webkit browsers to make text transparent
                      transition: "background-image 0.5s ease", // Smooth transition for background image
                    }}
                  >
                    {
                      textToShow[
                      jobCards[Object.keys(jobCards)[activeIndex]].isActive
                      ]
                    }
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* <-------------- progress card ---------------> */}
          <div className="w-[35vw] min-w-[360px] overflow-hidden min-h-[540px] h-[50vh] relative bg-white/30 rounded-[32px] py-[24px] pl-[48px] pr-[24px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.25)] border border-[#d388ff] backdrop-blur-lg flex flex-col relative">
            <style>
              {`

            .swiper-pagination {
              width: 15px !important;
              margin-right: 10px !important;
            }

          .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background-color: #7D7DA4 !important;
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.50);
          }

          .swiper-pagination-bullet-active {
            background-color: #2890FA !important;
          }
        `}
            </style>
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
                dynamicBullets: true, // Enable dynamic bullets
              }}
              direction="vertical" // Enables vertical sliding
              slidesPerView={1}
              spaceBetween={30}
              // pagination={{ clickable: true }}
              onSlideChange={handleSlideChange}
              className="h-full w-full"
            >
              {Object.keys(jobCards).map((jobKey, index) => {
                const job = jobCards[jobKey];

                return (
                  <SwiperSlide key={index}>
                    <div className="h-[102px] flex-col justify-start items-start gap-4 flex">
                      <div className="self-stretch h-[60px] flex-col justify-start items-start flex">
                        <div className="p-1 justify-start items-center gap-2 inline-flex">
                          <div className="text-center text-[#6f6f6f] text-lg font-normal font-[400] font-['SF UI Text'] uppercase leading-none tracking-wide">
                            Progress Report for
                          </div>
                        </div>
                        <div className="self-stretch px-1 justify-start items-center inline-flex">
                          <div className="py-1 justify-center items-center gap-2 flex">
                            <div
                              className="text-center text-[#bf4cf9] font-bold font-['SF UI Display']"
                              style={{
                                backgroundImage: gradients[gradientIndex],
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                transition: "background-image 0.5s ease",
                                fontSize: "clamp(28px,4vh,36px)",
                              }}
                            >
                              {jobKey}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch px-1 justify-start items-center inline-flex">
                        <div className="py-1 justify-center items-center gap-2 flex">
                          <div className="text-center text-[#6f6f6f] text-xl font-normal font-[400] font-['SF UI Text'] leading-[18px]">
                            Posted on : {job?.postedOn || "1 Jan 2025"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 pb-8 flex-col mb-auto justify-start items-start gap-10 inline-flex mt-14 relative">
                      {roundsList.map(({ label, key }) => {
                        const isActive =
                          jobCards[Object.keys(jobCards)[activeIndex]]
                            .isActive === key;
                        const status =
                          job?.progress?.[key] !== 0
                            ? "completed"
                            : isActive
                              ? "active"
                              : "pending";

                        return (
                          <div
                            key={key}
                            className="self-stretch justify-start items-center gap-6 inline-flex"
                          >
                            <div
                              className={`w-[18px] h-[18px] relative rounded-[100px]`}
                              style={{
                                background:
                                  jobCards[Object.keys(jobCards)[activeIndex]]
                                    .isActive === key
                                    ? gradients[gradientIndex]
                                    : status === "pending"
                                      ? "#D7D7FE"
                                      : gradients[gradientIndex],
                                boxShadow:
                                  status === "completed"
                                    ? `0px 2px 12px 0px ${pointColors[activeIndex]}`
                                    : status === "pending"
                                      ? ""
                                      : `0px 2px 12px 0px ${pointColors[activeIndex]}`,
                              }}
                            />
                            <div
                              className={`text-center text-xl font-['SF UI Text'] leading-tight ${status === "completed"
                                ? "text-[#7D7DA4] font-[400]"
                                : status === "pending"
                                  ? "text-[#C3C3EA] font-[400]"
                                  : "font-bold"
                                }`}
                              style={
                                status === "active"
                                  ? {
                                    backgroundImage: gradients[gradientIndex],
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    transition: "background-image 0.5s ease",
                                  }
                                  : {
                                  }
                              }
                            >
                              {key === "applicantsApplied" &&
                                job?.progress?.applicantsApplied !== 0
                                ? `${job?.progress?.applicantsApplied}`
                                : ""}
                              &nbsp;{label}
                            </div>
                          </div>
                        );
                      })}
                      <div className="z-[-1] h-[calc(100%-25px)] w-[1px] bg-[#A5A5CC] left-[20px] top-[0px] absolute flex-col justify-start items-start gap-10 inline-flex"></div>
                    </div>

                    <div className="w-full flex justify-end absolute bottom-[10px]">
                      <div className="h-14 px-5 bg-[#0071db] rounded-[30px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] justify-center items-center gap-2 inline-flex">
                        <div className="text-center text-white text-2xl font-['SF UI Text'] leading-[18px] cursor-pointer">
                          Intervene
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div style={{ alignItems: 'center' }} className="flex justify-center my-[3vh] gap-12 w-[100%]">
          {/* <------------------ Scheduled Interview------------------> */}

          <div
            className="w-[50vw] h-[36vh] p-[2vw] bg-white/30 rounded-[32px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.25)] backdrop-blur-lg flex-col justify-center items-end gap-6 inline-flex flex-grow"
            style={{
              border:
                "0.5px solid var(--Gradients-Gradient-Blue-to-pink, #D388FF)",
            }}
          >
            <div className="self-stretch flex-col justify-center items-center gap-6 flex">
              <div className="self-stretch h-9 flex-col justify-start items-start flex">
                <div className="self-stretch h-9 flex-col justify-start items-start flex">
                  <div className="p-1 justify-start items-center gap-2 inline-flex">
                    <div className="text-center text-[#55557c] text-[28px] font-bold font-['SF UI Display'] leading-7">
                      Scheduled Interview
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-[14vh] overflow-y-auto py-1 flex-col justify-start items-start gap-3 flex">
                {Object.entries(schedule).map(([type, meetings]) =>
                  meetings.map((meeting, index) => (
                    <div
                      key={index}
                      className="w-full px-4 py-2 bg-white/30 rounded-xl shadow-[0px_2px_12px_0px_rgba(0,0,0,0.10)] border border-[#dcffff] justify-start items-center gap-4 inline-flex"
                    >
                      <img
                        className="w-10 h-10 rounded-full shadow-[0px_0px_8px_0px_rgba(0,0,0,0.40)] border-box"
                        src={type === "meet" ? googleMeet : zoom}
                        alt={type === "meet" ? "Google Meet" : "Zoom"}
                      />
                      <div className="text-[#55557c] text-lg font-normal font-['SF UI  Text'] leading-normal">
                        {meeting}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="h-14 p-5 bg-[#0071db] rounded-[32px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] justify-center items-center gap-2 inline-flex">
              <div className="text-center text-white text-[18px] font-normal font-['SF UI  Text'] leading-[18px] cursor-pointer">
                Continue
              </div>
            </div>
          </div>

          {/* <------------- AI summary --------------> */}

          <div
            className="w-[35vw] h-[36vh] px-[32px] py-[36px]"
            style={{
              background:
                "linear-gradient(302deg, #5C9AFF 0%, #154DD1 75%), linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%)",
              boxShadow: "0px 0px 24px rgba(211, 136, 255, 0.45)",
              borderRadius: 32,
              border: "1px #DCFFFF solid",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 12,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="self-stretch flex-col justify-start items-start gap-4 flex">
              <div className=" justify-start items-center gap-1 inline-flex">
                <div className="w-8 h-8 pl-1 pr-[2.67px] pt-[1.33px] pb-[1.44px] justify-center items-center flex">
                  <div className="w-[25.33px] h-[29.23px] relative flex items-center justify-center">
                    <svg
                      className="toogleIcon w-[20px] h-[22px] mr-2 bg-none"
                      width="26"
                      height="30"
                      viewBox="0 0 26 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.0233 7.54762C13.2639 6.89742 14.1835 6.89742 14.4241 7.54762L16.4602 13.05C16.6871 13.6633 17.1706 14.1468 17.7839 14.3737L23.2863 16.4098C23.9365 16.6504 23.9365 17.57 23.2863 17.8106L17.7839 19.8467C17.1706 20.0736 16.6871 20.5571 16.4602 21.1704L14.4241 26.6727C14.1835 27.3229 13.2639 27.3229 13.0233 26.6727L10.9872 21.1704C10.7603 20.5571 10.2768 20.0736 9.66352 19.8467L4.16114 17.8106C3.51094 17.57 3.51095 16.6504 4.16115 16.4098L9.66352 14.3737C10.2768 14.1468 10.7603 13.6633 10.9872 13.05L13.0233 7.54762Z"
                        fill="white"
                      />
                      <path
                        d="M22.4776 19.15C22.5979 18.8249 23.0577 18.8249 23.178 19.15L23.5786 20.2325C23.6164 20.3347 23.697 20.4153 23.7992 20.4531L24.8817 20.8537C25.2068 20.974 25.2068 21.4338 24.8817 21.5541L23.7992 21.9546C23.697 21.9925 23.6164 22.073 23.5786 22.1752L23.178 23.2577C23.0577 23.5828 22.5979 23.5828 22.4776 23.2577L22.0771 22.1752C22.0392 22.073 21.9587 21.9925 21.8564 21.9546L20.774 21.5541C20.4489 21.4338 20.4489 20.974 20.774 20.8537L21.8564 20.4531C21.9587 20.4153 22.0392 20.3347 22.0771 20.2325L22.4776 19.15Z"
                        fill="white"
                      />
                      <path
                        d="M6.1654 2.22633C6.40599 1.57613 7.32563 1.57613 7.56622 2.22633L8.36089 4.3739C8.43654 4.57832 8.59771 4.7395 8.80213 4.81514L10.9497 5.60981C11.5999 5.85041 11.5999 6.77004 10.9497 7.01064L8.80213 7.80531C8.59771 7.88095 8.43654 8.04213 8.36089 8.24655L7.56622 10.3941C7.32563 11.0443 6.40599 11.0443 6.1654 10.3941L5.37072 8.24655C5.29508 8.04213 5.13391 7.88095 4.92949 7.80531L2.78192 7.01064C2.13172 6.77004 2.13172 5.85041 2.78192 5.60981L4.92949 4.81514C5.13391 4.7395 5.29508 4.57832 5.37072 4.3739L6.1654 2.22633Z"
                        fill="white"
                      />
                      <path
                        d="M19.8153 5.31396L20.5782 7.37565C20.6916 7.68228 20.9334 7.92404 21.24 8.0375L23.3017 8.80039L21.24 9.56328C20.9334 9.67674 20.6916 9.9185 20.5782 10.2251L19.8153 12.2868L19.0524 10.2251C18.9389 9.9185 18.6972 9.67674 18.3905 9.56328L16.3289 8.80039L18.3905 8.0375C18.6972 7.92404 18.9389 7.68228 19.0524 7.37564L19.8153 5.31396Z"
                        fill="white"
                      />
                      <path
                        d="M6.87154 21.5679C7.13433 21.3418 7.53653 21.5647 7.48418 21.9074L7.20733 23.7196C7.19087 23.8273 7.2223 23.9369 7.29337 24.0195L8.48888 25.4093C8.71494 25.6721 8.49207 26.0743 8.1494 26.022L6.33716 25.7451C6.22943 25.7287 6.11988 25.7601 6.03726 25.8312L4.64744 27.0267C4.38464 27.2527 3.98245 27.0299 4.0348 26.6872L4.31165 24.875C4.32811 24.7672 4.29668 24.6577 4.22561 24.575L3.03009 23.1852C2.80404 22.9224 3.02691 22.5202 3.36958 22.5726L5.18181 22.8494C5.28955 22.8659 5.3991 22.8345 5.48172 22.7634L6.87154 21.5679Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
                <div className="justify-start items-center gap-2 flex">
                  <div className="text-center text-white text-3xl font-bold font-['SF UI  Text'] leading-normal">
                    AI Summary
                  </div>
                </div>
              </div>
              <ul className="self-stretch h-[17vh] overflow-y-auto custom-scrollbar-sm text-white font-normal font-['SF UI  Text'] leading-normal list-disc list-outside pl-7 pr-3">
                {summaryText.map((text, index) => (
                  <li key={index} className="text-xl font-[400] text-justify my-2">
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="self-stretch justify-end items-center gap-4 inline-flex">
              {/* text to speech ai summary */}
              <button className="bg-none">
                {isSpeaking ? <svg xmlns="http://www.w3.org/2000/svg" onClick={handleTextToSpeech}
                  className={`rounded`}
                  width="32"
                  height="32"
                  viewBox="0 0 1024 1024" id="VolumeOff">
                  <path d="M672.52 568.35 728.87 512l-56.35-56.35 49.5-49.5 56.35 56.35 56.35-56.35 49.5 49.5L827.87 512l56.35 56.35-49.5 49.5-56.35-56.35-56.35 56.35zM536.33 814.5 323.71 662H201.27c-28.53 0-51.74-23.21-51.74-51.74V413.74c0-28.53 23.21-51.74 51.74-51.74h122.44l212.62-152.5c9.9-7.1 22.79-8.05 33.63-2.49 10.84 5.57 17.57 16.59 17.57 28.78v552.42c0 12.19-6.73 23.21-17.57 28.78-4.69 2.4-9.75 3.59-14.8 3.59-6.62 0-13.21-2.05-18.83-6.08z" fill="#ffffff" className="color000000 svgShape"></path>
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" onClick={handleTextToSpeech}
                  className={`rounded`}
                  width="32"
                  height="32"
                  viewBox="0 0 24 24" id="volume">
                  <g fill="#ffffff" className="color000000 svgShape">
                    <g fill="#ffffff" className="color000000 svgShape">
                      <path d="M18.28 8.37a1 1 0 1 0-1.56 1.26 4 4 0 0 1 0 4.74A1 1 0 0 0 17.5 16a1 1 0 0 0 .78-.37 6 6 0 0 0 0-7.26z" fill="#ffffff" className="color000000 svgShape"></path>
                      <path d="M19.64 5.23a1 1 0 1 0-1.28 1.54A6.8 6.8 0 0 1 21 12a6.8 6.8 0 0 1-2.64 5.23 1 1 0 0 0-.13 1.41A1 1 0 0 0 19 19a1 1 0 0 0 .64-.23A8.75 8.75 0 0 0 23 12a8.75 8.75 0 0 0-3.36-6.77zM15 3.12a1 1 0 0 0-1 0L7.52 7.57h-5a1 1 0 0 0-1 1v6.86a1 1 0 0 0 1 1h5l6.41 4.4a1.06 1.06 0 0 0 .57.17 1 1 0 0 0 1-1V4a1 1 0 0 0-.5-.88zm-1.47 15L8.4 14.6a1 1 0 0 0-.57-.17H3.5V9.57h4.33a1 1 0 0 0 .57-.17l5.1-3.5z" fill="#ffffff" className="color000000 svgShape"></path>
                    </g>
                  </g>
                </svg>}
              </button>

              {/* copy ai summary */}
              <svg
                onClick={handleCopyToClipboard}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.7368 1H4.10526C2.94211 1 2 1.895 2 3V17H4.10526V3H16.7368V1ZM19.8947 5H8.31579C7.15263 5 6.21053 5.895 6.21053 7V21C6.21053 22.105 7.15263 23 8.31579 23H19.8947C21.0579 23 22 22.105 22 21V7C22 5.895 21.0579 5 19.8947 5ZM19.8947 21H8.31579V7H19.8947V21Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

        </div>

        {/*  suggestions */}
        <div style={{ width: '100%', padding: 32, background: 'linear-gradient(302deg, #5C9AFF 0%, #154DD1 75%), linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%)', boxShadow: '0px 0px 24px rgba(211, 136, 255, 0.45)', borderRadius: 32, border: '1px #DCFFFF solid', display: 'flex', flexDirection: 'column', gap: 24, }}>
          <h1 style={{ color: 'white', fontSize: 24, lineHeight: '24px', fontFamily: 'SF UI Text', fontWeight: '700', }}>
            Suggestions
          </h1>

          {/* Headers */}
          <div style={{ display: 'flex', justifyContent: 'space-between', }}>
            {headers.map((header, index) => (
              <div key={index} style={{ flex: 1, textAlign: 'center', color: '#A5A5CC', fontSize: 18, fontWeight: '600', }}   >
                {header}
              </div>))
            }
          </div>

          {suggestions.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: 'rgba(255, 255, 255, 0.20)', boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.25)', borderRadius: 8, backdropFilter: 'blur(16px)', marginBottom: '', }} >
              <div style={{ flex: 1, color: '#DCFFFF', fontSize: 18, fontWeight: '400', paddingLeft: '16px' }}   >
                {item.name}
              </div>
              <div style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 16, fontWeight: '400', }}   >
                {item.department}
              </div>
              <div style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 16, fontWeight: '400', }}   >
                {item.title}
              </div>
              <div style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 16, fontWeight: '400', }}   >
                {item.completionDate}
              </div>
              <div style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 16, fontWeight: '400', }}   >
                {item.postDate}
              </div>
              <div style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 16, fontWeight: '400', }}   >
                {item.timing}
              </div>
            </div>
          ))}

          <div className="self-end w-fit p-5 mt-4 px-5 bg-[#0071db] rounded-[32px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] justify-center items-center gap-2 inline-flex">
            <div className="text-center text-white text-[18px] font-normal font-['SF UI  Text'] leading-[18px] cursor-pointer">Schedule</div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RecruiterDashboard;
