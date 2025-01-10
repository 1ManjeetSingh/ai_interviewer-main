import { useState } from "react";
import BlueTick from "../assets/NavImages/Tick.svg";
import Logo from "../assets/NavImages/Search-logo.svg";
import ArrowIcon from "../assets/NavImages/Arrow.svg";
import downAngle from "../assets/NavImages/downAngle.svg";
import { useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';

const Skills = () => {
  // State to track the current section

  const [selectedId, setSelectedId] = useState(2);
  const [recomendedSelectedId, setRecomendedSelectedId] = useState(1);
  // State to track the selected skill
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubSkills, setSelectedSubSkills] = useState([]);


  const [selectedSkills, setSelectedSkills] = useState([
    "Visual Design",
    "Wireframing",
    "Prototyping",
    "User Flows",
    "Design System",
  ]);

  const [suggestedSkills, setSuggestedSkills] = useState([
    "User Testing",
    "Feedback Gathering",
    "Iterating",
    "User Research",
    "Information Architecture",
    "Usability Testing",
    "UI Design",
    "Interaction Design",
  ]);



  const [aiRoundDurations, setAiRoundDurations] = useState([
    { id: 1, label: 25, selected: false },
    { id: 2, label: 30, selected: true }, // Default selected
    { id: 3, label: 35, selected: false },
  ]);

  const [techRoundDurations, setTechRoundDurations] = useState([
    { id: 4, label: 40, selected: false },
    { id: 5, label: 50, selected: true }, // Default selected
    { id: 6, label: 55, selected: false },
  ]);

  const [depthOfRound, setDepthOfRound] = useState({
  });

  useEffect(() => {
    setDepthOfRound(
      {
        aiInterview: aiRoundDurations.find(item => item.selected)?.label,
        aiTechnical: techRoundDurations.find(item => item.selected)?.label
      }
    )
  }, [aiRoundDurations, techRoundDurations]);


  const handleSkillSelection = (skillValue) => {
    // Check if the skill is already selected
    if (selectedSkills.includes(skillValue)) {
      // Deselect the skill
      setSelectedSkills(selectedSkills.filter(skill => skill !== skillValue));
    } else {
      // Select the skill
      setSelectedSkills([...selectedSkills, skillValue]);
    }
  };

  const handleSelect = (id, type) => {
    if (type === 'ai') {
      setAiRoundDurations((prev) =>
        prev.map((option) => ({
          ...option,
          selected: option.id === id, // Select only the clicked option
        }))
      );
    } else if (type === 'tech') {
      setTechRoundDurations((prev) =>
        prev.map((option) => ({
          ...option,
          selected: option.id === id, // Select only the clicked option
        }))
      );
    }
  };


  const recommendedData = [
    {
      id: 1,
      title: "Fundamentals & Its Practical Application",
      description:
        "Evaluation of Fundamental Concepts and their Collective Practical application",
      expectationTitle: "Expectation From Candidate",
      expectationDescription:
        "Evaluation of Fundamental Concepts and their Collective Practical application",
    },

  ]
  const data = {
    title: "Goal Of the Role",
    sections: [
      {
        description: "This will help the interviewer with structuring the round.",
      },
      {
        warning: "The following items should not be added to the goal",
        warningColor: "#FF0000",
        points: [
          "Additional Parameters/Skills to Evaluate the Candidate",
          "Criteria to Rate the Candidate",
          "Your Own Interview Process or Specific Questions That the Interviewer Should Ask",
          "Full Job Description for the Role",
        ],
      },
    ],
    footer: {
      text: "We are an R&D organization. We are looking for a Lead Mobile App Developer who can help us release hybrid apps to production using React Native. The ideal candidate should also excel in cross-team collaboration and release engineering.",
    },
  };

  const contentData = [
    {
      id: 1,
      title: "Fundamentals & Its Practical Application",
      description:
        "Evaluation of Fundamental Concepts and their Collective Practical application",
      expectationTitle: "Expectation From Candidate",
      expectationDescription:
        "Evaluation of Fundamental Concepts and their Collective Practical application",
    },
    {
      id: 2,
      title: "Practical application & Advanced problem Solving",
      description:
        "In Depth Evaluation of Concepts Accompanied by advanced.",
      expectationTitle: "Expectation from Candidate",
      expectationDescription:
        "A deep understanding of multiple Concepts and their application in solving real-world problems is required. Candidates should be able to Explain the rationable behind their solution the problem statement.",
    },
  ];

  const suggestedItems = [
    'User Testing',
    'Information Architecture',
    'Usability Testing',
    'Feedback Gathering',
    'Usability Testing',
    'Usability Testing',
    'Iterating',
    'UI Design',
    'User Research',
    'Interaction Design'
  ];

  // Filter skills based on the search term
  const filteredSkills = suggestedSkills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add skill to selectedSkills and remove it from suggestedSkills
  const handleAddSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSuggestedSkills(suggestedSkills.filter((s) => s !== skill));
    }
    setSearchTerm(""); // Clear search input after adding
  };

  // Remove skill from selectedSkills and add it back to suggestedSkills
  const handleRemoveSkill = (skill) => {
    setSuggestedSkills([...suggestedSkills, skill]);
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  // Handle "Enter" key press to add searchTerm as a skill
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      handleAddSkill(searchTerm.trim());
    }
  };



  // const [selectedSkill1, setSelectedSkill1] = useState({});
  const [dropdownVisible1, setDropdownVisible1] = useState(null);
  const [skillsBelowSearch1, setSkillsBelowSearch1] = useState([]);
  const [suggestedSkills1, setSuggestedSkills1] = useState([
    "User Testing",
    "Feedback Gathering",
    "Iterating",
    "User Research",
    "Information Architecture",
    "UI Design",
  ]);
  const [searchText1, setSearchText1] = useState("");
  const [isInputFocused1, setInputFocused1] = useState(false);

  const toggleDropdown = (index) => {
    setDropdownVisible1(dropdownVisible1 === index ? null : index);
  };
  const handleSelection = (index, level) => {
    // Check if index is valid
    if (index >= 0 && index < skillsBelowSearch1.length) {
      const skill = skillsBelowSearch1[index]; // Get the skill based on index

      if (level) {
        // If a level is selected, add it to selectedSubSkills
        setSelectedSubSkills((prev) => {
          const existingSkill = prev.find((s) => s.name === skill);
          if (existingSkill) {
            // If the skill already exists, update its level
            return prev.map((s) => (s.name === skill ? { name: skill, level } : s));
          } else {
            // If it doesn't exist, add it
            return [...prev, { name: skill, level }];
          }
        });
      } else {
        // If no level is selected, remove the skill
        setSelectedSubSkills((prev) => prev.filter((s) => s.name !== skill));
      }
    }
    setDropdownVisible1(null); // Close the dropdown after selection
  };


  const getDotColor = (level) => {
    switch (level) {
      case "Easy":
        return "bg-green-500";
      case "Medium":
        return "bg-blue-500";
      case "Hard":
        return "bg-red-500";
      default:
        return "";
    }
  };

  const addSkillBelowSearch = (skill) => {
    if (!skillsBelowSearch1.includes(skill)) {
      setSkillsBelowSearch1([...skillsBelowSearch1, skill]);
      setSuggestedSkills1(suggestedSkills1.filter((s) => s !== skill));
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchText1 && !skillsBelowSearch1.includes(searchText1)) {
      setSkillsBelowSearch1([...skillsBelowSearch1, searchText1]);
    }
    setSearchText1("");
    setInputFocused1(false);
  };





  // Add useRef for detecting clicks outside
  const selectedButtonRef = useRef(null);

  const handleClickOutside = (event) => {
    // Check if the click is outside the selected button
    if (selectedButtonRef.current && !selectedButtonRef.current.contains(event.target)) {
      // Remove the skill from the selectedSubSkills
      const skillToRemove = selectedButtonRef.current?.innerText || '';
      setSelectedSubSkills((prev) => prev.filter((s) => s.name !== skillToRemove));
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);




  const sections = [
    "Main Skills",
    "Sub Skills",
    "Must Have Skills",
    "Depth of Round",
    "Goal of the Role",
  ];



  const [activeSection, setActiveSection] = useState(sections[0]);
  const handleContinue = () => {
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    } else {
      // if (jobPostId) {
      console.log("JobPost ID:", jobPostId);  // Log the value of jobPostId
      handleFinish(); // Pass the jobPostId here
      // } else {
      //   alert("Job post ID is missing!");
      // }
    }
  };





  // Content for each section
  const sectionContent = {

    "Main Skills": (
      <>
        <h1 className="text-2xl font-bold mb-4">Main Skills</h1>
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search or add skill"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onKeyPress={handleKeyPress}
            className="w-full border rounded-lg px-4 py-2 pr-10"
          />
          <img
            src={isSearchFocused ? ArrowIcon : Logo}
            alt={isSearchFocused ? "Arrow" : "Search"}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
          />
        </div>
        {/* Selected Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedSkills.map((skill) => (
            <div
              key={skill}
              onClick={() => handleRemoveSkill(skill)}
              className="cursor-pointer border-2 border-[#0072DC] shadow-[0px_0px_8px_rgba(0,0,0,0.4)] flex items-center  rounded-full px-3 py-1 text-sm text-blue-600  gap-2 hover:bg-red-100"
            >
              <img src={BlueTick} alt="Tick" className="w-4 h-4" />
              <span>{skill}</span>
            </div>
          ))}
        </div>

        {/* Suggested Skills */}
        <h2 className="font-semibold mb-2">Suggested</h2>
        <div className="flex flex-wrap gap-2 overflow-auto">
          {filteredSkills.map((skill) => (
            <div
              key={skill}
              onClick={() => handleAddSkill(skill)}
              className="cursor-pointer border rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-blue-100"
            >
              {skill}
            </div>
          ))}
        </div>


      </>
    ),
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    "Sub Skills": (
      <>
        {/* Main Content */}
        <div className="flex flex-col gap-3">
          <div
            style={{
              width: "100%",
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 14,
              paddingBottom: 14,
              background: "#F5F5F5",
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25) inset",
              borderRadius: 12,
              flexDirection: "column",
              gap: 12,
              display: "inline-flex",
            }}
          >
            <div
              className="sans-serif"
              style={{
                alignSelf: "stretch",
                color: "#1E1E1E",
                fontSize: 20,
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              Main Skills
            </div>
            {/* Dynamically Render Selected Skills */}
            <div className="flex flex-wrap gap-2">
              {selectedSkills.length > 0 ? (
                selectedSkills.map((skill) => (
                  <div
                    key={skill}
                    onClick={() => handleRemoveSkill(skill)}
                    style={{
                      paddingLeft: 18,
                      paddingRight: 18,
                      paddingTop: 4,
                      paddingBottom: 4,
                      background: "white",
                      boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.40)",
                      borderRadius: 24,
                      gap: 8,
                      display: "inline-flex",
                    }}
                  >
                    <span>{skill}</span>
                  </div>
                ))
              ) : (
                <p>No skills added yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Main content with flex to ensure full height */}
        <div className="w-full h-full flex flex-col justify-between">
          <div>
            <div
              style={{
                alignSelf: 'stretch',
                color: '#1E1E1E',
                fontSize: 20,
                fontWeight: '700',
                wordWrap: 'break-word',
                paddingTop: 5,
              }}
            >
              Sub Skills
            </div>

            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative mb-4 flex items-center"
            >
              <input
                type="text"
                value={searchText1}
                onChange={(e) => setSearchText1(e.target.value)}
                onFocus={() => setInputFocused1(true)}
                onBlur={() => !searchText1 && setInputFocused1(false)}
                placeholder="Search"
                className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3">
                {isInputFocused1 || searchText1 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    className="text-gray-500 cursor-pointer"
                    fill="currentColor"
                  >
                    <path d="M10,20A10,10,0,1,0,0,10,10,10,0,0,0,10,20ZM8.711,4.3l5.7,5.766L8.7,15.711,7.3,14.289l4.289-4.242L7.289,5.7Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
                    />
                  </svg>
                )}
              </span>
            </form>

            {/* Skills Below Search */}
            <div className="flex flex-wrap gap-2 ">
              {skillsBelowSearch1.map((skill, index) => (
                <div key={index} className="relative">
                  <div
                    onClick={() => toggleDropdown(index)}
                    className="px-3 gap-1 border-2 border-[#0072DC] shadow-[0px_0px_8px_rgba(0,0,0,0.4)] py-1 rounded-full text-sm cursor-pointer flex items-center justify-between hover:bg-gray-100 text-blue-500 mb-2"
                  >
                    {skill}
                    {(() => {
                      const selectedSkill = selectedSubSkills.find(
                        (s) => s.name === skill
                      );
                      return selectedSkill ? (
                        <span
                          className={`ml-2 w-2.5 h-2.5 rounded-full inline-block ${getDotColor(
                            selectedSkill.level
                          )}`}
                        ></span>
                      ) : (
                        <img src={downAngle} alt="dropdown arrow" className="w-4 h-4 mt-1" />
                      );
                    })()}
                  </div>
                  {dropdownVisible1 === index && (
                    <div className="absolute mt-1 bg-white border rounded-md shadow-md z-10">
                      <div
                        onClick={() => handleSelection(index, "Easy")}
                        className="p-2 hover:bg-gray-100 flex items-center cursor-pointer"
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></span>{" "}
                        Easy
                      </div>
                      <div
                        onClick={() => handleSelection(index, "Medium")}
                        className="p-2 hover:bg-gray-100 flex items-center cursor-pointer"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full inline-block mr-1"></span>{" "}
                        Medium
                      </div>
                      <div
                        onClick={() => handleSelection(index, "Hard")}
                        className="p-2 hover:bg-gray-100 flex items-center cursor-pointer"
                      >
                        <span className="w-2 h-2 bg-red-500 rounded-full inline-block mr-1"></span>{" "}
                        Hard
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Suggested Skills */}
            <h2 className="text-lg font-semibold mb-2">Suggested</h2>
            <div className="flex flex-wrap gap-2">
              {/* Filter suggested skills based on searchText1 */}
              {suggestedItems
                .filter((suggested) =>
                  suggested.toLowerCase().startsWith(searchText1.toLowerCase())
                )
                .map((suggested, index) => (
                  <div
                    key={index}
                    onClick={() => addSkillBelowSearch(suggested)}
                    className="px-3 py-1 border rounded-full text-sm cursor-pointer hover:bg-gray-200 border-gray-400 shadow-sm text-gray-700"
                  >
                    {suggested}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    )
    ,
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    "Must Have Skills": (
      <>
        {/* Main Content */}
        <div className="flex flex-col gap-3">
          <div
            style={{ width: '100%', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: '#F5F5F5', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25) inset', borderRadius: 12, flexDirection: 'column', gap: 12, display: 'inline-flex' }}>
            <div className="sans-serif"
              style={{
                alignSelf: 'stretch', color: '#1E1E1E', fontSize: 20,
                fontWeight: '700', wordWrap: 'break-word',
              }}
            >
              Main Skills
            </div>


            {/* Dynamically Render Selected Skills */}
            <div className="flex flex-wrap gap-2">
              {selectedSkills.length > 0 ? (
                selectedSkills
                  .filter((skill) => !selectedSubSkills.some((subSkill) => subSkill.name === skill)) // Filter out sub-skills
                  .map((skill) => (
                    <div
                      key={skill}
                      style={{
                        paddingLeft: 18,
                        paddingRight: 18,
                        paddingTop: 4,
                        paddingBottom: 4,
                        background: "white",
                        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.40)",
                        borderRadius: 24,
                        gap: 8,
                        display: "inline-flex",
                      }}
                    >
                      <span>{skill}</span>
                    </div>
                  ))
              ) : (
                <p>No skills added yet.</p>
              )}
            </div>
          </div>
          {selectedSubSkills.length > 0 && (
            <div
              style={{
                width: '100%',
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 14,
                paddingBottom: 14,
                background: '#F5F5F5',
                boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25) inset',
                borderRadius: 12,
                flexDirection: 'column',
                gap: 12,
                display: 'inline-flex',
              }}
            >
              <div
                style={{
                  alignSelf: 'stretch',
                  color: '#1E1E1E',
                  fontSize: 20,
                  fontWeight: '700',
                  wordWrap: 'break-word',
                }}
              >
                Sub Skills
              </div>
              <div
                className="flex w-full flex-wrap gap-4"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 16, // Adjust the gap between items
                }}
              >
                {selectedSubSkills
                  .sort((a, b) => {
                    // Ensure that selected skills come first
                    const isASelected = selectedSkills.includes(a.name);
                    const isBSelected = selectedSkills.includes(b.name);

                    if (isASelected && !isBSelected) {
                      return -1; // A comes first
                    }
                    if (!isASelected && isBSelected) {
                      return 1; // B comes first
                    }
                    return 0; // If both are selected or both unselected, keep original order
                  })
                  .map((skill) => {
                    const isSelected = selectedSkills.includes(skill.name); // Check if it's selected

                    return (
                      <div
                        className="flex w-full sm:w-auto"
                        key={skill.name}
                        style={{
                          paddingLeft: 20,
                          paddingRight: 20,
                          paddingTop: 4,
                          paddingBottom: 4,
                          boxShadow: isSelected
                            ? "0px 4px 8px rgba(0, 0, 0, 0.40)" // Blue shadow for selected
                            : "0px 0px 8px rgba(0, 0, 0, 0.40)", // Default shadow
                          borderRadius: 24,
                          border: "2px #0072DC solid",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 8,
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            color: "#161616",
                            fontSize: 16,
                            fontWeight: "400",
                            wordWrap: "break-word",
                          }}
                        >
                          {skill.name}
                        </div>
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            position: "relative",
                          }}
                        >
                          <div
                            className={`dot ${getDotColor(skill.level)}`}
                            style={{
                              width: 10,
                              height: 10,
                              left: 5,
                              top: 5,
                              position: "absolute",
                              borderRadius: 9999,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          <div
            style={{
              width: '100%',
              height: '100%',
              padding: '8px 16px 30px 16px',
              boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25) inset',
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
            }}
          >
            <div
              className="sans-serif"
              style={{
                alignSelf: 'stretch',
                color: '#1E1E1E',
                fontSize: 32,
                fontWeight: 500,
                wordWrap: 'break-word',
              }}
            >
              Must Have Skills
            </div>
            <div
              className="flex w-full flex-wrap gap-4"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 16, // Adjust the gap between items
              }}
            >

              {selectedSubSkills.map((subSkill) => {
                const isSelected = selectedSkills.includes(subSkill.name); // Check if it's selected

                return (
                  <div
                    key={subSkill.name}
                    className="appearance-none"
                    style={{
                      padding: "4px 10px",
                      boxShadow: isSelected
                        ? "0px 0px 4px rgba(0, 113, 235, 0.8)" // Blue shadow when selected
                        : "0px 0px 2px rgba(0, 0, 0, 0.25)", // Default shadow
                      borderRadius: 24,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <input
                      type="checkbox"
                      name="subSkill"
                      value={subSkill.name}
                      checked={isSelected}
                      onChange={() => handleSkillSelection(subSkill.name)} // Handle selection toggle
                      className="w-4 h-4 rounded-full border-2 bg-white focus:ring-1 appearance-none checked:bg-blue-500 checked:border-transparent shadow-[0_0_0_4px_white]"
                    />
                    <div
                      style={{
                        color: "#161616",
                        fontSize: 12,
                        fontWeight: 400,
                        wordWrap: "break-word",
                      }}
                    >
                      {subSkill.name}
                    </div>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        position: "relative",
                      }}
                    >
                      <div
                        className={`dot ${getDotColor(subSkill.level)}`} // Assuming getDotColor handles color based on level
                        style={{
                          width: 10,
                          height: 10,
                          left: 5,
                          top: 5,
                          position: "absolute",
                          borderRadius: 9999,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    ),
    // ///////////////////////////////////////////////////
    /////////////////////////////////////////
    "Depth of Round": (
      <>
        {/* Main Content */}
        <div className="flex flex-col gap-3">
          <div
            style={{
              width: "100%",
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 14,
              paddingBottom: 14,
              background: "#F5F5F5",
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25) inset",
              borderRadius: 12,
              flexDirection: "column",
              gap: 12,
              display: "inline-flex",
            }}
          >
            <div
              className="sans-serif"
              style={{
                alignSelf: "stretch",
                color: "#1E1E1E",
                fontSize: 20,
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              Main Skills
            </div>
            {/* Dynamically Render Selected Skills */}
            <div className="flex flex-wrap gap-2">
              {selectedSkills.length > 0 ? (
                selectedSkills
                  .filter((skill) => !selectedSubSkills.some((subSkill) => subSkill.name === skill)) // Filter out sub-skills
                  .map((skill) => (
                    <div
                      key={skill}
                      style={{
                        paddingLeft: 18,
                        paddingRight: 18,
                        paddingTop: 4,
                        paddingBottom: 4,
                        background: "white",
                        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.40)",
                        borderRadius: 24,
                        gap: 8,
                        display: "inline-flex",
                      }}
                    >
                      <span>{skill}</span>
                    </div>
                  ))
              ) : (
                <p>No skills added yet.</p>
              )}
            </div>
          </div>
          {selectedSubSkills.length > 0 && (
            <div
              style={{
                width: '100%',
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 14,
                paddingBottom: 14,
                background: '#F5F5F5',
                boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25) inset',
                borderRadius: 12,
                flexDirection: 'column',
                gap: 12,
                display: 'inline-flex',
              }}
            >
              <div
                style={{
                  alignSelf: 'stretch',
                  color: '#1E1E1E',
                  fontSize: 20,
                  fontWeight: '700',
                  wordWrap: 'break-word',
                }}
              >
                Sub Skills
              </div>
              <div
                className="flex w-full flex-wrap gap-4"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 16, // Adjust the gap between items
                }}
              >
                {selectedSubSkills
                  .sort((a, b) => {
                    // Ensure that selected skills come first
                    const isASelected = selectedSkills.includes(a.name);
                    const isBSelected = selectedSkills.includes(b.name);

                    if (isASelected && !isBSelected) {
                      return -1; // A comes first
                    }
                    if (!isASelected && isBSelected) {
                      return 1; // B comes first
                    }
                    return 0; // If both are selected or both unselected, keep original order
                  })
                  .map((skill) => {
                    const isSelected = selectedSkills.includes(skill.name); // Check if it's selected

                    return (
                      <div
                        className="flex w-full sm:w-auto"
                        key={skill.name}
                        style={{
                          paddingLeft: 20,
                          paddingRight: 20,
                          paddingTop: 4,
                          paddingBottom: 4,
                          boxShadow: isSelected
                            ? "0px 4px 8px rgba(0, 0, 0, 0.40)" // Blue shadow for selected
                            : "0px 0px 8px rgba(0, 0, 0, 0.40)", // Default shadow
                          borderRadius: 24,
                          border: "2px #0072DC solid",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 8,
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            color: "#161616",
                            fontSize: 16,
                            fontWeight: "400",
                            wordWrap: "break-word",
                          }}
                        >
                          {skill.name}
                        </div>
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            position: "relative",
                          }}
                        >
                          <div
                            className={`dot ${getDotColor(skill.level)}`}
                            style={{
                              width: 10,
                              height: 10,
                              left: 5,
                              top: 5,
                              position: "absolute",
                              borderRadius: 9999,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          <div
            style={{
              alignSelf: 'stretch', color: '#1E1E1E', fontSize: 20,
              fontWeight: '700', wordWrap: 'break-word',
            }}
          >
            Depth of Round
          </div>
          {/* recommended section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 top-0">
            {contentData.map((item) => (
              <div
                key={item.id}
                className="mt-2"
                onClick={() => setSelectedId(item.id)} // Set the clicked item as selected
                style={{
                  width: '100%',
                  padding: '20px 12px',
                  background: 'white',
                  boxShadow:
                    selectedId === item.id
                      ? '0px 0px 8px rgba(0, 0, 0, 0.3)' // Apply shadow for selected item
                      : '0px 0px 4px rgba(0, 0, 0, 0.25)', // Default shadow
                  borderRadius: 8.47,
                  border: '1px solid',
                  borderColor: selectedId === item.id ? '#28a745' : '#0072DC', // Change border color
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease', // Smooth transition for shadow and border color
                }}
              >
                {/* "Recommended" Tag */}
                {selectedId === item.id && (
                  <div className="absolute bg-[#28a745] text-white px-2 font-medium border-1 -top-6 left-0 rounded-se-md rounded-ss-md">
                    {selectedId === contentData[1].id ? 'Recommended' : 'Selected'}
                  </div>
                )}

                {/* Card Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {/* Title Section with Radio */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {/* Radio Button */}
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        border: '2px solid #28a745',
                        background: selectedId === item.id ? 'white' : '',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {selectedId === item.id && (
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            background: 'green',
                            borderRadius: '50%',
                          }}
                        />
                      )}
                    </div>

                    {/* Title */}
                    <div
                      className="sans-serif"
                      style={{
                        color: selectedId === item.id ? '#28a745' : '#1E1E1E',
                        fontSize: 16,
                        fontWeight: '600',
                        wordWrap: 'break-word',
                      }}
                    >
                      {item.title}
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div
                      style={{
                        color: '#6F6F6F',
                        fontSize: 12,
                        fontWeight: '400',
                        lineHeight: '20px',
                        wordWrap: 'break-word',
                      }}
                    >
                      {item.description}
                    </div>
                  </div>

                  {/* Expectations */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div
                      style={{
                        color: '#1E1E1E',
                        fontSize: 16,
                        fontWeight: '600',
                        lineHeight: '24px',
                        wordWrap: 'break-word',
                      }}
                    >
                      {item.expectationTitle}
                    </div>
                    <div
                      className="sans-serif"
                      style={{
                        color: '#6F6F6F',
                        fontSize: 12,
                        fontWeight: '400',
                        lineHeight: '20px',
                        wordWrap: 'break-word',
                      }}
                    >
                      {item.expectationDescription}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* /////////// Time Duration */}
          <div
            className="flex flex-col lg:flex-row gap-4"
            style={{
              width: '100%',
              padding: '12px 10px',
              background: 'white',
              borderRadius: 12,
              fontFamily: 'sans-serif',
              border: '1px #B9B9B9 solid',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {/* Duration of AI Interview */}
            <div
              className="w-full"
              style={{
                padding: 16,
                background: '#F5F5F5',
                boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25) inset',
                borderRadius: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: '700', color: 'black' }}>Duration of AI Interview</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '13px' }}>
                {aiRoundDurations.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleSelect(option.id, 'ai')}
                    style={{
                      height: 40,
                      padding: '0 12px',
                      border: option.selected ? '1px solid #0072DC' : '1px solid #B9B9B9',
                      boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25) inset',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        border: '1px solid #0072DC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {option.selected && (
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            background: '#2890FA',
                            borderRadius: '50%',
                          }}
                        />
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: '#161616' }}>{option.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Duration of Technical Interview */}
            <div
              className="w-full"
              style={{
                padding: 16,
                background: '#F5F5F5',
                boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25) inset',
                borderRadius: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: '700', color: 'black' }}>Duration of Technical Interview</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '13px' }}>
                {techRoundDurations.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleSelect(option.id, 'tech')}
                    style={{
                      height: 40,
                      padding: '0 12px',
                      border: option.selected ? '1px solid #0072DC' : '1px solid #B9B9B9',
                      boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25) inset',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        border: '1px solid #0072DC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {option.selected && (
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            background: '#2890FA',
                            borderRadius: '50%',
                          }}
                        />
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: '#161616' }}>{option.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    ),
    /////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    "Goal of the Role": (
      <>
        {/* Main Content */}
        <div className="flex flex-col gap-3">
          <div
            style={{
              width: "100%",
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 14,
              paddingBottom: 14,
              background: "#F5F5F5",
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25) inset",
              borderRadius: 12,
              flexDirection: "column",
              gap: 12,
              display: "inline-flex",
            }}
          >
            <div
              className="sans-serif"
              style={{
                alignSelf: "stretch",
                color: "#1E1E1E",
                fontSize: 20,
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              Main Skills
            </div>
            {/* Dynamically Render Selected Skills */}
            <div className="flex flex-wrap gap-2">
              {selectedSkills.length > 0 ? (
                selectedSkills
                  .filter((skill) => !selectedSubSkills.some((subSkill) => subSkill.name === skill)) // Filter out sub-skills
                  .map((skill) => (
                    <div
                      key={skill}
                      style={{
                        paddingLeft: 18,
                        paddingRight: 18,
                        paddingTop: 4,
                        paddingBottom: 4,
                        background: "white",
                        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.40)",
                        borderRadius: 24,
                        gap: 8,
                        display: "inline-flex",
                      }}
                    >
                      <span>{skill}</span>
                    </div>
                  ))
              ) : (
                <p>No skills added yet.</p>
              )}
            </div>
          </div>

          {selectedSubSkills.length > 0 && (
            <div
              style={{
                width: '100%',
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 14,
                paddingBottom: 14,
                background: '#F5F5F5',
                boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25) inset',
                borderRadius: 12,
                flexDirection: 'column',
                gap: 12,
                display: 'inline-flex',
              }}
            >
              <div
                style={{
                  alignSelf: 'stretch',
                  color: '#1E1E1E',
                  fontSize: 20,
                  fontWeight: '700',
                  wordWrap: 'break-word',
                }}
              >
                Sub Skills
              </div>
              <div
                className="flex w-full flex-wrap gap-4"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 16, // Adjust the gap between items
                }}
              >
                {selectedSubSkills
                  .sort((a, b) => {
                    // Ensure that selected skills come first
                    const isASelected = selectedSkills.includes(a.name);
                    const isBSelected = selectedSkills.includes(b.name);

                    if (isASelected && !isBSelected) {
                      return -1; // A comes first
                    }
                    if (!isASelected && isBSelected) {
                      return 1; // B comes first
                    }
                    return 0; // If both are selected or both unselected, keep original order
                  })
                  .map((skill) => {
                    const isSelected = selectedSkills.includes(skill.name); // Check if it's selected

                    return (
                      <div
                        className="flex w-full sm:w-auto"
                        key={skill.name}
                        style={{
                          paddingLeft: 20,
                          paddingRight: 20,
                          paddingTop: 4,
                          paddingBottom: 4,
                          boxShadow: isSelected
                            ? "0px 4px 8px rgba(0, 0, 0, 0.40)" // Blue shadow for selected
                            : "0px 0px 8px rgba(0, 0, 0, 0.40)", // Default shadow
                          borderRadius: 24,
                          border: "2px #0072DC solid",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 8,
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            color: "#161616",
                            fontSize: 16,
                            fontWeight: "400",
                            wordWrap: "break-word",
                          }}
                        >
                          {skill.name}
                        </div>
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            position: "relative",
                          }}
                        >
                          <div
                            className={`dot ${getDotColor(skill.level)}`}
                            style={{
                              width: 10,
                              height: 10,
                              left: 5,
                              top: 5,
                              position: "absolute",
                              borderRadius: 9999,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* recommended  */}
          {recommendedData.map((item) => (
            <div className="mt-4"
              key={item.id}
              onClick={() => setRecomendedSelectedId(item.id)}
              style={{
                width: "100%",
                padding: "10px 8px",
                background: "white",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: 8.47,
                border:
                  recomendedSelectedId === item.id
                    ? "2px solid #28a745"
                    : "1px solid #0072DC",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                position: "relative",
                cursor: "pointer",
                transition: "border 0.3s ease",
              }}
            >

              {/* Recommended Tag */}
              {selectedId === item.id && (
                <div className="absolute bg-[#28a745] text-white px-2 font-medium border-1 -top-6 left-0 rounded-se-md rounded-ss-md">
                  {selectedId === contentData[1].id ? 'Recommended' : 'Selected'}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">

                {selectedId && (
                  <div className="mt-1 p-4 border rounded-lg bg-gray-50">

                    {contentData.map((item) =>
                      item.id === selectedId ? (
                        <div key={item.id}>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.expectationTitle}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.expectationDescription}
                          </p>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </div>

            </div>
          ))}
          {/* /////////////////////////////////////////? */}
          <div style={{ width: "100%" }}>
            {/* Title */}
            <div
              style={{
                width: "100%",
                color: "#1E1E1E",
                fontSize: 20,
                fontFamily: "sans-serif",
                fontWeight: "700",
                // height: 20,
                wordWrap: "break-word",
              }}
            >
              {data.title}
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingLeft: 11.3,
                paddingRight: 11.3,
                paddingTop: 8.12,
                paddingBottom: 8.12,
                background: "white",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: 8.47,
                border: "1px #0072DC solid",
                justifyContent: "space-between",
                alignItems: "flex-start",
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  width: "100%",
                  padding: "8px 11px",
                  background: "white",
                  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: "8.47px",
                  display: "inline-flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "8px", // Add spacing between elements
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {/* Section Content */}
                  {data.sections.map((section, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      {/* Description */}
                      {section.description && (
                        <div
                          style={{
                            color: "#1E1E1E",
                            fontSize: "18px",
                            fontFamily: "sans-serif",
                            fontWeight: "700",
                            wordWrap: "break-word",
                          }}
                        >
                          {section.description}
                        </div>
                      )}

                      {/* Warning */}
                      {section.warning && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          {/* Replace Warning Symbol */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "16px",
                              height: "16px",
                            }}
                          >
                            <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: "#FF0000", fontSize: "16px" }} />
                          </div>
                          {/* Warning Text */}
                          <div
                            style={{
                              color: "#FF0000", // Red color for text
                              fontSize: "14px",
                              fontFamily: "sans-serif",
                              fontWeight: "600",
                              wordWrap: "break-word",
                            }}
                          >
                            {section.warning}
                          </div>
                        </div>
                      )}



                      {/* Points */}
                      {section.points?.map((point, i) => (
                        <div
                          key={i}
                          style={{
                            color: "#121212",
                            fontSize: "12px",
                            fontFamily: "sans-serif",
                            fontWeight: "400",
                            wordWrap: "break-word",
                          }}
                        >
                          {point}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div
                  style={{
                    padding: "10px 16px",
                    background: "white",
                    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "8px",
                    border: "0.75px solid #B9B9B9",
                    textAlign: "center",
                  }}
                >
                  <textarea
                    style={{
                      width: "100%",
                      height: "auto",
                      color: "#1E1E1E",
                      fontSize: "14px",
                      fontFamily: "sans-serif",
                      fontWeight: "400",
                      wordWrap: "break-word",
                    }}
                  >
                    {data.footer.text}
                  </textarea>
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    ),
  };

  const [jobPostId, setJobPostId] = useState('6781436fd5e164049ac181d3');

  const handleFinish = async () => {

    if (!selectedSkills || selectedSkills.length === 0) {
      toast.error("Please select main skills.");
      return;
    }

    const payload = {
      mainSkills: selectedSkills,
      subSkills: selectedSubSkills,
      depthOfRound: depthOfRound || {},
      goalOfRound: "Your goal of the role here",
    };

    console.log("Payload to send:", payload); // Log the payload

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/skills/update_skills`, payload);

      if (response.status === 200) {
        toast.success("successful.");
        console.log(response);
      }

    } catch (error) {
      console.error("Error saving data:", error.response?.data || error.message);
      toast.error("Error saving data. Please check the input and try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 p-4 gap-4">
      {/* Sidebar */}
      <ToastContainer />

      <div className="w-1/3 bg-white border rounded-lg p-6 shadow-md flex flex-col justify-between">
        <div>
          {/* Paragraph Box */}
          <div className="bg-white border rounded-lg shadow-md p-4 mb-6">
            <p className="text-sm text-gray-600">
              Your selections will shape the AI Interview and Technical Round, dynamically testing both the breadth and depth of candidates' knowledge.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-full text-left border px-4 py-2 rounded-lg ${activeSection === section ? 'bg-gray-100 font-bold' : ''
                  }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        {/* Step Progress */}
        <div className="mt-auto p-4">
          <p className="text-sm">
            Step {sections.indexOf(activeSection) + 1} of {sections.length}
          </p>
          <div className="h-1 w-full bg-gray-200 mt-1 rounded-full">
            <div
              className="h-1 bg-blue-500 rounded-full"
              style={{
                width: `${((sections.indexOf(activeSection) + 1) / sections.length) * 100
                  }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 bg-white border rounded-lg p-4 shadow-md overflow-y-auto">
        {/* Section Content */}
        <div className="mb-16">{sectionContent[activeSection]}</div>

        {/* Continue Button */}
        <div className="w-full absolute bottom-6 right-6 flex justify-end mt-4">
          <button
            onClick={handleContinue}
            className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
          >
            {sections.indexOf(activeSection) === sections.length - 1
              ? 'Finish'
              : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Skills;