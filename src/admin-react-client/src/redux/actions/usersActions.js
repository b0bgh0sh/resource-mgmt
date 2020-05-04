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

export const deleteUserData = user => {
    return {
        type: types.DELETE_USER,
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

export const createAUser = user => {
    return dispatch => {
        return axios
            .post(
                baseURL,
                user)
                    .then(response => {
                        return dispatch(createUserData(response.data));
                    })
                    .catch(error => {
                        throw error;
                    });
    };
};

export const deleteAUser = username => {
    return dispatch => {
        let userId = username.username;
        return axios
            .delete(`${baseURL}${userId}`, { headers })
            .then(response => {
                 dispatch(deleteUserData(response.data));
            })
            .catch(error => {
                throw error;
            });
    };

};
