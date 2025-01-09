// // import { useState, useEffect, useRef } from "react";
// // import { SiApplemusic } from "react-icons/si";

// // const LoaderWithIcons = () => {
// //   const [isPaused, setIsPaused] = useState(false);
// //   const [activeIcon, setActiveIcon] = useState(null);
// //   const popupRef = useRef(null); // Reference for detecting outside clicks

// //   const icons = ["🍎", "🍇", "🍊", "🍒", "🍍", "🍓"]; // Icons for the circular loader
// //   const popupIcons = ["🍏", "🍉", "🍑", "🍓", "🥥", "🍋"]; // Different popup icons for each icon

// //   // Handle icon click
// //   const handleIconClick = (index) => {
// //     // Set the active icon but do not toggle or pause it
// //     if (activeIcon !== index) {
// //       setActiveIcon(index);
// //       setIsPaused(true);
// //     }
// //   };

// //   // Close the popup if clicked outside
// //   const handleClickOutside = (event) => {
// //     if (popupRef.current && !popupRef.current.contains(event.target)) {
// //       setActiveIcon(null);
// //       setIsPaused(false);
// //     }
// //   };

// //   // Add event listener for clicks outside the popup
// //   useEffect(() => {
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, []);

// //   // Function to calculate position of icons based on index and radius
// //   const calculatePosition = (index, radius) => {
// //     const angle = (index * 360) / icons.length; // Angle in degrees
// //     const x = radius * Math.cos((angle * Math.PI) / 180); // X coordinate
// //     const y = radius * Math.sin((angle * Math.PI) / 180); // Y coordinate
// //     return { x, y };
// //   };

// //   return (
// //     <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
// //       {/* Loader Area with Dotted Background */}
// //       <div
// //         className="relative flex items-center justify-center rounded-full"
// //         style={{
// //           width: "200px", // Define the size of the loader container
// //           height: "200px",
// //           backgroundImage: "radial-gradient(circle, #000 2px, transparent 1px)",
// //           backgroundSize: "20px 20px",
// //         }}
// //       >
// //         {/* Central Icon */}
// //         <div className="absolute flex items-center justify-center w-full h-full rounded-full  ">
// //           <SiApplemusic className="w-16 h-16" />
// //         </div>

// //         {/* Inner Circle - Rotating Icons */}
// //         <div
// //           className={`absolute flex items-center justify-center ${isPaused ? "" : "animate-spin-slow"}`}
// //           style={{ animationDuration: "10s" }}
// //         >
// //           {icons.map((icon, index) => {
// //             const { x, y } = calculatePosition(index, 80); // Inner circle radius

// //             return (
// //               <div
// //                 key={index}
// //                 className="absolute cursor-pointer"
// //                 style={{
// //                   transform: `translate(${x}px, ${y}px)`,
// //                 }}
// //                 onClick={() => handleIconClick(index)}
// //               >
// //                 <div className="flex items-center justify-center rounded-full bg-black p-3">
// //                   {icon}
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* Outer Circle - Popup Icon for Each Icon */}
// //         {activeIcon !== null && (
// //           <div ref={popupRef}>
// //             {(() => {
// //               const { x, y } = calculatePosition(activeIcon, 170); // Outer circle radius (increased to add more space)

// //               return (
// //                 <div
// //                   className="cursor-pointer"
// //                   style={{
// //                     transform: `translate(${x}px, ${y}px)`,
// //                   }}
// //                 >
// //                   <div className="flex items-center justify-center bg-gray-200 text-gray-800 p-10 rounded-full shadow-lg">
// //                     {popupIcons[activeIcon]}
// //                   </div>
// //                 </div>
// //               );
// //             })()}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoaderWithIcons;






// import React, { useState, useEffect } from 'react';

// const LoaderWithIcons = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const icons = [
//     '🌟', // Replace with your icons (e.g., FontAwesome classes or images)
//     '🔥',
//     '💧',
//     '🌿',
//     '⚡',
//     '🌀'
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prevIndex) => (prevIndex + 1) % icons.length);
//     }, 2000); // Change icon every 2 seconds

//     return () => clearInterval(interval);
//   }, [icons.length]);

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="relative w-48 h-48">
//         {/* Central Icon */}
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
//           🌍 {/* Replace with the central icon */}
//         </div>

