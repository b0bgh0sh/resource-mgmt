import * as types from '../actions/actionTypes';
import initialState from './_initialState';

const executeLoginData = (state, action) => {
    return action.admin;
};

const getAdminData =  (state, action) => {
   return state;
};

const executeLogoutData = (state, action) => {
    return initialState.admin;
};

const executeUpdatePasswordData = (state, action) => {
    action.admin.authenticate = true;
    console.log(action.admin);
    return action.admin;
};

export const adminReducer = (
    state = initialState.admin,
    action,
) => {
    switch (action.type) {
        case types.GET_ADMIN:
            return state;
        case types.LOG_OUT:
            return executeLogoutData(state,action);
        case types.LOG_IN_SUCCESS:
            return executeLoginData(state,action);
        case types.UPDATE_PASSWORD:
            return executeUpdatePasswordData(state,action);
        default:
            return state
    }
};

export default adminReducer;