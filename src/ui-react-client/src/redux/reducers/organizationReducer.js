import * as types from '../actions/actionTypes';
import initialState from './_initialState';

const executeLoadOrganizationAllData = action => {
    return action.organizations;
};

const executeCreateOrganizationData = (state, action) => {
    return [...state, {...action.organization}];
};

const executeUpdateOrganizationData = (state, action) => {
    return [...state, {...action.organization}];
};

const executeDeleteOrganizationData = (state, action) => {
    return state.filter(organization => organization.id !== action.organization.id);
};


export const organizationReducer = (state = initialState.organizations, action) => {
    switch (action.type) {
        case types.DELETE_ORGANIZATION:
            return executeDeleteOrganizationData(state,action);
        case types.CREATE_ORGANIZATION:
            return executeCreateOrganizationData(state,action);
        case types.LOAD_ORGANIZATION_ALL:
            return executeLoadOrganizationAllData(action);
        default:
            return state;
    }
};


export default organizationReducer;