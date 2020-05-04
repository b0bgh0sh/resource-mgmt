import * as types from '../actions/actionTypes';
import initialState from './_initialState';

const executeLoadLocationsAllData = action => {
  return action.locations;
};

const executeCreateLocationData = (state, action) => {
  return [...state, {...action.location}];
};

const executeDeleteLocationData = (state, action) => {
  return state.filter(location => location.code !== action.location.code);
};

export const locationsReducer = (
  state = initialState.locations,
  action,
) => {
  switch (action.type) {
    case types.DELETE_LOCATION:
      return executeDeleteLocationData(state, action);
    case types.CREATE_LOCATION:
      return executeCreateLocationData(state,action);
    case types.LOAD_LOCATIONS_ALL:
      return executeLoadLocationsAllData(action);
    default:
      return state;
  }
};

export default locationsReducer;
