import { useState, useRef, useEffect } from "react";
import Logo from "../assets/aspireit logo.png";
import image1 from "../assets/image1.png"
import image2 from '../assets/Aspireit.png';
import image3 from '../assets/Ellipse 1872.svg';
import image4 from '../assets/Type=Layila.svg';
import image5 from '../assets/Group.svg';
import Arrow from "../assets/downArrow.svg";
import Gradient from "../assets/Gradient.png";
import Company from "../assets/company logo.png";
import Location from "../assets/location.png";
import Briefcase from "../assets/briefcase.png";
import Ellipse from "../assets/Ellipse.png";
import Ellipse1 from "../assets/Ellipse 2013.png";
import Sanjay from '../assets/sanjay.jpeg';
import Mukesh from '../assets/mukesh.jpeg';
import Debaleena from '../assets/debaleena.jpg';
import Manjeet from '../assets/manjeet.jpeg';
import Priyansh from '../assets/priyansh.jpg';
import Bieden from '../assets/bieden.jpeg';
import Joe from '../assets/joe.jpeg';
import Rajan from '../assets/rajan.jpg';
import hamburgerBar from "../assets/hamburgerBar.png";
import Star from "../assets/star.svg";
import Card from "../Components/card";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import ReactPaginate from "react-paginate";
import Navbar from "../Components/Navbar";

const ApplicantResult = () => {
  const candidates = [
    {
      name: "Sanjay Prasath",
      title: "MERN Stack",
      location: "India",
      experience: 12,
      appliedDaysAgo: 15,
      src: Sanjay,
      rounds: [
        { progress: 85, name: "Round 1", description: "Technical" },
        { progress: 95, name: "Round 2", description: "HR Interview" },
      ],
      recommanded : false,
    },
    {
      name: "Mukesh",
      title: "React developer",
      location: "America",
      experience: 6,
      appliedDaysAgo: 13,
      src: Mukesh,
      rounds: [
        { progress: 20, name: "Round 1", description: "Design Task" },
        { progress: 35, name: "Round 2", description: "Team Interview" },
      ],
      recommanded : true,
    },
    {
      name: "Debaleena",
      title: "UI/UX designer",
      location: "Austin",
      experience: 8,
      appliedDaysAgo: 10,
      src: Debaleena,
      rounds: [
        { progress: 60, name: "Round 1", description: "Portfolio Review" },
        { progress: 90, name: "Round 2", description: "Technical Round" },
      ],
      recommanded : false,
    },
    {
      name: "Manjeet",
      title: "MERN Stack",
      location: "Chicago",
      experience: 12,
      appliedDaysAgo: 1,
      src: Manjeet,
      rounds: [
        { progress: 60, name: "Round 1", description: "Technical" },
        { progress: 75, name: "Round 2", description: "HR Interview" },
      ],
      recommanded : false,
    },
    {
      name: "Priyansh",
      title: "React Devloper",
      location: "Boston",
      experience: 12,
      appliedDaysAgo: 7,
      src: Priyansh,
      rounds: [
        { progress: 45, name: "Round 1", description: "Research Task" },
        { progress: 88, name: "Round 2", description: "Team Interview" },
      ],
      recommanded : true,
    },
    {
      name: "Joe",
      title: "Visual Designer",
      location: "Seattle",
      experience: 4,
      appliedDaysAgo: 3,
      src: Joe,
      rounds: [
        { progress: 55, name: "Round 1", description: "Technical" },
        { progress: 90, name: "Round 2", description: "HR Interview" },
      ],
      recommanded : false,
    },
    {
      name: "Bieden",
      title: "Digital Designer",
      location: "Bieden",
      experience: 6,
      appliedDaysAgo: 4,
      src: Bieden,
      rounds: [
        { progress: 35, name: "Round 1", description: "Portfolio Review" },
        { progress: 75, name: "Round 2", description: "Team Interview" },
      ],
      recommanded : false,
    },
    {
      name: "Rajan",
      title: "Lead Designer",
      location: "Miami",
      experience: 8,
      appliedDaysAgo: 6,
      src: Rajan,
      rounds: [
        { progress: 70, name: "Round 1", description: "Technical" },
        { progress: 100, name: "Round 2", description: "Final Round" },
      ],
      recommanded : false,
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const candidatesPerPage = 6;
  const pageCount = Math.ceil(candidates.length / candidatesPerPage);

  const currentCandidates = candidates.slice(
    currentPage * candidatesPerPage,
    (currentPage + 1) * candidatesPerPage
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="bg-[#F2F2F2]">

      <div className="h-[50%]">
        {/* Nav bar */}
        <Navbar />
        
        
               {/* company description */}
        <div className="mt-[2vh] mx-12 relative">
          <img className="w-full h-[12vh]" src={Gradient} alt="" />
          <img src={Company} alt="" className="absolute top-5 left-0 h-[20vh]" />
          <div className="bg-white -mt-5 pt-24 pl-9 pb-6 rounded-3xl">
            <div className="flex items-center">
              <p className="font-bold text-[3vh] text-[#353535] mr-3">
                Senior UI/UX Designer
              </p>
              <p className="mt-[1vh] mr-3 flex items-center">
                <img src={Location} alt="" className="w-[1.9vh] h-[1.9vh]" />
                <span className="ml-0.5 text-[#979797] text-[1.9vh]">Banglore</span>
              </p>
              <p className="mt-[1vh] mr-3 flex items-center">
                <img src={Briefcase} alt="" className="w-[1.9vh] h-[1.9vh]" />
                <span className="ml-0.5 text-[#979797] text-[1.9vh]">3 - 5 Yrs</span>
              </p>
            </div>
            <div className="flex pt-2 items-center">
              <p className="text-[#353535] text-[2.4vh]">Amazon</p>
              <p className="text-[#979797] pl-5 flex">
                <img src={Star} alt="" className="w-[2.5vh] h-[2.5vh] mt-1" />
                <span className="pl-1 pr-2 text-[2.2vh]">4.7</span>
              </p>
              <p className="pl-4 text-[#979797] text-[2.2vh]">1267 review</p>
            </div>
          </div>
        </div>
      </div>
      {/* card property */}
      <div
        className="py-12 w-[95%] mx-auto"
        style={{ direction: "rtl" }}
      >
        <div style={{ direction: "ltr" }} className="flex flex-wrap justify-center xl:justify-between gap-[3vh]">
          {currentCandidates.map((candidate, index) => (
            <Card key={index} index={index} candidate={candidate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicantResult;