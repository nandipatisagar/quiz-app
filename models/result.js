const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    answers: [{ type: Number }]
});

module.exports = mongoose.model('Result', resultSchema);
