const { gql } = require('apollo-server-express');
const { DateTimeResolver } = require('graphql-scalars');
const ExerciseLog = require('../models/ExerciseLog');
const { authCheck } = require('../helpers/auth');
const User = require('../models/user');

// query
// const ExtractExerciseLogs = async (parent, args) => await ExerciseLog.find({}).exec();

// query
const ExtractExerciseLogs = async (parent, args, { req }) => {
    const currentUser = await authCheck(req);
    const currentUserFromDb = await User.findOne({
        email: currentUser.email
    }).exec();
     return await ExerciseLog.find({ postedBy: currentUserFromDb })
    .populate('postedBy', '_id username email')
    .sort({createdAt: -1})
}


// mutation
const ExerciseLogCreate = async (parent, args, { req, pubsub }) => {
    const currentUser = await authCheck(req);
    const currentUserFromDb = await User.findOne({
        email: currentUser.email
    });
    if (args.input.content === '') throw new Error('Content is Required')
    let NewExerciseLog = await new ExerciseLog({
        ...args.input,
        postedBy: currentUserFromDb._id
    }).save() 
    .then(ExerciseLog => console.log(ExerciseLog))
    return NewExerciseLog
















    // let newPost = await new Post({
    //     ...args.input,
    //     postedBy: currentUserFromDb._id
    // })
    //     .save()
    //     .then((post) => post.populate('postedBy', '_id username').execPopulate());

    // pubsub.publish(POST_ADDED, { postAdded: newPost });





} 

module.exports = {
    Query: {
        ExtractExerciseLogs
    },
    Mutation: {
        ExerciseLogCreate
    }
};
