const { gql } = require('apollo-server-express');
const { DateTimeResolver } = require('graphql-scalars');
const ExerciseLog = require('../models/ExerciseLog');
// const User = require('../models/user');

// query
const ExtractExerciseLogs = async (parent, args) => await ExerciseLog.find({}).exec();

// mutation
const ExerciseLogCreate = async (parent, args, { req, pubsub }) => {
    if (args.input.content === '') throw new Error('Content is Required')
    let NewExerciseLog = await new ExerciseLog({
        ...args.input
    }).save() 
    .then(ExerciseLog => console.log(ExerciseLog))
    return NewExerciseLog
} 

module.exports = {
    Query: {
        ExtractExerciseLogs
    },
    Mutation: {
        ExerciseLogCreate
    }
};
