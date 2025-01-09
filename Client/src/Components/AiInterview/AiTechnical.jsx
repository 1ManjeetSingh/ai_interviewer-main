import React, { useState, useRef, useEffect } from 'react'
import { Editor } from "@monaco-editor/react";

import image1 from '../../assets/image1.png';
import image2 from '../../assets/Aspireit.png';
import image3 from '../../assets/Ellipse 1872.svg';
import image4 from '../../assets/Type=Layila.svg';
import image5 from '../../assets/buttons-cta.svg';
import image6 from '../../assets/Profile picture.png';
import CodeEditor from '../navbar/CodeEditor';


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

const AiTechnical = () => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [isFocused1, setisFocused1] = useState(false);
    const inputRef = useRef(null);

    const AssessmentData = [
        [{
            heading: 'You are developing a system for a bookstore to manage its inventory. The bookstore has a unique way of organizing books: they are arranged in a circular queue, where the front of the queue connects back to the rear. Each book in the queue has a title and a price. The store owner wants to implement a feature that finds the most expensive book within a given range of the queue, considering its circular nature.  Write a function that takes the circular queue of books, a start position, and the number of books to consider, and returns the title of the most expensive book within that range.',
            input: 'Queue:    [{‘The Hobbit’  , 15}, (‘1984’  ,   10),    (‘To Kill a Mockingbird’, 12), (‘Pride and Prejudice’, 9)  ,  ( ‘The Great Gatsby’  ,  11} ] ,  Start:  2,  Range:  4.',
            output: 'The Hobbit',
            explanation: 'Starting from ‘To Kill a Mockingbird’, considering 4 books, we wrap around to ‘The Hobbit’, which is the most expensive is $15.',
        },
        {
            assessment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            level: 58,
        }],
        [{
            heading: 'You are developing a system for a bookstore to manage its inventory. The bookstore has a unique way of organizing books: they are arranged in a circular queue, where the front of the queue connects back to the rear. Each book in the queue has a title and a price. The store owner wants to implement a feature that finds the most expensive book within a given range of the queue, considering its circular nature.  Write a function that takes the circular queue of books, a start position, and the number of books to consider, and returns the title of the most expensive book within that range.',
            input: 'Queue:    [{‘The Hobbit’  , 15}, (‘1984’  ,   10),    (‘To Kill a Mockingbird’, 12), (‘Pride and Prejudice’, 9)  ,  ( ‘The Great Gatsby’  ,  11} ] ,  Start:  2,  Range:  4.',
            output: 'The Hobbit',
            explanation: 'Starting from ‘To Kill a Mockingbird’, considering 4 books, we wrap around to ‘The Hobbit’, which is the most expensive is $15.',
        },
        {
            assessment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            level: 100,
        }]
    ];

    const [isExpanded, setIsExpanded] = useState(false); // Track if the editor is expanded
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("python");
    const [tempLanguage, setTempLanguage] = useState("python");
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const codeEditorRef = useRef("");

    const toggleExpand = () => {
        setIsExpanded((prevState) => !prevState); // Toggle the editor size
    };

    useEffect(() => {
        const fetchLanguages = async () => {
            const monaco = await import("monaco-editor");
            const availableLanguages = monaco.languages.getLanguages().map((lang) => ({
                label: lang.id,
                value: lang.id,
            }));
            setLanguages(availableLanguages);

            if (availableLanguages.some((lang) => lang.value === "python")) {
                setSelectedLanguage("python");
            }
        };

        fetchLanguages();
    }, []);


    const [expandedStates, setExpandedStates] = useState(
        Array(AssessmentData.length).fill({ assessment: false })
    );

    const handleToggle = (index, field) => {
        setExpandedStates((prevStates) =>
            prevStates.map((state, i) =>
                i === index ? { ...state, [field]: !state[field] } : state
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
                        <div className="w-full h-full flex justify-start items-center px-1">
                            <div className="text-black text-2xl font-bold leading-9 font-[SF UI Text] break-words">
                                AI Technical
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/*------- Question Card --------- */}
            <div className="px-[48px] pb-8">
                {AssessmentData.map((dataGroup, index) => (
                    <div
                        key={index}
                        className="pb-8"
                    >
                        <div className="flex rounded-[24px] px-6 py-8 bg-[#FFF] shadow-lg">
                            <div className='flex pr-3 w-fit'>
                                <span className="flex justify-center items-center w-11 h-11 rounded-full border border-[#6f6f6f] text-[#6f6f6f] text-2xl">
                                    {index + 1}
                                </span>
                            </div>
                            {/* Question Section */}
                            <div>
                                <div>

                                    <div className="Text text-[#6f6f6f] text-2xl font-semibold font-['SF UI Text'] leading-7">
                                        {dataGroup[0].heading}
                                    </div>
                                    <div className="Text text-[#0f0f36] text-xl font-semibold font-['SF UI  Text'] leading-normal pt-6">Example:</div>
                                    <div className="Text text-[#0f0f36] text-xl font-semibold font-['SF UI Text'] leading-normal pt-2">
                                        Input: {dataGroup[0].input}
                                    </div>
                                    <div className="Text text-[#0f0f36] text-xl font-semibold font-['SF UI Text'] leading-normal pt-2">
                                        Output: {dataGroup[0].output}
                                    </div>
                                    <div className="Text text-[#0f0f36] text-xl font-semibold font-['SF UI Text'] leading-normal pt-2">
                                        Explanation: {dataGroup[0].explanation}
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="flex flex-1 bg-none py-4 ">
                            {/* Left side code editor container */}
                            <div className={`w-[100%]  rounded-3xl p-6 relative shadow-lg rounded-[30px] border border-black bg-[black]  backdrop-blur-[5px] ${isExpanded ? 'h-[90vh]' : 'h-[35vh]'}`}>
                                <div className="flex justify-between items-center ">
                                    <div className="flex">
                                        <h2 className=" text-[18px] w-fit font-semibold text-white">Language:</h2>
                                        <select
                                            value={selectedLanguage}
                                            onChange={(e) => setSelectedLanguage(e.target.value)}
                                            className="max-w-[96px] scrollbar-custom text-white bg-[#1E1E1E] outline-none font-normal text-[18px] border border-black bg-[rgba(15,15,15,0.82)] backdrop-blur-[5px] w-auto  "
                                        >
                                            {languages.map((lang) => (
                                                <option key={lang.value} value={lang.value} className="text-[18px]">
                                                    {lang.label.charAt(0).toUpperCase() + lang.label.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="h-[48px] max-w-[189px] px-2 shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] rounded-[30px] border-[2px] border-[#0072DC] flex justify-center items-center gap-2.5 cursor-pointer">
                                        <div onClick={toggleExpand} className="text-center text-[#0072DC] text-[18px] font-semibold leading-[36px] font-[SF_UI_Text] break-words">
                                            {isExpanded ? "Collapse Code" : "Expand Code"}
                                        </div>
                                    </div>

                                </div>
                                <div className="h-full py-8">
                                    <Editor
                                        height="100%"
                                        language={selectedLanguage}
                                        defaultValue={"// Write your code here..."}
                                        theme="vs-dark"
                                        className="custom-monaco-editor"  // Custom class for background styling
                                        onMount={(editor) => {
                                            codeEditorRef.current = editor;
                                            const currentValue = editor.getValue();
                                            const lines = currentValue.split("\n");
                                            const nextLine = lines.length + 1;
                                            editor.setPosition({ lineNumber: nextLine, column: 1 });
                                            editor.focus();
                                        }}
                                        options={{
                                            minimap: { enabled: false },
                                            scrollbar: { vertical: "hidden", horizontal: "hidden" },
                                        }}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Language Change Popup */}
                        {
                            isPopupVisible && (
                                <div className=" fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-black bg-opacity-50 rounded-lg ">
                                    <div className="bg-white p-5 rounded-lg text-center">
                                        <h3>Are you sure you want to change the language?</h3>
                                        <div className="mt-4">
                                            <button
                                                onClick={() => setIsPopupVisible(false)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                                            >
                                                Yes
                                            </button>
                                            <button
                                                onClick={() => setIsPopupVisible(false)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                            >
                                                No
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {/* Assessment Section */}

                        <div className="flex rounded-[24px] px-6 py-8 bg-[#FFF] shadow-lg mb-6">
                            <div>
                                <div className="text-[#1e1e1e] text-2xl font-semibold leading-7">
                                    Assessment:
                                </div>
                                <div className="flex">
                                    <div className="text-[#1e1e1e] text-base font-semibold leading-normal py-2">
                                        {expandedStates[index].assessment
                                            ? dataGroup[1].assessment
                                            : `${dataGroup[1].assessment.slice(0, 300)}...`}
                                        <p
                                            className="text-[#0071db] text-lg font-semibold leading-[18px] py-1 cursor-pointer"
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

export default AiTechnical;