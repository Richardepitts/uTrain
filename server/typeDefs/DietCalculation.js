const { gql } = require('apollo-server-express');

module.exports = gql`
    type DietCalculation {
        Sex: String!
        Age: String!
        ActivityLevel: String!
        Height: String!
        Weight: Int!
    }
    # input type 
     input DietCalculationInput {
        Sex: String!
        Age: String!
        ActivityLevel: String!
        Height: String!
        Weight: Int!
    }
    # query
    type Query {
        ExtractDietCalculation: [DietCalculation!]
    }
    # mutations
    type Mutation {
        DietCalculationCreate(input: DietCalculationInput!): DietCalculation
    }
`
