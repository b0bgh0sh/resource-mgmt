import * as types from './actionTypes';
import { SVC_ROOT } from '../../config/config';
import { headers } from '../../config/adalConfig';
import axios from 'axios';

const baseURL = `${SVC_ROOT}skills/`;

export const loadSkillsAllData = skills => {
  return { type: types.LOAD_SKILLS_ALL, skills: skills };
};

export const loadSkills = () => {
  return dispatch => {
    return axios
      .get(baseURL, { headers })
      .then(response => {
        dispatch(loadSkillsAllData(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};
