const { gql } = require('apollo-server-express');
const { DateTimeResolver } = require('graphql-scalars');
const DietCalculation = require('../models/DietCalculation');
const { authCheck } = require('../helpers/auth');
const User = require('../models/user');

// query
const ExtractDietCalculation = async (parent, args, { req }) => {
    const currentUser = await authCheck(req);
    const currentUserFromDb = await User.findOne({
        email: currentUser.email
    }).exec();
     return await DietCalculation.find({ postedBy: currentUserFromDb })
    .populate('postedBy', '_id username email')
    .sort({createdAt: -1})
}


// mutation
const DietCalculationCreate = async (parent, args, { req, pubsub }) => {
    const currentUser = await authCheck(req);
    const currentUserFromDb = await User.findOne({
        email: currentUser.email
    });
    if (args.input.content === '') throw new Error('Content is Required')
    let NewDietCalculation = await new DietCalculation({
        ...args.input,
        postedBy: currentUserFromDb._id
    }).save() 
    .then(DietCalculation => console.log(DietCalculation))
    return NewDietCalculation
} 

module.exports = {
    Query: {
        ExtractDietCalculation
    },
    Mutation: {
        DietCalculationCreate
    }
};
