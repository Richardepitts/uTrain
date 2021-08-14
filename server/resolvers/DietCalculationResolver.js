const { gql } = require('apollo-server-express');
const { DateTimeResolver } = require('graphql-scalars');
const DietCalculation = require('../models/DietCalculation');

// query
const ExtractDietCalculation = async (parent, args) => await DietCalculation.find({}).exec();

// mutation
const DietCalculationCreate = async (parent, args, { req, pubsub }) => {
    if (args.input.content === '') throw new Error('Content is Required')
    let NewDietCalculation = await new DietCalculation({
        ...args.input
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
