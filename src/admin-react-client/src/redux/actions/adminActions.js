import * as types from './actionTypes';
import { SVC_ROOT } from '../../config/config';
import { headers } from '../../config/adalConfig';
import axios from 'axios';

const baseURL = `${SVC_ROOT}adminlogin/`;

export const adminAction = {
    logout,
};

export const loginSuccess = admin => {
    admin.authenticate = true;
    return {
        type: types.LOG_IN_SUCCESS,
        admin: admin,
    };
};

export const logoutData = admin => {
    return {
        type: types.LOG_OUT,
        admin:admin,
    };
};


export const updatePasswordData = admin => {
    return {
        type: types.UPDATE_PASSWORD,
        admin: admin,
    };
};

export const getAdminDate = () => {
    return {
        type: types.GET_ADMIN,

    }
}


export const login = admin => {
    return dispatch => {
        console.log("am I logging in?");
        return axios
            .get(`${baseURL}${admin.Username}/${admin.Password}`)
            .then(response => {
                if (response.status === 200) {
                    console.log(" am i true?");
                    dispatch(loginSuccess(admin));
                    return true;
                }
                if (response.status === 204) {
                    console.log("am I false ?");
                    return false;
                }
            })
            .catch(error => {
                throw error;
            });
    };
}

function logout(admin) {
    return dispatch => {
        dispatch(logoutData(admin));
    }
}


export const updatePassword = admin => {
    let oldAdmin = {Username:admin.name, Password: admin.oldPassword}
    console.log("updating");
    return dispatch => {
        return axios
            .patch(`${baseURL}${admin.newPassword}`,oldAdmin)
            .then(response => {
                console.log(response.data);
                dispatch(updatePasswordData(response.data));
            })
            .catch(error => {
                throw error;
            });
    };
};

