import React, { useState } from "react";

const ProfileSection = ({ data }) => {
  const [isCandidateSelected, setIsCandidateSelected] = useState(false);

  return (
    <div className="flex flex-col pt-6 px-24 max-md:px-5 max-w-[1224px] mx-auto">
      <div className="HeaderApplicantResults w-full flex-col justify-start items-start gap-4 inline-flex mx-auto">
        <div className="Profile self-stretch py-6 px-8 bg-white rounded-3xl shadow">
          <div className="gap-6 justify-start items-center inline-flex">
            <img
              className="ProfilePicture w-[88px] h-[88px] rounded-full"
              src={data.image}
            />
            <div className="Heading grow shrink basis-0 self-stretch flex-col justify-center items-start gap-[8px] inline-flex">
              <div className="Text self-stretch text-[#1e1e1e] text-[24px] font-semibold font-['SF UI  Text']">
                {data.name}
              </div>
              <div className="text-[#6f6f6f] text-[16px] font-normal font-['SF UI  Text'] leading-none pl-1">
                {data.title}
              </div>
              <div className="flex w-full justify-between items-center mt-[4px]">
                <button
                  className="relative pointer-events-auto overflow-hidden rounded-full opacity-100 flex items-center gap-2"
                  style={{
                    padding: "10px 20px",
                    background: "white",
                    border: "none", // Remove default borders
                  }}
                >
                  <img src="./aiicon.png" alt="ai icon" />
                  <span
                    style={{ position: "relative", zIndex: 2 }}
                    className="text-[14px] text-transparent bg-clip-text bg-button-text"
                  >
                    AI Summary
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
            </div>
          </div>
          <div>
            <div className="flex justify-between pt-[3vh] max-[950px]:gap-6 flex-wrap">
              <div className=" px-7 py-2 rounded-3xl flex-col justify-start items-start gap-[16px] inline-flex">
                <div className="self-stretch px-1 justify-start items-center gap-2 inline-flex">
                  <div className="grow shrink basis-0 text-[#282828] text-[18px] font-semibold font-['SF UI  Text'] leading-[18px]">
                    About
                  </div>
                </div>
                <div className="self-stretch flex-col justify-start items-start gap-1 flex max-[950px]:flex-row max-[950px]:gap-5 max-[950px]:flex-wrap">
                  <div className="self-stretch justify-start items-center gap-1 inline-flex">
                    <div className="py-1 justify-start items-center gap-4 flex">
                      <svg
                        width="24"
                        height="32"
                        viewBox="0 0 24 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 23V9.70046C3 9.27995 3.26307 8.90437 3.65826 8.76067L13.3291 5.24398C13.5886 5.14961 13.8755 5.28349 13.9699 5.54301C13.9898 5.59778 14 5.65561 14 5.71388V10.6667L20.3162 12.7721C20.7246 12.9082 21 13.2904 21 13.7208V23H22C22.5523 23 23 23.4477 23 24V24C23 24.5523 22.5523 25 22 25H2C1.44772 25 1 24.5523 1 24V24C1 23.4477 1.44772 23 2 23H3ZM5 23H12V7.85543L5 10.4009V23ZM19 23V14.4416L14 12.7749V23H19Z"
                          fill="#0072DC"
                        />
                      </svg>

                      <span className="text-[#6f6f6f] text-[16px] font-normal font-['SF UI  Text'] leading-none inline-flex">
                        Company&nbsp;:
                      </span>
                    </div>
                    <div className="grow shrink basis-0 text-[#1e1e1e] text-[16px] font-normal font-['SF UI  Text'] leading-none">
                      {data.company}
                    </div>
                  </div>
                  <div className="self-stretch justify-start items-center gap-1 inline-flex">
                    <div className="py-1 justify-start items-center gap-4 flex">
                      <svg
                        width="24"
                        height="32"
                        viewBox="0 0 24 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 23V9.70046C3 9.27995 3.26307 8.90437 3.65826 8.76067L13.3291 5.24398C13.5886 5.14961 13.8755 5.28349 13.9699 5.54301C13.9898 5.59778 14 5.65561 14 5.71388V10.6667L20.3162 12.7721C20.7246 12.9082 21 13.2904 21 13.7208V23H22C22.5523 23 23 23.4477 23 24V24C23 24.5523 22.5523 25 22 25H2C1.44772 25 1 24.5523 1 24V24C1 23.4477 1.44772 23 2 23H3ZM5 23H12V7.85543L5 10.4009V23ZM19 23V14.4416L14 12.7749V23H19Z"
                          fill="#0072DC"
                        />
                      </svg>

                      <span className="text-[#6f6f6f] text-[16px] font-normal font-['SF UI Text'] leading-none inline-flex">
                        Experience&nbsp;:
                      </span>
                    </div>
                    <div className="grow shrink basis-0 text-[#1e1e1e] text-[16px] font-normal font-['SF UI  Text'] leading-none">
                      {data.experience}
                    </div>
                  </div>
                  <div className="self-stretch justify-start items-center gap-1 inline-flex">
                    <div className="py-1 justify-start items-center gap-4 flex">
                      <svg
                        width="24"
                        height="32"
                        viewBox="0 0 24 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 8H4V6H20V8H18V10C18 11.6154 17.1838 12.9147 16.1561 13.9767C15.4532 14.703 14.598 15.372 13.7309 16C14.598 16.628 15.4532 17.297 16.1561 18.0233C17.1838 19.0853 18 20.3846 18 22V24H20V26H4V24H6V22C6 20.3846 6.81616 19.0853 7.8439 18.0233C8.54682 17.297 9.40202 16.628 10.2691 16C9.40202 15.372 8.54682 14.703 7.8439 13.9767C6.81616 12.9147 6 11.6154 6 10V8ZM8 8V10C8 10.8846 8.43384 11.7103 9.2811 12.5858C10.008 13.337 10.9548 14.0398 12 14.7781C13.0452 14.0398 13.992 13.337 14.7189 12.5858C15.5662 11.7103 16 10.8846 16 10V8H8ZM12 17.2219C10.9548 17.9602 10.008 18.663 9.2811 19.4142C8.43384 20.2897 8 21.1154 8 22V24H16V22C16 21.1154 15.5662 20.2897 14.7189 19.4142C13.992 18.663 13.0452 17.9602 12 17.2219Z"
                          fill="#0072DC"
                        />
                      </svg>

                      <span className="text-[#6f6f6f] text-[16px] font-normal font-['SF UI  Text'] leading-none inline-flex">
                        Location&nbsp;:
                      </span>
                    </div>
                    <div className="grow shrink basis-0 text-[#1e1e1e] text-[16px] font-normal font-['SF UI  Text'] leading-none">
                      {data.location}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-7 py-2 rounded-3xl flex-col justify-start items-start gap-[16px] inline-flex">
                <div className="self-stretch px-1 justify-start items-center gap-2 inline-flex">
                  <div className="grow shrink basis-0 text-[#282828] text-[18px] font-semibold font-['SF UI  Text'] leading-[18px]">
                    Skills
                  </div>
                </div>
                <div className="self-stretch justify-start items-start gap-2 flex flex-wrap">
                  {data.skills.map((skill, index) => (
                    <div
                      className="px-3 py-2 bg-neutral-100 rounded shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border border-[#0072dc] justify-start items-center gap-2 flex"
                      key={index}
                    >
                      <div className="text-black text-[16px] font-normal font-['SF UI  Text'] leading-none">
                        {skill}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-end px-7 py-2">
                <div
                  className="ButtonsCta py-4 px-9 bg-[#0071db] rounded-[30px] shadow justify-center max-w-[235px] items-center gap-2 inline-flex cursor-pointer"
                  onClick={() => setIsCandidateSelected(!isCandidateSelected)}
                >
                  <div className="ButtonLabel text-center inline-flex">
                    {isCandidateSelected ? (
                      <>
                        <span className="text-white text-[18px] font-['SF UI  Text'] leading-[18px]">
                          Schedule&nbsp;
                        </span>
                        <span className="text-white text-[18px] font-['SF UI  Text'] leading-[18px]">
                          Interview
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-white text-[18px] font-['SF UI  Text'] leading-[18px]">
                          Finalize&nbsp;
                        </span>
                        <span className="text-white text-[18px] font-['SF UI  Text'] leading-[18px]">
                          Candidate
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
