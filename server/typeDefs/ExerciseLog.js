const { gql } = require('apollo-server-express');

module.exports = gql`
    type ExerciseLog {
        MuscleGroup: String!
        Exercise: String!
        Reps: Int!
        Weight: Int!
        Max: Int!
    }
    # input type 
     input ExerciseLogInput {
        MuscleGroup: String!
        Exercise: String!
        Reps: Int!
        Weight: Int!
        Max: Int!
    }
    # query
    type Query {
        ExtractExerciseLogs: [ExerciseLog!]
    }
    # mutations
    type Mutation {
        ExerciseLogCreate(input: ExerciseLogInput!): ExerciseLog
    }
`
