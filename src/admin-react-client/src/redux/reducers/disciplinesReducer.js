import * as types from '../actions/actionTypes';
import initialState from './_initialState';

const executeLoadDisciplinesAllData = action => {
  return action.disciplines;
};

const executeCreateDisciplineData = (state, action) => {
  return [...state, {...action.discipline}];
};

const executeDeleteDisciplineData = (state, action) => {
  return state.filter(discipline => discipline.name !== action.discipline.name);
};

export const disciplinesReducer = (
  state = initialState.disciplines,
  action,
) => {
  switch (action.type) {
    case types.DELETE_DISCIPLINE:
      return executeDeleteDisciplineData(state, action);
    case types.CREATE_DISCIPLINE:
      return executeCreateDisciplineData(state,action);
    case types.LOAD_DISCIPLINES_ALL:
      return executeLoadDisciplinesAllData(action);
    default:
      return state;
  }
};

export default disciplinesReducer;
