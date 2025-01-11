import React, { useState, useRef, useEffect } from "react";

import image1 from "../assets/image1.png";
import image2 from "../assets/Aspireit.png";
import image3 from "../assets/Ellipse 1872.svg";
import image4 from "../assets/Type=Layila.svg";
import image5 from "../assets/buttons-cta.svg";
import image6 from "../assets/Profile picture.png";
import image7 from "../assets/summarizeIcon.png";
import Rank from "../assets/Rank.svg";
import ProfileMatch from "../assets/Profile match.svg";
import CircularLoader from "../Components/CircularLoader";
import SkillSection from "../Components/SkillSection";
import RadarChart from "../Components/RadarChart.jsx";
import ProfileSection from "../Components/ProfileSection";
import Navbar from "../Components/Navbar.jsx";

const applicant = () => {

  const profileData = {
    name: "Priya Verma",
    title: "Senior Software Engineer",
    company: "Infosys",
    experience: "8 years",
    location: "Bangalore",
    skills: ["JavaScript", "TypeScript", "AWS", "Python", "GraphQL"],
    image: image6, // Replace with dynamic image URL
  };

  const interviewCardData = {
    round: "Round 1",
    title: "AI Interview",
    features: ["AI Assisted", "Proctored"],
    takenOn: "12th December 2024",
    duration: "30 mins",
    strengths: ["Communication", "Visual Design", "Adaptive"],
    weaknesses: ["Public Speaking", "Perfectionism"],
    roleFit: ["Senior", "Mid-level"],
    loaderProgress: 75,
  };

  const technicalCardData = {
    round: "Round 2",
    title: "AI Technical",
    features: ["AI Assisted", "Proctored"],
    takenOn: "12th December 2024",
    duration: "30 mins",
    strengths: ["Communication", "Visual Design", "Adaptive"],
    weaknesses: ["Public Speaking", "Perfectionism"],
    roleFit: ["Senior", "Mid-level"],
    loaderProgress: 65,
  };

    // radar chart data
    const labels = [
      "Leadership",
      "Communication",
      "Creativity",
      "Visual Design",
      "Critical Thinking",
      "Adaptability",
      "Market Analysis",
    ];

    const data = [
      [800, 600, 700, 500, 400, 600, 700], // Skill Level 1
      [400, 500, 600, 400, 300, 500, 600], // Skill Level 2
    ];

    const skills = [
      { name: "Visual Design", levels: [20, 20, 30, 30] },
      { name: "Visual Design", levels: [30, 10, 30, 30] },
      { name: "Visual Design", levels: [25, 25, 25, 25] },
      { name: "Visual Design", levels: [10, 20, 30, 40] },
      { name: "Visual Design", levels: [15, 25, 35, 25] },
    ];
    
    const colors = [
      "bg-indigo-200", // Developing
      "bg-cyan-200", // Intermediate
      "bg-blue-400", // Advanced
      "bg-blue-900", // Expert
    ];

  // Ai summary variables
  const [isAiInterviewOpen, setAiInterviewOpen] = useState(false);
  const toogleAiInterview = () => {
    return setAiInterviewOpen(!isAiInterviewOpen);
  };

  const [isAiTechnicalOpen, setAiTechnicalOpen] = useState(false);
  const toogleAiTechnical = () => {
    return setAiTechnicalOpen(!isAiTechnicalOpen);
  };


  return (
    <div className="main-container min-h-[100vh] bg-[#F2F2F2] pb-8">
      {/*------- Navbar ----------- */}
      <Navbar />

      {/*------- Profile Card --------- */}
      <ProfileSection data={profileData} />

      {/* score card */}
      <div className="grid grid-cols-3 mt-[4vh] justify-between px-[60px] gap-[2vw]  max-lg:grid-cols-2 max-md:grid-cols-1 max-sm:px-5  max-w-[1224px] mx-auto">
        <div className=" px-7 py-8 bg-white rounded-3xl shadow-[0px_0px_24px_0px_rgba(211,136,255,0.45)] flex-col justify-center items-center gap-9 inline-flex">
          <div className="self-stretch text-center text-[#1e1e1e] text-[24px] font-semibold font-['SF UI  Text'] leading-normal">
            Cummulative Score
          </div>
          <div className="self-stretch grow basis-0 flex-col justify-center items-center flex">
            <div className="justify-start items-start inline-flex">
              <div className="text-center text-[#24df3a] text-[48px] font-semibold font-['SF UI Display'] leading-[48px]">
                86%
              </div>
            </div>
          </div>
        </div>
        <div className=" px-7 py-8 bg-white rounded-3xl shadow-[0px_0px_24px_0px_rgba(211,136,255,0.45)] flex-col  items-center gap-3 inline-flex">
          <div className="self-stretch text-center text-[#1e1e1e] text-[24px] font-semibold font-['SF UI  Text'] leading-normal">
            Rank
          </div>
          <div className="justify-start items-start gap-[20px] inline-flex">
            <div className="px-2 py-1 justify-center items-center gap-9 flex">
              <div className="flex-col justify-start items-center gap-6 inline-flex">
                <div className="flex-col justify-start items-center gap-1 flex">
                  <img className="w-[130px] h-[130px] relative" src={Rank} />
                  <div className="justify-center items-end gap-0.5 inline-flex">
                    <div className="text-center text-[#0f0f36] text-[28px] font-semibold font-['SF UI Display'] leading-7">
                      12
                    </div>
                    <div className="text-center text-[#0f0f36] text-[28px] font-semibold font-['SF UI Display'] leading-7">
                      th
                    </div>
                  </div>
                </div>
                <div className="text-center text-[#6f6f6f] text-[18px] font-normal font-['SF UI  Text'] leading-[18px]">
                  AI Interview
                </div>
              </div>
            </div>
            <div className="px-2 py-1 justify-center items-center gap-9 flex">
              <div className="flex-col justify-start items-center gap-6 inline-flex">
                <div className="flex-col justify-start items-center gap-1 flex">
                  <img className="w-[130px] h-[130px] relative" src={Rank} />
                  <div className="justify-center items-end gap-0.5 inline-flex">
                    <div className="text-center text-[#0f0f36] text-[28px] font-semibold font-['SF UI Display'] leading-7">
                      9
                    </div>
                    <div className="text-center text-[#0f0f36] text-[28px] font-semibold font-['SF UI Display'] leading-7">
                      th
                    </div>
                  </div>
                </div>
                <div className="text-center text-[#6f6f6f] text-[18px] font-normal font-['SF UI  Text'] leading-[18px]">
                  AI Technical
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" px-10 py-7 bg-white rounded-3xl shadow-[0px_0px_24px_0px_rgba(211,136,255,0.45)] flex-col justify-start items-center gap-[32px] inline-flex">
          <div className="self-stretch h-12 flex-col justify-start items-center gap-2 flex">
            <div className="self-stretch text-center text-[#1e1e1e] text-[24px] font-semibold font-['SF UI  Text'] leading-normal">
              Profile Match
            </div>
            <div className="text-center text-[#6f6f6f] text-[16px] font-normal font-['SF UI  Text'] leading-none">
              with job opening
            </div>
          </div>
          <div className="py-[16px] px-[8px] flex flex-col gap-[24px]">
            <div className="py-[16px] px-[12px] rounded-[12px] bg-[#F5F5F5] flex items-center gap-[12px]">
              <span className="text-[24px] font-semibold font-['SF UI Display'] leading-[24px] text-transparent bg-clip-text bg-gradient-text">
                Main Skills
              </span>
              <span className="text-[24px] font-semibold font-['SF UI Display'] leading-[24px] text-transparent bg-clip-text bg-gradient-text">
                82%
              </span>
            </div>
            <div className="py-[16px] px-[12px] rounded-[12px] bg-[#F5F5F5] flex items-center gap-[12px]">
              <span className="text-[24px] font-semibold font-['SF UI Display'] leading-[24px] text-transparent bg-clip-text bg-gradient-text">
                Sub Skills
              </span>
              <span className="text-[24px] font-semibold font-['SF UI Display'] leading-[24px] text-transparent bg-clip-text bg-gradient-text">
                68%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Interview */}
      <div className="flex flex-col  py-[4vh] px-[8vh] max-md:px-10 mt-[4vh] max-sm:mx-5 gap-[20px] bg-white rounded-3xl shadow  max-w-[1104px] mx-auto">
        <div className="flex justify-between max-[500px]:flex-col max-[500px]:gap-3">
          <div className="flex flex-col gap-[6px]">
            <div className="flex flex-col gap-[1vh]">
              <div className="text-[#1e1e1e] text-xl font-normal font-['SF UI  Text'] uppercase leading-none tracking-wide">
                {interviewCardData.round}
              </div>
              <div className="text-[#1e1e1e] text-2xl font-semibold font-['SF UI  Text'] leading-normal">
                {interviewCardData.title}
              </div>
            </div>
            <div className="flex items-center gap-[24px]">
              {interviewCardData.features.map((feature, index) => (
                <div className="flex items-center gap-1" key={index}>
                  <img src="./radio-btn.png" alt="radio button image" />
                  <span className="text-[12px] text-[#161616]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[6px]">
            <span className="text-[12px] text-[#6F6F6F] font-bold">
              Taken on : {interviewCardData.takenOn}
            </span>
            <span className="text-[12px] text-[#6F6F6F] font-bold">
              Duration : {interviewCardData.duration}
            </span>
          </div>
        </div>
        <div className="flex gap-[4vh] justify-between flex-wrap max-sm:flex-col">
          <div className="w-[25%] flex flex-col gap-[24px] max-[900px]:justify-center max-sm:w-full max-sm:items-center">
            <div className="flex items-center">
              <CircularLoader progress={interviewCardData.loaderProgress} />
            </div>
            <button
              className="relative pointer-events-auto overflow-hidden rounded-full opacity-100 flex items-center gap-2 w-fit"
              style={{
                padding: "10px 20px",
                background: "white",
                border: "none", // Remove default borders
              }}
              onClick={toogleAiInterview}
            >
              <img src="./aiicon.png" alt="ai icon" />
              <span
                style={{ position: "relative", zIndex: 2 }}
                className="text-[14px] text-transparent bg-clip-text bg-button-text font-semibold"
              >
                Summarize
              </span>
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  zIndex: 0,
                  background:
                    "linear-gradient(131.04deg, #002DBF 17.73%, #4396F7 49.01%, #FF9BD2 69.29%, #C9FFFC 89.75%)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",
                  padding: "2px", // Controls the border thickness
                }}
              ></div>
            </button>
          </div>
          <div className="w-[40%] flex flex-col gap-[5vh] max-sm:w-full">
            <div className="flex flex-col gap-[16px]">
              <div className="text-[#1e1e1e] text-[18px] font-semibold font-['SF UI  Text'] leading-[18px]">
                Strengths
              </div>
              <div className="flex flex-wrap gap-2">
                {interviewCardData.strengths.map((strength, index) => (
                  <div
                    className="h-8 w-fit px-[12px] py-[8px] bg-neutral-100 rounded shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border border-[#0072dc] justify-start items-center gap-2 inline-flex"
                    key={index}
                  >
                    <div className="text-black text-[16px] font-normal font-['SF UI  Text'] leading-none">
                      {strength}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-[16px]">
              <div className="text-[#1e1e1e] text-[18px] font-semibold font-['SF UI  Text'] leading-[18px]">
                Weaknesses
              </div>
              <div className="flex flex-wrap gap-2">
                {interviewCardData.weaknesses.map((weakness, index) => (
                  <div
                    className="h-8 w-fit px-[12px] py-[8px] bg-neutral-100 rounded shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border border-[#0072dc] justify-start items-center gap-2 inline-flex"
                    key={index}
                  >
                    <div className="text-black text-[16px] font-normal font-['SF UI  Text'] leading-none">
                      {weakness}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[20%] max-[900px]:w-full flex flex-col  justify-between">
            <div className="flex flex-col gap-[16px]">
              <div className="text-[#1e1e1e] text-xl font-semibold font-['SF UI  Text'] leading-[18px]">
                Role Fit
              </div>
              <div className="flex flex-wrap gap-2">
                {interviewCardData.roleFit.map((role, index) => (
                  <div
                    className="h-8 w-fit px-[12px] py-[8px] bg-neutral-100 rounded shadow-[0px_0px_4px_0px_#D388FF] border border-[#EA63E7] justify-start items-center gap-2 inline-flex"
                    key={index}
                  >
                    <div className="text-black text-[16px] font-normal font-['SF UI  Text'] leading-none">
                      {role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex mt-5 max-[900px]:mx-auto">
              <div className="h-10 px-[16px] py-2 rounded-[30px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border border-[#0071db] justify-center items-center gap-1 inline-flex">
                <button className="text-center text-[#0071db] text-[14px] font-semibold font-['SF UI  Text'] leading-[14px]">
                  View more
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`px-8 py-5 rounded-xl flex-col justify-center items-start gap-4 ${
            isAiInterviewOpen ? "flex" : "hidden"
          } transition-all duration-500 ease-in-out`}
          style={{
            background:
              "linear-gradient(135deg, rgba(0, 45, 191, 0.30) -1.89%, rgba(67, 150, 247, 0.24) 45.88%, rgba(255, 155, 210, 0.42) 76.85%, rgba(201, 255, 252, 0.42) 108.11%)",
          }}
        >
          <div className="justify-start items-center gap-1 inline-flex">
            <div className="w-6 h-6 pl-[3px] pr-0.5 pt-px pb-[1.08px] justify-center items-center flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="22"
                viewBox="0 0 19 22"
                fill="none"
              >
                <path
                  d="M9.39632 5.41157C9.57676 4.92392 10.2665 4.92392 10.4469 5.41157L11.974 9.53835C12.1442 9.9983 12.5068 10.3609 12.9668 10.5311L17.0935 12.0582C17.5812 12.2386 17.5812 12.9284 17.0935 13.1088L12.9668 14.6358C12.5068 14.806 12.1442 15.1687 11.974 15.6286L10.4469 19.7554C10.2665 20.2431 9.57676 20.2431 9.39632 19.7554L7.86927 15.6286C7.69907 15.1687 7.33643 14.806 6.87649 14.6358L2.7497 13.1088C2.26205 12.9284 2.26205 12.2386 2.7497 12.0582L6.87649 10.5311C7.33643 10.3609 7.69907 9.9983 7.86927 9.53835L9.39632 5.41157Z"
                  fill="#323232"
                />
              </svg>
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="text-center text-[#1e1e1e] text-xl font-semibold font-['SF UI Text'] leading-[18px]">
                AI Summary
              </div>
            </div>
          </div>
          <div className="self-stretch text-justify text-black text-lg font-normal font-['SF UI Text'] leading-tight">
            The candidate achieved an overall score of 65% in the AI interview.
            Key strengths include effective communication, strong
            problem-solving abilities, quick adaptability, analytical thinking,
            and teamwork. However, the candidate demonstrated weaknesses in
            leadership experience, time management, technical expertise, and
            reliance on structured processes. Overall, the candidate is highly
            suitable for collaborative and problem-solving roles but may need
            upskilling to excel in leadership positions. For more details, click
            "View More".
          </div>
        </div>
      </div>

      {/* AI Technical */}
      <div className="flex flex-col self-stretch py-[4vh] px-[8vh] max-md:px-10 mt-[4vh]  max-sm:mx-5 gap-[20px] bg-white rounded-3xl shadow  max-w-[1104px] mx-auto">
        <div className="flex justify-between max-[500px]:flex-col max-[500px]:gap-3">
          <div className="flex flex-col gap-[6px]">
            <div className="flex flex-col gap-[1vh]">
              <div className="text-[#1e1e1e] text-xl font-normal font-['SF UI  Text'] uppercase leading-none tracking-wide">
                {technicalCardData.round}
              </div>
              <div className="text-[#1e1e1e] text-2xl font-semibold font-['SF UI  Text'] leading-normal">
                {technicalCardData.title}
              </div>
            </div>
            <div className="flex items-center gap-[24px]">
              {technicalCardData.features.map((feature, index) => (
                <div className="flex items-center gap-1" key={index}>
                  <img src="./radio-btn.png" alt="radio button image" />
                  <span className="text-[12px] text-[#161616]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[6px]">
            <span className="text-[12px] text-[#6F6F6F] font-bold">
              Taken on : {technicalCardData.takenOn}
            </span>
            <span className="text-[12px] text-[#6F6F6F] font-bold">
              Duration : {technicalCardData.duration}
            </span>
          </div>
        </div>
        <div className="flex gap-[4vh] justify-between flex-wrap max-sm:flex-col">
          <div className="w-[25%] flex flex-col gap-[24px] max-[900px]:justify-center max-sm:w-full max-sm:items-center">
            <div className="flex items-center">
              <CircularLoader progress={technicalCardData.loaderProgress} />
            </div>
            <button
              className="relative pointer-events-auto overflow-hidden rounded-full opacity-100 flex items-center gap-2 w-fit"
              style={{
                padding: "10px 20px",
                background: "white",
                border: "none", // Remove default borders
              }}
              onClick={toogleAiTechnical}
            >
              <img src="./aiicon.png" alt="ai icon" />
              <span
                style={{ position: "relative", zIndex: 2 }}
                className="text-[14px] text-transparent bg-clip-text bg-button-text font-semibold"
              >
                Summarize
              </span>
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  zIndex: 0,
                  background:
                    "linear-gradient(131.04deg, #002DBF 17.73%, #4396F7 49.01%, #FF9BD2 69.29%, #C9FFFC 89.75%)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",
                  padding: "2px", // Controls the border thickness
                }}
              ></div>
            </button>
          </div>
          <div className="w-[40%] flex flex-col gap-[5vh] max-sm:w-full">
            <div className="flex flex-col gap-[16px]">
              <div className="text-[#1e1e1e] text-[18px] font-semibold font-['SF UI  Text'] leading-[18px]">
                Strengths
              </div>
              <div className="flex flex-wrap gap-2">
                {technicalCardData.strengths.map((strength, index) => (
                  <div
                    className="h-8 w-fit px-[12px] py-[8px] bg-neutral-100 rounded shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border border-[#0072dc] justify-start items-center gap-2 inline-flex"
                    key={index}
                  >
                    <div className="text-black text-[16px] font-normal font-['SF UI  Text'] leading-none">
                      {strength}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-[16px]">
              <div className="text-[#1e1e1e] text-[18px] font-semibold font-['SF UI  Text'] leading-[18px]">
                Weaknesses
              </div>
              <div className="flex flex-wrap gap-2">
                {technicalCardData.weaknesses.map((weakness, index) => (
                  <div
                    className="h-8 w-fit px-[12px] py-[8px] bg-neutral-100 rounded shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border border-[#0072dc] justify-start items-center gap-2 inline-flex"
                    key={index}
                  >
                    <div className="text-black text-[16px] font-normal font-['SF UI  Text'] leading-none">
                      {weakness}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[20%] max-[900px]:w-full flex flex-col  justify-between">
            <div className="flex flex-col gap-[16px]">
              <div className="text-[#1e1e1e] text-xl font-semibold font-['SF UI  Text'] leading-[18px]">
                Role Fit
              </div>
              <div className="flex flex-wrap gap-2">
                {technicalCardData.roleFit.map((roleFit, index) => (
                  <div
                    className="h-8 w-fit px-[12px] py-[8px] bg-neutral-100 rounded shadow-[0px_0px_4px_0px_#D388FF] border border-[#EA63E7] justify-start items-center gap-2 inline-flex"
                    key={index}
                  >
                    <div className="text-black text-[16px] font-normal font-['SF UI  Text'] leading-none">
                      {roleFit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex mt-5 max-[900px]:mx-auto">
              <div className="h-10 px-[16px] py-2 rounded-[30px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border border-[#0071db] justify-center items-center gap-1 inline-flex">
                <button className="text-center text-[#0071db] text-[14px] font-semibold font-['SF UI  Text'] leading-[14px]">
                  View more
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`px-8 py-5 rounded-xl flex-col justify-center items-start gap-4 ${
            isAiTechnicalOpen ? "flex" : "hidden"
          } transition-all duration-500 ease-in-out`}
          style={{
            background:
              "linear-gradient(135deg, rgba(0, 45, 191, 0.30) -1.89%, rgba(67, 150, 247, 0.24) 45.88%, rgba(255, 155, 210, 0.42) 76.85%, rgba(201, 255, 252, 0.42) 108.11%)",
          }}
        >
          <div className="justify-start items-center gap-1 inline-flex">
            <div className="w-6 h-6 pl-[3px] pr-0.5 pt-px pb-[1.08px] justify-center items-center flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="22"
                viewBox="0 0 19 22"
                fill="none"
              >
                <path
                  d="M9.39632 5.41157C9.57676 4.92392 10.2665 4.92392 10.4469 5.41157L11.974 9.53835C12.1442 9.9983 12.5068 10.3609 12.9668 10.5311L17.0935 12.0582C17.5812 12.2386 17.5812 12.9284 17.0935 13.1088L12.9668 14.6358C12.5068 14.806 12.1442 15.1687 11.974 15.6286L10.4469 19.7554C10.2665 20.2431 9.57676 20.2431 9.39632 19.7554L7.86927 15.6286C7.69907 15.1687 7.33643 14.806 6.87649 14.6358L2.7497 13.1088C2.26205 12.9284 2.26205 12.2386 2.7497 12.0582L6.87649 10.5311C7.33643 10.3609 7.69907 9.9983 7.86927 9.53835L9.39632 5.41157Z"
                  fill="#323232"
                />
              </svg>
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="text-center text-[#1e1e1e] text-xl font-semibold font-['SF UI Text'] leading-[18px]">
                AI Summary
              </div>
            </div>
          </div>
          <div className="self-stretch text-justify text-black text-lg font-normal font-['SF UI Text'] leading-tight">
            The candidate achieved an overall score of 65% in the AI interview.
            Key strengths include effective communication, strong
            problem-solving abilities, quick adaptability, analytical thinking,
            and teamwork. However, the candidate demonstrated weaknesses in
            leadership experience, time management, technical expertise, and
            reliance on structured processes. Overall, the candidate is highly
            suitable for collaborative and problem-solving roles but may need
            upskilling to excel in leadership positions. For more details, click
            "View More".
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2  py-[4vh]  mt-[1vh] gap-[20px] max-lg:grid-cols-1 max-sm:mx-[10px]  max-w-[1104px] mx-auto">
        <SkillSection skills={skills} colors={colors}/>
        <RadarChart data={data} labels={labels} />
      </div>
    </div>
  );
};

export default applicant;
