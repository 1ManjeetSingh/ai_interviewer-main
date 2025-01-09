import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import MagicIcon from "../assets/magicIcon.svg";
import WhiteMagicIcon from "../assets/whiteMagicIcon.svg";
import aiLogo from "../assets/ai-logo.png";
import SkillDisplay from "../Components/skillDisplay";
import Filter from "../assets/blueFilter.svg";
import Meta from "../assets/meta-logo.png";
import Sanjay from "../assets/sanjay.jpeg";
import Mukesh from "../assets/mukesh.jpeg";
import Debaleena from "../assets/debaleena.jpg";
import Manjeet from "../assets/manjeet.jpeg";
import Priyansh from "../assets/priyansh.jpg";
import Bieden from "../assets/bieden.jpeg";
import Joe from "../assets/joe.jpeg";
import Rajan from "../assets/rajan.jpg";
import Edwin from "../assets/edwin.jpg";
import Joseph from "../assets/joseph.jpg";
import Raj from "../assets/raj.jpg";
import Sundar from "../assets/sundar pitchai.jpg";
import Location from "../assets/location.svg";
import Briefcase from "../assets/briefcase.svg";
import Securitytime from "../assets/securitytime.svg";
import backgroundImage1 from "../assets/Rectangle 7522.png";
import whiteArrow from "../assets/whiteDownArrow.svg";
import Rupees from "../assets/rupees.svg";

import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import ReactPaginate from "react-paginate";

const candidates = [
    {
        date: "23 Aug / 2024",
        name: "Sanjay",
        role: "UI/UX Designer",
        experience: "2 Years",
        company: "Google",
        location: "Bangalore",
        profile: Sanjay,
        skills: [
            "User Research",
            "Figma",
            "Photoshop",
            "Framer",
            "Illustrator",
            "Sketch",
            "Adobe XD",
            "InVision",
        ],
        score: 985,
    },
    {
        date: "24 Aug / 2024",
        name: "John Doe",
        role: "Frontend Developer",
        experience: "3 Years",
        company: "Microsoft",
        location: "Hyderabad",
        profile: Mukesh,
        skills: ["HTML", "CSS", "JavaScript", "React", "Angular", "TypeScript"],
        score: 878,
    },
    {
        date: "25 Aug / 2024",
        name: "Alice Brown",
        role: "Product Manager",
        experience: "5 Years",
        company: "Amazon",
        location: "Chennai",
        profile: Manjeet,
        skills: ["Roadmapping", "Agile", "Scrum", "Leadership", "JIRA"],
        score: 892,
    },
    {
        date: "26 Aug / 2024",
        name: "Debaleena",
        role: "Backend Developer",
        experience: "4 Years",
        company: "Meta",
        location: "Delhi",
        profile: Debaleena,
        skills: ["Node.js", "Python", "Django", "MongoDB", "SQL", "Redis"],
        score: 788,
    },
    {
        date: "27 Aug / 2024",
        name: "Sophia Zhang",
        role: "Data Scientist",
        experience: "3 Years",
        company: "Apple",
        location: "Pune",
        profile: Priyansh,
        skills: [
            "Python",
            "Machine Learning",
            "Data Visualization",
            "Pandas",
            "NumPy",
        ],
        score: 575,
    },
    {
        date: "28 Aug / 2024",
        name: "Michael Johnson",
        role: "DevOps Engineer",
        experience: "6 Years",
        company: "Netflix",
        location: "Mumbai",
        profile: Bieden,
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
        score: 395,
    },
    {
        date: "29 Aug / 2024",
        name: "Isabella Williams",
        role: "Mobile App Developer",
        experience: "2 Years",
        company: "Spotify",
        location: "Kolkata",
        profile: Joe,
        skills: ["Swift", "Kotlin", "React Native", "UI Testing", "Firebase"],
        score: 482,
    },
    {
        date: "30 Aug / 2024",
        name: "Chris Taylor",
        role: "Cybersecurity Specialist",
        experience: "5 Years",
        company: "Tesla",
        location: "Gurgaon",
        profile: Rajan,
        skills: [
            "Network Security",
            "Penetration Testing",
            "Encryption",
            "Firewall",
        ],
        score: 490,
    },
    {
        date: "31 Aug / 2024",
        name: "Emma Watson",
        role: "Cloud Engineer",
        experience: "4 Years",
        company: "IBM",
        location: "Ahmedabad",
        profile: Edwin,
        skills: ["Azure", "AWS", "GCP", "Serverless", "Cloud Security"],
        score: 385,
    },
    {
        date: "01 Sep / 2024",
        name: "Liam Patel",
        role: "AI Engineer",
        experience: "3 Years",
        company: "OpenAI",
        location: "Noida",
        profile: Joseph,
        skills: ["Deep Learning", "PyTorch", "TensorFlow", "NLP", "GANs"],
        score: 572,
    },
    {
        date: "02 Sep / 2024",
        name: "Olivia Martinez",
        role: "Game Developer",
        experience: "2 Years",
        company: "Ubisoft",
        location: "Bangalore",
        profile: Raj,
        skills: ["Unity", "Unreal Engine", "C#", "Game Physics", "3D Modeling"],
        score: 480,
    },
    {
        date: "03 Sep / 2024",
        name: "Ethan White",
        role: "Blockchain Developer",
        experience: "4 Years",
        company: "Coinbase",
        location: "Hyderabad",
        profile: Sundar,
        skills: [
            "Smart Contracts",
            "Solidity",
            "Ethereum",
            "Cryptography",
            "Web3.js",
        ],
        score: 391,
    },
];

