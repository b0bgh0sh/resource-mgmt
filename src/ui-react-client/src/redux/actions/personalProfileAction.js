import * as types from './actionTypes';
import { SVC_ROOT } from '../../config/config';
import { headers } from '../../config/adalConfig';
import axios from 'axios';
import { authContext } from '../../config/adalConfig';

const currentUser = authContext
  .getCachedUser()
  .userName.split('@')[0];

const baseURL = `${SVC_ROOT}users/${currentUser}`;
let currentDiscipline = '';

export const loadUserProfile = (
  userProfile,
  disciplines,
  skills,
  projects,
  currentDiscipline,
  skillsOfDiscipline,
  util,
) => {
  if (!disciplines) disciplines = [];
  if (!skills) skills = [];
  if (disciplines[0]) {
    currentDiscipline = disciplines[0];
  } else {
  }
  let profile = {
    userProfile: userProfile,
    disciplines: disciplines,
    skills: skills,
    projects: projects,
    currentDiscipline: disciplines[0],
    skillsOfDiscipline: skillsOfDiscipline,
    util: util,
  };
  //console.log('the total is ', profile);
  return { type: types.LOAD_PERSONALPROFILE, payload: profile };
};

export const editLocationAction = userProfile => {
  return {
    type: types.EDIT_LOCATION,
    payload: userProfile.data,
    status: userProfile.status,
  };
};

// export const loadUserDisciplineAction = discipline => {
//   return { type: types.LOAD_USERDISCIPLINE_ALL, payload: discipline };
// };

