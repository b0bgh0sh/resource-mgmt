import * as types from '../actions/actionTypes';
import initialState from './_initialState';

const executeLoadPersonalProfileUser = (state, action) => {
  return action.payload;
};
const execteLoadDiscipline = (state, action) => {
  return { ...state, discipline: action.payload };
};
const execteEditLocation = (state, action) => {
  return { ...state, userProfile: action.payload };
};
const executeDeleteDiscipline = (state, action) => {
  state.disciplines = state.disciplines.filter(discipline => {
    return discipline.discipline !== action.payload.discipline;
  });
  return { ...state };
};
const executeDeleteSkill = (state, action) => {
  state.skills = state.skills.filter(skill => {
    return skill !== action.payload;
  });
  return { ...state };
  // return state.skills.filter(skill => {
  //   return skill !== action.skill;
  // });
};
const executeAddDiscipline = (state, action) => {
  state.disciplines.push(action.payload);
  return { ...state };
};
const executeAddSkill = (state, action) => {
  state.skills.push(action.payload);
  return { ...state };
};
const executeUpdateSkillTable = (state, action) => {
  state.skills = action.payload.skills;
  state.currentDiscipline = action.payload.discipline;
  state.skillsOfDiscipline = action.payload.skillsOfDiscipline;
  return { ...state };
};
const executeLoadDetails = (state, action) => {
  state.details = action.payload.details;
  state.projectName = action.payload.projectName;
  return { ...state };
};
export const personalProfileReducer = (
  state = initialState.currentUserProfile,
  action,
) => {
  switch (action.type) {
    case types.LOAD_PERSONALPROFILE:
      return executeLoadPersonalProfileUser(state, action);
    case types.EDIT_LOCATION:
      return execteEditLocation(state, action);
    case types.DELETE_DISCIPLINE:
      return executeDeleteDiscipline(state, action);
    case types.DELETE_SKILL:
      return executeDeleteSkill(state, action);
    case types.ADD_DISCIPLINE:
      return executeAddDiscipline(state, action);
    case types.ADD_SKILL:
      return executeAddSkill(state, action);
    case types.UPDATE_SKILL_TABLE:
      return executeUpdateSkillTable(state, action);
    case types.LOAD_DETAILS:
      return executeLoadDetails(state, action);
    default:
      return state;
  }
};

export default personalProfileReducer;