//         {/* Outer Circle */}
//         <div className="absolute inset-0 flex items-center justify-center rounded-full ">
//           {/* Icons positioned around the circle */}
//           {icons.map((icon, index) => (
//             <div
//               key={index}
//               className={`absolute text-2xl transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-0'
//                 }`}
//               style={{
//                 top: `${50 - 40 * Math.cos((index * Math.PI) / 3)}%`, // Adjust position around the circle
//                 left: `${50 + 40 * Math.sin((index * Math.PI) / 3)}%`,
//               }}
//             >
//               {icon}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoaderWithIcons;



// import { useState, useEffect, useRef } from "react";
// import { SiApplemusic } from "react-icons/si";

// const LoaderWithIcons = () => {
//   const [isPaused, setIsPaused] = useState(false);
//   const [activeIcon, setActiveIcon] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0); // Auto-rotating index
//   const popupRef = useRef(null);

//   const icons = ["🍎", "🍇", "🍊", "🍒", "🍍", "🍓"];
//   const popupIcons = ["🍏", "🍉", "🍑", "🍓", "🥥", "🍋"];

//   // Auto-rotate active index every 2 seconds if not paused
//   useEffect(() => {
//     if (!isPaused) {
//       const interval = setInterval(() => {
//         setActiveIndex((prevIndex) => (prevIndex + 1) % icons.length);
//       }, 2000);

//       return () => clearInterval(interval);
//     }
//   }, [isPaused, icons.length]);

//   // Handle icon click
//   const handleIconClick = (index) => {
//     if (activeIcon !== index) {
//       setActiveIcon(index);
//       setIsPaused(true); // Pause auto-rotation when an icon is clicked
//     }
//   };

//   // Close the popup if clicked outside
//   const handleClickOutside = (event) => {
//     if (popupRef.current && !popupRef.current.contains(event.target)) {
//       setActiveIcon(null);
//       setIsPaused(false); // Resume auto-rotation when popup is closed
//     }
//   };

//   // Add event listener for clicks outside the popup
//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Function to calculate position of icons based on index and radius
//   const calculatePosition = (index, radius) => {
//     const angle = (index * 360) / icons.length;
//     const x = radius * Math.cos((angle * Math.PI) / 180);
//     const y = radius * Math.sin((angle * Math.PI) / 180);
//     return { x, y };
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
//       {/* Loader Area with Dotted Background */}
//       <div
//         className="relative flex items-center justify-center rounded-full"
//         style={{
//           width: "200px",
//           height: "200px",
//           backgroundImage: `radial-gradient(circle, 
//       red 4px, transparent 2px, 
//       orange 3px, transparent 2px, 
//       yellow 6px, transparent 2px, 
//       green 4px, transparent 2px, 
//       blue 5px, transparent 2px, 
//       purple 2px, transparent 2px)`,
//           backgroundSize: "30px 30px",
//         }}
//       >


//         {/* Central Icon */}
//         <div className="absolute flex items-center justify-center w-full h-full rounded-full ">
//           <SiApplemusic className="w-24 h-24 bg-gray-100 p-6 rounded-full" />
//         </div>

//         {/* Inner Circle - Rotating Icons */}
//         <div
//           className={`absolute flex items-center justify-center ${isPaused ? "" : "animate-spin-slow"}`}
//           style={{ animationDuration: "10s" }}
//         >
//           {icons.map((icon, index) => {
//             const { x, y } = calculatePosition(index, 80);
//             return (
//               <div
//                 key={index}
//                 className={`absolute cursor-pointer transition-opacity duration-500 ${activeIndex === index || activeIcon === index ? "opacity-100" : "opacity-0"
//                   }`}
//                 style={{ transform: `translate(${x}px, ${y}px)` }}
//                 onClick={() => handleIconClick(index)}
//               >
//                 <div className="flex items-center justify-center rounded-full bg-black p-5 text-white">
//                   {icon}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Outer Circle - Popup Icon for Each Icon */}
//         {activeIcon !== null && (
//           <div ref={popupRef}>
//             {(() => {
//               const { x, y } = calculatePosition(activeIcon, 170);
//               return (
//                 <div
//                   className="cursor-pointer"
//                   style={{ transform: `translate(${x}px, ${y}px)` }}
//                 >
//                   <div className="flex items-center justify-center bg-neutral-900 border-[2px] border-gray-200 text-gray-800 p-5 rounded-full shadow-lg">
//                     {popupIcons[activeIcon]}
//                   </div>
//                 </div>
//               );
//             })()}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoaderWithIcons;


