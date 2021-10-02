import { GAINS_BACK } from '../actions/types';

const initialState = {
    items: 'true'
}

export default function(state = initialState, action) {
    switch (action.type) {
    case GAINS_BACK: 
        return {
            ...state,
            items: action.payload
        }
        default: 
            return state;
    }
}