import * as types from '../actions/actionTypes';
import initialState from './_initialState';

const executeSearchUsers = action => {
  return action.payload;
};

export const searchReducer = (
  state = initialState.search,
  action,
) => {
  switch (action.type) {
    case types.SEARCH_USERS:
      return executeSearchUsers(action);
    default:
      return state;
  }
};

export default searchReducer;
