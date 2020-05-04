import * as types from './actionTypes';
import { SVC_ROOT } from '../../config/config';
import { headers } from '../../config/adalConfig';
import axios from 'axios';

const baseURL = `${SVC_ROOT}projects/`;

export const loadProjectsMostRecentData = projects => {
  return {
    type: types.LOAD_PROJECTS_MOST_RECENT,
    projects: projects,
  };
};

export const loadProjectsData = projects => {
  return {
    type: types.LOAD_PROJECTS_ALL,
    projects: projects,
  };
};

export const createProjectAction = project => {
  return {
    type: types.CREATE_PROJECT,
    payload: project,
  };
};

export const updateProjectData = project => {
  return {
    type: types.UPDATE_PROJECT,
    project: project,
  };
};

export const deleteProjectData = projectName => {
  return {
    type: types.DELETE_PROJECT,
    payload: projectName,
  };
};

export const loadProjectsMostRecent = () => {
  return dispatch => {
    return axios
      .get(`${baseURL}most-recent`, { headers })
      .then(response => {
        dispatch(loadProjectsMostRecentData(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

//changed
export const loadProjects = organization => {
  return dispatch => {
    let URL = `${SVC_ROOT}activatedlist/org/${organization}`;
    console.log('the load Project URL is ', URL);
    return axios
      .get(URL, { headers })
      .then(response => {
        console.log('the response of loadProject is ', response);
        response = response.data.map(item => {
          return {
            Name: item.project,
            Location: item.location,
            'Project Manager': item.projectManager,
            Discipline: item.discipline,
            StartDate: (item.fromDate + '').split('T')[0],
            EndDate: (item.toDate + '').split('T')[0],
            UpdateTime: (item.updatedAt + '').split('T')[0],
            Status: item.status,
          };
        });
        dispatch(loadProjectsData(response));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const createProject = project => {
  return dispatch => {
    return axios
      .post(baseURL, project, { headers })
      .then(response => {
        console.log('createProJECT RESPOSE is ', response);
        let item = response.data;
        response = {
          Name: item.project,
          Location: item.location,
          'Project Manager': item.projectManager,
          Discipline: item.discipline,
          StartDate: (item.fromDate + '').split('T')[0],
          EndDate: (item.toDate + '').split('T')[0],
          UpdateTime: (item.updatedAt + '').split('T')[0],
          Status: item.status,
        };
        dispatch(createProjectAction(response));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const updateProject = () => {
  return dispatch => {
    return axios
      .put(baseURL, { headers })
      .then(response => {
        dispatch(updateProjectData(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const loadForecastSummary = (organization, year) => {
  return dispatch => {
    let URL = `${SVC_ROOT}util/${organization}/${year}/176`;
    console.log('load forecast summary is URL is ', URL);
    return axios
      .get(URL, { headers })
      .then(response => {
        console.log('load ForecastSummary is ', response.data);
        dispatch(loadForecastSummaryAction(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const loadForecastSummaryAction = response => {
  return { type: types.LOAD_FORECAST_SUMMARY, payload: response };
};

export const updateProjectStatus = (projectName, status) => {
  return dispatch => {
    let URL = `${SVC_ROOT}projectstatus/status/${projectName}/${status}`;
    //console.log('the url is ', URL);
    return axios
      .patch(URL, { headers })
      .then(response => {
        //console.log('update project status reposen', response);
        dispatch(updateProjectStatusAction(projectName, status));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const updateProjectStatusAction = (projectName, status) => {
  let payload = { projectName: projectName, status: status };
  return {
    type: types.UPDATE_PROJECT_STATUS,
    payload: payload,
  };
};
export const editProjectTotal = (projectName, data) => {
  return dispatch => {
    let URL = `${SVC_ROOT}projectstatus/${projectName}`;
    return axios
      .put(URL, { headers }, { data: data })
      .then(response => {
        dispatch(editProjectTotalAction());
      })
      .catch(error => {
        throw error;
      });
  };
};

export const editProjectTotalAction = () => {
  return {
    type: types.EDIT_PROJECT_TOTAL,
    payload: '',
  };
};

export const editProjectUser = (userName, projectName, data) => {
  return dispatch => {
    let URL = `${SVC_ROOT}userproject/${userName}/${projectName}`;
    return axios
      .put(URL, { headers }, { data: data })
      .then(response => {
        dispatch(editProjectUserAction());
      })
      .catch(error => {
        throw error;
      });
  };
};

export const editProjectUserAction = () => {
  return {
    type: types.EDIT_PROJECT_USER,
    payload: '',
  };
};

export const forecastProject = (projectName, resource, data) => {
  return dispatch => {
    let TotalURL = `${SVC_ROOT}projectstatus/${projectName}`;
    let UerURL = `${SVC_ROOT}userprojects/${resource}/${projectName}`;
    let url;
    if (resource === 'Total') {
      url = TotalURL;
    } else {
      url = UerURL;
    }
    console.log('the URL is', url, 'data is ', JSON.stringify(data));

    const options = {
      method: 'PUT',
      headers: headers,
      data: data,
      url,
    };

    return axios(options)
      .then(response => {
        dispatch(forecastProjectAction());
      })
      .catch(error => {
        throw error;
      });
  };
};

export const forecastProjectAction = () => {
  return {
    type: types.FORECAST_PROJECT,
    payload: {},
  };
};

export const deleteProject = name => {
  return dispatch => {
    let URL = `${SVC_ROOT}projects/${name}`;
    return axios
      .delete(URL, { headers })
      .then(response => {
        //console.log('the repose is ', response);
        dispatch(deleteProjectData(name));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const loadDetails = (projectName, fromDate, toDate) => {
  return dispatch => {
    let url = `${SVC_ROOT}util/${projectName}`;
    return axios
      .get(url, { headers })
      .then(response => {
        //console.log('the load detail', response);
        return dispatch(
          loadDetailAction(
            projectName,
            response.data,
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

export const loadDetailAction = (
  projectName,
  response,
  fromDate,
  toDate,
) => {
  projectName = projectName;
  let parsedResponse = response.map(item => {
    return {
      resource: item.resource,
      fromDate: fromDate,
      toDate: toDate,
      projectName: projectName,
      year: [
        {
          Jan: item.jan,
          Feb: item.feb,
          Mar: item.mar,
          Apr: item.apr,
          May: item.may,
          Jun: item.jun,
          Jul: item.jul,
          Aug: item.aug,
          Sep: item.sep,
          Oct: item.oct,
          Nov: item.nov,
          Dec: item.dec,
        },
        {
          Jan: item.jan2,
          Feb: item.feb2,
          Mar: item.mar2,
          Apr: item.apr2,
          May: item.may2,
          Jun: item.jun2,
          Jul: item.jul2,
          Aug: item.aug2,
          Sep: item.sep2,
          Oct: item.oct2,
          Nov: item.nov2,
          Dec: item.dec2,
        },
      ],
    };
  });
  return {
    type: types.LOAD_DETAILS,
    payload: { details: parsedResponse },
  };
};
