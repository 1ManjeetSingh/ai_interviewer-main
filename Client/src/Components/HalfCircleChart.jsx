import { useEffect, useState } from "react";

const HalfCircleChart = ({ percentage }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0); // Initial percentage for animation
  const radius = 54; // Radius of the circle
  const circumference = Math.PI * radius; // Circumference of the half-circle
  const dashOffset = circumference - (animatedPercentage / 100) * circumference; // Adjust to match animated percentage

  useEffect(() => {
    // Trigger animation after component mounts
    const timeout = setTimeout(() => setAnimatedPercentage(percentage), 100);
    return () => clearTimeout(timeout); // Cleanup timeout
  }, [percentage]);

  return (
    <div className="relative flex items-center justify-center w-32 h-16">
      {/* Foreground Gradient Half-Circle */}
      <svg
        width="180px"
        height="110%"
        viewBox="0 0 120 60"
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
          transform="rotate(180, 60, 60)"
          style={{
            transition: "stroke-dashoffset 1s ease-in-out", // Smooth animation
          }}
        />
      </svg>

      {/* Percentage Display */}
      <div className="absolute top-8 text-center text-[#0f0f36] text-[20px] font-semibold font-['SF UI Text'] leading-normal shadow-[0px_0px_8px_0px_#0000008C">
        {animatedPercentage}%
      </div>
    </div>
  );
};

export default HalfCircleChart;
