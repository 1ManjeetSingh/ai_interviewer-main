import React, { useState, useRef, useEffect } from 'react'

import image1 from '../../assets/image1.png';
import image2 from '../../assets/Aspireit.png';
import image3 from '../../assets/Ellipse 1872.svg';
import image4 from '../../assets/Type=Layila.svg';
import image5 from '../../assets/buttons-cta.svg';
import image6 from '../../assets/Profile picture.png';


//  ------------------ Piechart function ---------------
const HalfCircleChart = ({ percentage }) => {
    const radius = 54; // Radius of the circle
    const circumference = Math.PI * radius; // Circumference of the half-circle
    const dashOffset = circumference - (percentage / 100) * circumference; // Adjust to match percentage

    return (
        <div className="relative flex items-center justify-center w-32 h-16">
            {/* Foreground Gradient Half-Circle */}
            <svg
                width="180px"
                height="110%"
                viewBox="0 0 120 60" // Adjusted viewBox
                xmlns="http://www.w3.org/2000/svg"
                className="absolute"
            >
                <defs>
                    <linearGradient id="gradient">
                        <stop offset="0%" stopColor="#3E41B5" />
                        <stop offset="25%" stopColor="#9BFF9C" />
                        <stop offset="50%" stopColor="#F7DF43" />
                        <stop offset="100%" stopColor="#CD3232" />
                    </linearGradient>
                </defs>
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    transform="rotate(180, 60, 60)" // Rotating the path to start from 0 degrees
                />
            </svg>

            {/* Percentage Display */}
            <div className="absolute top-8 text-center text-[#0f0f36] text-2xl font-semibold font-['SF UI Text'] leading-normal">
                {percentage}%
            </div>
        </div>
    );
};

