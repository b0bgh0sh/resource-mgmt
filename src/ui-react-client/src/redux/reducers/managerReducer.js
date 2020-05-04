import * as types from '../actions/actionTypes';
import initialState from './_initialState';

const executeLoadManagerAllData = action => {
    return action.managers;
};




export const managerReducer = (state = initialState.managers, action) => {
    switch (action.type) {
        case types.LOAD_MANAGERS:
            return executeLoadManagerAllData(action);
        default:
            return state;
    }
};


export default managerReducer;