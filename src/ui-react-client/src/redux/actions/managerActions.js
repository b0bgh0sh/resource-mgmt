import * as types from './actionTypes';
import { SVC_ROOT } from '../../config/config';
import { headers } from '../../config/adalConfig';
import axios from 'axios';


const baseURL = `${SVC_ROOT}managers/`;

export const loadManagerAllData = managers => {
    return { type: types.LOAD_MANAGERS, managers:managers };
};

export const getManagerData = users => {
    return {
        type: types.GET_MANAGERS,
        users: users
    };
};


export const loadManagers = (organizations) => {
    console.log("am i being fetched ?");
    return dispatch => {
        return axios
            .get(`${baseURL}${organizations}`, { headers })
            .then(response => {
                dispatch(loadManagerAllData(response.data));
            })
            .catch(error => {
                throw error;
            });
    };
};

export const getManagers = (users) => {
    return dispatch => {
        dispatch(getManagerData(users));
    };
};


