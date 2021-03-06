import { gql } from 'apollo-boost';
import { USER_INFO, POST_DATA, EXERCISE_LOG_DATA, DIET_CALCULATION } from './fragments';

export const DIET_CALCULATION_CREATE = gql`
    mutation DietCalculationCreate($input: DietCalculationInput!) {
        DietCalculationCreate(input: $input) {
            ...dietCalculationInfo
        }
    }
    ${DIET_CALCULATION}
`;

export const EXERCISE_LOG_CREATE = gql`
    mutation ExerciseLogCreate($input: ExerciseLogInput!) {
        ExerciseLogCreate(input: $input) {
            ...exerciseLogInfo
        }
    }
    ${EXERCISE_LOG_DATA}
`;

export const USER_UPDATE = gql`
    mutation userUpdate($input: UserUpdateInput!) {
        userUpdate(input: $input) {
            ...userInfo
        }
    }
    ${USER_INFO}
`;

export const USER_CREATE = gql`
    mutation userCreate {
        userCreate {
            username
            email
        }
    }
`;

export const POST_CREATE = gql`
    mutation postCreate($input: PostCreateInput!) {
        postCreate(input: $input) {
            ...postData
        }
    }
    ${POST_DATA}
`;


export const POST_DELETE = gql`
    mutation postDelete($postId: String!) {
        postDelete(postId: $postId) {
            _id
        }
    }
`;

export const POST_UPDATE = gql`
    mutation postUpdate($input: PostUpdateInput!) {
        postUpdate(input: $input) {
            ...postData
        }
    }
    ${POST_DATA}
`;
