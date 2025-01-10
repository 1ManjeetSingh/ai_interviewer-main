import { React, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import linkedIn from '../assets/linkedIn.png';
import ziprecruiter from '../assets/ziprecruiter.png';
import AmazonLogo from '../assets/LogoAma.svg';
import image1 from "../assets/image1.png"
import image2 from '../assets/Aspireit.png';
import image3 from '../assets/Ellipse 1872.svg';
import image4 from '../assets/Type=Layila.svg';
import Select, { components } from 'react-select';
import { Dialog } from '@mui/material';
import Opportunities from '../Components/JobPost/opportunities';
import { toast, ToastContainer } from 'react-toastify';

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

const PostJobMain = () => {
    // company Cards variables
    const gradients = [
        'linear-gradient(319deg, #D388FF 5.96%, #4B94F6 95.49%)',
        'linear-gradient(90deg, #B054F6 0%, #FE52B0 100%)',
        'linear-gradient(90deg, #2890FA 0%, #6ED6F5 100%)',
        'linear-gradient(90deg, #FF0F7B 0%, #F89B29 100%)',
        'linear-gradient(94deg, #420167 -0.62%, #241C70 16.07%, #063678 29.18%, #2061F8 62.03%, #2D79F5 84.23%, #0FB3D4 100%)',
    ];

    const [jobCards, setJobCards] = useState({
        "Software Engineer" : {
            postedDate: "10-Jan-2025",
            companyName: "Amazon",
            role: "Software Engineer",
            detail: ["Full-Time", "On-site", "Health Insurance", "Paid Time Off"],
            skills: ["JavaScript", "ReactJS", "NodeJS", "MongoDB"],
            currentStatus: {
                "Candidates Applied": 15,
                "Completed Interview": 5,
            }
        },
        
        "Data Scientist" : {
            postedDate: "05-Jan-2025",
            companyName: "Google",
            role: "Data Scientist",
            detail: ["Full-Time", "Remote", "Gym Membership", "Stock Options"],
            skills: ["Python", "Machine Learning", "Data Analysis", "TensorFlow"],
            currentStatus: {
                "Candidates Applied": 30,
                "Completed Interview": 12,
            }
        },
        
        "UI/UX Designer" : {
            postedDate: "02-Jan-2025",
            companyName: "Meta",
            role: "UI/UX Designer",
            detail: ["Contract", "Hybrid", "Work from Home Allowance"],
            skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
            currentStatus: {
                "Candidates Applied": 10,
                "Completed Interview": 3,
            }
        },
        
        "DevOps Engineer" : {
            postedDate: "15-Dec-2024",
            companyName: "Microsoft",
            role: "DevOps Engineer",
            detail: ["Full-Time", "On-site", "401(k) Match", "Flexible Hours"],
            skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
            currentStatus: {
                "Candidates Applied": 20,
                "Completed Interview": 8,
            }
        },
    });
    const navigate = useNavigate();

    const fetchJobPosts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/alljobsposted/jobs_posted`);

            if (response.status === 200) {
                const jobs = response.data;
                const jobData = {};

                // Transform fetched data into jobCards format
                jobs.forEach((job) => {
                    jobData[job.jobTitle] = {
                        postId: job._id,
                        postedDate: new Date(job.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        }),
                        companyName: job.companyName || "Amazon",
                        role: job.jobTitle,
                        detail: [
                            job.jobType,
                            job.workplaceType,
                            ...(job.benefits || [])
                        ],
                        skills: job.mainSkills,
                        currentStatus: {
                            "Candidates Applied": 0,
                            "Completed Interview": 0,
                        }
                    };
                });

                // setJobCards(jobData);
            }
        } catch (error) {
            console.error('Error fetching job posts:', error);
        }
    };

    // Fetch job posts on component mount
    useEffect(() => {
        fetchJobPosts();
    }, []);

    // main variable 
    const [jobPost, setJobPost] = useState({
        jobTitle: '',
        designation: '',
        jobType: '',
        workplaceType: '',
        jobDescription: '',
        mainSkills: [],
        subSkills: [],
        salaryRange: {},
        benefits: [],
        jobPortalsPosting: [],
    });

    useEffect(() => {
        console.log(jobPost);
    }, [jobPost])

    const [jobDescription, setJobDescription] = useState("");
    const [mainSkills, setMainSkills] = useState([]);
    const [subSkills, setSubSkills] = useState([]);

    const [searchPhrase, setSearchPhrase] = useState('');
    const [isFocused1, setisFocused1] = useState(false);
    const inputRef = useRef(null);

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


    // DropDown variables
    const openJobOptions = [
        { value: 'senior', label: 'Senior' },
        { value: 'mid', label: 'Mid' },
        { value: 'junior', label: 'Junior' },
        { value: 'fresher', label: 'Fresher' },
        { value: 'intern', label: 'Intern' }
    ]
    const closedJobOptions = [
        { value: 'remote', label: 'Remote' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'onsite', label: 'On-site' },
    ]

    const handleChangeOpenJobOption = (selectedOption) => {
        setJobOption(selectedOption.value);
    };

    const handleChangeClosedJobOption = (selectedOption) => {
        setClosedJobOption(selectedOption.value);
    };

    const [openJobOption, setOpenJobOption] = useState();
    const [closedJobOption, setClosedJobOption] = useState();

    const [dropdownState, setDropdownState] = useState({
        openJob: false,
        closedJob: false,
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

    const customStylesJobPost = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "#FFF",
            border: "none",
            color: "#F5F5F5",
            height: "36px",
            width: "full",
            minWidth: "130px",
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
        input: (provided) => ({
            ...provided,
            caretColor: "transparent",
        }),
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
            maxWidth: "130px",
            maxHeight: "300px",
            overflowY: "auto",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            pointerEvents: 'auto',  // Ensure mouse events pass through
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#161616",
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
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "#FFF",
            border: "none",
            color: "#F5F5F5",
            height: "36px",
            width: "full",
            minWidth: "320px",
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
        input: (provided) => ({
            ...provided,
            caretColor: "transparent",
        }),
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
            maxWidth: "320px",
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

    // Dialog Variables
    //<----------- First Element Variables --------------->
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

    const [jobTitle, setJobTitle] = useState('');
    const [jobOption, setJobOption] = useState();
    const [workplaceOption, setWorkplaceOption] = useState();
    const [timingOption, setTimingOption] = useState();

    const handleChangeJobOption = (selectedOption) => {
        setJobOption(selectedOption.value);
    };

    const handleChangeWorkplaceOption = (selectedOption) => {
        setWorkplaceOption(selectedOption.value);
    };

    const handleChangeTimingOption = (selectedOption) => {
        setTimingOption(selectedOption.value);
    };


    //<----------- Second Element Variables -------------->
    const [minSalary, setMinSalary] = useState();
    const [maxSalary, setMaxSalary] = useState();
    const [benefits, setBenefits] = useState([]);

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
        'LinkedIn': {
            icon: linkedIn
        },
        'Naukri.com': {
            icon: "https://s3-alpha-sig.figma.com/img/5331/9b58/6f6c04300fc1ee80583629773cb036fd?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jGmE2xbPMYmmU020YKvyCmu7pkwFzK2rXN6a4F1wTv6d2lHWKjX94OdniyAEMyIOyKUQSBuMYp-PLNm8phXinvtA~DMLI5Qvs0yIJGH75aI~DGqrFKSoDitziwitaTt--7h7nrMV4VPqOWwJT5BcC6adPDQhoZ8wlpUG~rCG8ImYn0oSdeHvCN~E4iPrN8Zhd3tWE4WDhH1qRkRxMESgvTvuqv8K9N9mhXhpRsQMq-USOKiHr9J8gP0FP8Jks0WKZLPbKmWbb-8cOCjPPZ8-yM4en7Pdhegcht5aDn4iPkvMRSjgobHyC2K4Z7z3X8qIj54g6XfgkxGyCtcLMy~KYw__"
        },
        'Glassdoor': {
            icon: "https://s3-alpha-sig.figma.com/img/9831/46f1/9bddbe0da9db67153b96427e939e87c6?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N3-RtXhk4oe7QlWmA5wcRoAUYhz3uoIPZhy6aj1OV7ff4OsEXpLfaHQ8fbYH8S~vqFIWTS7g45cy8oOFfp4wVG48xy9hpF9~HdDEKA6fp9GsYqexk6boLJN0foiKxpczQPoPvjD45HYHqQwb1wbASSzJNe8nnHk2g0-JNNFSL4Xvijn~a3zpEU1hWs~cebjVDf-q0VKTZoQ-pjsmodflJR8ZbHfkkTbmpk2u-TQAqWakTLr4j-j5kBbHBaIR5fkl9M2bggCXVSeeNFJbY3UbTYwpvoEPRfmIwDoO7bKwvmU4GPOdYY0IOSx7lt05z3HpDIvbIDanSGFn2x52fCnyEw__"
        },
        'Foundit': {
            icon: "https://s3-alpha-sig.figma.com/img/30ba/6c8b/2fad2a15f0b8708429659322fdec1b9f?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HEzWApeISkA2BuTCfbcJ0N6Wl5-0-fYykTa8JDyoNGhSFLkbDvYuvxgDxPJlcM8CerKUeAo5YuCdFaJjVOcCxjXfjQqeeycdNz0mWaBgaM40E0TGeqRnOvQKdkDYJ~Gs08-wM4F5uSSHsL~VHmQXMqN6TQim5PV4L3Cb57W8lCL6WtDM~D9wlCgtLoEc19PUsfjsbs891i9KjSJLfTV3mkXH8qkSVxIMNG4NmY-Ux8LxHCv0niZRk3xZu2m5rarrEuoDzcmE09b~D7TvZIkANggc5sIigSUj4hWDP3rFgK2wVJHpaUFw6af1n-G7n1laIgl8GL34DyQ8FnulGhEmBQ__"
        },
        'Ziprecruiter': {
            icon: ziprecruiter
        }
    }

    const [selectedCompany, setSelectedCompany] = useState([]);

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

    useEffect(() => {
        console.log("selectedCompany :", selectedCompany);
    }, [selectedCompany])

    // Dialog Flow Variables
    const [openFirstComponent, setOpenFirstComponent] = useState(false);
    const [openSecondComponent, setOpenSecondComponent] = useState(false);
    const [openThirdComponent, setOpenThirdComponent] = useState(false);

    const toggleDialogFirstComponent = () => {
        setOpenFirstComponent(!openFirstComponent);
    };
    const toggleDialogSecondComponent = () => {
        setOpenSecondComponent(!openSecondComponent);
    };
    const toggleDialogThirdComponent = () => {
        setOpenThirdComponent(!openThirdComponent);
    };


    // <--------------- Third Element --------------->
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

    // <----------------- Saving Job Post Values ------------------->
    const handleSaveJob = (event) => {
        // Prevent the form from reloading
        event.preventDefault();

        setJobPost((prev) => ({
            ...prev,
            jobTitle: { jobTitle },
            designation: { jobOption },
            jobType: { timingOption },
            workplaceType: { workplaceOption },
        }))

        // Optionally, show a success message or redirect the user
        toast.success("Job post saved successfully!");
        console.log(jobPost);

        // Optionally, close the dialog after saving
        toggleDialogFirstComponent();
    };

    // Generate Description
    const [descriptionLoading, setDescriptionLoading] = useState(false);

    const handleGenerate = async (title, position) => {
        setDescriptionLoading(true);
        try {
            const res = await axios.post('http://127.0.0.1:5000/generate_job_description', {
                job_title: title,
                position: position
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: false  // Ensure credentials are not included (if not needed)
            });

            const data = res.data;

            if (res) {
                setJobDescription(data.job_description || "");
                setMainSkills(data.main_skills || []);
                setSubSkills(data.sub_skills || []);

                console.log({ jobDescription, mainSkills, subSkills });
            }

        } catch (error) {
            console.error('Error fetching job description:', error);

            if (error.response) {
                // Server responded with a status code other than 2xx
                toast.error(`Failed to generate job description: ${error.response.data.error || 'Unknown error'}`);
            } else if (error.request) {
                // Request made but no response received
                toast.error('No response from the server. Please check the connection.');
            } else {
                // Other errors
                toast.error('Request failed. Please try again.');
            }
        } finally {
            setDescriptionLoading(false);
        }
    };

    const handleFirstToSecondComponent = async (event) => {
        event.preventDefault();

        if (!jobTitle || !jobOption || !timingOption || !workplaceOption) {
            toast.error("Please fill in all the fields.");
            return;
        }

        const jobData = {
            jobTitle,
            designation: jobOption,
            jobType: timingOption,
            workplaceType: workplaceOption,
        };

        // try {
        // const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/alljobsposted/upload_job_posted`, jobData);

        // if (response.status === 201) {
        //     toast.success("Job post created successfully!");

        // const { _id } = response.data.job;

        // Save to state for further updates
        setJobPost((prev) => ({
            ...prev,
            ...jobData,
            // _id,
        }));

        handleGenerate(jobTitle, jobOption);

        toggleDialogFirstComponent();
        toggleDialogSecondComponent();
        // }
        // } catch (error) {
        //     console.error("Error uploading job post:", error);
        //     toast.error("Failed to upload job post. Please try again.");
        // }
    };

    const handleSecondToThirdComponent = async (event) => {
        event.preventDefault();

        if (!jobDescription || !mainSkills.length || !subSkills.length) {
            toast.error("Please fill in all the fields.");
            return;
        }

        const updatedJobData = {
            jobDescription,
            mainSkills,
            subSkills,
        };

        // try {
        //     const response = await axios.put(
        //         `${import.meta.env.VITE_BACKEND_BASE_URL}/api/alljobsposted/update_job_posted/${jobPost._id}`,
        //         updatedJobData
        //     );

        // if (response.status === 200) {
        //     toast.success("Job post updated successfully!");

        setJobPost((prev) => ({
            ...prev,
            ...updatedJobData,
        }));

        toggleDialogThirdComponent();
        toggleDialogSecondComponent();
        //     }
        // } catch (error) {
        //     console.error("Error updating job post:", error);
        //     toast.error("Failed to update job post. Please try again.");
        // }
    };

    const handleThirdComponentPostJob = async (event) => {
        event.preventDefault();

        // console.log(jobPost._id);
        if (!minSalary || !maxSalary || !selectedCompany.length) {
            toast.error("Please fill in all the fields.");
            return;
        } else if (Number(minSalary) > Number(maxSalary)) {
            toast.error("Please enter a correct Salary Range.");
            return;
        }

        const finalJobData = {
            salaryRange: {
                minSalary: Number(minSalary),
                maxSalary: Number(maxSalary),
            },
            benefits,
            jobPortalsPosting: selectedCompany,
        };

        setJobPost((prev) => ({
            ...prev,
            ...finalJobData,
        }));

        // console.log(finalJobData);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/alljobsposted/upload_job_posted`, jobPost);

            // const response = await axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/alljobsposted/job_posted/${jobPost._id}`,finalJobData);

            if (response.status === 200) {
                toast.success("Job post saved successfully!");

                // setJobPost((prev) => ({
                //     ...prev,
                //     ...finalJobData,
                // }));

                // Clear the form after saving
                setJobTitle("");
                setJobOption("");
                setTimingOption("");
                setWorkplaceOption("");
                setMinSalary(null);
                setMaxSalary(null);
                setBenefits([]);
                setSelectedCompany([]);

                // Optionally, close the dialog after saving
                toggleDialogThirdComponent();
                fetchJobPosts();
            }
        } catch (error) {
            console.error("Error saving job post:", error);
            toast.error("Failed to save job post. Please try again.");
        }
    };

    const handleThirdComponentSaveDraft = (event) => {
        event.preventDefault();

        if (Number(minSalary) > Number(maxSalary)) {
            toast.error("Please enter correct Salary Range.");
            return;
        }

        setJobPost((prev) => ({
            ...prev,
            salaryRange: { minSalary: minSalary, maxSalary: maxSalary },
            benefits: benefits,
            jobPortalsPosting: selectedCompany
        }))

        // Optionally, show a success message or redirect the user
        toast.success("Draft saved successfully!");

        // Optionally, close the dialog after saving
        toggleDialogThirdComponent();
    }

    const handleJobPostDetails = (postId) => {
        const handleNavigate = () => {
            // Navigate to the page with the postId as a query parameter
            navigate(`/jobpost_updater?postId=${postId}`);
          };
        
          return handleNavigate;
    }

    return (
        <div className='main-container min-h-[100vh] bg-white pb-8'>
            <ToastContainer />
            {/* Navbar */}
            <div className="NavBar w-full mx-[auto] h-[8vh] min-h-[42px] px-8 bg-white border border-[#D2D2D2] backdrop-blur-[220px] flex justify-between items-center hover:cursor-pointer">
                <div className="logo-container w-[130px] h-[5vh] min-h-[24px] relative  bg-[#FFF]">
                    <div className="Rectangle7391 w-[9vw] h-[4.5vh] min-h-[24px] relative bg-[#0F0F36] rounded-[6px]" />
                    <div className="logo w-[9vw] h-[4vh] min-h-[24px] absolute left-[0px] top-[1px] bg-none flex justify-center items-center gap-[0.3vw]" >
                        <img className="Aspireit w-[1.5vw] bg-transparent shrink-0" src={image1} />
                        <img className="Group1000007770 bg-transparent w-[5vw] h-[2vh] shrink-0" src={image2} />
                    </div>
                </div>
                <div className="SearchBarContainer w-full flex grow justify-center items-center gap-4 bg-none">
                    <div className='InputContainer w-[55%] flex justify-start items-center gap-4 h-[5vh] min-h-[24px] pl-6 pr-6 bg-[#F2F2F2] shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] rounded-[32px]' >
                        <div className='searchBar inline-flex items-center h-[5vh] w-full bg-[#F2F2F2]'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="none" className={`w-[3vh] h-[3vh] shrink-0 rounded-full mr-1 ${isFocused1 ? 'transform scale-110 transition-transform duration-300' : ''}`}   >
                                <path d="M9.49996 2.75C8.16495 2.75 6.85991 3.14588 5.74989 3.88757C4.63986 4.62927 3.7747 5.68347 3.26381 6.91686C2.75292 8.15026 2.61925 9.50745 2.8797 10.8168C3.14015 12.1262 3.78302 13.3289 4.72702 14.2729C5.67102 15.2169 6.87375 15.8598 8.18311 16.1202C9.49248 16.3807 10.8497 16.247 12.0831 15.7361C13.3165 15.2252 14.3707 14.3601 15.1124 13.25C15.854 12.14 16.2499 10.835 16.2499 9.49996C16.2498 7.70979 15.5386 5.99298 14.2728 4.72714C13.0069 3.46131 11.2901 2.75011 9.49996 2.75Z" stroke="#353535" strokeWidth="2" strokeMiterlimit="10" />
                                <path d="M14.666 14.668L18.3327 18.3346" stroke="#353535" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
                            </svg>
                            <input
                                className='justify-start px-2 w-full max-w-[657px] text-[#353535] py-[0.5vh] text-[2vh] leading-[18px] border-0 bg-[#F2F2F2] focus:outline-none focus:text-[#353535]'
                                onClick={focusInput}
                                type="text" name='searchBar'
                                value={isFocused1 ? searchPhrase : ''}
                                onChange={handleSearch}
                                onFocus={() => setisFocused1(true)}
                                onBlur={() => setisFocused1(false)}
                                placeholder='Search'
                                ref={inputRef} />
                        </div>
                    </div>
                </div>

                <div className="Frame1000008205 flex justify-start items-center w-fit gap-[1vw] bg-none" >
                    <div className="Frame1000008204 px-[2vh] py-[2px] bg-[#F2F2F2] flex justify-start items-center shadow-[0px_0px_6px_rgba(0,_0,_0,_0.25)] rounded-[40px] backdrop-blur-[4px]">
                        <div className="ButtonsNotification w-[5vh] min-w-[24px] h-[5vh] min-h-[24px] mr-[1.5vh] relative bg-[#F2F2F2]" >
                            <div className="Ellipse w-[5vh] h-[5vh] min-w-[24px] min-h-[24px] absolute left-0 top-0 bg-white rounded-full" />
                            <div className="IconsBell w-[4vh] h-[4vh] min-w-[18px] min-h-[18px] absolute left-[1vh] top-[1vh] bg-none hover:transform hover:scale-[1.08] hover:transition-transform hover:duration-300" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className='w-[3vh] h-[3vh] min-w-[16px] min-h-[16px]'>
                                    <path d="M21 6.50001C21 8.43001 19.43 10 17.5 10C15.57 10 14 8.43001 14 6.50001C14 4.57001 15.57 3.00001 17.5 3.00001C19.43 3.00001 21 4.57001 21 6.50001ZM19 11.79C18.5 11.92 18 12 17.5 12C16.0421 11.9974 14.6447 11.4171 13.6138 10.3862C12.583 9.3553 12.0026 7.95788 12 6.50001C12 5.03001 12.58 3.70001 13.5 2.71001C13.3185 2.48755 13.0897 2.30838 12.8302 2.18555C12.5707 2.06272 12.2871 1.99934 12 2.00001C10.9 2.00001 10 2.90001 10 4.00001V4.29001C7.03 5.17001 5 7.90001 5 11V17L3 19V20H21V19L19 17V11.79ZM12 23C13.11 23 14 22.11 14 21H10C10 21.5304 10.2107 22.0391 10.5858 22.4142C10.9609 22.7893 11.4696 23 12 23Z" fill="#0072DC" />
                                </svg>
                            </div>
                        </div>
                        <div className="Profile flex justify-end items-center bg-[#F2F2F2] hover:transform hover:scale-[1.08] hover:transition-transform hover:duration-300" >
                            <img className="AvatarPic w-[5vh] min-w-[24px] bg-none rounded-full" src={image3} />
                        </div>
                    </div>
                    <div className="Ai w-[4.5vw] min-w-[42px] bg-none" >
                        <img className="Layila h-[7.5vh] bg-none rounded-full hover:transform hover:scale-[1.08] hover:transition-transform hover:duration-300" src={image4} />
                    </div>
                </div>
            </div>

            {/*<------------------- Job Post ---------------> */}
            <div className='flex flex-col gap-[5vh] mx-[6vw] mt-[5vh]'>
                <div className="flex w-full px-9 py-4 bg-neutral-100 rounded-lg justify-between items-center inline-flex">
                    <div className="justify-start items-center gap-4 flex">
                        <div className={`w-full px-3 py-1 bg-[#FFF] border ${dropdownState.openJob ? 'border-[#0072DC]' : 'border-[#B9B9B9]'} rounded-[10px] justify-start items-center gap-4 inline-flex`}>
                            <div className="justify-start items-center gap-4 flex bg-[#FFF]">
                                <div className="grow shrink basis-0 text-[#b9b9b9] text-base font-normal font-['SF UI  Text']">
                                    <Select
                                        defaultValue={openJobOptions.find(option => option.value === openJobOption)} // Set the default value to the first option
                                        options={openJobOptions}
                                        styles={customStylesJobPost}
                                        onChange={handleChangeOpenJobOption}
                                        value={openJobOptions.find(option => option.value === openJobOption)} // Ensure value fallback to first option
                                        components={customComponents}
                                        onMenuOpen={() => handleMenuOpen('openJob')}
                                        onMenuClose={() => handleMenuClose('openJob')}
                                        placeholder="Open Jobs"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`w-full px-3 py-1 bg-[#FFF] border ${dropdownState.closedJob ? 'border-[#0072DC]' : 'border-[#B9B9B9]'} rounded-[10px] justify-start items-center gap-4 inline-flex`}>
                            <div className="justify-start items-center gap-4 flex bg-[#FFF]">
                                <div className="grow shrink basis-0 text-[#b9b9b9] text-base font-normal font-['SF UI  Text']">
                                    <Select
                                        // defaultValue={closedJobOptions[0]}
                                        defaultValue={closedJobOptions.find((opt) => opt.value === closedJobOption)}
                                        options={closedJobOptions}
                                        styles={customStylesJobPost}
                                        onChange={handleChangeClosedJobOption}
                                        value={closedJobOptions.find(option => option.value === closedJobOption)} // Ensure value fallback to first option
                                        components={customComponents}
                                        onMenuOpen={() => handleMenuOpen('closedJob')}
                                        onMenuClose={() => handleMenuClose('closedJob')}
                                        placeholder="Closed Jobs"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div onClick={toggleDialogFirstComponent} className=" ButtonsCta h-[5vh] px-4 rounded-[30px] justify-center items-center gap-4 inline-flex hover:cursor-pointer bg-question_gradient">
                        <div className="flex Text items-center text-center text-white text-[2vh] font-regular gap-1">
                            <svg style={{ width: 'clamp(14px,1.8vh,1.8vh)', height: 'clamp(14px,1.8vh,1.8vh)' }} viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.39632 5.41047C9.57676 4.92282 10.2665 4.92282 10.4469 5.41047L11.974 9.53725C12.1442 9.9972 12.5068 10.3598 12.9668 10.53L17.0935 12.0571C17.5812 12.2375 17.5812 12.9273 17.0935 13.1077L12.9668 14.6347C12.5068 14.8049 12.1442 15.1676 11.974 15.6275L10.4469 19.7543C10.2665 20.242 9.57676 20.242 9.39632 19.7543L7.86927 15.6275C7.69907 15.1676 7.33643 14.8049 6.87649 14.6347L2.7497 13.1077C2.26205 12.9273 2.26205 12.2375 2.7497 12.0571L6.87649 10.53C7.33643 10.3598 7.69907 9.9972 7.86927 9.53725L9.39632 5.41047Z" fill="white" />
                                <path d="M16.4871 14.1125C16.5773 13.8687 16.9222 13.8687 17.0124 14.1125L17.3128 14.9244C17.3412 15.001 17.4016 15.0615 17.4783 15.0898L18.2901 15.3903C18.534 15.4805 18.534 15.8253 18.2901 15.9156L17.4783 16.216C17.4016 16.2443 17.3412 16.3048 17.3128 16.3814L17.0124 17.1933C16.9222 17.4371 16.5773 17.4371 16.4871 17.1933L16.1867 16.3814C16.1583 16.3048 16.0979 16.2443 16.0212 16.216L15.2094 15.9156C14.9656 15.8253 14.9656 15.4805 15.2094 15.3902L16.0212 15.0898C16.0979 15.0615 16.1583 15.001 16.1867 14.9244L16.4871 14.1125Z" fill="white" />
                                <path d="M4.25289 1.41963C4.43334 0.931975 5.12306 0.931977 5.30351 1.41963L5.89951 3.03031C5.95625 3.18362 6.07713 3.3045 6.23044 3.36123L7.84112 3.95724C8.32877 4.13768 8.32877 4.82741 7.84112 5.00786L6.23044 5.60386C6.07713 5.66059 5.95625 5.78147 5.89951 5.93479L5.30351 7.54547C5.12306 8.03312 4.43334 8.03312 4.25289 7.54547L3.65689 5.93479C3.60015 5.78147 3.47927 5.66059 3.32596 5.60386L1.71528 5.00786C1.22763 4.82741 1.22763 4.13768 1.71528 3.95724L3.32596 3.36123C3.47928 3.3045 3.60015 3.18362 3.65689 3.03031L4.25289 1.41963Z" fill="white" />
                                <path d="M14.4904 3.73547L15.0625 5.28173C15.1476 5.51171 15.329 5.69303 15.5589 5.77812L17.1052 6.35029L15.5589 6.92246C15.329 7.00756 15.1476 7.18888 15.0625 7.41885L14.4904 8.96511L13.9182 7.41885C13.8331 7.18888 13.6518 7.00756 13.4218 6.92246L11.8755 6.35029L13.4218 5.77812C13.6518 5.69303 13.8331 5.51171 13.9182 5.28173L14.4904 3.73547Z" fill="white" />
                                <path d="M4.78244 15.9258C4.97954 15.7563 5.28118 15.9234 5.24192 16.1804L5.03428 17.5396C5.02194 17.6204 5.04551 17.7025 5.09881 17.7645L5.99545 18.8069C6.16499 19.004 5.99784 19.3056 5.74084 19.2664L4.38166 19.0587C4.30086 19.0464 4.2187 19.0699 4.15673 19.1232L3.11436 20.0199C2.91727 20.1894 2.61562 20.0223 2.65488 19.7653L2.86252 18.4061C2.87487 18.3253 2.85129 18.2431 2.79799 18.1812L1.90136 17.1388C1.73182 16.9417 1.89897 16.6401 2.15597 16.6793L3.51515 16.887C3.59595 16.8993 3.67811 16.8757 3.74007 16.8224L4.78244 15.9258Z" fill="white" />
                            </svg>

                            Post job with AI</div>
                    </div>
                </div>
                <div className='flex flex-wrap w-full justify-center bg-none'>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', boxSizing: 'border-box', gap: 24 }}>
                        {Object.keys(jobCards).map((jobKey, index) => {
                            const job = jobCards[jobKey];
                            const gradientIndex = index % 5;
                            return (
                                <div key={jobKey} onClick={handleJobPostDetails(jobCards[jobKey].postId)} className='cursor-default'>
                                    <div style={{ width: 525, height: 'auto', paddingTop: 12, paddingBottom: 28, paddingLeft: 12, paddingRight: 12, background: 'white', boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.25)', borderRadius: 32, border: '0.50px #D388FF solid', backdropFilter: 'blur(16px)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 16, display: 'inline-flex' }}>
                                        <div style={{ alignSelf: 'stretch', height: 'auto', padding: 24, background: '#F5F5F5', boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.25) inset', borderRadius: 24, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex' }}>
                                            <div style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                                                <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                                                    <div style={{ width: 'auto', height: '100%', padding: 8, background: 'white', borderRadius: 24, backdropFilter: 'blur(16px)', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex', color: '#0072DC', fontSize: 12, fontWeight: '600', wordWrap: 'break-word' }}>
                                                        {job.postedDate}
                                                    </div>

                                                    <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                                                        <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                                                            <div style={{ padding: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex', textAlign: 'center', color: '#55557C', fontSize: 18, fontWeight: '600', height: 18, wordWrap: 'break-word' }}>
                                                                {job.companyName}
                                                            </div>
                                                            <div style={{ padding: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex', background: gradients[gradientIndex], WebkitBackgroundClip: 'text', textAlign: 'center', color: 'transparent', fontSize: 28, fontWeight: '700', wordWrap: 'break-word', lineHeight: 'auto' }}>
                                                                {job.role}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <img src={AmazonLogo} alt="Company Logo" />
                                            </div>

                                            <div style={{ width: '100%', height: '100%', minHeight: '53px', boxShadow: '0px 0px 4px #C9FFFC', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex', flexWrap: 'wrap' }}>
                                                {job.detail.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        style={{ position: 'relative', display: 'flex', borderRadius: '8px', background: gradients[gradientIndex], padding: '1.5px', flexWrap: 'wrap' }}
                                                    >
                                                        {/* Inner content area with white background */}
                                                        <div style={{ borderRadius: '6px', backgroundColor: '#F5F5F5', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4px' }}>
                                                            {/* Gradient Text */}
                                                            <div style={{ background: gradients[gradientIndex], WebkitBackgroundClip: 'text', color: 'transparent', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.48px', lineHeight: '1', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                                                {item}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex' }}>
                                                <div className='customScrollbar border-box py-2' style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex', overflowX: 'auto' }}>
                                                    {job.skills.map((item, index) => (
                                                        <div key={index} style={{ whiteSpace: 'nowrap', padding: 8, background: 'white', borderRadius: 24, backdropFilter: 'blur(16px)', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex', color: '#1E1E1E', fontSize: 12, fontWeight: '600', wordWrap: 'break-word' }}>
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div style={{ alignSelf: 'stretch', paddingTop: 4, paddingBottom: 4, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex' }}>
                                                    {Object.entries(job.currentStatus).map(([key, value], index) => (
                                                        <div key={index} style={{ flex: '1 1 0', height: 36, paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, background: 'rgba(255, 255, 255, 0.35)', boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.25)', borderRadius: 12, border: '1px #DCFFFF solid', justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
                                                            <div style={{ color: '#55557C', fontSize: 14, fontWeight: '400', wordWrap: 'break-word' }}>
                                                                {key}
                                                            </div>
                                                            <div style={{ textAlign: 'right', color: '#55557C', fontSize: 20, fontWeight: '600', wordWrap: 'break-word' }}>
                                                                {value}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='Ai' style={{ padding: '0 16px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
                                            <div style={{ background: gradients[gradientIndex], WebkitBackgroundClip: 'text', color: 'transparent', fontSize: 20, fontWeight: '700', lineHeight: 'auto', wordWrap: 'break-word' }}>
                                                AI Interview In progress
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Dialogs */}
            <Dialog
                sx={{
                    "& .MuiDialog-paper": {
                        minWidth: '1068px',
                        borderRadius: '10px',
                        background: "#FFF",
                        boxShadow: '0px 0px 4px 0px #D388FF',
                    },
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                }}
                open={openFirstComponent}
                onClose={(event, reason) => {
                    // Prevent closing when clicking outside or pressing Escape
                    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                        event.stopPropagation();
                    } else {
                        toggleDialogFirstComponent(); // Your closing logic
                    }
                }}
                disableEscapeKeyDown
            >
                {/*/////////////////// First Element ////////////////// */}
                <div className="w-full px-12 py-4 bg-white rounded-[9.26px] flex-col justify-center items-center gap-10 flex">

                    {/* Section-1 Heading */}
                    <div className="self-stretch h-[59.82px] flex-col justify-center items-center gap-3 flex">
                        <div className="text-black text-[32px] font-bold font-['SF UI  Text'] leading-10">Smart hiring starts here</div>
                    </div>

                    {/* Section-2 */}
                    <div className="self-stretch flex-col justify-start items-start gap-14 flex">
                        <div className="flex flex-col justify-start items-start gap-5 w-full">
                            <div className="text-[#1e1e1e] text-xl font-semibold font-['SF UI  Text'] leading-normal">Create new job post</div>

                            {/* new job post */}
                            <div className="w-full py-[6.97px] px-[12.97px] bg-[#FAFAFA] rounded-[11.11px] border border-[#B9B9B9] flex-col justify-center items-start gap-[12.97px] flex">
                                <input
                                    className='justify-start px-2 w-full text-[#353535] py-[0.5vh] text-[2vh] leading-[18px] bg-[#FAFAFA] focus:outline-none focus:text-[#353535]'
                                    type="text"
                                    name="jobTitle"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    placeholder="Enter Job Title"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex">
                            <div className="text-[#1e1e1e] text-xl font-semibold font-['SF UI  Text'] leading-normal">Designation</div>
                            <div className={`w-full px-3 py-1 bg-[#FFF] border ${dropdownState.role ? 'border-[#0072DC]' : 'border-[#B9B9B9]'} rounded-[10px] justify-start items-center gap-4 inline-flex`}>
                                <div className="justify-start items-center gap-4 flex bg-[#FFF]">
                                    <div className="grow shrink basis-0 text-[#b9b9b9] text-base font-normal font-['SF UI  Text']">
                                        <Select
                                            defaultValue={jobOptions.find(option => option.value === jobOption)}
                                            options={jobOptions}
                                            styles={customStyles}
                                            onChange={handleChangeJobOption}
                                            value={jobOptions.find(option => option.value === jobOption)}
                                            components={customComponents}
                                            onMenuOpen={() => handleMenuOpen('role')}
                                            onMenuClose={() => handleMenuClose('role')}
                                            placeholder="Select Designation"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* DropDowns */}
                        <div className="self-stretch flex-col justify-start items-end gap-6 flex">
                            <div className="self-stretch justify-start items-start gap-[5vw] inline-flex">
                                <div className="shrink basis-0 flex-col justify-start items-start gap-3 inline-flex">
                                    <div className="text-[#1e1e1e] text-xl font-semibold font-['SF UI  Text'] leading-normal">Job Type</div>
                                    <div className={`w-full px-3 py-1 bg-[#FFF] border ${dropdownState.type ? 'border-[#0072DC]' : 'border-[#B9B9B9]'} rounded-[10px] justify-start items-center gap-4 inline-flex`}>
                                        <div className="justify-start items-center gap-4 flex bg-[#FFF]">
                                            <div className="grow shrink basis-0 text-[#b9b9b9] text-base font-normal font-['SF UI  Text']">
                                                <Select
                                                    defaultValue={timingOptions.find(option => option.value === timingOption)}
                                                    options={timingOptions}
                                                    styles={customStyles}
                                                    onChange={handleChangeTimingOption}
                                                    value={timingOptions.find(option => option.value === timingOption)}
                                                    components={customComponents}
                                                    onMenuOpen={() => handleMenuOpen('type')}
                                                    onMenuClose={() => handleMenuClose('type')}
                                                    placeholder="Select Job Type"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="shrink basis-0 flex-col justify-start items-start gap-3 inline-flex pb-8">
                                    <div className="text-[#1e1e1e] text-xl font-semibold font-['SF UI  Text'] leading-normal">Workplace type</div>
                                    <div className={`w-full px-3 py-1 bg-[#FFF] border ${dropdownState.workplace ? 'border-[#0072DC]' : 'border-[#B9B9B9]'} rounded-[10px] justify-start items-center gap-4 inline-flex`}>
                                        <div className="justify-start items-center gap-4 flex bg-[#FFF]">
                                            <div className="grow shrink basis-0 text-[#b9b9b9] text-base font-normal font-['SF UI  Text']">
                                                <Select
                                                    defaultValue={workplaceOptions.find((opt) => opt.value === workplaceOption)}
                                                    options={workplaceOptions}
                                                    styles={customStyles}
                                                    onChange={handleChangeWorkplaceOption}
                                                    value={workplaceOptions.find(option => option.value === workplaceOption)}
                                                    components={customComponents}
                                                    onMenuOpen={() => handleMenuOpen('workplace')}
                                                    onMenuClose={() => handleMenuClose('workplace')}
                                                    placeholder="Select Workplace Type"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Create Job Button */}
                        <div className="flex w-full justify-end pt-4 pb-6 gap-8">
                            <button
                                type="submit"
                                className="h-[48.28px] px-5 rounded-[30px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border border-[#0071db] justify-center items-center gap-2 inline-flex"
                                onClick={handleSaveJob}
                            >
                                <div className="text-center text-[#0071db] text-xl font-semibold font-['SF UI Text'] leading-tight cursor-pointer">Save</div>
                            </button>
                            <button
                                type="submit"
                                onClick={handleFirstToSecondComponent}
                                className="ButtonsCta w-[260.14px] h-[48.28px] px-4 rounded-[30px] justify-center items-center gap-3 inline-flex hover:cursor-pointer bg-question_gradient"
                            >
                                <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.2829 5.92125C10.4804 5.38759 11.2352 5.38759 11.4327 5.92125L13.1038 10.4374C13.29 10.9408 13.6869 11.3376 14.1902 11.5239L18.7064 13.195C19.2401 13.3925 19.2401 14.1473 18.7064 14.3448L14.1902 16.0159C13.6869 16.2022 13.29 16.599 13.1038 17.1024L11.4327 21.6185C11.2352 22.1522 10.4804 22.1522 10.2829 21.6185L8.61177 17.1024C8.42551 16.599 8.02866 16.2022 7.52531 16.0159L3.00914 14.3448C2.47548 14.1473 2.47548 13.3925 3.00914 13.195L7.52531 11.5239C8.02866 11.3376 8.42551 10.9408 8.61177 10.4374L10.2829 5.92125Z" fill="white" />
                                    <path d="M18.0428 15.4443C18.1415 15.1774 18.5189 14.9265 18.7858 15.0253L20.5615 15.5968C21.1061 15.7908 21.1061 16.5039 20.5615 16.6979L18.7858 17.2694C18.5189 17.3681 18.1415 17.1173 18.0428 16.8503L17.2515 14.7538C17.1532 14.4867 17.4663 14.1758 17.7466 14.2535L19.1897 14.6061L18.0428 15.4443Z" fill="white" />
                                </svg>
                                <div className="text-white text-xl font-semibold font-['SF UI Text'] leading-tight">Create Job Post with AI</div>
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>


            <Dialog
                sx={{
                    "& .MuiDialog-paper": {
                        minWidth: '1068px',
                        borderRadius: '10px',
                        // border: '1px solid var(--logo-gr-Blue-to-pink, #D388FF)',
                        background: "#FFF",
                        boxShadow: '0px 0px 4px 0px #D388FF',
                    },
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                }}
                open={openSecondComponent}
                onClose={(event, reason) => {
                    // Prevent closing when clicking outside or pressing Escape
                    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                        event.stopPropagation();
                    } else {
                        toggleDialogFirstComponent(); // Your closing logic
                    }
                }}
                disableEscapeKeyDown
            >
                {/*/////////////////// Third Element /////////////////////*/}
                <div className="w-full p-9 bg-white rounded-[12.92px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.40)] flex-col justify-start items-center gap-12 flex">

                    {/* AI Description */}
                    <div className="w-full h-[35vh] p-8 relative rounded-[6px] overflow-hidden flex flex-col gap-4 overflow-hidden" style={{
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
                                rows={10}
                                placeholder="Enter job description..."  // Optional for better UX
                            ></textarea>
                        </div>
                    </div>

                    {!descriptionLoading && <div className='flex flex-col w-full gap-8'>
                        <div className='flex flex-col w-full gap-4'>
                            <h1 className='text-xl'>Main Skills</h1>
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
                            <h1 className='text-xl'>Sub Skills</h1>
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
                    </div>}

                    <div className='w-full flex justify-end'>
                        <div onClick={handleSecondToThirdComponent} className="h-[43.06px] px-[17.22px] bg-[#0071db] rounded-[32.30px] border-2 border-[#0071db] justify-center items-center gap-[4.31px] inline-flex cursor-pointer">
                            <div className="text-center text-white text-[15.07px] font-semibold font-['SF UI Text'] leading-[15.07px]">Save</div>
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog
                sx={{
                    "& .MuiDialog-paper": {
                        minWidth: '1068px',
                        borderRadius: '10px',
                        // border: '1px solid var(--logo-gr-Blue-to-pink, #D388FF)',
                        background: "#FFF",
                        boxShadow: '0px 0px 4px 0px #D388FF',
                    },
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                }}
                open={openThirdComponent}
                onClose={(event, reason) => {
                    // Prevent closing when clicking outside or pressing Escape
                    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                        event.stopPropagation();
                    } else {
                        toggleDialogFirstComponent(); // Your closing logic
                    }
                }}
                disableEscapeKeyDown
            >
                {/*/////////////////// Third Element /////////////////////*/}
                <div className="w-full p-10 bg-white rounded-[12.92px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.40)] flex-col justify-start items-center gap-14 flex">

                    {/* AI Description */}
                    <div className="w-full p-8 relative rounded-[6px] overflow-hidden flex flex-col gap-4 overflow-hidden" style={{
                        background: 'linear-gradient(135deg, rgba(0, 45, 191, 0.30) -1.89%, rgba(67, 150, 247, 0.24) 45.88%, rgba(255, 155, 210, 0.42) 76.85%, rgba(201, 255, 252, 0.42) 108.11%)'
                    }}>
                        <div className="w-fit p-[10.77px] bg-white/20 rounded-md flex-col justify-center items-start gap-[10.77px] inline-flex">
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

                                <div className="text-[#1e1e1e] text-lg font-medium font-['SF Pro Display'] leading-tight">Generating AI Description</div>
                            </div>
                        </div>
                        <div>
                            <div className="custom-scrollbar border-box pr-4 w-[100%] h-[80px] text-[#6f6f6f] text-lg font-normal font-['SF UI Text']" style={{ overflowY: 'scroll' }}>
                                Innovatech Solutions is a cutting-edge technology firm dedicated to revolutionizing the way businesses operate. Founded in 2023, we specialize in developing innovative software solutions that streamline processes and enhance productivity. Our team of experts is passionate about harnessing the power of artificial intelligence and machine learning to create tools that empower organizations to thrive in a competitive landscape. At Innovatech, we believe in a future where technology and creativity go hand in hand, driving success for our clients across various industries.<br />
                                At Innovatech Solutions, we’re all about shaking things up in the tech world! Since 2023, we’ve been crafting cool software that helps businesses run smoother and get more done. Our awesome team loves using AI and machine learning to whip up tools that help companies stand out in today’s fast-paced market. We’re all about blending tech with creativity to help our clients succeed in all sorts of industries.</div>
                        </div>
                    </div>

                    <div className='w-full flex gap-[8vw]'>
                        <div className='w-full flex flex-col gap-4 items-start'>
                            <div className="text-[#1e1e1e] text-xl font-semibold font-['SF UI  Text'] leading-normal">Salary Range</div>
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
                            <div className="text-[#1e1e1e] text-xl font-semibold font-['SF UI  Text'] leading-normal">Benefits</div>
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
                            <div className="text-[#1e1e1e] text-xl font-semibold font-['SF UI  Text'] leading-normal">Job Portals</div>
                            <div className="text-[#6f6f6f] text-base font-normal font-['SF UI  Text']">Select any 2 platforms for posting jobs for free</div>
                        </div>
                        <div className="h-10 justify-start items-center gap-6 inline-flex">
                            {Object.entries(companies).map(([name, data]) => (
                                <div key={name} onClick={() => handleSelectedComponies(name)} className={`p-2 bg-neutral-100 rounded justify-start items-center gap-2 flex cursor-pointer w-[120px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.40)] ${selectedCompany.includes(name) ? 'border border-[#0072DC]' : ''}`}>
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

                    <div className='w-full flex'>
                        <div className='flex grow justify-start'>
                            <div className="px-[17.22px] rounded-[32.30px] justify-center items-center gap-[4.31px] inline-flex cursor-pointer" onClick={handleThirdComponentSaveDraft}>
                                <div className="text-center text-[#0071db] text-xl font-normal font-['SF UI Text'] leading-tight">Save as Draft</div>
                            </div>
                        </div>
                        <div className='w-fit flex justify-between gap-6'>
                            <div className="h-[43.06px] px-[17.22px] rounded-[32.30px] border-2 border-[#0072dc] justify-center items-center gap-[4.31px] inline-flex">
                                <div className="text-center text-[#0071db] text-[15.07px] font-semibold font-['SF UI Text'] leading-[15.07px]">Preview</div>
                            </div>
                            <div onClick={handleThirdComponentPostJob} className="h-[43.06px] px-[17.22px] bg-[#0071db] rounded-[32.30px] border-2 border-[#0071db] justify-center items-center gap-[4.31px] inline-flex cursor-pointer">
                                <div className="text-center text-white text-[15.07px] font-semibold font-['SF UI Text'] leading-[15.07px]">Post Job</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>

        </div>
    )
}

export default PostJobMain;