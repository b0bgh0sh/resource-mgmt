import * as types from './actionTypes';
import { SVC_ROOT } from '../../config/config';
import { headers } from '../../config/adalConfig';
import axios from 'axios';
import {deleteDisciplineData} from "./disciplinesActions";

const baseURL = `${SVC_ROOT}skills/`;

export const loadSkillsAllData = skills => {
  return { type: types.LOAD_SKILLS_ALL, skills: skills };
};

export const createSkillData = skill => {
    return {
        type: types.CREATE_SKILL,
        skill: skill,
    };
};

export const deleteSkillData = skill => {
    return {
        type: types.DELETE_SKILL,
        skill: skill,
    };
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

export const createSkill = skill => {
  return dispatch => {
      console.log(skill);
    return axios
        .post(
            baseURL,
            skill)
        .then(response => {
            console.log(response.data);
          return dispatch(createSkillData(response.data));
        })
        .catch(error => {
          throw error;
        });
  };
};

export const deleteASkill = skill => {
    return dispatch => {
        let skiName = skill.name;
        return axios
            .delete(`${baseURL}${skiName}`, { headers })
            .then(response => {
                dispatch(deleteSkillData(response.data));

            })
            .catch(error => {
                throw error;
            });
    };
};
