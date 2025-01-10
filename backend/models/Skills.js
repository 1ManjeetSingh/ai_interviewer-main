import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema(
  {
    mainSkills: {
      type: [String],
      required: true,
    },
    subSkills: [{
        name: {
            type: String,
            required: true,
          },
          level: {
            type: String,
            required: true,
          },
  }],
    depthOfRound: {
            aiInterview: {
                type: Number,
                default: 30
            },
            aiTechnical: {
                type: Number,
                default: 50
            }
    },
    goalOfRound: {
      type: String,
      default: "",
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Skills = mongoose.models.Skills || mongoose.model("Skills", skillsSchema);

export default Skills;