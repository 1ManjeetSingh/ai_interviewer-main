import PropTypes from "prop-types";
import { useState } from "react";
import Save from "../assets/save.svg";

const Card = ({ index, candidate }) => {
  const [hoveredCard, setHoveredCard] = useState(false); // Track hovered round

  const generateDots = (progress, roundIndex) => {
    const totalDots = 10;
    const fullDotsCount = Math.floor((progress / 100) * totalDots);
    const hasHalfDot = progress % 10 >= 5;

    return Array.from({ length: totalDots }, (_, index) => {
      let dotStyle = {};

      if (index < fullDotsCount) {
        dotStyle = {
          background: "#0071db", // Original blue color
          boxShadow: "0px 0px 8px rgba(0, 113, 219, 0.4)", // Original shadow
        };
      } else if (index === fullDotsCount && hasHalfDot) {
        dotStyle = {
          background:
            "linear-gradient(to top left, #004a9f, #0071db, rgba(0, 113, 219, 0.2), #d9d9d9)",
          boxShadow: "0px 0px 8px rgba(0, 113, 219, 0.3)",
        };
      } else {
        dotStyle = { background: "#d9d9d9" };
      }

      // Apply hover effect only for the hovered round
      if (hoveredCard === true && dotStyle.background === "#0071db") {
        dotStyle.background = "#0072DC"; // Lighter blue shade
        dotStyle.boxShadow = "0px 4px 4px #98CDFF"; // Change shadow to black on hover
      }

      return dotStyle;
    });
  };

  const getDotPosition = (index, radius = 31) => {
    const angle = ((2.5 - index) / 10) * 2 * Math.PI;
    return {
      left: `${Math.round(radius + radius * Math.cos(angle))}px`,
      top: `${Math.round(radius - radius * Math.sin(angle))}px`,
    };
  };

  return (
    <div className="min-w-[380px] w-[31%] min-h-[380px] bg-white rounded-[20px] shadow py-[2vh] px-[3vh] flex flex-col mb-[2vh]" style={{ direction: "ltr",
      boxShadow: hoveredCard ? '0px 0px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
     }}
      onMouseEnter={(e) => setHoveredCard(true)} // Set hovered round index
      onMouseLeave={(e) => setHoveredCard(false)} // Reset hover state
    >
      <div className="flex items-center gap-4">
        <img
          className="w-[45px] h-[45px] rounded-full shadow-inner"
          src={candidate.src}
          alt="Profile"
        />
        <div className="flex flex-col items-start">
          <div className="text-black text-[17px] font-bold">
            {candidate.name}
          </div>
          <div className="text-[#6f6f6f] text-[1.5vh] font-normal">
            {candidate.title} at {candidate.location}
          </div>
          <div className="text-[#6f6f6f] text-[1.5vh] font-normal">
            {candidate.experience} years experience
          </div>

          {/* <-------------- Add Layila recommanded change ---------------> */}
          {candidate.recommanded && (
            <div className="HeaderTag rounded shadow border border-[#5c99ff] flex justify-center items-center px-[1vh] mt-[0.5vh]">
              <div className="Label text-center text-[#5c99ff] text-[1.5vh] font-normal uppercase tracking-wide">
                Liyla Recommended
              </div>
            </div>
          )}
        </div>
        <div className="ml-auto border border-[#464646] rounded-md py-[1vh] px-[0.5vh] text-[#464646] text-center font-normal" style={{boxShadow: '0px 0px 4px 0px #C9FFFC',}}>
          <p className="text-[1.5vh] font-normal">RANK</p>

          {/* <-------------- change ---------------> */}
          <span className="text-[2.6vh] font-normal leading-tight">12</span>
        </div>
      </div>

      <div className="border-t border-[#cacaca] my-3"></div>

      <div className="flex justify-around h-full">
        {candidate.rounds.map((round, roundIndex) => (
          <div key={roundIndex}
            className="flex flex-col items-center justify-between  py-[2vh] relative"
          >
            <div className="text-center text-[1.5vh] font-normal font-[400] text-[#6F6F6F]">
              {round.name}
            </div>
            <div className="relative flex justify-center items-center w-[72px] h-[74px]">
              {generateDots(round.progress).map((style, index) => (
                <div
                  key={index}
                  className="w-[14.06px] h-[14.06px] rounded-full absolute"
                  style={{
                    ...style,
                    ...getDotPosition(index, 30),
                  }}
                />
              ))}
            </div>

            <div className="text-center text-[1.6vh] absolute top-[46%] left-[38%] font-normal font-[600] text-[#6F6F6F]">
              {round.progress}%
            </div>

            <div className="text-center text-[1.8vh]  font-normal font-[600] text-[#6F6F6F]"
            >
              {round.description}
            </div>
          </div>
        ))}

        <div className="flex flex-col justify-between py-[2vh] items-center"
        >
          <div className="text-center text-[1.5vh]  font-normal font-[400] text-[#6F6F6F]">
            Total
          </div>
          <div className="text-[40px] font-semibold text-[#24df3a]">
            86%
          </div>
          <div className="text-center text-[1.8vh]  font-normal font-[600] text-[#6F6F6F]">
            Cumulative score
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-[2vh]">
        <div className="p-[1vh] rounded-[30px] border border-[#0071db] flex justify-center items-center gap-2.5 hover:scale-[1.01] hover:transition-transform hover:duration-300 hover:cursor-pointer hover:shadow-[0px_0px_3px_rgba(0,_0,_220,_0.25)]">
          <div className="text-[#0071db] text-sm font-medium leading-[14px]">
            View more
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  index: PropTypes.number.isRequired,
  candidate: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    appliedDaysAgo: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    rounds: PropTypes.arrayOf(
      PropTypes.shape({
        progress: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Card;