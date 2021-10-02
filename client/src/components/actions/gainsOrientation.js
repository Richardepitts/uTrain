import { GAINS_BACK } from './types';

export const gainsOrientation = (chosenOrientation) => dispatch => {
    dispatch({             
        type: GAINS_BACK,
        payload: chosenOrientation 
    })
}