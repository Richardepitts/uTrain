const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const DietCalculationSchema = new mongoose.Schema({
    Sex: {
        type: String,
        required: 'Sex is required'
    },
    Age: {
        type: String,
        required: 'Age is required'
    },
    ActivityLevel: {
        type: String,
        required: 'ActivityLevel is required'
    },
    // Signature: {
    //     type: String,
    //     required: 'Your Signature is required'
    // },
    Height: {
        type: String,
        required: 'Height is required'
    },
    Weight: {
        type: Number,
        required: 'Weight is required'
    },
    GoalWeight: {
        type: Number,
        required: 'Goal Weight is required'
    },
    Carbs: {
        type: Number,
        required: 'Carbs are required'
    },
    Fats: {
        type: Number,
        required: 'Fats are required'
    },
    Protein: {
        type: Number,
        required: 'Protein are required'
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }
},
{ timestamps: true }
);


module.exports = mongoose.model('DietCalculation', DietCalculationSchema)