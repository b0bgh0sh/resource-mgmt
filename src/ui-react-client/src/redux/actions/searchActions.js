import * as types from './actionTypes';
import { SVC_ROOT } from '../../config/config';
import { headers } from '../../config/adalConfig';
import axios from 'axios';

const baseURL = `${SVC_ROOT}skills/`;

export const searchUsersAction = users => {
  return { type: types.SEARCH_USERS, payload: users };
};
// {
//   "discipline": "airports",
//   "yoe": "3-5 years",
//   "skill": "aprons",
//   "location": "kitchener",
//   "fromDate": "2020-07-01",
//   "toDate": "2021-01-01",
//   "availability": 40
// }

export const addPeopleToProject = (
  people,
  projectName,
  fromDate,
  toDate,
) => {
  let url = `${SVC_ROOT}userprojects/multi/${projectName}`;
  //let url ='https://turtle-ae.azurewebsites.net/userprojects/multi/Consequatur20%ad20%dignissimos';
  // console.log(
  //   'addPeopleToProject URL is ',
  //   url,
  //   people,
  //   fromDate,
  //   toDate,
  // );
  return dispatch => {
    const options = {
      method: 'POST',
      headers: headers,
      data: people,
      url,
    };
    return axios(options)
      .then(response => {
        //console.log('reponse is ', response);
        dispatch(
          addPeopleToProjectAction(
            people,
            projectName,
            fromDate,
            toDate,
          ),
        );
      })
      .catch(error => {
        throw error;
      });
  };
};
export const addPeopleToProjectAction = (
  people,
  projectName,
  fromDate,
  toDate,
) => {
  let payload = [];
  people.map(person => {
    payload.push({
      resource: person.Username,
      fromDate: fromDate,
      toDate: toDate,
      projectName: projectName,
      year: [
        {
          Jan: 0,
          Feb: 0,
          Mar: 0,
          Apr: 0,
          May: 0,
          Jun: 0,
          Jul: 0,
          Aug: 0,
          Sep: 0,
          Oct: 0,
          Nov: 0,
          Dec: 0,
        },
        {
          Jan: 0,
          Feb: 0,
          Mar: 0,
          Apr: 0,
          May: 0,
          Jun: 0,
          Jul: 0,
          Aug: 0,
          Sep: 0,
          Oct: 0,
          Nov: 0,
          Dec: 0,
        },
      ],
    });
  });
  return { type: types.ADD_PEOPLE_TO_PROJECT, payload: payload };
};
export const searchUsers = (content, organization) => {
  let url = `${SVC_ROOT}search/users/${organization}`;
  //console.log('the contenet is ', content);
  //console.log(JSON.stringify(content));
  //console.log('the contenet is ', content);
  // content = {
  //   discipline: 'Environmental Management',
  //   yoe: '3-5 years',
  //   //skill: 'aprons',
  //   //location: 'kitchener',
  //   fromDate: '2020-04-01',
  //   toDate: '2021-04-01',
  //   //availability: 40,
  // };
  return dispatch => {
    const options = {
      method: 'POST',
      headers: headers,
      data: content,
      url,
    };
    return axios(options)
      .then(response => {
        response = response.data.map(item => {
          let availability = (item.availability * 100 + '').split(
            '.',
          )[0];
          return {
            name: item.username,
            experience: item.yoe,
            Skill: item.skill,
            Location: item.location,
            Availability: availability + '%',
          };
        });
        //console.log('the search reposen is ', response);
        dispatch(searchUsersAction(response));
      })
      .catch(error => {
        throw error;
      });
  };
};
