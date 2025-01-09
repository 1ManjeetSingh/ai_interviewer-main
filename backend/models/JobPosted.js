// models/jobPost.js
import mongoose from 'mongoose';

const depthOfRoundSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    expectationTitle: {
      type: String,
      required: true,
    },
    expectationDescription: {
      type: String,
      required: true,
    },
  });

const jobPostedSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    workplaceType: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        // required: true,
        // trim: true,
    },
    mainSkills: {
        type: [String],  // Array of strings for skills
        required: true,
        default: []
    },
    subSkills: [{
        name: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
        }
    }],

    salaryRange: {
        minSalary: {
            type: Number,
            // required: true,
            default: 0,
        },
        maxSalary: {
            type: Number,
            // required: true,
            default: 0,
        },
    },
    benefits: {
        type: [String],  // Array of strings for benefits
        // required: true,
        default: [],
    },
    jobPortalsPosting: {
        type: [String],  // Array of strings for job portals
        // required: true,
        default: [],
    },
    Progress: {
        jobPosted: {
            type: Number,  // 1 for Completed, 0 for Incomplete
            default: 0,    // Default to 0 (Incomplete) if not provided
          },
          applicantsApplied: {
            type: Number,  // Total number of applicants
            default: 0,    // Default to 0 if not provided
          },
          selectionComplete: {
            type: Number,  // 1 for Completed, 0 for Incomplete
            default: 0,    // Default to 0 (Incomplete) if not provided
          },
          aiInterviewRound: {
            type: Number,  
            default: 0,   
          },
          aiTechnicalRound: {
            type: Number,  
            default: 0,   
          },
          shortlistedCandidates: {
            type: Number,  
            default: 0,   
          },
    },
    depthOfRound: {
        type: [depthOfRoundSchema],
        // required: true,
        default: []
    },
    goalOfRound: {
        type: String,
        default: "",
        // required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });  // Add timestamps to track createdAt and updatedAt automatically

const JobPosted = mongoose.models.JobPosted || mongoose.model('JobPosted', jobPostedSchema);

export default JobPosted;
