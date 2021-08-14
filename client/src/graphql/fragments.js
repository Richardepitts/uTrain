import { gql } from 'apollo-boost';

export const USER_INFO = gql`
    fragment userInfo on User {
        _id
        name
        username
        email
        images {
            url
            public_id
        }
        about
        createdAt
        updatedAt
    }
`;

export const POST_DATA = gql`
    fragment postData on Post {
        _id
        content
    }
`;

export const EXERCISE_LOG_DATA = gql`
    fragment exerciseLogInfo on ExerciseLog {
        MuscleGroup
        Exercise
        Reps
        Weight
        Max
    }
`;

export const DIET_CALCULATION = gql`
    fragment dietCalculationInfo on DietCalculation {
        Sex
        Age
        ActivityLevel
        Height
        Weight
    }
`;
