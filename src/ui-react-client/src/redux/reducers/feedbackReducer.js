import * as types from '../actions/actionTypes';
import initialState from './_initialState';

const executeAddFeedback = (state, action) => {
  state.push(action.feedback);
  return [...state];
};
const executeDeleteFeedback = (state, action) => {
  state.splice(action.index, 1);
  return [...state];
};
export const locationsReducer = (
  state = initialState.feedbacks,
  action,
) => {
  switch (action.type) {
    case types.ADD_FEEDBACK:
      return executeAddFeedback(state, action);
    case types.DELETE_FEEDBACK:
      return executeDeleteFeedback(state, action);
    default:
      return state;
  }
};

export default locationsReducer;
