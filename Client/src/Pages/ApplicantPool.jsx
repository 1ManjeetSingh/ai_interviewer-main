import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Dialog } from '@mui/material';
import DialogTitle from "@mui/material/DialogTitle";
import { CiSearch } from "react-icons/ci";
import MagicIcon from "../assets/magicIcon.svg";
import WhiteMagicIcon from "../assets/whiteMagicIcon.svg";
import aiLogo from "../assets/ai-logo.png";
import SkillDisplay from "../Components/skillDisplay";
import Filter from "../assets/blueFilter.svg";
import Meta from "../assets/meta-logo.png";
import Location from "../assets/location.svg";
import Briefcase from "../assets/briefcase.svg";
import Securitytime from "../assets/securitytime.svg";
import backgroundImage1 from "../assets/Rectangle 7522.png";
import whiteArrow from "../assets/whiteDownArrow.svg";
import Rupees from "../assets/rupees.svg";

import boy1 from "../assets/applicant_pool_img/boy1.jpg";
import boy2 from "../assets/applicant_pool_img/boy2.jpg";
import boy3 from "../assets/applicant_pool_img/boy3.jpg";
import boy4 from "../assets/applicant_pool_img/boy4.jpg";
import boy5 from "../assets/applicant_pool_img/boy5.jpg";
import boy6 from "../assets/applicant_pool_img/boy6.jpg";
import boy7 from "../assets/applicant_pool_img/boy7.jpg";
import boy8 from "../assets/applicant_pool_img/boy8.jpg";
import boy9 from "../assets/applicant_pool_img/boy9.jpg";
import boy10 from "../assets/applicant_pool_img/boy10.jpg";
import boy11 from "../assets/applicant_pool_img/boy11.jpg";
import boy12 from "../assets/applicant_pool_img/boy12.jpg";
import boy13 from "../assets/applicant_pool_img/boy13.jpg";
import girl1 from "../assets/applicant_pool_img/girl1.jpg";

import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import axios from "axios";

// Correct import in your JSX file
// Correct import in your JSX file (using the default export)
import data from "../data/name-skills";

// Destructure in your code
const { nameSkill, keySkill } = data;

