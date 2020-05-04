import * as types from '../actions/actionTypes';
import initialState from './_initialState';

const executeLoadSkillsAllData = action => {
  return action.skills;
};

export const skillsReducer = (
  state = initialState.skills,
  action,
) => {
  switch (action.type) {
    case types.LOAD_SKILLS_ALL:
      return executeLoadSkillsAllData(action);
    default:
      return state;
  }
};

export default skillsReducer;
