import React from "react";

const SkillSection = ({ skills, colors }) => {
  return (
    <div className="p-8 bg-white rounded-3xl shadow-[0px_0px_4px_0px_#00000040] flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[24px]">
        <h2 className="text-[24px] text-[#1E1E1E] font-semibold">
          Main Skills
        </h2>
        {/* Legend */}
        <div className="grid grid-cols-4 justify-items-center max-sm:grid-cols-2   mb-6 max-sm:justify-items-start max-sm:px-5 flex-wrap">
          <div className="flex items-center space-x-[8px]">
            <span className={`w-3 h-3 rounded-full ${colors[0]}`}></span>
            <span className="text-[12px] font-semibold text-[#161616]">
              Developing
            </span>
          </div>
          <div className="flex items-center space-x-[8px]">
            <span className={`w-3 h-3 rounded-full ${colors[1]}`}></span>
            <span className="text-[12px] font-semibold text-[#161616]">
              Intermediate
            </span>
          </div>
          <div className="flex items-center space-x-[8px]">
            <span className={`w-3 h-3 rounded-full ${colors[2]}`}></span>
            <span className="text-[12px] font-semibold text-[#161616]">
              Advanced
            </span>
          </div>
          <div className="flex items-center space-x-[8px]">
            <span className={`w-3 h-3 rounded-full ${colors[3]}`}></span>
            <span className="text-[12px] font-semibold text-[#161616]">
              Expert
            </span>
          </div>
        </div>
      </div>
      {/* Skills */}
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center space-x-4">
            {/* Skill Name */}
            <p className="text-[14px] text-gray-800 w-1/4">{skill.name}</p>
            {/* Progress Bar */}
            <div className="relative flex h-[39px] bg-gray-100 rounded-[4px] overflow-hidden w-3/4">
              {skill.levels.map((level, idx) => (
                <div
                  key={idx}
                  className={`h-full ${colors[idx]}`}
                  style={{ width: `${level}%` }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSection;
