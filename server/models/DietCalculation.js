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
    Height: {
        type: String,
        required: 'Height is required'
    },
    Weight: {
        type: Number,
        required: 'Weight is required'
    }
}, {timestamps: true});

module.exports = mongoose.model('DietCalculation', DietCalculationSchema)