import cityList from "../data/city_list";
import { useJobContext } from "../Context/LaiylaJobPostContext";

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
    const [jobDetails, setJobDetails] = useState({});
    const [currentCandidates, setCurrentCandidates] = useState();
    const [candidates, setCandidate] = useState(nameSkill);
    const [candidateData, setCandidateData] = useState();
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [skills, setSkills] = useState(keySkill);
    const [openDialog, setOpenDialog] = useState(false);
    const { capitalizeWords } = useJobContext();

    const [images, setImages] = useState([]);

    const [searchParams] = useSearchParams('');
    const jobId = searchParams.get('postId');

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/alljobsposted/jobpost/${jobId}`
                );

                const fetchedDetails = response.data;

                setJobDetails((prev) => ({
                    ...prev,
                    ...fetchedDetails,
                    jobTitle: capitalizeWords(fetchedDetails.jobTitle),
                }));
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        fetchJobDetails();
        // const fetchSkills = async () => {
        //     try {
        //         const response = await axios.post(
        //             "http://localhost:3000/api/generate-skills",
        //             {
        //                 jobTitle: jobDetails.jobTitle,
        //                 description: jobDetails.designation,
        //                 totalSkills: 100,
        //             }
        //         );
        //         console.log(response.data);

        //         setSkills(response.data);
        //     } catch (error) {
        //         console.error("Error fetching skills:", error);
        //     }
        // };
        // fetchSkills();

        // const fetchImages = async () => {
        //     try {
        //         const response = await axios.get(
        //             "https://interview-client-4r6g.onrender.com/api/images"
        //         );

        //         console.log("Images: ",response);
        //         setImages(response.data);
        //     } catch (error) {
        //         console.log("error:", error);
        //     }
        // };
        // fetchImages();
    }, []);

    const getRandomDate = (createdAt) => {
        const start = new Date(createdAt);
        const end = new Date(createdAt); // Clone start date to modify
        end.setDate(start.getDate() + 7);

        const randomDate = new Date(
            start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );

        const day = randomDate.getDate();
        const month = randomDate.toLocaleString("default", { month: "short" });
        const year = randomDate.getFullYear();

        return `${day} ${month} / ${year}`;
    };
    // Generate random experience (0 to 7 years)
    const generateRandomExperience = () => {
        const years = Math.floor(Math.random() * 8); // Random number from 0 to 7
        return `${years} ${years === 1 ? "year" : "years"}`; // Pluralize 'year'
    };

    const scoreData = [
        { scoreRange: "201-300", salary: "4,00,000", position: "Fresher" },
        { scoreRange: "301-400", salary: "4,50,000", position: "Fresher+" },
        { scoreRange: "401-500", salary: "5,00,000", position: "Junior" },
        { scoreRange: "501-600", salary: "5,40,000", position: "Junior+" },
        { scoreRange: "601-700", salary: "6,00,000", position: "Mid" },
        { scoreRange: "701-800", salary: "7,00,000", position: "Mid+" },
        { scoreRange: "801-900", salary: "8,00,000", position: "Experienced" },
        { scoreRange: "900+", salary: "9,00,000", position: "Experienced+" },
    ];

    const jobOptions = [
        { value: 'senior', label: 'Senior' },
        { value: 'mid', label: 'Mid' },
        { value: 'junior', label: 'Junior' },
        { value: 'fresher', label: 'Fresher' },
        { value: 'intern', label: 'Intern' }
    ]

    const workplaceOptions = [
        { value: 'remote', label: 'Remote' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'onsite', label: 'On-site' },
    ]

    const timingOptions = [
        { value: 'fullTime', label: 'Full-Time' },
        { value: 'partTime', label: 'Part-Time' },
        { value: 'contractual', label: 'Contractual' },
    ]

    const pageCount = Math.ceil(filteredCandidates.length / 10);
    // Update currentCandidates when currentPage or filteredCandidates change
    useEffect(() => {
        const sourceData =
            filteredCandidates.length > 0 ? filteredCandidates : candidates;
        setCurrentCandidates(
            sourceData.slice(currentPage * 10, (currentPage + 1) * 10)
        );
    }, [currentPage, candidates, filteredCandidates]);
    const getRandomCity = () => {
        const randomIndex = Math.floor(Math.random() * cityList.length);
        return cityList[randomIndex].city;
    };

    const Images = [boy1, boy2, boy3, boy4, boy5, boy6, boy7, boy8, boy9, boy10, boy11, boy12, boy13, girl1];

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * Images.length);
        return Images[randomIndex];
    };

    useEffect(() => {
        // Generate random data for each candidate once
        const dataWithRandomValues = candidates?.map((candidate) => ({
            ...candidate,
            randomDate: getRandomDate(jobDetails.createdAt),
            randomExp: generateRandomExperience(),
            randomScore: generateRandomScore(),
            randomCity: getRandomCity(),
            img: getRandomImage(),
        }));
        setCandidateData(dataWithRandomValues); // This keeps the original data
        setFilteredCandidates(dataWithRandomValues);
    }, [candidates, jobDetails]);

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
        const allCandidates = candidateData.flat();

        // Filter candidates based on the selected range
        const filtered = allCandidates.filter((candidate) => {
            if (range === "900+") return candidate.randomScore >= 900;
            if (range === "801-900")
                return candidate.randomScore >= 800 && candidate.randomScore < 900;
            if (range === "701-800")
                return candidate.randomScore >= 700 && candidate.randomScore < 800;
            if (range === "601-700")
                return candidate.randomScore >= 601 && candidate.randomScore < 700;
            if (range === "501-600")
                return candidate.randomScore >= 501 && candidate.randomScore < 600;
            if (range === "401-500")
                return candidate.randomScore >= 401 && candidate.randomScore < 500;
            if (range === "301-400")
                return candidate.randomScore >= 301 && candidate.randomScore < 400;
            if (range === "201-300")
                return candidate.randomScore >= 201 && candidate.randomScore < 300;
            return true; // Default case if range doesn't match
        });

        setFilteredCandidates(filtered); // Update the filtered candidates
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
                filteredCandidates.slice(currentPage * 10, (currentPage + 1) * 10)
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

    };

    useEffect(() => {
        return () => {
            cancelAnimationFrame(buttonAnimationFrame.current);
            Object.values(candidateAnimationFrames.current).forEach(
                cancelAnimationFrame
            );
        };
    }, []);

    const [score, setScore] = useState(0);

    // Function to generate a random score
    const generateRandomScore = () => {
        const randomScore = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
        return randomScore;
    };

    const handletoggleDialog = () => {
        setOpenDialog(!openDialog);
    };

    const handleNavigate = () => {

    };

    return (
        <div className="bg-[#F2F2F2] h-full py-5 max-[520px]:py-0">
            <div className="w-full  mx-auto">
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
                                            {jobDetails?.jobTitle}
                                        </h2>

                                        <div className="flex items-center">
                                            <img
                                                className="h-[18px] w-[18px]"
                                                src={Briefcase}
                                                alt=""
                                            />
                                            <span className="text-[16px] font-medium text-[#747474] ml-[2px]">
                                                {jobOptions.filter(option => option.value === jobDetails.designation).map(option => option.label)}
                                            </span>
                                            <span className="mx-2 h-[15px] border border-l border-[#BCB4B4]"></span>
                                            <img
                                                className="h-[18px] w-[18px] mr-1"
                                                src={Securitytime}
                                                alt=""
                                            />
                                            <span className="text-[16px] font-medium text-[#747474]">
                                                {timingOptions.filter(option => option.value === jobDetails.jobType).map(option => option.label)}
                                            </span>
                                            <span className="mx-2 h-[15px] border border-l border-[#BCB4B4]"></span>
                                            <img
                                                className="h-[18px] w-[18px] mr-1"
                                                src={Location}
                                                alt=""
                                            />
                                            <span className="text-[16px] font-medium text-[#747474]">
                                                {workplaceOptions.filter(option => option.value === jobDetails.workplaceType).map(option => option.label)}
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
                            <h3 className="text-[16px] font-medium">Main Skills:</h3>
                            <div className="flex mt-2 max-sm:gap-2 overflow-x-auto customScrollbar max-w-[950px]">
                                {jobDetails?.mainSkills?.map((skill, index) => (
                                    <span
                                        className="bg-[#F3F3F3] text-[14px] font-medium text-[#656565] py-[8px] px-[5px] rounded-lg mr-[4px] whitespace-nowrap"
                                        key={index}
                                    >
                                        {skill}
                                    </span>
                                ))}
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
                            <p className="text-[36px] font-semibold mr-2">
                                {candidates.length}
                            </p>
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
                                className="absolute mt-[12px] ml-[26.5px] text-[19px] w-7
              h-7"
                            />
                            <div className="relative flex">
                                <div
                                    className={`relative z-10  border border-white h-[44px] justify-center flex items-center rounded-[24px] text-[16px] cursor-pointer transition-all duration-300 overflow-hidden ${showSkillScore
                                        ? "text-white w-[191px]"
                                        : "bg-white text-[#161616] w-[159px]"
                                        }`}
                                >
                                    <div
                                        ref={buttonGradientRef}
                                        className={`absolute inset-[-200%] transition-opacity duration-300 ${showSkillScore ? "opacity-100" : "opacity-0"
                                            }`}
                                        style={{
                                            background: `conic-gradient(from 270deg, 
              #420167 1%, 
              #8F48F8 22%, 
              #2061F8 36%, 
              #2D79F5 51%, 
              #0FB3D4 65%, 
              #241C70 84%, 
              #420167 100%)`,
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
                                                type: "900+",
                                            },
                                            {
                                                label: "Silver (800+)",
                                                tooltip: "800 to 899",
                                                type: "801-900",
                                            },
                                            {
                                                label: "Bronze (700+)",
                                                tooltip: "700 to 799",
                                                type: "701-800",
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
                                        ].map((item, index) => {
                                            const scoreDetails = scoreData.find(
                                                (data) => data.scoreRange === item.type
                                            );

                                            return (
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
                                                            className="absolute top-1/2 left-[240px] -translate-y-1/2 bg-white border shadow-[0px_0px_8px_0px_#00000066] rounded-md p-3 w-[233px] hidden group-hover:block max-[536px]:left-10 max-[536px]:top-40 z-10
                          "
                                                        >
                                                            {/* Caret */}
                                                            <div className="absolute top-1/2 left-[-10px] -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-white  max-[536px]:left-1/2 max-[536px]:-top-2 max-[536px]:-rotate-[27deg]"></div>
                                                            {/* Tooltip Content */}
                                                            <div>
                                                                <div className="bg-[#E6F5F5] p-2 flex flex-col gap-[6px] rounded-lg">
                                                                    <p className="text-[#B9B9B9] text-[12px]">
                                                                        Estimated Annual Salary
                                                                    </p>
                                                                    <h4 className="text-[24px] font-bold">
                                                                        {scoreDetails.salary}
                                                                    </h4>
                                                                </div>
                                                                <div className="p-1 flex flex-col gap-2">
                                                                    <span className="text-[#6F6F6F] text-[12px]">
                                                                        Position best suited for
                                                                    </span>
                                                                    <ul>
                                                                        <li className="uppercase w-fit py-1 px-2 bg-tooltip-gradient-1 rounded-full text-white text-[12px]">
                                                                            {scoreDetails.position}
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <hr />
                                                </>
                                            );
                                        })}
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
                            <p onClick={isAnyCheckboxSelected ? handletoggleDialog : null} className="ml-1 Inter text-[16px] font-semibold">
                                {`Take AI Interview ${isAnyCheckboxSelected ? `${selectedCandidates.length}` : "0"}`}
                            </p>
                        </div>
                    </div>
                    <Dialog
                        sx={{
                            "& .MuiDialog-paper": {
                                minWidth: '468px',
                                borderRadius: '10px',
                                background: "#FFF",
                                padding: '24px 36px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '42px',
                                // boxShadow: '0px 0px 4px 0px #D388FF',
                            },
                            '& .MuiBackdrop-root': {
                                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                            },
                        }}
                        open={openDialog}
                        onClose={handletoggleDialog}
                    >
                        <DialogTitle
                            style={{
                                textAlign: 'center',
                                fontSize: 24,
                                fontWeight: 600,
                                maxWidth: '268px',
                                lineHeight: '32px',
                                padding: 0,
                                color: '#4c4c4c',
                            }}
                        >
                            Do you want to take AI Interview
                        </DialogTitle>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center text-black text-4xl font-bold font-['Inter'] leading-[18px]">{selectedCandidates.length}</h1>
                            <p className="text-center text-[#a7a7a7] text-lg font-semibold font-['Inter']">Candidate Selected</p>
                        </div>
                        <div className="flex gap-8">
                                <button onClick={handletoggleDialog} className="w-[182px] h-[58px] p-2.5 bg-[#e5f1fb] rounded-[10px] flex-col justify-center items-center gap-2.5 inline-flex">
                                    <div className="self-stretch justify-center items-center gap-1 inline-flex">
                                        <div className="text-[#0071db] text-lg font-semibold font-['Inter'] leading-[18px]">Cancel</div>
                                    </div>
                                </button>
                                <button onClick={handleNavigate} className="w-[182px] h-[58px] p-2.5 bg-[#0071db] rounded-[10px] flex-col justify-center items-center gap-2.5 inline-flex">
                                    <div className="w-[150px] justify-center items-center gap-1 inline-flex">
                                        <div className="relative">
                                        <img src={WhiteMagicIcon} alt="" className="h-6" />
                                        </div>
                                        <div className="text-white text-lg font-semibold font-['Inter'] leading-[18px]">Take AI Interview</div>
                                    </div>
                                </button>
                            </div>
                    </Dialog>
                    <div className="overflow-x-auto ">
                        <table className="table-fixed min-w-[1300px]">
                            <thead
                                className={`min-w-[1200px] overflow-x-auto bg-white text-tableHead  py-[16px] flex gap-7 rounded-xl mt-[21px]  px-5`}
                            >
                                <th className="flex items-center text-[14px] Inter font-semibold whitespace-nowrap mr-2">
                                    Applied Date
                                </th>
                                <thead
                                    className={`grid-container ${showSkillScore ? "skill-active" : ""
                                        } ${isAnimating ? "is-animating" : ""}`}
                                >
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
                                </thead>
                            </thead>

                            <tbody className="min-w-[1200px] overflow-y-auto bg-[#F1F4F8] mt-[12px] scrollbar-left h-[500px] min-h-[500px]">
                                {currentCandidates?.length > 0 ? (
                                    currentCandidates.map((candidate, idx) => {
                                        return (
                                            <React.Fragment key={idx}>
                                                <tr className="flex items-center gap-5 ps-5 space-y-3">
                                                    <td className="flex flex-col items-center w-[7%]">
                                                        <span className="text-[#888888] text-[14px] font-medium Inter">
                                                            {candidate.randomDate}
                                                        </span>
                                                    </td>

                                                    <tr
                                                        className={`bg-white grid-container ${showSkillScore ? "skill-active" : ""
                                                            } ${isAnimating ? "is-animating" : ""} w-[100%] gap-5 py-[19.5px] relative overflow-hidden px-5 ${isShadowVisible
                                                                ? getCardGradient(candidate.randomScore)
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
                                                                    background: `conic-gradient(from 270deg, 
            #420167 1%, 
            #8F48F8 22%, 
            #2061F8 36%, 
            #2D79F5 51%, 
            #0FB3D4 65%, 
            #241C70 84%, 
            #420167 100%)`,
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
                                                                        candidate.randomScore
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
                                                                src={candidate.img}
                                                                alt="Profile"
                                                                className="h-[36px] w-[36px] rounded-full"
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
                                                                        AI Engineer
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
                                                                            candidate.randomScore
                                                                        ),
                                                                        color:
                                                                            candidate.randomScore >= 700
                                                                                ? "white"
                                                                                : "#6F6F6F",
                                                                    }}
                                                                >
                                                                    {candidate.randomScore}
                                                                </div>
                                                            </td>
                                                        )}

                                                        <td className="z-20 flex items-center">
                                                            <span
                                                                className={`text-[14px] font-medium ${tableBGColor ? "text-white" : "text-black"
                                                                    }`}
                                                            >
                                                                {candidate.randomExp}
                                                            </span>
                                                        </td>

                                                        <td
                                                            className={`z-20 flex items-center text-[14px] font-medium  ${tableBGColor ? "text-white" : "text-tableBody"
                                                                }`}
                                                        >
                                                            Google
                                                        </td>

                                                        <td
                                                            className={`z-20 flex items-center text-[14px] font-medium  ${tableBGColor ? "text-white" : "text-tableBody"
                                                                }`}
                                                        >
                                                            {candidate.randomCity}
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
                                                                    className={`text-[16px] font-medium Inter ${tableBGColor
                                                                        ? "text-black"
                                                                        : "text-[#0072DC]"
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
                                                                            visually engaging interfaces. Proficient
                                                                            in Figma, Transform ideas into
                                                                            high-quality designs, ensuring seamless
                                                                            user experiences across devices while
                                                                            aligning with business goals.
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </tr>
                                                ) : null}
                                            </React.Fragment>
                                        );
                                    })
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