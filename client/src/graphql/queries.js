import { gql } from 'apollo-boost';
import { USER_INFO, POST_DATA, EXERCISE_LOG_DATA, DIET_CALCULATION } from './fragments';

export const PROFILE = gql`
    query {
        profile {
            ...userInfo
        }
    }
    ${USER_INFO}
`;

export const GET_ALL_POSTS = gql`
    query { 
        allPosts {
        _id
        content
        }
}
`;

export const ALL_USERS = gql`
    query {
        allUsers {
            ...userInfo
        }
    }
    ${USER_INFO}
`;

export const POSTS_BY_USER = gql`
    query {
        postsByUser {
            ...postData
        }
    }
    ${POST_DATA}
`;


export const EXTRACT_DIET_CALCULATION = gql`
    query {
        ExtractDietCalculation {
            ...dietCalculationInfo
        }
    }
    ${DIET_CALCULATION}
`;

export const SINGLE_POST = gql`
    query singlePost($postId: String!) {
        singlePost(postId: $postId) {
            ...postData
        }
    }
    ${POST_DATA}
`;

export const TOTAL_POSTS = gql`
    query {
        totalPosts
    }
`;

export const EXTRACT_EXERCISE_LOGS = gql`
    query {
        ExtractExerciseLogs {
            ...exerciseLogInfo
        }
    }
    ${EXERCISE_LOG_DATA}
`;

// export const EXTRACT_EXERCISE_LOGS = gql`
//      {
//         AllExtractExerciseLogs {
//             ...exerciseLogInfo
//         }
//     }
//     ${EXERCISE_LOG_DATA}
// `;

export const SEARCH = gql`
    query search($query: String!) {
        search(query: $query) {
            ...postData
        }
    }
    ${POST_DATA}
`;