const AiInterview = () => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [isFocused1, setisFocused1] = useState(false);
    const inputRef = useRef(null);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isTranscriptVisible, setIsTranscriptVisible] = useState(false);

    const toggleTranscript = () => {
        setIsTranscriptVisible(!isTranscriptVisible);
    };

    const handlePlay = () => {
        videoRef.current.play();
        setIsPlaying(true);
    };


    const AssessmentData = [
        [{
            heading: 'Can you describe a time when you used design thinking to solve a complex problem, focusing on empathy and iteration?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            assessment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            level: 58,
        }],
        [{
            heading: 'Can you describe a time when you used design thinking to solve a complex problem, focusing on empathy and iteration?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            assessment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            level: 100,
        }]
    ];

    const [expandedStates, setExpandedStates] = useState(
        Array(AssessmentData.length).fill({ description: false, assessment: false })
    );

    const handleToggle = (index, field) => {
        setExpandedStates((prevStates) =>
            prevStates.map((state, i) =>
                i === index
                    ? { ...state, [field]: !state[field] }
                    : state
            )
        );
    };


    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
    };

    useEffect(() => {
        if (isFocused1 === false) {
            setSearchPhrase('');
        }
    }, [isFocused1]);

    return (
        <div>
            {/*------- Navbar --------- */}
            <div className="NavBar w-full h-full px-10 py-4 bg-white border border-[#D2D2D2] backdrop-blur-[220px] flex justify-between items-center hover:cursor-pointer">
                <div className="logo-container w-[130px] h-[46px] relative  bg-[#FFF]">
                    <div className="Rectangle7391 w-[130px] h-[46px] relative bg-[#0F0F36] rounded-[15px]" />
                    <div className="logo w-[100px] h-[30.22px] absolute left-[15px] top-[8px] bg-[#0F0F36] rounded-[15px] flex justify-center items-center" >
                        <img className="Aspireit w-[29.452px] h-[30.217px] bg-transparent shrink-0" src={image1} />
                        <img className="Group1000007770 bg-transparent w-[64.384px] h-[13.735px] shrink-0" src={image2} />
                    </div>
                </div>
                <div className="SearchBarContainer w-full flex grow justify-center items-center gap-4 bg-white">
                    <div className='InputContainer w-[90%] flex justify-start items-center gap-4 h-[48px] max-w-[657px] pl-6 pr-6 pt-4 pb-4 bg-[#EBEBEB] shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] rounded-[32px]' >
                        <div className='searchBar inline-flex items-center h-[34px] w-full max-w-[657px] bg-[#EBEBEB]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" className={`w-[22px] h-[22px] shrink-0 rounded-full mr-[8px] ${isFocused1 ? 'transform scale-105 transition-transform duration-300' : ''}`}   >
                                <path d="M9.49996 2.75C8.16495 2.75 6.85991 3.14588 5.74989 3.88757C4.63986 4.62927 3.7747 5.68347 3.26381 6.91686C2.75292 8.15026 2.61925 9.50745 2.8797 10.8168C3.14015 12.1262 3.78302 13.3289 4.72702 14.2729C5.67102 15.2169 6.87375 15.8598 8.18311 16.1202C9.49248 16.3807 10.8497 16.247 12.0831 15.7361C13.3165 15.2252 14.3707 14.3601 15.1124 13.25C15.854 12.14 16.2499 10.835 16.2499 9.49996C16.2498 7.70979 15.5386 5.99298 14.2728 4.72714C13.0069 3.46131 11.2901 2.75011 9.49996 2.75Z" stroke="#353535" strokeWidth="2" strokeMiterlimit="10" />
                                <path d="M14.666 14.668L18.3327 18.3346" stroke="#353535" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
                            </svg>
                            <input
                                className='justify-items-start px-2 w-full max-w-[657px] text-[#353535] pb-[10px] pt-[8px] text-[18px] leading-[18px] border-0 bg-[#EBEBEB] focus:outline-none focus:text-[#353535]'
                                onClick={focusInput}
                                type="text" name='searchBar'
                                value={isFocused1 ? searchPhrase : ''}
                                onChange={handleSearch}
                                onFocus={() => setisFocused1(true)}
                                onBlur={() => setisFocused1(false)}
                                placeholder={isFocused1 ? '|' : 'Search'}
                                ref={inputRef} />
                        </div>
                    </div>
                </div>

                <div className="Frame1000008205 flex justify-start items-center gap-6 w-fit bg-[#fff]" >
                    <div className="Frame1000008204 px-[16px] py-[4px] bg-[#EBEBEB] flex justify-start items-center shadow-[0px_0px_6px_rgba(0,_0,_0,_0.25)] rounded-[40px] backdrop-blur-[4px]">
                        <div className="ButtonsNotification w-[44px] h-[44px] mr-[16px] relative bg-[#EBEBEB]" >
                            <div className="Ellipse w-[44px] h-[44px] absolute left-0 top-0 bg-white rounded-full" />
                            <div className="IconsBell w-[24px] h-[24px] absolute left-[10px] top-[10px] bg-white hover:transform hover:scale-[1.05] hover:transition-transform hover:duration-300" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 6.50001C21 8.43001 19.43 10 17.5 10C15.57 10 14 8.43001 14 6.50001C14 4.57001 15.57 3.00001 17.5 3.00001C19.43 3.00001 21 4.57001 21 6.50001ZM19 11.79C18.5 11.92 18 12 17.5 12C16.0421 11.9974 14.6447 11.4171 13.6138 10.3862C12.583 9.3553 12.0026 7.95788 12 6.50001C12 5.03001 12.58 3.70001 13.5 2.71001C13.3185 2.48755 13.0897 2.30838 12.8302 2.18555C12.5707 2.06272 12.2871 1.99934 12 2.00001C10.9 2.00001 10 2.90001 10 4.00001V4.29001C7.03 5.17001 5 7.90001 5 11V17L3 19V20H21V19L19 17V11.79ZM12 23C13.11 23 14 22.11 14 21H10C10 21.5304 10.2107 22.0391 10.5858 22.4142C10.9609 22.7893 11.4696 23 12 23Z" fill="#0072DC" />
                                </svg>
                            </div>
                        </div>
                        <div className="Profile flex justify-end items-center bg-[#EBEBEB] hover:transform hover:scale-[1.05] hover:transition-transform hover:duration-300" >
                            <img className="AvatarPic w-[44px] min-w-[44px] h-[44px] bg-none rounded-full" src={image3} />
                        </div>
                    </div>
                    <div className="Ai w-[56px] h-[56px] bg-none" >
                        <img className="Layila min-w-[61px] h-[61px] bg-none rounded-full mt-[-2.5px] hover:transform hover:scale-[1.05] hover:transition-transform hover:duration-300" src={image4} />
                    </div>
                </div>
            </div>

            {/*------- Profile Card --------- */}
            <div className='flex flex-col pt-6 px-[50px]'>
                <div className="HeaderApplicantResults w-[full] flex-col justify-start items-start gap-4 inline-flex">
                    <div className="Profile self-stretch p-4 bg-white rounded-3xl shadow border border-[#b9b9b9] justify-start items-center gap-6 inline-flex">
                        <img className="ProfilePicture w-[114px] h-[114px] rounded-full" src={image6} />
                        <div className="Heading grow shrink basis-0 self-stretch flex-col justify-center items-start gap-4 inline-flex">
                            <div className="Text self-stretch text-[#1e1e1e] text-2xl font-semibold font-['SF UI  Text']">Aryan Sharma</div>
                            <div className='flex justify-between'>
                                <div className="ButtonsCta max-w-[200px] rounded-[30px] justify-start items-center gap-4 inline-flex hover:cursor-pointer" style={{ background: 'white' }}>
                                    <img src={image5} alt="" />
                                </div>
                                <div className="ButtonsCta h-12 px-9 bg-[#0071db] rounded-[30px] shadow justify-center max-w-[235px] items-center gap-2 inline-flex cursor-pointer">
                                    <div className="ButtonLabel text-center text-white text-lg font-semibold font-['SF UI  Text'] leading-[18px]">Finalize Candidate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='mt-4'/>
            </div>


            {/*------- Center Card --------- */}

            <div className='flex justify-between items-center px-[50px] py-6'>
                <div className="w-full gap-6">
                    <div>
                        <div className="w-full h-full flex justify-between items-center px-1">
                            <div className="text-black text-2xl font-bold leading-9 font-[SF UI Text] break-words">
                                AI Interview
                            </div>
                            <div className="ButtonsCta max-w-[249px] h-12 px-9 py-4 rounded-[30px] shadow border border-[#0071db] justify-center items-center gap-2 inline-flex">
                                {/* Show the icon only when isTranscriptVisible is false */}

                                <div
                                    onClick={toggleTranscript}
                                    className="flex justify-center items-center ButtonLabel text-center text-[#0071db] text-lg font-semibold font-['SF UI  Text'] leading-[36px] cursor-pointer"
                                >
                                    {/* Show the icon only when isTranscriptVisible is false */}
                                    {!isTranscriptVisible && (
                                        <svg className="AiIcon w-6 h-6 pl-[3px] mr-1 pt-px pb-[1.08px] justify-center items-center flex" width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="Icon">
                                                <path id="Star 3" d="M9.39635 5.41047C9.57679 4.92282 10.2665 4.92282 10.447 5.41047L11.974 9.53725C12.1442 9.9972 12.5068 10.3598 12.9668 10.53L17.0936 12.0571C17.5812 12.2375 17.5812 12.9273 17.0936 13.1077L12.9668 14.6347C12.5068 14.8049 12.1442 15.1676 11.974 15.6275L10.447 19.7543C10.2665 20.242 9.57679 20.242 9.39635 19.7543L7.8693 15.6275C7.6991 15.1676 7.33646 14.8049 6.87652 14.6347L2.74973 13.1077C2.26208 12.9273 2.26208 12.2375 2.74974 12.0571L6.87652 10.53C7.33646 10.3598 7.6991 9.9972 7.8693 9.53725L9.39635 5.41047Z" fill="#0072DC" />
                                                <path id="Star 4" d="M16.4871 14.1125C16.5773 13.8687 16.9222 13.8687 17.0124 14.1125L17.3128 14.9244C17.3412 15.001 17.4016 15.0615 17.4783 15.0898L18.2901 15.3903C18.534 15.4805 18.534 15.8253 18.2901 15.9156L17.4783 16.216C17.4016 16.2443 17.3412 16.3048 17.3128 16.3814L17.0124 17.1933C16.9222 17.4371 16.5773 17.4371 16.4871 17.1933L16.1867 16.3814C16.1583 16.3048 16.0979 16.2443 16.0212 16.216L15.2094 15.9156C14.9656 15.8253 14.9656 15.4805 15.2094 15.3902L16.0212 15.0898C16.0979 15.0615 16.1583 15.001 16.1867 14.9244L16.4871 14.1125Z" fill="#0072DC" />
                                                <path id="Star 6" d="M4.25292 1.41963C4.43337 0.931975 5.12309 0.931977 5.30354 1.41963L5.89955 3.03031C5.95628 3.18362 6.07716 3.3045 6.23047 3.36123L7.84115 3.95724C8.3288 4.13768 8.3288 4.82741 7.84115 5.00786L6.23047 5.60386C6.07716 5.66059 5.95628 5.78147 5.89955 5.93479L5.30354 7.54547C5.12309 8.03312 4.43337 8.03312 4.25292 7.54547L3.65692 5.93479C3.60019 5.78147 3.47931 5.66059 3.32599 5.60386L1.71531 5.00786C1.22766 4.82741 1.22766 4.13768 1.71531 3.95724L3.32599 3.36123C3.47931 3.3045 3.60019 3.18362 3.65692 3.03031L4.25292 1.41963Z" fill="#0072DC" />
                                                <path id="Star 5" d="M14.4904 3.73544L15.0625 5.2817C15.1476 5.51168 15.329 5.693 15.5589 5.77809L17.1052 6.35026L15.5589 6.92243C15.329 7.00753 15.1476 7.18885 15.0625 7.41882L14.4904 8.96508L13.9182 7.41882C13.8331 7.18885 13.6518 7.00753 13.4218 6.92243L11.8755 6.35026L13.4218 5.77809C13.6518 5.693 13.8331 5.51168 13.9182 5.2817L14.4904 3.73544Z" fill="#0072DC" />
                                                <path id="Star 7" d="M4.78247 15.9258C4.97957 15.7563 5.28121 15.9234 5.24195 16.1804L5.03431 17.5396C5.02197 17.6204 5.04554 17.7026 5.09884 17.7645L5.99548 18.8069C6.16502 19.004 5.99787 19.3056 5.74087 19.2664L4.38169 19.0587C4.30089 19.0464 4.21873 19.07 4.15676 19.1233L3.11439 20.0199C2.9173 20.1895 2.61565 20.0223 2.65491 19.7653L2.86255 18.4061C2.8749 18.3253 2.85132 18.2432 2.79802 18.1812L1.90139 17.1388C1.73185 16.9417 1.899 16.6401 2.156 16.6793L3.51518 16.887C3.59598 16.8993 3.67814 16.8758 3.7401 16.8225L4.78247 15.9258Z" fill="#0072DC" />
                                            </g>
                                        </svg>
                                    )}
                                    {isTranscriptVisible ? "Show Transcript" : "Show Transcript"}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full  p-4  rounded-lg">
                        <div
                            className={`flex w-full gap-6 ${isTranscriptVisible ? "flex-row" : "justify-center"
                                }`}
                        >
                            {/* Video Container */}
                            <div
                                className={`relative h-[333px] w-full max-w-[820px] aspect-video bg-black rounded-md flex items-center justify-center transition-all duration-300 ${isTranscriptVisible ? "w-[100%]" : "w-[50%]"
                                    }`}
                            >
                                {!isPlaying && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                                        <button
                                            onClick={handlePlay}
                                            className="flex items-center justify-center rounded-full w-16 h-16 bg-black border-4 border-gray-300 shadow-lg hover:opacity-80"
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
                                    className={`w-full h-full rounded-md ${!isPlaying ? "hidden" : ""}`}
                                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                                    controls
                                ></video>
                            </div>
                            {/* Transcript Container */}
                            {isTranscriptVisible && (
                                <div
                                    className="w-[50%] h-full  rounded-md overflow-auto"
                                    style={{ maxHeight: "400px" }}
                                >
                                    <div className="w-full h-full p-[24px] px-[32px] bg-white shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] rounded-[24px] border-[0.5px] border-[#464646] flex flex-col justify-start items-start overflow-y-auto  max-h-[333px]  scrollbar-custom">

                                        {/* Header Section with Title and Close Button */}
                                        <div className="w-full flex justify-between items-center mb-4">
                                            <div className="text-[#121212] text-[18px] font-[700] leading-[24px] break-words">Transcript</div>
                                            <div
                                                onClick={toggleTranscript}
                                                className="cursor-pointer hover:scale-110 transition-transform w-[18px]"
                                            >
                                                ✖
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="space-y-3 overflow-auto scrollbar-custom">
                                            <div className="flex gap-2">
                                                <div className="h-full w-[50px] px-2 py-1 bg-gray-100 shadow-sm shadow-purple-300 rounded border border-purple-400 inline-flex justify-start items-center">
                                                    <div className="text-black text-[12px] font-sans font-normal leading-[12px] break-words">00</div>
                                                    <div className="text-black text-[12px] font-sans font-normal leading-[12px] break-words">:</div>
                                                    <div className="text-black text-[12px] font-sans font-normal leading-[12px] break-words">07</div>
                                                </div>
                                                <div className="w-full text-[#1E1E1E] text-[12px] font-sans font-normal leading-[20px] break-words">
                                                    Hello, everyone. Thank you for joining us today.
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
            <div className="px-[48px] pb-8">
                {AssessmentData.map((dataGroup, index) => (
                    <div
                        key={index}
                        className="flex rounded-[24px] px-6 py-8 bg-[#FFF] shadow-lg mb-6"
                    >
                        <div className='flex pr-3 w-fit'>
                            <span className="flex justify-center items-center w-9 h-9 rounded-full border border-[#6f6f6f] text-[#6f6f6f]">
                                {index + 1}
                            </span>
                        </div>
                        {/* Question Section */}
                        <div>
                            <div className="mb-4">

                                <div className="Text text-[#6f6f6f] text-2xl font-semibold font-['SF UI  Text'] leading-7">
                                    {dataGroup[0].heading}
                                </div>
                                <div className="Text text-[#1e1e1e] text-base font-normal font-['SF UI  Text'] leading-normal py-2">
                                    {expandedStates[index].description
                                        ? dataGroup[0].description
                                        : `${dataGroup[0].description.slice(0, 300)}...`}

                                    <p className="ListItem text-[#0071db] text-lg font-semibold font-['SF UI  Text'] leading-[18px] py-1 cursor-pointer" onClick={() => handleToggle(index, "description")}>
                                        {expandedStates[index].description ? "View less" : "View more"} </p>

                                </div>

                            </div>

                            {/* Assessment Section */}
                            <div>
                                <div className="Text text-[#1e1e1e] text-2xl font-semibold font-['SF UI  Text'] leading-7">Assessment :</div>
                                <div className='flex'>
                                    <div className="Text text-[#1e1e1e] text-base font-semibold font-['SF UI  Text'] leading-normal py-2">
                                        {expandedStates[index].assessment
                                            ? dataGroup[1].assessment
                                            : `${dataGroup[1].assessment.slice(0, 300)}...`}
                                        <p
                                            className="ListItem text-[#0071db] text-lg font-semibold font-['SF UI  Text'] leading-[18px] py-1 cursor-pointer"
                                            onClick={() => handleToggle(index, "assessment")}
                                        >
                                            {expandedStates[index].assessment ? "View less" : "View more"}
                                        </p>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="flex justify-center w-[142px] items-center relative mx-8">
                                        <div className="absolute inset-0 flex items-start justify-center">
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
    )
}

export default AiInterview;