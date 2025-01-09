import { useEffect, useState } from "react";
import { IoLogoAppleAr } from "react-icons/io5";
const LoaderWithIcons = () => {
  const petalPositions = [
    { size: "large", rotation: 20 },
    { size: "small", rotation: 80 },
    { size: "large", rotation: 140 },
    { size: "small", rotation: 200 },
    { size: "large", rotation: 260 },
    { size: "small", rotation: 320 },
  ];

  const newPetalData = [
    [
      { size: "small", angleOffset: -40 },
      { size: "large", angleOffset: 0 },
      { size: "small", angleOffset: 40 },
    ],
    [
      { size: "large", angleOffset: -40 },
      { size: "small", angleOffset: 0 },
      { size: "large", angleOffset: 40 },
    ],
    [
      { size: "small", angleOffset: -40 },
      { size: "large", angleOffset: 0 },
      { size: "small", angleOffset: 40 },
    ],
    [
      { size: "large", angleOffset: -40 },
      { size: "small", angleOffset: 0 },
      { size: "large", angleOffset: 40 },
    ],
    [
      { size: "small", angleOffset: -40 },
      { size: "large", angleOffset: 0 },
      { size: "small", angleOffset: 40 },
    ],
    [
      { size: "large", angleOffset: -40 },
      { size: "small", angleOffset: 0 },
      { size: "large", angleOffset: 40 },
    ],
  ];

  const texts = ["Home", "Profile", "Settings", "Notifications", "Help", "About"];
  const [animationStage, setAnimationStage] = useState(0);
  const [shouldRotate, setShouldRotate] = useState(false);
  const [activePetalIndex, setActivePetalIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isClickable, setIsClickable] = useState(false);
  const [selectedPetalContent, setSelectedPetalContent] = useState(null);
  const icons = [
    "/assets/Vector.svg", // Replace with your actual paths
    // "/icons/icon-2.svg",
    // "/icons/icon-3.svg",
    // "/icons/icon-4.svg",
    // "/icons/icon-5.svg",
    // "/icons/icon-6.svg",
  ];
  const descriptions = [
    "According to a 2024 report from Rackspace Technology, AI spending in 2024 is expected to more than double compared with 2023, and 86% of companies surveyed reported seeing gains from AI adoption. Companies reported using the technology to enhance customer experience (53%), innovate in product design (49%) and support human resources (47%), among other applications.",
    "According to a 2024 report from Rackspace Technology, AI spending in 2024 is expected to more than double compared with 2023, and 86% of companies surveyed reported seeing gains from AI adoption. Companies reported using the technology to enhance customer experience (53%), innovate in product design (49%) and support human resources (47%), among other applications.",
    "According to a 2024 report from Rackspace Technology, AI spending in 2024 is expected to more than double compared with 2023, and 86% of companies surveyed reported seeing gains from AI adoption. Companies reported using the technology to enhance customer experience (53%), innovate in product design (49%) and support human resources (47%), among other applications.",
    "According to a 2024 report from Rackspace Technology, AI spending in 2024 is expected to more than double compared with 2023, and 86% of companies surveyed reported seeing gains from AI adoption. Companies reported using the technology to enhance customer experience (53%), innovate in product design (49%) and support human resources (47%), among other applications.",
    "According to a 2024 report from Rackspace Technology, AI spending in 2024 is expected to more than double compared with 2023, and 86% of companies surveyed reported seeing gains from AI adoption. Companies reported using the technology to enhance customer experience (53%), innovate in product design (49%) and support human resources (47%), among other applications.",
    "According to a 2024 report from Rackspace Technology, AI spending in 2024 is expected to more than double compared with 2023, and 86% of companies surveyed reported seeing gains from AI adoption. Companies reported using the technology to enhance customer experience (53%), innovate in product design (49%) and support human resources (47%), among other applications.",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClickable(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timings = [300];
    setTimeout(() => {
      setAnimationStage(1);
    }, timings[0]);
    for (let i = 1; i < petalPositions.length; i++) {
      setTimeout(() => {
        setAnimationStage(i + 1);
      }, timings[0] + i * 200);
    }
    setTimeout(() => {
      setAnimationStage(6);
      setTimeout(() => {
        setShouldRotate(true);
      }, 0.1);
    }, timings[0] + petalPositions.length * 400);
  }, [petalPositions.length]);

  const handlePetalClick = (index) => {
    if (!isClickable) return;

    if (clickedIndex === index) {
      setShouldRotate(!shouldRotate);
      setSelectedPetalContent(null); // Close the card
    } else {
      setClickedIndex(index);
      setShouldRotate(false);
      setSelectedPetalContent({
        title: texts[index],
        description: descriptions[index],
      }); // Open the card with content
    }

    setActivePetalIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleOutsideClick = (e) => {
    const clickedElement = e.target;
    const isInsidePetal = clickedElement.closest(".petal");
    const isInsideWhiteCircle = clickedElement.closest(".white-circle");
    if (!isInsidePetal && !isInsideWhiteCircle) {
      setShouldRotate(true);
      setActivePetalIndex(null);
      setClickedIndex(null);
      setSelectedPetalContent(null); // Close the card when clicking outside
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-10 bg-white">
      <div
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, #063678 0%, #420167 69%)",
        }}
        className=" fixed inset-0 bg-opacity-80 w-full h-full flex  justify-center px-20 py-10 z-50"
        onClick={handleOutsideClick}
      >
        <div
          className="relative flex items-center justify-center w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(138,123,103,1) 0%, rgba(138,123,103,1) 5%, rgba(221,215,207,0.9405813350730917) 80%,rgba(232,222,210,1) 90%, rgba(125,117,106,1) 6%, rgba(125,117,106,1) 10%, rgba(180,174,166,1) 20%, rgba(255,244,228,1) 45%, rgba(255,253,250,1) 55%, rgba(245,226,197,1) 66%, rgba(221,215,207,0.9405813350730917) 80%,  rgba(196,180,157,1) 95%, rgba(237,229,219,1) 100%)',
            borderRadius: '50%', // This makes it circular
            width: '320px', // Adjust the size
            height: '320px', // Adjust the size
          }}
        >
          {/* petals */}
          <div
            className={`absolute h-full w-full flex items-center justify-center rotate-petals`}
            style={{
              animationPlayState: shouldRotate ? "running" : "paused",
            }}
          >
            {petalPositions.map((petal, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePetalClick(index);
                }}
                className={`absolute petal transition-all duration-[1500ms] ease-out ${petal.size === "large" ? "h-[100px] w-[100px]" : "h-[100px] w-[100px]"
                  } rounded-full hover:bg-gray-400 bg-[white] hover:shadow-2xl flex items-center justify-center  ${clickedIndex !== null && clickedIndex !== index ? "opacity-0 scale-0" : ""
                  }`}
                style={{
                  transform:
                    clickedIndex === index
                      ? ` scale(1.5)`
                      : animationStage <= index
                        ? `rotate(20deg) translateY(0) scale(0)`
                        : animationStage === index + 1
                          ? `rotate(${petal.rotation}deg) translateY(-100px) scale(1)`
                          : `rotate(${petal.rotation}deg) translateY(-100px) rotate(-${petal.rotation}deg)`,
                  transitionDelay: animationStage <= index ? `${index * 0.2}s` : "0s",
                  zIndex: clickedIndex === index ? 10 : animationStage <= index ? 6 - index : 0,
                }}
              >
                <div className="dotted-border w-[94px] h-[94px] rounded-full">
                  <div className="flex flex-col items-center">
                    <img
                      src={icons[index]}
                      alt={`Petal Icon ${index + 1}`}
                      className="h-12 w-12 text-black  "
                    />
                    <p className="text-[10px] text-black mt-2">{texts[index]}</p>
                  </div>
                </div>

              </div>
            ))}
            {/* active petals */}
            {activePetalIndex !== null &&
              newPetalData[activePetalIndex].map((petal, index) => (
                <div
                  key={`extra-${activePetalIndex}-${index}`}
                  className={`flex gap-2 absolute transition-all duration-[1500ms] ease-out ${petal.size === "large" ? "h-[100px] w-[100px]" : "h-[100px] w-[100px]"
                    } rounded-full bg-[#D9D9D9]`}
                  style={{
                    transform: `rotate(${petalPositions[activePetalIndex].rotation + petal.angleOffset}deg) translateY(-150px) scale(.8)`,
                  }}
                />
              ))}
          </div>
          {clickedIndex === null && (
            <div className="absolute h-[136px] w-[136px] rounded-full z-10 bg-white white-circle " >
              <div className="justify-center items-center flex mt-3 ">
                <IoLogoAppleAr className="h-[106px] w-[106px]  rounded-full dotted2-border" />
              </div>
            </div>
          )}
        </div>

        {/* Card Component */}
        {selectedPetalContent && (
          <div className="absolute bottom-10 max-w-full lg:w-[1000px] sm:w-[90%]  text-white rounded-lg shadow-lg p-1 flex flex-col lg:flex-row items-center gap-6"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, #063678 0%, #420167 69%)",
            }}>
            {/* Left Section: Description */}
            <div className="flex-1 p-4 rounded-lg bg-[#2a2a2a] h-[250px] w-full">
              <h2 className="text-lg font-semibold mb-2">
                {selectedPetalContent.title}
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                {selectedPetalContent.description}
              </p>
            </div>

            {/* Right Section: Image */}
            <div className="relative bg-[#2a2a2a] p-4 rounded-lg">
              <video
                src="/path-to-your-video.mp4" // Replace with the actual video path
                controls
                className="h-40 w-72 object-cover"
              ></video>
              <div
                style={{
                  background: 'linear-gradient(315deg, rgba(255, 159, 67, 0.3) 0%, rgba(211, 211, 211, 0.3) 74%)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                className="absolute top-[64%] right-2 text-xl text-white px-3 mr-2 py-1 "
              >
                +40
              </div>

              <div className="absolute bottom-8 right-2  bg-opacity-50 text-[10px] text-white px-2 py-1 rounded-full">
                Skill Stack Score
              </div>
              <div className="mt-4 flex flex-col items-start">
                <span className="bg-red-600 text-xs  text-white px-2 py-1 rounded-full">
                  Business
                </span>
                <span className=" text-xs text-gray-400">
                  7 Lessons · 72 hrs
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default LoaderWithIcons;
