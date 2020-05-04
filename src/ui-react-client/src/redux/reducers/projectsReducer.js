import * as types from '../actions/actionTypes';
import initialState from './_initialState';

const executeLoadProjectsData = action => {
  let projects = {};
  projects.projects = action.projects;
  return projects;
};

const executeLoadProjectsMostRecentData = action => {
  return action.projects;
};

const executeCreateProjectData = (state, action) => {
  state.projects.push(action.payload);
  return { ...state };
};

const executeUpdateProjectData = (state, action) => {
  return state.map(project =>
    project.id === action.project.id ? action.project : project,
  );
};

const executeDeleteProjectData = (state, action) => {
  state.projects = state.projects.filter(project => {
    //console.log(project.Name, action.payload);
    //console.log(project.Name === action.payload);
    return project.Name !== action.payload;
  });
  //console.log();
  return { ...state };
};

const executeLoadDetails = (state, action) => {
  state.details = action.payload.details;

  return { ...state };
};

const executeUpdateProjectStatus = (state, action) => {
  state.projects.map(project => {
    if (project.Name === action.payload.projectName) {
      project.Status = action.payload.status;
    }
  });
  return { ...state };
};
const executeAddPeopleToProject = (state, action) => {
  action.payload.map(item => {
    state.details.splice(1, 0, item);
  });

  return { ...state };
};
const executeForecastProject = (state, action) => {
  state.details = action.payload;
  return { ...state };
};
const executeLoadForecastSummary = (state, action) => {
  state.forecastSummary = action.payload;
  return { ...state };
};
export const projectsReducer = (
  state = initialState.projects,
  action,
) => {
  switch (action.type) {
    case types.LOAD_PROJECTS_ALL:
      return executeLoadProjectsData(action);
    case types.LOAD_PROJECTS_MOST_RECENT:
      return executeLoadProjectsMostRecentData(action);
    case types.CREATE_PROJECT:
      return executeCreateProjectData(state, action);
    case types.UPDATE_PROJECT:
      return executeUpdateProjectData(state, action);
    case types.DELETE_PROJECT:
      return executeDeleteProjectData(state, action);
    case types.LOAD_DETAILS:
      return executeLoadDetails(state, action);
    case types.UPDATE_PROJECT_STATUS:
      return executeUpdateProjectStatus(state, action);
    case types.ADD_PEOPLE_TO_PROJECT:
      return executeAddPeopleToProject(state, action);
    case types.FORECAST_PROJECT:
      return executeForecastProject(state, action);
    case types.LOAD_FORECAST_SUMMARY:
      return executeLoadForecastSummary(state, action);
    default:
      return state;
  }
};

export default projectsReducer;
