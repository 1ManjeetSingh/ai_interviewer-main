import React, { useState, useRef, useEffect } from "react";

import image1 from "../assets/image1.png";
import image2 from "../assets/Aspireit.png";
import image3 from "../assets/Ellipse 1872.svg";
import image4 from "../assets/Type=Layila.svg";
import image5 from "../assets/buttons-cta.svg";
import image6 from "../assets/Profile picture.png";
import HalfCircleChart from "../Components/HalfCircleChart";
import { IoClose } from "react-icons/io5";
import ProfileSection from "../Components/ProfileSection";
import Navbar from "../Components/Navbar";

//  ------------------ Piechart function ---------------

const AiInterview = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(false);
  const [isCandidateSelected, setIsCandidateSelected] = useState(false);

  const toggleTranscript = () => {
    setIsTranscriptVisible(!isTranscriptVisible);
  };

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const profileData = {
    name: "Aryan Sharma",
    title: "OTM Architect",
    company: "TCS",
    experience: "5 years",
    location: "Kolkata",
    skills: ["ReactJS", "Node.js", "TailwindCSS", "MongoDB", "ExpressJS"],
    image: image6, // Replace with dynamic image URL
  };

  const AssessmentData = [
    [
      {
        heading:
          "Can you describe a time when you used design thinking to solve a complex problem, focusing on empathy and iteration?",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        assessment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        level: 58,
      },
    ],
    [
      {
        heading:
          "Can you describe a time when you used design thinking to solve a complex problem, focusing on empathy and iteration?",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        assessment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        level: 100,
      },
    ],
  ];

  const [expandedStates, setExpandedStates] = useState(
    Array(AssessmentData.length).fill({ description: false, assessment: false })
  );

  const handleToggle = (index, field) => {
    setExpandedStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index ? { ...state, [field]: !state[field] } : state
      )
    );
  };


  return (
    <div className="bg-[#F2F2F2]">
      {/*------- Navbar --------- */}
      <Navbar />

      <ProfileSection data={profileData} />

      {/*------- Center Card --------- */}

      <div className="flex justify-between items-center px-[50px] py-6 max-md:px-5 max-w-[1224px] mx-auto">
        <div className="w-full gap-6">
          <div>
            <div className="w-full h-16 flex justify-between items-center px-1 mb-6">
              <div className="text-black text-[28px] font-bold leading-9 font-[SF UI Text] break-words">
                AI Interview
              </div>

              {/* Show the icon only when isTranscriptVisible is false */}

              <button
                onClick={toggleTranscript}
                className="flex justify-center items-center ButtonLabel text-center text-[#0071db] text-[18px] font-semibold font-['SF UI  Text'] leading-[36px] cursor-pointer px-[20px] py-[5px] rounded-[30px] shadow border border-[#0071db]"
              >
                {isTranscriptVisible ? "Hide Transcript" : "Show Transcript"}
              </button>
            </div>
          </div>
          <div className="flex w-full  p-4  rounded-lg">
            <div
              className={`flex w-full  ${
                isTranscriptVisible
                  ? "flex-row justify-between gap-5 max-xl:flex-col"
                  : "justify-center"
              } `}
            >
              {/* Video Container */}
              <div
                className={`relative h-[333px] w-full aspect-video bg-black rounded-md flex items-center justify-center transition-all duration-300 ${
                  isTranscriptVisible ? "w-[100%]" : "w-[50%]"
                }`}
              >
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <button
                      onClick={handlePlay}
                      className="flex items-center justify-center rounded-full w-36 h-36 bg-black border-4 border-gray-300 shadow-lg hover:opacity-80"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white" // Adjust h-40 to your desired height
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                )}
                <video
                  ref={videoRef}
                  className={`w-full h-full rounded-md ${
                    !isPlaying ? "hidden" : ""
                  }`}
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  controls
                ></video>
              </div>
              {/* Transcript Container */}
              {isTranscriptVisible && (
                <div className="py-[20px]">
                  <div
                    className="w-[100%] h-full  rounded-md overflow-auto"
                    style={{ maxHeight: "400px" }}
                  >
                    <div className="w-full h-full p-[24px] px-[32px] bg-white shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] rounded-[24px] border-[0.5px] border-[#464646] flex flex-col justify-start items-start overflow-y-auto gap-[20px]  max-h-[333px]  scrollbar-custom">
                      {/* Header Section with Title and Close Button */}
                      <div className="w-full flex justify-between items-center">
                        <div className="text-[#121212] text-[18px] font-[700] leading-[24px] break-words">
                          Transcript
                        </div>
                        <div
                          onClick={toggleTranscript}
                          className="cursor-pointer hover:scale-110 transition-transform "
                        >
                          <IoClose className="w-7 h-7" />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="space-y-3 overflow-auto scrollbar-custom">
                        <div className="flex gap-2">
                          <div className="h-full w-[50px] px-2 py-1 bg-gray-100 shadow-sm shadow-purple-300 rounded border border-purple-400 inline-flex justify-start items-center">
                            <div className="text-black text-[12px] font-sans font-normal leading-[12px] break-words">
                              00
                            </div>
                            <div className="text-black text-[12px] font-sans font-normal leading-[12px] break-words">
                              :
                            </div>
                            <div className="text-black text-[12px] font-sans font-normal leading-[12px] break-words">
                              07
                            </div>
                          </div>
                          <div className="w-full text-[#1E1E1E] text-[12px] font-sans font-normal leading-[20px] break-words">
                            Hello, everyone. Thank you for joining us today.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*------- Question Card --------- */}
      <div className="px-[48px] pb-8 max-md:px-5 max-w-[1224px] mx-auto">
        {AssessmentData.map((dataGroup, index) => (
          <div
            key={index}
            className="flex rounded-[24px] px-6 py-8 bg-[#FFF] shadow-[0px_0px_4px_0px_#00000040] mb-6"
          >
            <div className="flex pr-3 w-fit">
              <span className="flex justify-center items-center w-[36px] h-[36px] rounded-full border border-[#6f6f6f] text-[#6f6f6f] text-[20px]">
                {index + 1}
              </span>
            </div>
            {/* Question Section */}
            <div>
              <div className="mb-4">
                <div className="Text text-[#6f6f6f] text-[18px] font-semibold font-['SF UI  Text'] leading-7">
                  {dataGroup[0].heading}
                </div>
                <div className="Text text-[#1e1e1e] text-[16px] font-normal font-['SF UI  Text'] leading-normal py-2">
                  {expandedStates[index].description
                    ? dataGroup[0].description
                    : `${dataGroup[0].description.slice(0, 300)}...`}

                  <p
                    className="ListItem text-[#0071db] text-[18px] font-semibold font-['SF UI  Text'] leading-[18px] py-[8px] cursor-pointer"
                    onClick={() => handleToggle(index, "description")}
                  >
                    {expandedStates[index].description
                      ? "View less"
                      : "View more"}{" "}
                  </p>
                </div>
              </div>

              {/* Assessment Section */}
              <div>
                <div className="Text text-[#1e1e1e] text-[18px] font-semibold font-['SF UI  Text'] leading-7">
                  Assessment :
                </div>
                <div className="flex gap-7 max-md:flex-col">
                  <div className="Text text-[#1e1e1e] text-[16px] font-semibold font-['SF UI  Text'] leading-normal py-2">
                    {expandedStates[index].assessment
                      ? dataGroup[1].assessment
                      : `${dataGroup[1].assessment.slice(0, 300)}...`}
                    <p
                      className="ListItem text-[#0071db] text-[18px] font-semibold font-['SF UI  Text'] leading-[18px] py-[8px] cursor-pointer"
                      onClick={() => handleToggle(index, "assessment")}
                    >
                      {expandedStates[index].assessment
                        ? "View less"
                        : "View more"}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex justify-center w-[142px] items-center relative mx-8 max-md:w-full max-md:mx-0">
                    <div className=" flex items-start justify-center">
                      <HalfCircleChart percentage={dataGroup[1].level} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiInterview;