import { useEffect, useState } from "react";

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
      { size: "small", angleOffset: -30 },
      { size: "large", angleOffset: 0 },
      { size: "small", angleOffset: 30 },
    ],
    [
      { size: "large", angleOffset: -30 },
      { size: "small", angleOffset: 0 },
      { size: "large", angleOffset: 30 },
    ],
    [
      { size: "small", angleOffset: -30 },
      { size: "large", angleOffset: 0 },
      { size: "small", angleOffset: 30 },
    ],
    [
      { size: "large", angleOffset: -30 },
      { size: "small", angleOffset: 0 },
      { size: "large", angleOffset: 30 },
    ],
    [
      { size: "small", angleOffset: -30 },
      { size: "large", angleOffset: 0 },
      { size: "small", angleOffset: 30 },
    ],
    [
      { size: "large", angleOffset: -30 },
      { size: "small", angleOffset: 0 },
      { size: "large", angleOffset: 30 },
    ],
  ];

  const [animationStage, setAnimationStage] = useState(0);
  const [shouldRotate, setShouldRotate] = useState(false);
  const [activePetalIndex, setActivePetalIndex] = useState(null);
  const [clickedIndex,setClickedIndex] = useState(null);
  const [isClickable, setIsClickable] = useState(false); // Controls clickability

  useEffect(() => {
    // Enable clicking after 5 seconds
    const timer = setTimeout(() => {
      setIsClickable(true);
    }, 3000);
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

    if(clickedIndex == index){
      setShouldRotate(!shouldRotate); // Stop rotation when a petal is clicked
    }
    else{
      setClickedIndex(index);
      setShouldRotate(false);
    }
    setActivePetalIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle extra petals
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".petal")) {
      setShouldRotate(true); // Resume rotation
      setActivePetalIndex(null); // Close extra petals
    }
  };

  // const toggleAnimation = () => {
  //   setShouldRotate(!shouldRotate);
  // };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      {/* Main Container */}
      <div
        className="relative h-[85%] w-[80%] flex items-center justify-center rounded-[36px]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, #063678 0%, #420167 69%)",
        }}
      >
        {/* Petals */}
        <div
          className={`absolute h-full w-full flex items-center justify-center rotate-petals`}
          style={{
            animationPlayState: shouldRotate ? "running" : "paused",
          }}
          // onClick={toggleAnimation()}
        >
          {petalPositions.map((petal, index) => (
            <div
              key={index}
              onClick={(e) => {
                e.stopPropagation(); // Prevent outside click from triggering
                handlePetalClick(index);
              }}
              className={`absolute petal transition-all duration-[1500ms] ease-out ${petal.size === "large" ? "h-[103px] w-[103px]" : "h-[92px] w-[92px]"
                } rounded-full bg-[#D9D9D9]`}
              style={{
                transform:
                  animationStage <= index
                    ? `rotate(20deg) translateY(0) scale(0)`
                    : animationStage === index + 1
                      ? `rotate(${petal.rotation}deg) translateY(-110px) scale(1)`
                      : `rotate(${petal.rotation}deg) translateY(-110px) rotate(-${petal.rotation}deg)`,
                transitionDelay: animationStage <= index ? `${index * 0.2}s` : "0s",
                zIndex: animationStage <= index ? 6 - index : 0,
              }}
            />
          ))}

          {/* Extra Petals */}
          {activePetalIndex !== null &&
            newPetalData[activePetalIndex].map((petal, index) => (
              <div
                key={`extra-${activePetalIndex}-${index}`}
                className={`flex gap-2 absolute transition-all duration-[1500ms] ease-out ${petal.size === "large" ? "h-[103px] w-[103px]" : "h-[92px] w-[92px]"
                  } rounded-full bg-[#D9D9D9]`}
                style={{
                  transform: `rotate(${petalPositions[activePetalIndex].rotation + petal.angleOffset}deg) translateY(-210px) scale(.8)`,
                }}
              />
            ))}
        </div>

        {/* Center Circle (Pistil) */}
        <div className="absolute h-[176px] w-[176px] rounded-full z-10 bg-white" />
      </div>
    </div>
  );
};

export default LoaderWithIcons;

