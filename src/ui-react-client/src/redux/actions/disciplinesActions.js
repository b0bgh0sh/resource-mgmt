import * as types from './actionTypes';
import { SVC_ROOT } from '../../config/config';
import { headers } from '../../config/adalConfig';
import axios from 'axios';

const baseURL = `${SVC_ROOT}disciplines/`;

export const loadDisciplineAllData = disciplines => {
  return {
    type: types.LOAD_DISCIPLINES_ALL,
    disciplines: disciplines,
  };
};

export const loadDisciplines = () => {
  return dispatch => {
    //console.log('the URL is ', baseURL);
    return axios
      .get(baseURL, { headers })
      .then(response => {
        //console.log('the reuslt is ', response);
        dispatch(loadDisciplineAllData(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};
