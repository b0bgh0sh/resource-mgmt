import * as types from '../actions/actionTypes';
import initialState from './_initialState';

const executeLoadDisciplinesAllData = action => {
  return action.disciplines;
};

export const disciplinesReducer = (
  state = initialState.disciplines,
  action,
) => {
  switch (action.type) {
    case types.LOAD_DISCIPLINES_ALL:
      return executeLoadDisciplinesAllData(action);
    default:
      return state;
  }
};

export default disciplinesReducer;
