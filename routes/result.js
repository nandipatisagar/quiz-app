const express = require('express');
const Result = require('../models/result');
const Quiz = require('../models/quiz');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Submit Quiz Result
router.post('/submit/:quizId', authMiddleware, async (req, res) => {
    const { answers } = req.body;
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score++;
            }
        });

        const result = new Result({
            quiz: quiz._id,
            user: req.user._id,
            score,
            total: quiz.questions.length,
            answers
        });

        await result.save();
        res.status(201).json({ message: 'Result saved', score, total: quiz.questions.length });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get User Results
router.get('/user', authMiddleware, async (req, res) => {
    try {
        const results = await Result.find({ user: req.user._id }).populate('quiz');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