const getScoreBackground = (score) => {
    if (score >= 900 && score <= 1000) {
        return "linear-gradient(to bottom right, #856220 0%, #F4E683 28%, #BF923D 50%, #4E341B 75%, #F1EA82 100%)";
    } else if (score >= 800 && score < 900) {
        return "linear-gradient(to bottom right, #3A3A3A 0%, #A4A4A4 18%, #606060 31%, #CECECE 49%, #8F8F8F 62%, #464646 79%, #696969 95%)";
    } else if (score >= 700 && score < 800) {
        return "linear-gradient(to bottom right, #BC6554 0%, #62362D 20%, #A1503D 40%, #CA7561 49%, #E2AA9D 67%, #62362D 83%, #AA5946 95%)";
    }
    return "none";
};
const getCardGradient = (score) => {
    if (score >= 900 && score <= 1000) {
        return "shadow-[inset_0px_0px_20px_0px_#CD7B684D]";
    } else if (score >= 800 && score < 900) {
        return "shadow-[0px_0px_20px_0px_#A7A7A74D_inset]";
    } else if (score >= 700 && score < 800) {
        return "shadow-[0px_0px_20px_0px_#CD7B684D_inset]";
    }
    return "none";
};

const ApplicantsPool = () => {
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [summaryVisible, setSummaryVisible] = useState({});
    const [loadingSummary, setLoadingSummary] = useState({});
    const [showSkillScore, setShowSkillScore] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [tableBGColor, setTableBGColor] = useState(false);
    const [tableScore, setTableScore] = useState(false);
    const [buttonRotation, setButtonRotation] = useState(0);
    const [candidateRotations, setCandidateRotations] = useState({});
    const buttonGradientRef = useRef(null);
    const candidateGradientRefs = useRef({});
    const buttonAnimationFrame = useRef(null);
    const candidateAnimationFrames = useRef({});
    const [isShadowVisible, setIsShadowVisible] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedRange, setSelectedRange] = useState(null);
    const [currentCandidates, setCurrentCandidates] = useState(
        candidates.slice(currentPage * 10, (currentPage + 1) * 10)
    );

    const pageCount = Math.ceil(candidates.length / 10);

    const handleCheckboxChange = (idx) => {
        setSelectedCandidates((prevSelected) => {
            if (prevSelected.includes(idx)) {
                return prevSelected.filter((selectedIdx) => selectedIdx !== idx);
            } else {
                return [...prevSelected, idx];
            }
        });
    };

    const handleMenuClick = (range) => {
        setSelectedRange(range);
        setIsDropdownVisible(false);

        // Filter candidates based on the selected range
        const filteredCandidates = candidates.filter((candidate) => {
            if (range === "gold") return candidate.score >= 900;
            if (range === "silver")
                return candidate.score >= 800 && candidate.score < 900;
            if (range === "bronze")
                return candidate.score >= 700 && candidate.score < 800;
            if (range === "601-700")
                return candidate.score >= 601 && candidate.score < 700;
            if (range === "501-600")
                return candidate.score >= 501 && candidate.score < 600;
            if (range === "401-500")
                return candidate.score >= 401 && candidate.score < 500;
            if (range === "301-400")
                return candidate.score >= 301 && candidate.score < 400;
            if (range === "201-300")
                return candidate.score >= 201 && candidate.score < 300;
            return true; // Default case if range doesn't match
        });

        setCurrentCandidates(filteredCandidates);
    };
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible); // Make sure the dropdown becomes visible when hovering over the button
    };

    const handleSelectAllChange = () => {
        if (isAllSelected) {
            setSelectedCandidates([]);
        } else {
            const allCandidateIndices = currentCandidates.map((_, idx) => idx);
            setSelectedCandidates(allCandidateIndices);
        }
        setIsAllSelected(!isAllSelected);
    };

    const isAnyCheckboxSelected = selectedCandidates.length > 0;

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const toggleSummary = (idx) => {
        setSummaryVisible((prev) => ({
            ...prev,
            [idx]: !prev[idx],
        }));

        if (!summaryVisible[idx]) {
            setLoadingSummary((prev) => ({
                ...prev,
                [idx]: true,
            }));

            setTimeout(() => {
                setLoadingSummary((prev) => ({
                    ...prev,
                    [idx]: false,
                }));
            }, 2000);
        }
    };

    const animateButton = () => {
        setButtonRotation((prev) => (prev + 1) % 360);
        buttonAnimationFrame.current = requestAnimationFrame(animateButton);
    };

    const animateCandidate = (idx) => {
        setCandidateRotations((prev) => ({
            ...prev,
            [idx]: ((prev[idx] || 0) + 1) % 360,
        }));
        candidateAnimationFrames.current[idx] = requestAnimationFrame(() =>
            animateCandidate(idx)
        );
    };

    const handleSkillScoreClick = () => {
        if (isAnimating) return;

        if (showSkillScore) {
            setShowSkillScore(false);
            setTableScore(false);
            setTableBGColor(false);
            cancelAnimationFrame(buttonAnimationFrame.current);
            setButtonRotation(0);
            setCurrentCandidates(
                candidates.slice(currentPage * 10, (currentPage + 1) * 10)
            );
        } else {
            setIsAnimating(true);
            setShowSkillScore(true);
            setTableScore(false);
            setTableBGColor(true);
            animateButton();
            currentCandidates.forEach((_, idx) => animateCandidate(idx));
            setTimeout(() => {
                setIsAnimating(false);
                setShowSkillScore(true);
                setTableScore(true);
                setTableBGColor(false);
                Object.values(candidateAnimationFrames.current).forEach(
                    cancelAnimationFrame
                );
                setCandidateRotations({});
            }, 3000);
        }
        setIsShadowVisible(!isShadowVisible);

        console.log(showSkillScore);
    };

    useEffect(() => {
        return () => {
            cancelAnimationFrame(buttonAnimationFrame.current);
            Object.values(candidateAnimationFrames.current).forEach(
                cancelAnimationFrame
            );
        };
    }, []);

    return (
        <div className="bg-[#F2F2F2] h-full py-5 max-[520px]:py-0">
            <div className="w-full mx-auto">
                <div className="flex justify-between bg-gray-100 p-4 rounded-lg px-8 max-[520px]:px-4 h-[32%] mx-auto max-xl:flex-col max-xl:gap-8">
                    <div className="w-full xl:w-[68%] flex flex-col border border-white bg-white p-4 rounded-[15px] justify-between mb-4 md:mb-0 max-md:gap-8">
                        <div className="flex justify-between h-[40%] max-md:flex-col max-md:gap-6 ">
                            <div className="w-full md:w-3/5 ">
                                <div className="flex gap-4 h-full max-[520px]:flex-col">
                                    <div className="flex items-center">
                                        <img
                                            src={Meta}
                                            alt="Company Logo"
                                            className="w-full h-full max-[520px]:w-[100px] max-[520px]:h-[100px]"
                                        />
                                    </div>
                                    <div className="">
                                        <h2 className="text-[24px] font-bold text-[#2D2D2D]">
                                            UI/UX Designer
                                        </h2>
                                        <p className="flex text-[16px] font-medium text-[#787878]">
                                            Meta |
                                            <img
                                                className="h-[14px] w-[14px] mt-2 ml-1 mr-1"
                                                src={Location}
                                                alt=""
                                            />{" "}
                                            Noida
                                        </p>
                                        <div className="flex items-center">
                                            <img
                                                className="h-[18px] w-[18px]"
                                                src={Briefcase}
                                                alt=""
                                            />
                                            <span className="text-[16px] font-medium text-[#747474] ml-[2px]">
                                                2 years
                                            </span>
                                            <span className="mx-2 h-[15px] border border-l border-[#BCB4B4]"></span>
                                            <img
                                                className="h-[18px] w-[18px] mr-1"
                                                src={Securitytime}
                                                alt=""
                                            />
                                            <span className="text-[16px] font-medium text-[#747474]">
                                                Fulltime
                                            </span>
                                            <span className="mx-2 h-[15px] border border-l border-[#BCB4B4]"></span>
                                            <img
                                                className="h-[18px] w-[9px] mr-1"
                                                src={Rupees}
                                                alt=""
                                            />
                                            <span className="text-[16px] font-medium text-[#747474]">
                                                3 - 5 LPA
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 ">
                                <button className="p-3 rounded-[10px] border border-[#0072DC] text-[16px] font-medium text-[#0072DC]">
                                    View Details
                                </button>
                                <button className="p-3 rounded-[10px] text-[16px] font-medium bg-[#C4C4C4] text-white cursor-not-allowed">
                                    Position Closed
                                </button>
                            </div>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-[16px] font-medium">Key Skills:</h3>
                            <div className="flex flex-wrap mt-2 max-sm:gap-2">
                                <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-[8px] px-[5px] rounded-lg mr-[4px] ">
                                    User Research
                                </span>
                                <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-[8px] px-[5px] rounded-lg mr-[4px] ">
                                    Figma
                                </span>
                                <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-[8px] px-[5px] rounded-lg mr-[4px] ">
                                    Framer
                                </span>
                                <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-[8px] px-[5px] rounded-lg mr-[4px] ">
                                    Photoshop
                                </span>
                                <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-[8px] px-[5px] rounded-lg mr-[4px] ">
                                    UX
                                </span>
                                <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-[8px] px-[5px] rounded-lg mr-[4px] ">
                                    Information Architecture
                                </span>
                                <span className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-[8px] px-[5px] rounded-lg mr-[4px] ">
                                    Visual Design
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-[30%]  flex flex-col max-xl:flex-row gap-8 max-[860px]:flex-col justify-center">
                        <div
                            className="px-[27px] py-[26px] rounded-[10px] flex justify-between items-center h-[55%] max-xl:h-[130px] w-full"
                            style={{
                                backgroundImage: `url(${backgroundImage1})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div>
                                <h3 className="ml-1 text-[16px] font-semibold text-[#333232]">
                                    Total Candidate
                                </h3>
                                <p className="ml-1 text-[14px] text-[#A09E9E] font-medium">
                                    For the entire period
                                </p>
                            </div>
                            <p className="text-[36px] font-semibold mr-2">1200+</p>
                        </div>
                    </div>
                </div>

                <div className="px-10 justify-between mt-[27px] h-[68%]">
                    <p className="font-semibold text-[24px] Inter">Candidate List</p>
                    <div className="justify-between flex max-lg:flex-col gap-5">
                        <div className="mt-2 flex relative gap-4 flex-wrap">
                            <input
                                type="text"
                                className="outline-none rounded-full h-[44px] w-[350px] placeholder:text-[#353535] text-[16px] pl-[60px] text-[#353535] shadow-[0px_0px_2px_0px_#00000040] max-lg:w-full"
                                placeholder="Search Candidates"
                            />
                            <CiSearch
                                className="absolute mt-[12px] ml-[26.5px] text-[19px] w-7 h-7"
                            />
                            <div className="relative flex">
                                <div
                                    className={`relative z-10  border border-white h-[44px] justify-center flex items-center rounded-[24px] text-[16px] cursor-pointer transition-all duration-300 overflow-hidden ${showSkillScore
                                        ? "text-white w-[191px]"
                                        : "bg-white text-[#161616] w-[159px]"
                                        }`}>
                                    <div
                                        ref={buttonGradientRef}
                                        className={`absolute inset-[-200%] transition-opacity duration-300 ${showSkillScore ? "opacity-100" : "opacity-0"
                                            }`}
                                        style={{
                                            background: `conic-gradient(from 270deg, #420167 1%, #8F48F8 22%, #2061F8 36%, #2D79F5 51%, #0FB3D4 65%, #241C70 84%, #420167 100%)`,
                                            transform: `translateY(10%) rotate(${buttonRotation}deg)`,
                                        }}
                                    />
                                    <button
                                        className="relative z-20 text-[16px]"
                                        onClick={handleSkillScoreClick}
                                    >
                                        Skill Stack Score
                                    </button>
                                    {(showSkillScore || isAnimating) && (
                                        <img
                                            src={whiteArrow}
                                            className="z-30 ml-[12px]"
                                            alt="White Arrow"
                                            onClick={toggleDropdown}
                                        />
                                    )}
                                </div>
                                {isDropdownVisible && (
                                    <ul className="absolute top-[50px] bg-white  rounded-xl  py-5 px-6 w-[299px]  z-50 space-y-3">
                                        {[
                                            {
                                                label: "Gold (900+)",
                                                tooltip: "900 and above",
                                                type: "gold",
                                            },
                                            {
                                                label: "Silver (800+)",
                                                tooltip: "800 to 899",
                                                type: "silver",
                                            },
                                            {
                                                label: "Bronze (700+)",
                                                tooltip: "700 to 799",
                                                type: "bronze",
                                            },
                                            {
                                                label: "601-700",
                                                tooltip: "601 to 700",
                                                type: "601-700",
                                            },
                                            {
                                                label: "501-600",
                                                tooltip: "501 to 600",
                                                type: "501-600",
                                            },
                                            {
                                                label: "401-500",
                                                tooltip: "401 to 500",
                                                type: "401-500",
                                            },
                                            {
                                                label: "301-400",
                                                tooltip: "301 to 400",
                                                type: "301-400",
                                            },
                                            {
                                                label: "201-300",
                                                tooltip: "201 to 300",
                                                type: "201-300",
                                            },
                                        ].map((item, index) => (
                                            <>
                                                <li
                                                    key={index}
                                                    className="relative py-2 px-4 hover:bg-gray-100 cursor-pointer group"
                                                    onClick={() => handleMenuClick(item.type)}
                                                >
                                                    <span
                                                        className={`text-[16px] ${item.type === "gold"
                                                            ? "text-[#856220]"
                                                            : item.type === "silver"
                                                                ? "text-[#3A3A3A]"
                                                                : item.type === "bronze"
                                                                    ? "text-[#BC6554]"
                                                                    : "text-[#1E1E1E]"
                                                            }`}
                                                    >
                                                        {item.label}
                                                    </span>
                                                    <div
                                                        className="absolute top-1/2 left-[240px] -translate-y-1/2 bg-white border shadow-[0px_0px_8px_0px_#00000066] rounded-md p-3 w-[233px] hidden group-hover:block max-[536px]:left-10 max-[536px]:top-40 z-10">
                                                        {/* Caret */}
                                                        <div className="absolute top-1/2 left-[-10px] -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-white  max-[536px]:left-1/2 max-[536px]:-top-2 max-[536px]:-rotate-[27deg]"></div>
                                                        {/* Tooltip Content */}
                                                        <div>
                                                            <div className="bg-[#E6F5F5] p-2 flex flex-col gap-[6px] rounded-lg">
                                                                <p className="text-[#B9B9B9] text-[12px]">
                                                                    Estimated Annual Salary
                                                                </p>
                                                                <h4 className="text-[24px] font-bold">
                                                                    6,25,000
                                                                </h4>
                                                            </div>
                                                            <div className="p-1 flex flex-col gap-2">
                                                                <span className="text-[#6F6F6F] text-[12px]">
                                                                    Position best suited for
                                                                </span>
                                                                <ul>
                                                                    <li className="uppercase w-fit py-1 px-2 bg-tooltip-gradient-1 rounded-full text-white text-[12px]">
                                                                        junior
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <hr />
                                            </>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="border border-white h-[44px] w-[102px] flex items-center rounded-[24px] bg-white text-[16px] text-[#161616]">
                                <img src={Filter} alt="" className="ml-[19.4px]" />
                                <p className="ml-[8px] text-[#161616] text-[16px]">Filter</p>
                            </div>
                        </div>
                        <div
                            className={`border rounded-[10px] mr-10 h-[48px] flex items-center justify-center px-3 py-6 ${isAnyCheckboxSelected
                                ? "text-white"
                                : "bg-gray-200 text-[#909090] border-gray-200"
                                }`}
                            style={{
                                background: isAnyCheckboxSelected
                                    ? "linear-gradient(to bottom right, #002DBF 7%, #4396F7 46%, #FF9BD2 71%, #C9FFFC 97%)"
                                    : "",
                                cursor: isAnyCheckboxSelected ? "pointer" : "default",
                            }}
                        >
                            {isAnyCheckboxSelected ? (
                                <img src={WhiteMagicIcon} alt="" className="h-8" />
                            ) : (
                                <img src={MagicIcon} alt="" className="h-8" />
                            )}
                            <p className="ml-1 Inter text-[16px] font-semibold">
                                {`Take AI Interview ${isAnyCheckboxSelected ? `${selectedCandidates.length}` : "0"
                                    }`}
                            </p>
                        </div>
                    </div>
                    <div className="overflow-x-auto ">
                        <table className="table-fixed w-full">
                            <thead
                                className={`min-w-[1200px] overflow-x-auto bg-white text-tableHead  py-[16px] flex gap-7 rounded-xl mt-[21px]  px-5`}
                            >
                                <th className="flex items-center text-[14px] Inter font-semibold">
                                    Applied Date
                                </th>
                                <div
                                    className={`grid-container ${showSkillScore ? "skill-active" : ""
                                        } ${isAnimating ? "is-animating" : ""}`}>
                                    <th className="flex items-center  justify-center">
                                        <input
                                            type="checkbox"
                                            className="custom-checkbox h-6 w-6  border-2 border-[#737373] rounded-md checked:border-none checked:bg-[#0072DC] focus:ring-indigo-500"
                                            checked={isAllSelected}
                                            onChange={handleSelectAllChange}
                                        />
                                    </th>
                                    <th className="flex items-center  text-[14px] Inter font-semibold">
                                        Candidate Name
                                    </th>
                                    {showSkillScore && !isAnimating && (
                                        <th className="flex text-[14px] Inter font-semibold items-center">
                                            Skill Stack Score
                                        </th>
                                    )}
                                    <th className="flex items-center  text-[14px] Inter font-semibold">
                                        Experience
                                    </th>
                                    <th className="flex items-center  text-[14px] Inter font-semibold">
                                        Company
                                    </th>
                                    <th className="flex items-center   text-[14px] Inter font-semibold ">
                                        Location
                                    </th>
                                    <th className="flex items-center  text-[14px]  Inter font-semibold">
                                        Key Skills
                                    </th>
                                </div>
                            </thead>

                            <tbody className="min-w-[1200px] overflow-y-auto bg-[#F1F4F8] mt-[12px] scrollbar-left h-[500px] min-h-[500px]">
                                {currentCandidates.length > 0 ? (
                                    currentCandidates.map((candidate, idx) => (
                                        <React.Fragment key={idx}>
                                            <tr className="flex items-center gap-5 ps-5 space-y-3">
                                                <td className="flex flex-col items-center w-[7%]">
                                                    <span className="text-[#888888] text-[14px] font-medium Inter">
                                                        {candidate.date}
                                                    </span>
                                                </td>

                                                <tr
                                                    className={`bg-white grid-container ${showSkillScore ? "skill-active" : ""
                                        } ${isAnimating ? "is-animating" : ""} w-[100%] gap-5 py-[19.5px] relative overflow-hidden px-5 ${isShadowVisible
                                                            ? getCardGradient(candidate.score)
                                                            : ""
                                                        } ${loadingSummary[idx] || summaryVisible[idx]
                                                            ? tableScore
                                                                ? "rounded-t-[8px] border-transparent"
                                                                : "rounded-t-[10px]"
                                                            : tableScore
                                                                ? "rounded-[8px] border-transparent"
                                                                : "rounded-[10px]"
                                                        }`}
                                                >
                                                    {isAnimating && (
                                                        <div
                                                            ref={(el) =>
                                                                (candidateGradientRefs.current[idx] = el)
                                                            }
                                                            className="absolute inset-[-1200%] transition-opacity duration-[100ms]"
                                                            style={{
                                                                background: `conic-gradient(from 270deg, #420167 1%, #8F48F8 22%, #2061F8 36%, #2D79F5 51%, #0FB3D4 65%, #241C70 84%, #420167 100%)`,
                                                                transform: `translateY(10%) rotate(${candidateRotations[idx] || 0
                                                                    }deg)`,
                                                                opacity: 0.4,
                                                            }}
                                                        />
                                                    )}

                                                    {tableScore && (
                                                        <td
                                                            className="absolute inset-0 border-[2px] border-transparent pointer-events-none overflow-hidden rounded-xl opacity-60"
                                                            style={{
                                                                background: `${getScoreBackground(
                                                                    candidate.score
                                                                )}`,
                                                                borderRadius: "inherit", // Ensures the border respects the parent rounding
                                                                WebkitMask:
                                                                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                                                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                                                WebkitMaskComposite: "destination-out",
                                                                maskComposite: "exclude",
                                                            }}
                                                        />
                                                    )}

                                                    <td className="flex items-center justify-center">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-checkbox h-6 w-6 border-2 border-[#737373] rounded-md checked:border-none checked:bg-[#0072DC] focus:ring-indigo-500"
                                                            checked={selectedCandidates.includes(idx)}
                                                            onChange={() => handleCheckboxChange(idx)}
                                                        />
                                                    </td>

                                                    <td className="z-20 flex items-center">
                                                        <img
                                                            src={candidate.profile}
                                                            alt="Profile"
                                                            className="h-[42px] w-[42px] rounded-full"
                                                        />
                                                        <div className="z-20 ml-[4px]">
                                                            <p
                                                                className={`mb-[-5px] text-[14px] font-medium ${tableBGColor ? "text-white" : "text-black"
                                                                    }`}
                                                            >
                                                                {candidate.name}
                                                            </p>
                                                            <div className="w-[100px] truncate xl:w-[150px]">
                                                                <span
                                                                    className={`text-[14px] font-medium ${tableBGColor
                                                                        ? "text-white"
                                                                        : "text-[#A6A6A6]"
                                                                        }`}
                                                                >
                                                                    {candidate.role}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {tableScore && (
                                                        <td className="flex items-center justify-center">
                                                            <div
                                                                className="rounded-[12px] w-[44px] h-[22px] font-bold items-center flex justify-center"
                                                                style={{
                                                                    background: getScoreBackground(
                                                                        candidate.score
                                                                    ),
                                                                    color:
                                                                        candidate.score >= 700
                                                                            ? "white"
                                                                            : "#6F6F6F",
                                                                }}
                                                            >
                                                                {candidate.score}
                                                            </div>
                                                        </td>
                                                    )}

                                                    <td className="z-20 flex items-center">
                                                        <span
                                                            className={`text-[14px] font-medium ${tableBGColor ? "text-white" : "text-black"
                                                                }`}
                                                        >
                                                            {candidate.experience}
                                                        </span>
                                                    </td>

                                                    <td
                                                        className={`z-20 flex items-center text-[14px] font-medium  ${tableBGColor ? "text-white" : "text-tableBody"
                                                            }`}
                                                    >
                                                        {candidate.company}
                                                    </td>

                                                    <td
                                                        className={`z-20 flex items-center text-[14px] font-medium  ${tableBGColor ? "text-white" : "text-tableBody"
                                                            }`}
                                                    >
                                                        {candidate.location}
                                                    </td>

                                                    <td
                                                        className={`flex items-center  text-[14px] font-medium bg-transparent ${tableBGColor ? "text-white" : "text-[#656565]"
                                                            }`}
                                                    >
                                                        <SkillDisplay
                                                            skills={candidate.skills}
                                                            tableBGColor={tableBGColor}
                                                        />
                                                    </td>

                                                    <td className="flex items-center justify-self-end">
                                                        <button
                                                            className={`inline-flex items-center justify-center rounded-lg border hover:bg-[#E5F1FB] hover:border-[#0072DC] transition-all duration-1000 ease-in-out w-26 ${tableBGColor
                                                                ? "border-black"
                                                                : "border-[#98CDFF]"
                                                                } ${loadingSummary[idx] || summaryVisible[idx]
                                                                    ? "px-3 py-2"
                                                                    : "p-3"
                                                                }`}
                                                            onClick={() => toggleSummary(idx)}
                                                        >
                                                            {!(
                                                                loadingSummary[idx] || summaryVisible[idx]
                                                            ) && (
                                                                    <img
                                                                        src={aiLogo}
                                                                        alt=""
                                                                        className="h-6 mt-[-2px]"
                                                                    />
                                                                )}
                                                            <span
                                                                className={`text-[16px] font-medium Inter ${tableBGColor ? "text-black" : "text-[#0072DC]"
                                                                    } ${loadingSummary[idx] || summaryVisible[idx]
                                                                        ? "content-center"
                                                                        : "pl-2"
                                                                    }`}
                                                            >
                                                                {loadingSummary[idx]
                                                                    ? "Close"
                                                                    : summaryVisible[idx]
                                                                        ? "Close"
                                                                        : "Summarize"}
                                                            </span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tr>

                                            {loadingSummary[idx] || summaryVisible[idx] ? (
                                                <tr className="bg-[#F1F4F8]">
                                                    <div className="p-0 flex justify-end">
                                                        <div
                                                            className={`relative flex flex-col px-20 py-5 rounded-b-[10px] ms-[8.1%] bg-summarize_gradient opacity-[80%] w-[94%] `}
                                                        >
                                                            {loadingSummary[idx] ? (
                                                                <div className="opacity-100">
                                                                    <p className="text-sm font-semibold flex justify-center border border-white/10 bg-white/40 rounded-lg p-1 w-60">
                                                                        <img
                                                                            src={aiLogo}
                                                                            alt=""
                                                                            className="h-5 mr-2"
                                                                        />
                                                                        <span className="text-black text-[16px] font-medium">
                                                                            AI Summarizing...
                                                                        </span>
                                                                    </p>
                                                                    <div className="loading-rectangle opacity-50 mt-3"></div>
                                                                    <div className="loading-rectangle opacity-50"></div>
                                                                    <div className="loading-rectangle opacity-50"></div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <p className="text-sm font-semibold flex justify-center border border-white/10 bg-white/40 rounded-lg p-1 w-60">
                                                                        <img
                                                                            src={aiLogo}
                                                                            alt=""
                                                                            className="h-5 mr-2"
                                                                        />
                                                                        <span className="text-black text-[16px] font-medium">
                                                                            AI Summary
                                                                        </span>
                                                                    </p>
                                                                    <p className="text-[14px] font-medium mt-3 text-justify">
                                                                        Seeking a creative UI/UX Designer
                                                                        specializing in web and mobile platforms,
                                                                        focused on intuitive, responsive, and
                                                                        visually engaging interfaces. Proficient in
                                                                        Figma, Transform ideas into high-quality
                                                                        designs, ensuring seamless user experiences
                                                                        across devices while aligning with business
                                                                        goals.
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </tr>
                                            ) : null}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <>
                                        <tr className="text-center mt-[2rem] text-[14px] text-zinc-600 flex items-center justify-center">
                                            No Candidate Data with that Skill Score
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <ReactPaginate
                        previousLabel={<SlArrowLeft />}
                        nextLabel={<SlArrowRight />}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName={
                            "pagination flex justify-center mt-4 items-center"
                        }
                        activeClassName={"active"}
                        pageClassName="px-1"
                        activeLinkClassName="bg-primary text-white rounded-lg"
                        pageLinkClassName="p-[12px] py-[7px] border border-paginationBox bg-paginationBox text-[#5D5D5D] rounded-lg"
                        previousClassName={`p-[8px] border rounded-lg ${currentPage === 0
                            ? "bg-paginationBox border-paginationBox text-[#C9C9C9]"
                            : "bg-paginationBox border-paginationBox cursor-pointer"
                            }`}
                        previousLinkClassName={`${currentPage === 0 ? "cursor-default text-[#C9C9C9]" : ""
                            }`}
                        nextClassName={`p-[8px] border rounded-lg ${currentPage === pageCount - 1
                            ? "bg-paginationBox border-paginationBox text-[#C9C9C9]"
                            : "bg-paginationBox border-paginationBox cursor-pointer"
                            }`}
                        nextLinkClassName={`${currentPage === pageCount - 1
                            ? "cursor-default text-[#C9C9C9]"
                            : ""
                            }`}
                        disabledClassName="cursor-default text-[#C9C9C9]"
                    />
                </div>
            </div>
        </div>
    );
};

export default ApplicantsPool;
