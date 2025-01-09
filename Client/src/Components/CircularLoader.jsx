import React from "react";

const CircularLoader = ({ percentage = 65 }) => {
  const totalCircles = 12; // Total circles in the loader
  const activeCircles = Math.round((percentage / 100) * totalCircles); // Calculate active circles

  return (
    <div className="relative flex items-center justify-center w-[132px] h-[132px]">
      {/* Percentage label */}
      <div className="absolute text-[16px] text-[#6F6F6F] font-bold">
        {percentage}%
      </div>

      {/* Circles */}
      <div className="relative flex items-center justify-center w-full h-full">
        {[...Array(totalCircles)].map((_, index) => (
          <div
            key={index}
            className={`absolute w-[22px] h-[22px] rounded-full ${
              index < activeCircles ? "bg-[#0072DC]" : "bg-gray-300"
            }`}
            style={{
              transform: `rotate(${
                (360 / totalCircles) * index
              }deg) translate(0, -55px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CircularLoader;
