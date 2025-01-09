import { useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import Emoji from "../assets/Emoji.svg"
import Send from "../assets/Send.svg"
import meta from "../assets/meta.svg";
import briefcase from "../assets/briefcase.svg";
import Experience from "../assets/Experience.svg";
import github from "../assets/github.svg";
import Google from "../assets/Google.svg";
import Spotify from "../assets/Spotify.svg";
import XLogo from "../assets/XLogo.svg";
import Adobe from "../assets/adobe.svg";
import Amazone from "../assets/amazone.svg";
import star from "../assets/star.svg";

const DummyInterface = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const companies = [
    { id: "meta", name: "Meta", companyLogo: meta, Time: "12:45pm", text: "join us for exciting internship opportunities" },
    { id: "github", name: "GitHub", companyLogo: github, Time: "12:45pm", text: "join us for exciting internship opportunities" },
    { id: "google", name: "Google", companyLogo: Google, Time: "12:45pm", text: "join us for exciting internship opportunities" },
    { id: "spotify", name: "Spotify", companyLogo: Spotify, Time: "12:45pm", text: "join us for exciting internship opportunities" },
    { id: "x", name: "X", companyLogo: XLogo, Time: "12:45pm", text: "join us for exciting internship opportunities" },
    { id: "adobe", name: "Adobe", companyLogo: Adobe, Time: "12:45pm", text: "join us for exciting internship opportunities" },
    { id: "amazon", name: "Amazon", companyLogo: Amazone, Time: "12:45pm", text: "join us for exciting internship opportunities" }, { id: "meta", name: "Meta", companyLogo: meta, Time: "12:45pm", text: "join us for exciting internship opportunities" },
    { id: "github", name: "GitHub", companyLogo: github, Time: "12:45pm", text: "join us for exciting internship opportunities" },
    { id: "google", name: "Google", companyLogo: Google, Time: "12:45pm", text: "join us for exciting internship opportunities" },
    { id: "spotify", name: "Spotify", companyLogo: Spotify, Time: "12:45pm", text: "join us for exciting internship opportunities" },
    { id: "x", name: "X", companyLogo: XLogo, Time: "12:45pm", text: "join us for exciting internship opportunities" },
    { id: "adobe", name: "Adobe", companyLogo: Adobe, Time: "12:45pm", text: "join us for exciting internship opportunities" },
    { id: "amazon", name: "Amazon", companyLogo: Amazone, Time: "12:45pm", text: "join us for exciting internship opportunities" },
  ];

  const jobData = {
    meta: [
      {
        id: 3,
        companyLogo: meta,
        icon2: "../../../assets/icon2.svg",
        jobTitle: "Congratulations! 🎊 You’ve made it to the top 20 candidates in our AI-powered recruitment process.",
        jobDescription:
          "To move forward, we’d like to confirm a few details with you.",
        icon: star,
        experience: "2 years",
        type: "Full-time",
        salary: "3 - 5 LPA",
        buttonText: "Take Interview with AI",
        salaryRange: "Is the proposed salary range acceptable to you?",
        jobType: "Are you comfortable with a full-time role?",
        location: "Is the job location suitable for you?",
        agree:
          'IF you agree to the above, please respond with “Yes” to confirm your acceptance. Once confirmed, our recruitment team will connect with you to discuss the next steps.',
      },
      {
        id: 2,
        companyLogo: meta,
        icon2: "../../../assets/icon2.svg",
        jobTitle: "AI TECHNOLOGY ROUND",
        jobDescription:
          "Congratulations! 🎊 You have been selected as one of the top 100 candidates to advance to the next phase of our AI-powered recruitment journey.",
        experience: "2 years",
        type: "Full-time",
        salary: "3 - 5 LPA",
        icon: star,
        buttonText: "Take Interview with AI",
      },
      {
        id: 1,
        companyLogo: meta,
        icon2: "../../../assets/icon2.svg",
        jobTitle: "AI INTERVIEW",
        jobDescription: "UI/UX Designer | Meta | Noida",
        experience: "2 years",
        type: "Full-time",
        salary: "3 - 5 LPA",
        icon: star,
        buttonText: "Take Interview with AI",
      },
      
    ],
    github: [
      {
        id: 1,
        companyLogo: github,
        icon2: Experience,
        jobTitle: "DevOps Engineer",
        jobDescription: "Backend Developer | GitHub | Remote",
        experience: "2 Y",
        type: "Full-time",
        salary: "3 - 5 LPA",
        icon: star,
        buttonText: "Apply Now",
      },
    ],
  };

  const handleSelect = (companyId) => {
    setSelectedCompany(companyId);
  };

  const handleEmojiClick = (emoji) => {
    setInputValue(inputValue + emoji.emoji); // Add selected emoji to input value
  };

  return (
    <div className="flex h-screen gap-2 bg-white p-4 shadow-[0px_0px_8px_rgba(0,0,0,0.4)] rounded-[7.08px]">
      {/* Sidebar */}
      <div className="w-1/4 border-r p-4 max-w-xl shadow-[0px_0px_8px_rgba(0,0,0,0.4)] rounded-[7.08px] h-[100%] overflow-y-auto scrollbar-thin">
        <div className="py-4">
          <div className="w-full border shadow-[0px_0px_8px_rgba(0,0,0,0.4)] rounded-[7.08px] relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-4 pr-12  focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[7.08px]"
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="none" className={`w-[22px] h-[22px] shrink-0 rounded-full mr-1 absolute top-[4px] right-1`}   >
              <path d="M9.49996 2.75C8.16495 2.75 6.85991 3.14588 5.74989 3.88757C4.63986 4.62927 3.7747 5.68347 3.26381 6.91686C2.75292 8.15026 2.61925 9.50745 2.8797 10.8168C3.14015 12.1262 3.78302 13.3289 4.72702 14.2729C5.67102 15.2169 6.87375 15.8598 8.18311 16.1202C9.49248 16.3807 10.8497 16.247 12.0831 15.7361C13.3165 15.2252 14.3707 14.3601 15.1124 13.25C15.854 12.14 16.2499 10.835 16.2499 9.49996C16.2498 7.70979 15.5386 5.99298 14.2728 4.72714C13.0069 3.46131 11.2901 2.75011 9.49996 2.75Z" stroke="#353535" strokeWidth="2" strokeMiterlimit="10" />
              <path d="M14.666 14.668L18.3327 18.3346" stroke="#353535" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
            </svg>
          </div>

        </div>
        <div className="flex flex-col gap-4  ">
          {companies.map((company) => (
            <div
              key={company.id}
              className={`flex items-center justify-around cursor-pointer rounded-lg border py-2 pr-3 pl-1 h-auto gap-2 hover:bg-[#F5F5F5] transition-all duration-300 ${company.id === selectedCompany ? 'bg-[#F5F5F5] border-[#B9B9B9] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]' : 'bg-[#FFF] border-[#C3C3EA]'}`}
              onClick={() => handleSelect(company.id)}
            >
              <div className="flex-shrink-0 shadow-md rounded-lg border border-gray-200 flex justify-center items-center w-20 h-20 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                <img
                  className="object-contain max-h-full max-w-full p-1"
                  src={company.companyLogo}
                  alt={`${company.name} Logo`}
                />
              </div>
              <div className="flex flex-col justify-center w-[70%]">
                <div className="flex justify-between w-full mb-1">
                  <span className="text-[#1e1e1e] text-2xl sm:text-xl lg:text-2xl font-semibold font-['SF UI Text']">
                    {company.name}
                  </span>
                  <span className="text-[#6f6f6f] font-medium font-['SF UI Text'] leading-tight text-xs sm:text-sm md:text-base block flex items-center">
                    {company.Time}
                  </span>
                </div>
                <div className="text-xs sm:text-sm md:text-base w-full overflow-hidden whitespace-nowrap text-ellipsis text-[#6f6f6f] font-medium font-['SF UI Text'] leading-tight">
                  {company.text}...
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col gap-4 justify-start items-center bg-white p-4 max-w-full shadow-[0px_0px_8px_rgba(0,0,0,0.4)] rounded-[7.08px] relative">
        {/* Navbar Section */}
        {selectedCompany && (
          <div className="flex items-center gap-4 w-full p-2 bg-white shadow-[0px_0px_8px_rgba(0,0,0,0.4)] rounded-[7.08px] ">
            <div className="self-stretch shadow-[0px_0px_8px_rgba(0,0,0,0.4)] rounded-[7.08px] border-[0.71px] border-[#EDEDED] flex  items-center gap-5">
              <img className="shadow-md rounded-md object-contain h-16 p-1 w-20" src={companies.find(c => c.id === selectedCompany)?.companyLogo} alt="Company Logo" />
            </div>
            <div className="flex flex-col justify-center w-full">
              <div className="flex text-[10px] sm:text-[14px] w-full overflow-hidden whitespace-nowrap text-ellipsis justify-between">
                <span className="text-gray-700 font-medium text-xs sm:text-sm">{companies.find(c => c.id === selectedCompany)?.name}</span>
                <span className="text-xl font-semibold text-blue-700"> ...
                </span>
              </div>
              <div className="flex flex-col justify-between w-full">

                <span className="text-[10px] sm:text-[14px]">{companies.find(c => c.id === selectedCompany)?.Time}</span>
              </div>
            </div>
          </div>
        )}

        {/* Job Details for Selected Company */}
        {selectedCompany && jobData[selectedCompany] && (
          <div className="flex gap-8 w-full h-full rounded-[7.08px] px-2 py-4 overflow-y-auto scrollbar-thin" style={{flexDirection: "column-reverse"}}>
            {jobData[selectedCompany].map((job) => (
              <div key={job.id} className="flex gap-3">
                <div>
                  <div className="self-stretch shadow-[0px_0px_8px_rgba(0,0,0,0.4)] rounded-[7.08px] border-[0.71px] border-[#EDEDED] flex justify-start items-center gap-5">
                    <img src={job.companyLogo} className="h-10 w-12 object-contain" alt={`${job.jobTitle} Logo`} />
                  </div>
                </div>

                {/* Meta Logo Outside Each Card */}
                <div className="sm:flex-row p-6 max-w-xl rounded-md border border-gray-200 -shadow h-full shadow-[0px_0px_8px_rgba(0,0,0,0.4)] rounded-[7.08px] border-[0.71px] border-[#EDEDED]"
                  style={{ background: 'white', borderRadius: 12, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', display: 'inline-flex' }} >
                  {/* Logo Section */}
                  <div className="self-stretch shadow-[0px_0px_8px_rgba(0,0,0,0.4)] rounded-[7.08px] border-[0.71px] border-[#EDEDED] flex  items-center gap-5"
                    style={{ padding: 10, background: '#F5F5F5', }}>
                    <img
                      src={job.companyLogo}
                      alt="Company Logo"
                      className="shadow-md rounded-md object-contain h-16 w-20"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{job.jobTitle}</h2>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="flex flex-col max-w-[500px] flex-grow pl-3 w-full">
                    <p className="text-sm max-w-xl  text-gray-600 mt-2">{job.jobDescription}</p>
                    {/* Meta Info (Only for the first card) */}
                    {job.id === 1 && (
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <img src={briefcase} alt="Briefcase Icon" className="w-4 h-4" />
                          <span>{job.experience} </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[12px]">|</span>
                          <img src={Experience} alt="Type Icon" className="w-4 h-4" />
                          <span> {job.type}</span>
                          <span className="text-[12px]">|</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-gray-500">₹</span>
                          {job.salary}
                        </div>
                      </div>
                    )}

                    {/* New Content for Card 3 */}
                    {job.id === 3 && (
                      <div className="flex flex-col mt-2 text-sm text-gray-500">
                        <div> 1 Salary Range: {job.salaryRange}</div>
                        <div> 2 Job Type: {job.jobType}</div>
                        <div> 3 Location: {job.location}</div>
                        <div>Agree: {job.agree}</div>
                      </div>
                    )}

                    {/* Button Section - Exclude button for 3rd card */}
                    {job.id !== 3 && (
                      <div className="mt-4 flex justify-end w-full">
                        <button
                          className="px-4 py-2 text-white"
                          style={{ background: 'linear-gradient(145deg, #002DBF 0%, #4396F7 7%, #FF9BD2 71%, #C9FFFC 99%)', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30, justifyContent: 'center', alignItems: 'center', gap: 6, display: 'inline-flex' }}
                        >
                          <img
                            src={job.icon}
                            alt="Icon"
                            className="w-4 h-4"
                          />
                          {job.buttonText}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>

        )}

        {/* Footer with Input Bar - Positioned at the Bottom */}
        <div className="w-full p-4 bg-white shadow-[0px_0px_8px_rgba(0,0,0,0.4)] rounded-[7.08px] flex items-center gap-4">
          <button
            className="text-xl"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <img src={Emoji} alt="" />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-16  w-full">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2 border rounded-[7.08px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message"
          />
          <button>
            <img src={Send} alt="" />
          </button>
        </div>
      </div>
    </div >
  );
};

export default DummyInterface;
