import * as types from './actionTypes';
import { SVC_ROOT } from '../../config/config';
import { headers } from '../../config/adalConfig';
import axios from 'axios';


const baseURL = `${SVC_ROOT}disciplines/`;

export const loadDisciplineAllData = disciplines => {
  return {
    type: types.LOAD_DISCIPLINES_ALL,
    disciplines: disciplines
  };
};

export const createDisciplineData = discipline => {
    return {
        type: types.CREATE_DISCIPLINE,
        discipline: discipline,
    };
};

export const deleteDisciplineData = discipline => {
    return {
        type: types.DELETE_DISCIPLINE,
        discipline: discipline,
    };
};

export const loadDisciplines = () => {
  return dispatch => {
    console.log('the URL is ', baseURL);
    return axios
        .get(baseURL, { headers })
        .then(response => {
          console.log('the reuslt is ', response);
          dispatch(loadDisciplineAllData(response.data));
        })
        .catch(error => {
          throw error;
        });
  };
};

export const createDiscipline = discipline => {
    return dispatch => {
        return axios
            .post(
                baseURL,
                discipline)
            .then(response => {
                return dispatch(createDisciplineData(response.data));
            })
            .catch(error => {
                throw error;
            });
    };
};

export const deleteADiscipline = discipline => {
    return dispatch => {
        let disName = discipline.name;
        return axios
            .delete(`${baseURL}${disName}`, { headers })
            .then(response => {
                dispatch(deleteDisciplineData(response.data));

            })
            .catch(error => {
                throw error;
            });
    };
};

