const express = require('express');
const Quiz = require('../models/quiz');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create Quiz
router.post('/create', authMiddleware, async (req, res) => {
    const { title, questions } = req.body;
    try {
        const quiz = new Quiz({
            title,
            questions,
            createdBy: req.user._id
        });
        await quiz.save();
        res.status(201).json({ message: 'Quiz created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error creating quiz' });
    }
});

// Get all quizzes
router.get('/', authMiddleware, async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get quiz by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
