import * as types from './actionTypes';
import { SVC_ROOT } from '../../config/config';
import { headers } from '../../config/adalConfig';
import axios from 'axios';


const baseURL = `${SVC_ROOT}locations/`;

export const loadLocationsAllData = locations => {
  return { type: types.LOAD_LOCATIONS_ALL, locations: locations };
};

export const createLocationData = location => {
  return {
    type: types.CREATE_LOCATION,
    location: location,
  };
};

export const deleteLocationData = location => {
    return {
        type: types.DELETE_LOCATION,
        location: location,
    };
};

export const loadLocations = () => {
  return dispatch => {
    return axios
      .get(baseURL, { headers })
      .then(response => {
        dispatch(loadLocationsAllData(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const createLocation = location => {
  return dispatch => {
    return axios
        .post(
            baseURL,
            location)
        .then(response => {
          return dispatch(createLocationData(response.data));
        })
        .catch(error => {
          throw error;
        });
  };
};

export const deleteALocation = location => {
    return dispatch => {
        let locName = location.code;
        return axios
            .delete(`${baseURL}${locName}`, { headers })
            .then(response => {
                dispatch(deleteLocationData(response.data));

            })
            .catch(error => {
                throw error;
            });
    };
};