export const loadPersonalProfile = () => {
  return dispatch => {
    //console.log('the URL is ', baseURL);

    //personal profile
    return axios
      .get(baseURL, { headers })
      .then(response => {
        //console.log('the personal profile response ', response);

        //load disciplines
        axios
          .get(`${SVC_ROOT}${currentUser}/disciplines`, {
            headers,
          })
          .then(disciplines => {
            //console.log('the discipline is ', disciplines.data);
            if (disciplines.data[0]) {
              //load current skills
              currentDiscipline = disciplines.data[0];
              axios
                .get(
                  `${SVC_ROOT}${currentUser}/skills/${disciplines.data[0].discipline}`,
                  {
                    headers,
                  },
                )
                .then(skills => {
                  //console.log(disciplines, skills);

                  //load the project of the user

                  let projectURL = `${SVC_ROOT}userprojects/${currentUser}`;
                  axios
                    .get(projectURL, { headers })
                    .then(projectResponse => {
                      let tempProjects = projectResponse.data;

                      //auto skills of the discipline
                      let URL = `${SVC_ROOT}skills/d/${disciplines.data[0].discipline}`;
                      //console.log('skills of the discipline ', URL);
                      axios
                        .get(URL, { headers })
                        .then(skillDisciplinesR => {
                          //console.log(
                          //   'skillDisciplineR',
                          //   skillDisciplinesR,
                          // );

                          //load utitl
                          let URL = `${SVC_ROOT}util/user/${currentUser}`;
                          //console.log('util URL is ', URL);
                          axios
                            .get(URL, { headers })
                            .then(utilResponse => {
                              // console.log(
                              //   'the util reponse is ',
                              //   utilResponse,
                              // );
                              dispatch(
                                loadUserProfile(
                                  response.data,
                                  disciplines.data,
                                  skills.data.map(skill => {
                                    return { skill: skill.name };
                                  }),
                                  tempProjects.map(project => {
                                    let tempproject = {
                                      project: project.project,
                                      location: project.location,
                                      fromDate: project.fromDate.split(
                                        'T',
                                      )[0],
                                      toDate: project.toDate.split(
                                        'T',
                                      )[0],
                                      updatedAt: project.updatedAt.split(
                                        'T',
                                      )[0],
                                      active: project.status,
                                    };
                                    return tempproject;
                                  }),
                                  disciplines.data[0].discipline,
                                  skillDisciplinesR.data.map(
                                    skill => {
                                      return skill.name;
                                    },
                                  ),
                                  utilResponse.data,
                                ),
                              );
                            })
                            .catch();
                        })
                        .catch();
                    })
                    .catch();
                })
                .catch(error => {
                  throw error;
                });
            }
            let projectURL = `${SVC_ROOT}userprojects/${currentUser}`;
            axios
              .get(projectURL, { headers })
              .then(projectResponse => {
                let tempProjects = projectResponse.data;

                //load utitl
                let URL = `${SVC_ROOT}/util/user/${currentUser}`;
                //console.log('util URL is ', URL);
                axios
                  .get(URL, { headers })
                  .then(utilResponse => {
                    dispatch(
                      loadUserProfile(
                        response.data,
                        disciplines.data,
                        [],
                        tempProjects.map(project => {
                          let tempproject = {
                            project: project.project,
                            location: project.location,
                            fromDate: project.fromDate.split('T')[0],
                            toDate: project.toDate.split('T')[0],
                            updatedAt: project.updatedAt.split(
                              'T',
                            )[0],
                            active: project.status,
                          };
                          return tempproject;
                        }),
                        {},
                        [],
                        utilResponse.data,
                      ),
                    );
                  })
                  .catch();
              })
              .catch();
            //dispath when there is no disciplines
            dispatch(
              loadUserProfile(response.data, disciplines.data, []),
            );
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        throw error;
      });
  };
};

export const editLocation = profile => {
  return dispatch => {
    //console.log('editlocatio url', `${SVC_ROOT}users`, baseURL);
    let url = `${SVC_ROOT}users`;
    console.log('the profiel sending is ', profile);
    return axios
      .patch(url, { headers: headers }, { data: profile })
      .then(response => {
        dispatch(editLocationAction(response));
      })
      .catch(error => {
        throw error;
      });
  };
};
export const deleteDiscipline = discipline => {
  return dispatch => {
    //console.log(discipline);
    //return dispatch(deleteDisciplineAction(discipline));
    let url = `${SVC_ROOT}${currentUser}/disciplines/${discipline.discipline}`;
    //console.log('the delete url is ', url);
    return axios
      .delete(url, { headers: headers })
      .then(response => {
        //console.log('deleteDiscipline response', response);
        dispatch(deleteDisciplineAction(discipline));
        if (discipline.discipline === currentDiscipline.discipline) {
          dispatch(updateSkillTableAction([]));
        }
      })
      .catch(error => {
        throw error;
      });
  };
};

export const deleteDisciplineAction = discipline => {
  return {
    type: types.DELETE_DISCIPLINE,
    payload: discipline,
  };
};

export const deleteSkillAction = skill => {
  return {
    type: types.DELETE_SKILL,
    payload: skill,
  };
};
export const deleteSkill = skill => {
  return dispatch => {
    //console.log('the skill is ', skill);
    let url = `${SVC_ROOT}${currentUser}/${currentDiscipline.discipline}/${skill.skill}`;
    //console.log('the skill url is ', url);
    return axios
      .delete(url, { headers: headers })
      .then(response => {
        //console.log('the delete skill response', response);
        return dispatch(deleteSkillAction(skill));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const addSkill = skill => {
  return dispatch => {
    let url = `${SVC_ROOT}personal`;
    console.log('the skill is ', skill);
    //console.log({
    //   username: currentUser,
    //   skill: skill,
    //   discipline: currentDiscipline.discipline,
    //   yoe: currentDiscipline.yoe,
    // });
    //console.log(currentDiscipline);
    return axios
      .post(
        url,
        {
          username: currentUser,
          skill: skill,
          discipline: currentDiscipline.discipline,
          yoe: currentDiscipline.yoe,
        },
        { headers: headers },
      )
      .then(response => {
        //console.log('add skill response', response);
        return dispatch(
          addSkillAction({ skill: response.data.skill }),
        );
      })
      .catch(error => {
        throw error;
      });
  };
};

export const addSkillAction = skill => {
  return {
    type: types.ADD_SKILL,
    payload: skill,
  };
};

export const addDiscipline = (discipline, yoe) => {
  return dispatch => {
    let url = `${SVC_ROOT}${currentUser}/disciplines`;
    //console.log('the add discipline url is ', url, discipline, yoe);
    return axios
      .post(
        url,
        { discipline: discipline, yoe: yoe },
        { headers: headers },
      )
      .then(response => {
        //console.log('the add discipline response', response);
        return dispatch(addDisciplineAction(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const addDisciplineAction = discipline => {
  return {
    type: types.ADD_DISCIPLINE,
    payload: discipline,
  };
};

export const updateSkillTable = discipline => {
  //console.log('updateSkillTbale ', discipline);
  return dispatch => {
    let url = `${SVC_ROOT}${currentUser}/skills/${discipline.discipline}`;
    //console.log('the updateSkillTable url is ', url);
    return axios
      .get(url, { header: headers })
      .then(response => {
        currentDiscipline = discipline;
        //console.log('the add discipline response', response);
        let URL = `${SVC_ROOT}skills/d/${discipline.discipline}`;
        //console.log('url siisisis', URL);
        axios
          .get(URL, { headers })
          .then(skillDisciplinesR => {
            return dispatch(
              updateSkillTableAction(
                response.data.map(skill => {
                  return { skill: skill.name };
                }),
                discipline,
                skillDisciplinesR.data.map(skill => {
                  return skill.name;
                }),
              ),
            );
          })
          .catch();
      })
      .catch(error => {
        throw error;
      });
  };
};

export const updateSkillTableAction = (
  skills,
  discipline,
  skillsOfDiscipline,
) => {
  return {
    type: types.UPDATE_SKILL_TABLE,
    payload: { skills, discipline, skillsOfDiscipline },
  };
};

export const loadDetails = projectName => {
  return dispatch => {
    let url = `${SVC_ROOT}util/${projectName}`;
    //console.log('the add discipline url is ', url, discipline, yoe);
    return axios
      .get(url, { headers })
      .then(response => {
        //
        console.log('the load detail', response);
        return dispatch(loadDetailAction(projectName, response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const loadDetailAction = (projectName, response) => {
  projectName = projectName;

  return {
    type: types.LOAD_DETAILS,
    payload: { details: response, projectName: projectName },
  };
};
