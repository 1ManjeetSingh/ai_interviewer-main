import express from 'express';
import Skills from "../models/Skills.js";

const router = express.Router();

router.post('/update_skills', async (req, res) => {
    try {
        const { mainSkills, subSkills, depthOfRound, goalOfRound } = req.body;

        const updatedSkills = new Skills({
            mainSkills, 
            subSkills, 
            depthOfRound, 
            goalOfRound
        });

        const updatedDetails = await updatedSkills.save();

        res.status(200).json({
            success: true,
            message: 'successful',
            skills: updatedDetails,
        });
    } catch (error) {
        console.error('Error creating job post:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server Error' 
        });
    }
});

export default router;
