const User = require('../models/User');

const askAgent = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ success: false, message: 'Question is required' });
        }

        const lowerQ = question.toLowerCase();
        let responseText = "I am the AI Agent! I can help you with insights about the users in the system. Try asking 'how many users are there', 'average age', 'list professions', or 'oldest user'.";

        if (lowerQ.includes('how many') || lowerQ.includes('count')) {
            const count = await User.countDocuments();
            responseText = `There are currently ${count} users registered in the system.`;
        }
        else if (lowerQ.includes('average age')) {
            const users = await User.find();
            if (users.length === 0) {
                responseText = "There are no users to calculate the average age.";
            } else {
                const sum = users.reduce((acc, curr) => acc + (curr.age || 0), 0);
                const avg = (sum / users.length).toFixed(1);
                responseText = `The average age of all users is ${avg} years.`;
            }
        }
        else if (lowerQ.includes('profession')) {
            const users = await User.find();
            const professions = [...new Set(users.map(u => u.profession).filter(Boolean))];
            if (professions.length === 0) {
                responseText = "No professions found in the database.";
            } else {
                responseText = `The unique professions in the system are: ${professions.join(', ')}.`;
            }
        }
        else if (lowerQ.includes('oldest')) {
            const oldestUser = await User.findOne().sort({ age: -1 });
            if (oldestUser) {
                responseText = `The oldest user is ${oldestUser.name} who is ${oldestUser.age} years old.`;
            } else {
                responseText = "No users found.";
            }
        }
        else if (lowerQ.includes('youngest')) {
            const youngestUser = await User.findOne({ age: { $ne: null } }).sort({ age: 1 });
            if (youngestUser) {
                responseText = `The youngest user is ${youngestUser.name} who is ${youngestUser.age} years old.`;
            } else {
                responseText = "No users found.";
            }
        }

        // Simulating delay for "AI thinking"
        setTimeout(() => {
            res.json({
                success: true,
                answer: responseText
            });
        }, 800);

    } catch (error) {
        console.error('AI Agent error:', error);
        res.status(500).json({
            success: false,
            message: 'The AI Agent encountered an internal error.'
        });
    }
};

module.exports = {
    askAgent
};
