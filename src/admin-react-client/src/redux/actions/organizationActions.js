import * as types from './actionTypes';
import { SVC_ROOT } from '../../config/config';
import { headers } from '../../config/adalConfig';
import axios from 'axios';


const baseURL = `${SVC_ROOT}org/`;

export const loadOrganizationAllData = organizations => {
    return { type: types.LOAD_ORGANIZATION_ALL, organizations: organizations };
};

export const createOrganizationData = organization => {
    return {
        type: types.CREATE_ORGANIZATION,
        organization: organization,
    };
};

export const deleteOrganizationData = organization => {
    return {
        type: types.DELETE_ORGANIZATION,
        organization: organization,
    };
};

export const loadOrganizations = () => {
    return dispatch => {
        return axios
            .get(baseURL, { headers })
            .then(response => {
                dispatch(loadOrganizationAllData(response.data));
            })
            .catch(error => {
                throw error;
            });
    };
};

export const createAOrganization = organization => {
    return dispatch => {
        return axios
            .post(
                baseURL,
                organization)
            .then(response => {
                return dispatch(createOrganizationData(response.data));
            })
            .catch(error => {
                throw error;
            });
    };
};

export const deleteAOrganization = organization => {
    return dispatch => {
        let orgName =organization.id;
        return axios
            .delete(`${baseURL}${orgName}`, { headers })
            .then(response => {
                dispatch(deleteOrganizationData(response.data));
            })
            .catch(error => {
                throw error;
            });
    };

};
