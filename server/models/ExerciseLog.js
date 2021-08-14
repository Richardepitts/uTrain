const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const ExerciseLogSchema = new mongoose.Schema({
    MuscleGroup: {
        type: String,
        required: 'Muscle group is required'
    },
    Exercise: {
        type: String,
        required: 'Exercise is required'
    },
    Reps: {
        type: Number,
        required: 'Reps are required'
    },
    Weight: {
        type: Number,
        required: 'Reps are required'
    },
    Max: {
        type: Number,
        required: 'Max are required'
    },
}, {timestamps: true});

module.exports = mongoose.model('ExerciseLog', ExerciseLogSchema)