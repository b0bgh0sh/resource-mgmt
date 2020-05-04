import * as types from './actionTypes';
import { SVC_ROOT } from '../../config/config';
import { headers } from '../../config/adalConfig';
import axios from 'axios';

export const addFeedbackAction = feedback => {
  return { type: types.ADD_FEEDBACK, feedback: feedback };
};

export const deleteFeedbackAction = index => {
  return { type: types.DELETE_FEEDBACK, index: index };
};

export const addFeedback = feedback => {
  return dispatch => {
    //console.log('action is here');
    return dispatch(addFeedbackAction(feedback));
  };
};

export const deleteFeedback = index => {
  return dispatch => {
    return dispatch(deleteFeedbackAction(index));
  };
};
