import * as types from './actionTypes';



export const addFeedbackAction = feedback => {
    return { type: types.ADD_FEEDBACK, feedback: feedback };
};

export const deleteFeedbackAction = index => {
    return { type: types.DELETE_FEEDBACK, index: index };
};

export const addFeedback = feedback => {
    return dispatch => {
        dispatch(addFeedbackAction(feedback));
    };
};

export const deleteFeedback = index => {
    return dispatch => {
        dispatch(deleteFeedbackAction(index));
    };
};
