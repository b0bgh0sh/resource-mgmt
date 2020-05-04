import * as types from '../actions/actionTypes';
import initialState from './_initialState';

const executeLoadSkillsAllData = action => {
  return action.skills;
};

const executeCreateSkillData = (state, action) => {
  return [...state, {...action.skill}];
};

const executeDeleteSkillData = (state, action) => {
  return state.filter(skill => skill.name !== action.skill.name);
};

export const skillsReducer = (
  state = initialState.skills,
  action,
) => {
  switch (action.type) {
    case types.DELETE_SKILL:
      return executeDeleteSkillData(state, action);
    case types.CREATE_SKILL:
      return executeCreateSkillData(state,action);
    case types.LOAD_SKILLS_ALL:
      return executeLoadSkillsAllData(action);
    default:
      return state;
  }
};

export default skillsReducer;
