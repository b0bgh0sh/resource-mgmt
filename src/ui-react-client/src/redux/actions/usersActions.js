import * as types from './actionTypes';
import { SVC_ROOT } from '../../config/config';
import { headers } from '../../config/adalConfig';
import axios from 'axios';

const baseURL = `${SVC_ROOT}users/`;

export const loadUsersAllData = users => {
  return { type: types.LOAD_USERS_ALL, users: users };
};

export const createUserData = user => {
  return {
    type: types.CREATE_USER,
    user: user,
  };
};

export const loadUsers = () => {
  return dispatch => {
    return axios
      .get(baseURL, { headers })
      .then(response => {
        dispatch(loadUsersAllData(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const createAUser = () => {
  return dispatch => {
    return axios
      .get(baseURL, { headers })
      .then(response => {
        dispatch(createUserData(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};