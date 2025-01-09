import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

//  second element import
import linkedIn from '../assets/linkedIn.png';
import ziprecruiter from '../assets/ziprecruiter.png';
import Select, { components } from 'react-select';
import { LuSearch } from "react-icons/lu";
import { MdEdit, MdSave } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

const customDropdownIndicator = (props) => {
    const { selectProps } = props;
    const isOpen = selectProps.menuIsOpen;

    return (
        <components.DropdownIndicator {...props}>
            {isOpen ? (
                // SVG for open state (Up Arrow)
                <svg xmlns="http://www.w3.org/2000/svg" className='w-[16px] h-[16px]' fill='#46AEF5' viewBox="0 0 448 512">
                    <path d="M246.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 205.3l137.4 137.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
            ) : (
                // SVG for closed state (Down Arrow)
                <svg xmlns="http://www.w3.org/2000/svg" className='w-[16px] h-[16px]' fill='#B9B9B9' viewBox="0 0 448 512">
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
            )}
        </components.DropdownIndicator>
    );
};

const customComponents = {
    DropdownIndicator: customDropdownIndicator,
};


const JobPostUpdater = () => {

    const navigate = useNavigate();
    const handleJobPostDetails = () => {
        const handleNavigate = () => {
            // Navigate to the page with the postId as a query parameter
            navigate(`/applicantPool`);
          };
        
          return handleNavigate;
    }

    const [searchParams] = useSearchParams('');
    const postId = searchParams.get('postId'); // Extract postId from query params
    const [jobPost, setJobPost] = useState(null);


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
        { value: 'onSite', label: 'On-site' },
    ]

    const timingOptions = [
        { value: 'fullTime', label: 'Full-Time' },
        { value: 'partTime', label: 'Part-Time' },
        { value: 'contractual', label: 'Contractual' },

    ]

    const [title, setTitle] = useState('');
    const [jobOption, setJobOption] = useState('');
    const [workplaceOption, setWorkplaceOption] = useState('');
    const [timingOption, setTimingOption] = useState('');

    const [jobDescription, setJobDescription] = useState(``);
    const [mainSkills, setMainSkills] = useState([]);
    const [subSkills, setSubSkills] = useState([]);

    const [minSalary, setMinSalary] = useState();
    const [maxSalary, setMaxSalary] = useState();
    const [benefits, setBenefits] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState([]);


    useEffect(() => {
        if (postId) {
            fetchJobPostDetails(postId);
        }
    }, [postId]);

    const fetchJobPostDetails = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/alljobsposted/jobpost/${id}`);
            if (response.status === 200) {
                setJobPost(response.data);
            } else {
                console.error("Failed to fetch job post. Status:", response.status);
            }
        } catch (error) {
            console.error("Error fetching job post details:", error);
        }
    };

    useEffect(() => {

        if (jobPost) {
            console.log(jobPost)
            setTitle(jobPost.jobTitle);
            setJobOption(jobPost.designation.replace(/-./g, match => match.charAt[0].toLowerCase().charAt(1).toUpperCase()).replace(/^([A-Z])/, match => match.toLowerCase()));
            setWorkplaceOption(jobPost.workplaceType.replace(/-./g, match => match.charAt(1).toUpperCase()).replace(/^([A-Z])/, match => match.toLowerCase()));
            setTimingOption(jobPost.jobType.replace(/-./g, match => match.charAt(1).toUpperCase()).replace(/^([A-Z])/, match => match.toLowerCase()));

            setJobDescription(jobPost.jobDescription);

            setMainSkills(jobPost.mainSkills);
            setSubSkills(jobPost.subSkills.map((e) => e.name));

            setMinSalary(jobPost.salaryRange.minSalary);
            setMaxSalary(jobPost.salaryRange.maxSalary);
            setBenefits(jobPost.benefits);
            setSelectedCompany(jobPost.jobPortalsPosting);
        }

    }, [jobPost])


    const handleChangeJobOption = (selectedOption) => {
        setJobOption(selectedOption.value);
    };

    const handleChangeWorkplaceOption = (selectedOption) => {
        setWorkplaceOption(selectedOption.value);
    };

    const handleChangeTimingOption = (selectedOption) => {
        setTimingOption(selectedOption.value);
    };


    const [dropdownState, setDropdownState] = useState({
        role: false,
        type: false,
        workplace: false,
    });

    // Handlers for open/close
    const handleMenuOpen = (key) => {
        setDropdownState((prev) => ({ ...prev, [key]: true }));
    };

    const handleMenuClose = (key) => {
        setDropdownState((prev) => ({ ...prev, [key]: false }));
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "#FFF",
            border: "none",
            color: "#F5F5F5",
            height: "36px",
            width: "full",
            minWidth: "300px",
            fontWeight: "400",
            boxShadow: "none",
            display: "flex",
            justifySelf: "center",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: "25px",
            ":hover": {
                borderColor: "#F5F5F5",
            },
        }),
        // input: (provided) => ({
        //     ...provided,
        //     caretColor: "transparent", 
        // }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            width: "20px",
            height: "20px",
            position: "absolute",
            color: state.isFocused ? "#46AEF5" : "#B9B9B9",
            top: "27%",
            right: "10px",
            padding: "0",
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
        menu: (provided) => ({
            ...provided,
            position: "absolute",
            backgroundColor: "#D7D7D7",
            borderRadius: "4px",
            zIndex: 999,
            top: "auto",
            left: "auto",
            fontSize: "18px",
            maxWidth: "300px",
            maxHeight: "300px",
            overflowY: "auto",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            pointerEvents: 'auto',  // Ensure mouse events pass through
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#b9b9b9",
            fontWeight: "400",
            fontSize: "14px",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#353535",
            fontSize: "14px",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#46AEF5" : "#FFF",
            color: state.isSelected ? "#1E1E1E" : "#6F6F6F",
            fontWeight: "400",
            padding: "10px 20px",
            cursor: "pointer",
            ":active": {
                backgroundColor: "#EBEBEB",
            },
        }),
    };


    //<----------- Second Element Variables -------------->

    const handleRadioChange = (event) => {
        const { value } = event.target;

        // Toggle the value in the array
        if (benefits.includes(value)) {
            setBenefits((prev) => prev.filter((item) => item !== value));
        } else {
            setBenefits((prev) => [...prev, value]);
        }
    };

    const companies = {
        LinkedIn: {
            icon: linkedIn
        },
        'Naukri.com': {
            icon: "https://s3-alpha-sig.figma.com/img/5331/9b58/6f6c04300fc1ee80583629773cb036fd?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jGmE2xbPMYmmU020YKvyCmu7pkwFzK2rXN6a4F1wTv6d2lHWKjX94OdniyAEMyIOyKUQSBuMYp-PLNm8phXinvtA~DMLI5Qvs0yIJGH75aI~DGqrFKSoDitziwitaTt--7h7nrMV4VPqOWwJT5BcC6adPDQhoZ8wlpUG~rCG8ImYn0oSdeHvCN~E4iPrN8Zhd3tWE4WDhH1qRkRxMESgvTvuqv8K9N9mhXhpRsQMq-USOKiHr9J8gP0FP8Jks0WKZLPbKmWbb-8cOCjPPZ8-yM4en7Pdhegcht5aDn4iPkvMRSjgobHyC2K4Z7z3X8qIj54g6XfgkxGyCtcLMy~KYw__"
        },
        Glassdoor: {
            icon: "https://s3-alpha-sig.figma.com/img/9831/46f1/9bddbe0da9db67153b96427e939e87c6?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N3-RtXhk4oe7QlWmA5wcRoAUYhz3uoIPZhy6aj1OV7ff4OsEXpLfaHQ8fbYH8S~vqFIWTS7g45cy8oOFfp4wVG48xy9hpF9~HdDEKA6fp9GsYqexk6boLJN0foiKxpczQPoPvjD45HYHqQwb1wbASSzJNe8nnHk2g0-JNNFSL4Xvijn~a3zpEU1hWs~cebjVDf-q0VKTZoQ-pjsmodflJR8ZbHfkkTbmpk2u-TQAqWakTLr4j-j5kBbHBaIR5fkl9M2bggCXVSeeNFJbY3UbTYwpvoEPRfmIwDoO7bKwvmU4GPOdYY0IOSx7lt05z3HpDIvbIDanSGFn2x52fCnyEw__"
        },
        Foundit: {
            icon: "https://s3-alpha-sig.figma.com/img/30ba/6c8b/2fad2a15f0b8708429659322fdec1b9f?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HEzWApeISkA2BuTCfbcJ0N6Wl5-0-fYykTa8JDyoNGhSFLkbDvYuvxgDxPJlcM8CerKUeAo5YuCdFaJjVOcCxjXfjQqeeycdNz0mWaBgaM40E0TGeqRnOvQKdkDYJ~Gs08-wM4F5uSSHsL~VHmQXMqN6TQim5PV4L3Cb57W8lCL6WtDM~D9wlCgtLoEc19PUsfjsbs891i9KjSJLfTV3mkXH8qkSVxIMNG4NmY-Ux8LxHCv0niZRk3xZu2m5rarrEuoDzcmE09b~D7TvZIkANggc5sIigSUj4hWDP3rFgK2wVJHpaUFw6af1n-G7n1laIgl8GL34DyQ8FnulGhEmBQ__"
        },
        Ziprecruiter: {
            icon: ziprecruiter
        }
    }


    const handleSelectedComponies = (company) => {
        setSelectedCompany((prevSelected) => {
            if (prevSelected.includes(company)) {
                // Remove if already selected
                return prevSelected.filter((item) => item !== company);
            } else {
                // Add if not selected
                return [...prevSelected, company];
            }
        });
    };


    // Third Element Variables

    const [skillInput, setSkillInput] = useState('');
    const [skillInput2, setSkillInput2] = useState('');

    const handleAddMainSkill = (e) => {
        if (e.key === 'Enter' && skillInput.trim() !== '') {
            setMainSkills([...mainSkills, skillInput.trim()]);
            setSkillInput('');  // Clear input after adding
        }
    };

    const handleAddSubSkill = (e) => {
        if (e.key === 'Enter' && skillInput2.trim() !== '') {
            setSubSkills([...subSkills, skillInput2.trim()]);
            setSkillInput2('');  // Clear input after adding
        }
    };


    const [currentTab, setCurrentTab] = useState("jobInfo");

    const [isEditing, setIsEditing] = useState(false);
    const [isMainEditing, setIsMainEditing] = useState(false);
    const [isSubEditing, setIsSubEditing] = useState(false);
    const editableDivRef = useRef(null);
    const containerRef = useRef(null);


    const jobDetails = {
        jobImg: "/meta-logo.png",
        companyName: "Meta",
        location: "Noida",
        experience: "2 years",
    };

    const handleUpdateJobPost = async() => {

        const updated_data = {
            jobTitle: title,
            designation: jobOption,
            jobType: timingOption,
            workplaceType: workplaceOption,
            jobDescription,
            mainSkills,
            subSkills : subSkills.map(element => ({
                name: element,
                level: "Beginner"
            })),
            salaryRange: {
                minSalary: Number(minSalary),
                maxSalary: Number(maxSalary),
            },
            benefits,
            jobPortalsPosting: selectedCompany,
        }

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_BASE_URL}/api/alljobsposted/update_job_posted/${postId}`,
                updated_data
            );

            if (response.status === 200) {
                toast.success("Job post updated successfully!");
            }
        } catch (error) {
            console.error("Error updating job post:", error);
            toast.error("Failed to update job post. Please try again.");
        }

    };

    return (
        <>
            <main>
                <ToastContainer />
                <section className="px-10 py-5 flex flex-col max-w-[1200px] mx-auto">
                    <div className="flex justify-between h-[40%] max-md:flex-col max-md:gap-6 shadow-[0px_0px_4px_0px_#00000040_inset] py-5 px-4 rounded-lg bg-[#F5F5F5]">
                        <div className="w-full md:w-3/5 ">
                            <div className="flex gap-4 h-full max-[520px]:flex-col">
                                <div className="flex items-center">
                                    <img
                                        src={jobDetails.jobImg}
                                        alt="Company Logo"
                                        className="w-full h-full max-[520px]:w-[100px] max-[520px]:h-[100px]"
                                    />
                                </div>
                                <div className="">
                                    <h2 className="text-[24px] font-bold text-[#2D2D2D]">
                                        {title}
                                    </h2>
                                    <p className="flex text-[16px] font-medium text-[#787878]">
                                        {jobDetails.companyName} |
                                        <img
                                            className="h-[14px] w-[14px] mt-2 ml-1 mr-1"
                                            src="/location.svg"
                                            alt=""
                                        />{" "}
                                        {jobDetails.location}
                                    </p>
                                    <div className="flex items-center">
                                        <img
                                            className="h-[18px] w-[18px]"
                                            src="/briefcase.svg"
                                            alt=""
                                        />
                                        <span className="text-[16px] font-medium text-[#747474] ml-[2px]">
                                            {jobDetails.experience}
                                        </span>
                                        <span className="mx-2 h-[15px] border border-l border-[#BCB4B4]"></span>
                                        <img
                                            className="h-[18px] w-[18px] mr-1"
                                            src="/securitytime.svg"
                                            alt=""
                                        />
                                        <span className="text-[16px] font-medium text-[#747474]">
                                            {jobDetails.jobType}
                                        </span>
                                        <span className="mx-2 h-[15px] border border-l border-[#BCB4B4]"></span>
                                        <img
                                            className="h-[18px] w-[9px] mr-1"
                                            src="/rupees.svg"
                                            alt=""
                                        />
                                        <span className="text-[16px] font-medium text-[#747474]">
                                            {jobDetails.salary}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 ">
                            <button onClick={handleJobPostDetails()} className="p-3 rounded-[10px] border border-[#0072DC] text-[16px] font-medium text-[#0072DC]">
                                View application
                            </button>
                            <button className="p-[12px] rounded-[10px] text-[16px] font-medium bg-[#0072DC] text-white cursor-not-allowed">
                                Repost Job
                            </button>
                        </div>
                    </div>
                    <div className="border border-[#B9B9B9] shadow-[0px_0px_4px_0px_#00000040_inset] rounded-xl p-6 mt-7 flex flex-col gap-6">
                        <div className="py-6 flex items-center gap-[52px] border-b border-[#B9B9B9]">
                            <button
                                className={`text-[20px] font-semibold ${currentTab === "jobInfo"
                                    ? " text-[#0072DC] underline underline-offset-8"
                                    : "text-[#6F6F6F]"
                                    }`}
                                onClick={() => setCurrentTab("jobInfo")}
                            >
                                Job info
                            </button>
                            <button
                                className={`text-[20px] font-semibold ${currentTab === "setting"
                                    ? " text-[#0072DC] underline underline-offset-8"
                                    : "text-[#6F6F6F]"
                                    }`}
                                onClick={() => setCurrentTab("setting")}
                            >
                                Setting
                            </button>
                        </div>
                        <div className="mt-5">
                            {/* DropDowns */}
                            <div className="self-stretch flex-col justify-start items-end gap-6 flex">
                                <div className="self-stretch justify-around items-start gap-[2vw] inline-flex">
                                    <div className="shrink basis-0 flex-col justify-start items-start gap-3 inline-flex">
                                        <div className="text-[#1e1e1e] text-2xl font-semibold font-['SF UI  Text'] leading-normal">Designation</div>
                                        <div className={`w-full px-3 py-1 bg-[#FFF] border ${dropdownState.role ? 'border-[#0072DC]' : 'border-[#B9B9B9]'} rounded-[10px] justify-start items-center gap-4 inline-flex`}>
                                            <div className="justify-start items-center gap-4 flex bg-[#FFF]">
                                                <div className="grow shrink basis-0 text-[#b9b9b9] text-base font-normal font-['SF UI  Text']">
                                                    <Select
                                                        defaultValue={jobOptions.find(option => option.value === jobOption)} // Set the default value to the first option
                                                        options={jobOptions}
                                                        styles={customStyles}
                                                        onChange={handleChangeJobOption}
                                                        value={jobOptions.find(option => option.value === jobOption)} // Ensure value fallback to first option
                                                        components={customComponents}
                                                        onMenuOpen={() => handleMenuOpen('role')}
                                                        onMenuClose={() => handleMenuClose('role')}
                                                        placeholder="Text"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shrink basis-0 flex-col justify-start items-start gap-3 inline-flex">
                                        <div className="text-[#1e1e1e] text-2xl font-semibold font-['SF UI  Text'] leading-normal">Job Type</div>
                                        <div className={`w-full px-3 py-1 bg-[#FFF] border ${dropdownState.type ? 'border-[#0072DC]' : 'border-[#B9B9B9]'} rounded-[10px] justify-start items-center gap-4 inline-flex`}>
                                            <div className="justify-start items-center gap-4 flex bg-[#FFF]">
                                                <div className="grow shrink basis-0 text-[#b9b9b9] text-base font-normal font-['SF UI  Text']">
                                                    <Select
                                                        defaultValue={timingOptions.find(option => option.value === timingOption)} // Set the default value to the first option
                                                        options={timingOptions}
                                                        styles={customStyles}
                                                        onChange={handleChangeTimingOption}
                                                        value={timingOptions.find(option => option.value === timingOption)} // Ensure value fallback to first option
                                                        components={customComponents}
                                                        onMenuOpen={() => handleMenuOpen('type')}
                                                        onMenuClose={() => handleMenuClose('type')}
                                                        placeholder="Text"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shrink basis-0 flex-col justify-start items-start gap-3 inline-flex pb-8">
                                        <div className="text-[#1e1e1e] text-2xl font-semibold font-['SF UI  Text'] leading-normal">Workplace type</div>
                                        <div className={`w-full px-3 py-1 bg-[#FFF] border ${dropdownState.workplace ? 'border-[#0072DC]' : 'border-[#B9B9B9]'} rounded-[10px] justify-start items-center gap-4 inline-flex`}>
                                            <div className="justify-start items-center gap-4 flex bg-[#FFF]">
                                                <div className="grow shrink basis-0 text-[#b9b9b9] text-base font-normal font-['SF UI  Text']">
                                                    <Select
                                                        // defaultValue={workplaceOptions[0]}
                                                        defaultValue={workplaceOptions.find((opt) => opt.value === workplaceOption)}
                                                        options={workplaceOptions}
                                                        styles={customStyles}
                                                        onChange={handleChangeWorkplaceOption}
                                                        value={workplaceOptions.find(option => option.value === workplaceOption)} // Ensure value fallback to first option
                                                        components={customComponents}
                                                        onMenuOpen={() => handleMenuOpen('workplace')}
                                                        onMenuClose={() => handleMenuClose('workplace')}
                                                        placeholder="Text"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full  bg-white rounded-[12.92px]  flex-col justify-start items-center gap-12 flex">
                            {/* AI Description */}
                            <div className="w-full h-[50vh] p-8 relative rounded-[6px] overflow-hidden flex flex-col gap-4 overflow-hidden" style={{
                                background: 'linear-gradient(135deg, rgba(0, 45, 191, 0.30) -1.89%, rgba(67, 150, 247, 0.24) 45.88%, rgba(255, 155, 210, 0.42) 76.85%, rgba(201, 255, 252, 0.42) 108.11%)'
                            }}>
                                <div className="w-fit px-[10.77px] py-[4.77px] bg-white/20 rounded-md flex-col justify-center items-start gap-[10.77px] inline-flex">
                                    <div className="justify-center items-center gap-[8.61px] inline-flex">
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.4946 5.52112C11.6149 5.19602 12.0747 5.19602 12.195 5.52112L13.7932 9.84008C13.9066 10.1467 14.1484 10.3885 14.455 10.5019L18.774 12.1001C19.0991 12.2204 19.0991 12.6802 18.774 12.8005L14.455 14.3987C14.1484 14.5121 13.9066 14.7539 13.7932 15.0605L12.195 19.3795C12.0747 19.7046 11.6149 19.7046 11.4946 19.3795L9.89646 15.0605C9.783 14.7539 9.54124 14.5121 9.23461 14.3987L4.91566 12.8005C4.59056 12.6802 4.59056 12.2204 4.91566 12.1001L9.23461 10.5019C9.54124 10.3885 9.783 10.1467 9.89646 9.84008L11.4946 5.52112Z" fill="url(#paint0_linear_276_2933)" />
                                            <path d="M17.9291 13.6756C17.9892 13.5131 18.2191 13.5131 18.2793 13.6756L18.6315 14.6274C18.6504 14.6785 18.6907 14.7188 18.7418 14.7378L19.6937 15.09C19.8562 15.1501 19.8562 15.38 19.6937 15.4402L18.7418 15.7924C18.6907 15.8113 18.6504 15.8516 18.6315 15.9027L18.2793 16.8545C18.2191 17.0171 17.9892 17.0171 17.9291 16.8545L17.5769 15.9027C17.558 15.8516 17.5177 15.8113 17.4666 15.7924L16.5147 15.4402C16.3522 15.38 16.3522 15.1501 16.5147 15.09L17.4666 14.7378C17.5177 14.7188 17.558 14.6785 17.5769 14.6274L17.9291 13.6756Z" fill="url(#paint1_linear_276_2933)" />
                                            <path d="M6.77979 1.86292C6.90009 1.53782 7.35991 1.53782 7.4802 1.86292L8.18021 3.75467C8.21803 3.85688 8.29862 3.93747 8.40083 3.97529L10.2926 4.6753C10.6177 4.7956 10.6177 5.25541 10.2926 5.37571L8.40083 6.07572C8.29862 6.11354 8.21803 6.19413 8.18021 6.29634L7.4802 8.18809C7.35991 8.51319 6.90009 8.51319 6.77979 8.18809L6.07978 6.29634C6.04196 6.19413 5.96137 6.11354 5.85916 6.07572L3.96741 5.37571C3.64231 5.25541 3.64231 4.7956 3.96741 4.6753L5.85916 3.97529C5.96137 3.93747 6.04196 3.85688 6.07978 3.75467L6.77979 1.86292Z" fill="url(#paint2_linear_276_2933)" />
                                            <path d="M16.0331 4.34058L16.5912 5.84856C16.6479 6.00188 16.7688 6.12276 16.9221 6.17949L18.4301 6.73749L16.9221 7.2955C16.7688 7.35223 16.6479 7.47311 16.5912 7.62643L16.0331 9.13441L15.4751 7.62643C15.4184 7.47311 15.2975 7.35223 15.1442 7.2955L13.6362 6.73749L15.1442 6.17949C15.2975 6.12276 15.4184 6.00188 15.4751 5.84856L16.0331 4.34058Z" fill="url(#paint3_linear_276_2933)" />
                                            <path d="M7.27742 15.3918C7.40882 15.2787 7.60992 15.3902 7.58375 15.5615L7.35997 17.0263C7.35174 17.0801 7.36746 17.1349 7.40299 17.1762L8.36929 18.2996C8.48232 18.431 8.37089 18.6321 8.19955 18.6059L6.73477 18.3821C6.6809 18.3739 6.62613 18.3896 6.58482 18.4252L5.46146 19.3915C5.33007 19.5045 5.12897 19.393 5.15514 19.2217L5.37892 17.7569C5.38715 17.7031 5.37143 17.6483 5.3359 17.607L4.3696 16.4836C4.25657 16.3522 4.368 16.1511 4.53934 16.1773L6.00412 16.4011C6.05799 16.4093 6.11276 16.3936 6.15407 16.3581L7.27742 15.3918Z" fill="url(#paint4_linear_276_2933)" />
                                            <defs>
                                                <linearGradient id="paint0_linear_276_2933" x1="21.7245" y1="25.5766" x2="4.65252" y2="3.9318" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0.340919" stopColor="#002DBF" />
                                                    <stop offset="0.479627" stopColor="#4396F7" />
                                                    <stop offset="0.634404" stopColor="#FF9BD2" />
                                                    <stop offset="0.815235" stopColor="#C9FFFC" />
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_276_2933" x1="17.0316" y1="14.3652" x2="20.1669" y2="19.1506" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#D388FF" />
                                                    <stop offset="0.695" stopColor="#4B94F7" />
                                                </linearGradient>
                                                <linearGradient id="paint2_linear_276_2933" x1="10.1954" y1="9.13454" x2="0.294706" y2="-2.0576" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0.0189477" stopColor="#89B5FF" />
                                                    <stop offset="0.745" stopColor="#002886" />
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_276_2933" x1="17.8213" y1="9.13443" x2="12.0459" y2="2.60568" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="white" />
                                                    <stop offset="0.315" stopColor="#FF8CB6" />
                                                </linearGradient>
                                                <linearGradient id="paint4_linear_276_2933" x1="6.81636" y1="20.6833" x2="4.71992" y2="11.2303" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#FF5FD7" />
                                                    <stop offset="0.545" stopColor="#C86AFF" />
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                        <div className="text-[#1e1e1e] text-xl font-bold font-['SF UI  Text'] leading-normal">Generating AI Description</div>                        </div>
                                </div>
                                <div className="overflow-y-auto">
                                    <textarea
                                        className="flex w-full text-[#6f6f6f] text-lg font-normal font-['SF UI Text'] leading-normal bg-transparent outline-none pr-2 border-box"
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}  // Handle state change
                                        rows={13}
                                        placeholder="Enter job description..."  // Optional for better UX
                                    ></textarea>
                                </div>
                            </div>

                            <div className='flex flex-col w-full gap-8'>
                                <div className='flex flex-col w-full gap-4'>
                                    <h1 className='text-2xl font-bold'>Main Skills</h1>
                                    <div className='flex gap-4 mt-4 flex-wrap'>
                                        {mainSkills.map((skill, index) => (
                                            <div
                                                key={index}
                                                className="h-10 px-5 py-3 bg-white rounded-3xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.40)] justify-center items-center gap-2 inline-flex"
                                            >
                                                <div className="text-[#161616] text-base font-medium font-['Inter'] leading-none">
                                                    {skill}
                                                </div>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            value={skillInput}
                                            onChange={(e) => setSkillInput(e.target.value)}
                                            onKeyDown={handleAddMainSkill}  // Listen for Enter key
                                            placeholder="Add Skill and press Enter"
                                            className="h-10 px-5 py-3 bg-white outline-none border border-[#46AEF1] rounded-3xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.40)] text-[#161616] text-base font-medium font-['Inter'] leading-none"
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col w-full gap-4'>
                                    <h1 className='text-2xl font-bold'>Sub Skills</h1>
                                    <div className='flex gap-4 mt-4 flex-wrap'>
                                        {subSkills.map((skill, index) => (
                                            <div
                                                key={index}
                                                className="h-10 px-5 py-3 bg-white rounded-3xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.40)] justify-center items-center gap-2 inline-flex"
                                            >
                                                <div className="text-[#161616] text-base font-medium font-['Inter'] leading-none">
                                                    {skill}
                                                </div>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            value={skillInput2}
                                            onChange={(e) => setSkillInput2(e.target.value)}
                                            onKeyDown={handleAddSubSkill}  // Listen for Enter key
                                            placeholder="Add Skill and press Enter"
                                            className="h-10 px-5 py-3 bg-white outline-none border border-[#46AEF1] rounded-3xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.40)] text-[#161616] text-base font-medium font-['Inter'] leading-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 my-8">
                            <div className='w-full flex gap-[8vw]'>
                                <div className='w-full flex flex-col gap-4 items-start'>
                                    <div className="text-[#1e1e1e] text-2xl font-semibold font-['SF UI  Text'] leading-normal">Salary Range</div>
                                    <div className='w-full flex gap-4'>
                                        <div className="w-full px-3 py-1 bg-[#F5F5F5] border border-[#B9B9B9] rounded-[10px] justify-start items-center gap-4 inline-flex">
                                            <div className="w-full justify-start items-center gap-4 flex bg-[#F5F5F5]">
                                                <input value={minSalary} onChange={(e) => setMinSalary(e.target.value)} type="number" placeholder='MIN' className="h-12 focus:outline-none bg-[#F5F5F5] grow basis-0 text-[#6f6f6f] text-lg font-medium font-['SF UI Text']" />
                                            </div>
                                        </div>
                                        <div className="w-full px-3 py-1 bg-[#F5F5F5] border border-[#B9B9B9] rounded-[10px] justify-start items-center gap-4 inline-flex">
                                            <div className="w-full justify-start items-center gap-4 flex bg-[#F5F5F5]">
                                                <input value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} type="number" placeholder='MAX' className="h-12 focus:outline-none bg-[#F5F5F5] grow basis-0 text-[#6f6f6f] text-lg font-medium font-['SF UI Text']" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full flex flex-col gap-4'>
                                    <div className="text-[#1e1e1e] text-2xl font-semibold font-['SF UI  Text'] leading-normal">Benefits</div>
                                    <div className="w-full flex flex-col gap-6 text-[#161616] text-base font-normal font-['SF UI Text']">
                                        <div className="flex justify-start gap-6">
                                            {/* Health Insurance */}
                                            <div className="flex gap-3 items-center p-2 w-[16vw]">
                                                <input
                                                    className="custom-radio"
                                                    id="healthInsurance"
                                                    type="radio"
                                                    value="Health Insurance"
                                                    checked={benefits.includes('Health Insurance')}
                                                    onClick={handleRadioChange}
                                                    onChange={() => { }}
                                                />
                                                <label htmlFor="healthInsurance" className="cursor-pointer">
                                                    Health Insurance
                                                </label>
                                            </div>

                                            {/* 401(k) */}
                                            <div className="flex gap-3 items-center p-2 w-[16vw]">
                                                <input
                                                    className="custom-radio"
                                                    id="k401"
                                                    type="radio"
                                                    value="401 (k)"
                                                    checked={benefits.includes('401 (k)')}
                                                    onClick={handleRadioChange}
                                                    onChange={() => { }}
                                                />
                                                <label htmlFor="k401" className="cursor-pointer">
                                                    401 (k)
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex justify-start gap-6">
                                            {/* Paid Time Off */}
                                            <div className="flex gap-3 items-center p-2 w-[16vw]">
                                                <input
                                                    className="custom-radio"
                                                    id="paidTimeOff"
                                                    type="radio"
                                                    value="Paid time off"
                                                    checked={benefits.includes('Paid time off')}
                                                    onClick={handleRadioChange}
                                                    onChange={() => { }}
                                                />
                                                <label htmlFor="paidTimeOff" className="cursor-pointer">
                                                    Paid Time Off
                                                </label>
                                            </div>

                                            {/* Remote Work */}
                                            <div className="flex gap-3 items-center p-2 w-[16vw]">
                                                <input
                                                    className="custom-radio"
                                                    id="remote"
                                                    type="radio"
                                                    value="Remote Work"
                                                    checked={benefits.includes('Remote Work')}
                                                    onClick={handleRadioChange}
                                                    onChange={() => { }}
                                                />
                                                <label htmlFor="remote" className="cursor-pointer">
                                                    Remote Work
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sites to post job */}
                            <div className='w-full flex flex-col gap-6'>
                                <div className='w-full flex flex-col'>
                                    <div className="text-[#1e1e1e] text-2xl font-semibold font-['SF UI  Text'] leading-normal">Job Portals</div>
                                    <div className="text-[#6f6f6f] text-base font-normal font-['SF UI  Text']">Select any 2 platforms for posting jobs for free</div>
                                </div>
                                <div className="h-10 justify-start items-start gap-6 inline-flex">
                                    {Object.entries(companies).map(([name, data]) => (
                                        <div key={name} onClick={() => handleSelectedComponies(name)} className={`p-2 bg-neutral-100 rounded justify-start items-center gap-2 flex cursor-pointer ${selectedCompany.includes(name) ? 'border border-[#0072DC] shadow-[0px_0px_8px_0px_rgba(120,127,252,0.40)]' : 'shadow-[0px_0px_8px_0px_rgba(0,0,0,0.40)]'}`}>
                                            <div className="w-6 h-6 justify-center items-center flex">
                                                <img className="w-6 h-6 rounded" src={data.icon} alt={name} />
                                            </div>
                                            <div className="text-[#161616] text-base font-semibold font-['SF UI  Text'] leading-none">
                                                {name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-end">
                        <button onClick={() => handleUpdateJobPost()} className="border-[2px] border-[#0072DC] px-[40px] text-[18px] font-semibold rounded-[30px] py-[10px] mt-10 w-fit">
                            Save
                        </button>
                    </div>

                </section>
            </main>
        </>
    );
};

export default JobPostUpdater;
