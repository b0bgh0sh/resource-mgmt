import '../../scss/modal.scss';
import React, { useState, useEffect } from 'react';
import Search from '../search/search';
import { connect, useDispatch } from 'react-redux';
import { loadUsers } from '../../redux/actions/usersActions';
import { loadLocations } from '../../redux/actions/locationsActions';
import { loadDisciplines } from '../../redux/actions/disciplinesActions';
import { loadOrganizations } from '../../redux/actions/organizationActions';
import { loadManagers } from '../../redux/actions/managerActions';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

const CreateProjectModal = ({
  loadLocations,
  locations,
  createProject,
  addFeedback,
  loadOrganizations,
  organizations,
  loadDisciplines,
  disciplines,
  managers,
  loadManagers,
  organization,
}) => {
  const locOp = convertToOption(locations);
  const disOp = convertToOption(disciplines);
  const orOp = convertToOption(organizations);
  const [convertTrigger, setConvertTrigger] = useState(false);
  const [orTrigger, setOrTrigger] = useState(false);
  const [orgName, setOrgName] = useState('');

  useEffect(() => {
    if (Object.keys(locations).length === 0) {
      loadLocations().catch(error => {
        alert('Loading locations failed' + error);
      });
    }
    if (Object.keys(organizations).length === 0) {
      loadOrganizations().catch(error => {
        alert('Loading org failed' + error);
      });
    }
    if (Object.keys(disciplines).length === 0) {
      loadDisciplines().catch(error => {
        alert('Loading disciplines failed' + error);
      });
    }
    if (orTrigger && orgName) {
      loadManagers(orgName).catch(error => {
        alert('Loading disciplines failed' + error);
      });
      setOrTrigger(false);
      setConvertTrigger(true);
    }

    //winton edited here
    if (!managers.length) {
      loadManagers(organization).catch(error => {
        alert('Loading disciplines failed' + error);
      });
    }
  }, [
    locations,
    loadLocations,
    disciplines,
    loadDisciplines,
    organizations,
    loadOrganizations,
    managers,
    loadManagers,
    orgName,
    orTrigger,
    convertTrigger,
  ]);

  const close = () => {
    let modal = document.getElementById('createProjectModal');
    modal.style.display = 'none';
  };

  const [project, setProject] = useState({
    Number: '',
    Title: '',
    Location: '',
    FromDate: '',
    ToDate: '',
    ProjectManager: '',
    Discipline: '',
    Organization: organization,
  });

  const [submitted, setSubmitted] = useState(false);
  const [created, setCreated] = useState(false);
  const [createdWrong, setCreatedWrong] = useState(false);

  function convertToOption(dataType) {
    let disName = dataType.map(a => a.name);
    let disOption = [];

    for (const name of disName) {
      if (dataType === locations) {
        disOption.push({
          value: name,
          label: name,
          type: 'Location',
        });
      } else if (dataType === organizations) {
        disOption.push({
          value: name,
          label: name,
          type: 'Organization',
        });
      } else {
        disOption.push({
          value: name,
          label: name,
          type: 'Discipline',
        });
      }
    }
    return disOption;
  }

  const [manOp, setManOp] = useState([]);
  useEffect(() => {
    setManOp(manOp => convertManOp(managers));
  }, [managers]);

  function convertManOp(manager) {
    let manName = manager.map(({ username, fullName }) => ({
      username,
      fullName,
    }));
    let manOp = [];
    for (const name of manName) {
      manOp.push({
        value: name.fullName,
        label: name.fullName,
        userName: name.username,
      });
    }
    return manOp;
  }

  function handleChange(e) {
    let { name, value } = e.target;
    setProject(skill => ({ ...skill, [name]: value }));
  }

  function handleSelected(optionSelected) {
    if (optionSelected.type === 'Organization') {
      setOrTrigger(true);
      setOrgName(optionSelected.label);
    }

    const { value, label, type } = optionSelected;
    setProject(project => ({ ...project, [type]: value }));
  }

  function handleSelectedMan(optionSelected) {
    const value = optionSelected.userName;
    setProject(project => ({ ...project, ProjectManager: value }));
  }

  const handleSubmit = e => {
    e.preventDefault();

    setSubmitted(true);
    if (
      project.Number &&
      project.Title &&
      project.Location &&
      project.FromDate &&
      project.ToDate
    ) {
      console.log(project);
      createProject(project)
        .then(() => {
          addFeedback({
            type: 'success',
            data: '  :project is created successfully',
            show: true,
          });
        })
        .catch(error => {
          addFeedback({
            type: 'error',
            data: '  :project is created unsuccessfully',
            show: true,
          });
        });
    }
  };
  return (
    <div id="createProjectModal" className="modal">
      <div className="modal-content">
        <div className="header">
          <span className="close" onClick={close}>
            &times;
          </span>
          <div>
            <h5>Create Project</h5>
          </div>
          {submitted && created && (
            <div className="created-block">
              Project is successfully created.
            </div>
          )}
          {submitted && createdWrong && (
            <div className="help-block">
              Project is unsuccessfully created. Check your inputs.
            </div>
          )}
        </div>
        <div className="content-add">
          <form name="form" onSubmit={handleSubmit}>
            <div
              className={
                'input-content' +
                (submitted && !project.Number ? ' has-error' : '')
              }
            >
              <label className="input-name">Number</label>
              <input
                type="text"
                name="Number"
                value={project.Number}
                onChange={handleChange}
                placeholder="eg. 2020-VA3D-03"
              />
              {submitted && !project.Number && (
                <div className="help-block">Number is required</div>
              )}
            </div>
            <div
              className={
                'input-content' +
                (submitted && !project.Title ? ' has-error' : '')
              }
            >
              <label className="input-name">Project Title</label>
              <input
                type="text"
                name="Title"
                value={project.Title}
                onChange={handleChange}
              />
              {submitted && !project.Title && (
                <div className="help-block">
                  Project Title is required
                </div>
              )}
            </div>
            <div
              className={
                'input-content' +
                (submitted && !project.Location ? ' has-error' : '')
              }
            >
              <label className="input-name">Location</label>
              <Select
                name="location"
                defaultValue={'location'}
                onChange={handleSelected}
                options={locOp}
              />
              {submitted && !project.Location && (
                <div className="help-block">Location is required</div>
              )}
            </div>
            <div
              className={
                'input-content' +
                (submitted && !project.FromDate ? ' has-error' : '')
              }
            >
              <label className="input-name">Start Date</label>
              <input
                placeholder="YYYY-MM-DD"
                type="text"
                name="FromDate"
                value={project.FromDate}
                onChange={handleChange}
              />
              {submitted && !project.FromDate && (
                <div className="help-block">
                  Start Date is required
                </div>
              )}
            </div>
            <div
              className={
                'input-content' +
                (submitted && !project.ToDate ? ' has-error' : '')
              }
            >
              <label className="input-name">Finish Date</label>
              <input
                placeholder="YYYY-MM-DD"
                type="location"
                name="ToDate"
                value={project.ToDate}
                onChange={handleChange}
              />
              {submitted && !project.ToDate && (
                <div className="help-block">
                  Finish Date is required
                </div>
              )}
            </div>
            {/* <div
                className={
                  'input-content' +
                  (submitted && !project.Organization
                      ? ' has-error'
                      : '')
                }
            >
              <label className="input-name">Organization</label>
              <Select
                  name="organization"
                  defaultValue={"organization"}
                  onChange={handleSelected}
                  options={orOp}
              />
              {submitted && !project.Organization && (
                  <div className="help-block">
                    Organization is required
                  </div>
              )}
            </div> */}
            <div
              className={
                'input-content' +
                (submitted && !project.ProjectManager
                  ? ' has-error'
                  : '')
              }
            >
              <label className="input-name">Project Manager</label>
              <Select
                name="manager"
                cacheOptions
                defaultValue={'manager'}
                onChange={handleSelectedMan}
                options={manOp}
              />
              {submitted && !project.ProjectManager && (
                <div className="help-block">
                  Project Manager is required
                </div>
              )}
            </div>
            <div
              className={
                'input-content' +
                (submitted && !project.Discipline ? ' has-error' : '')
              }
            >
              <label className="input-name">Discipline</label>
              <Select
                name="location"
                defaultValue={'location'}
                onChange={handleSelected}
                options={disOp}
              />
              {submitted && !project.Discipline && (
                <div className="help-block">
                  Discipline is required
                </div>
              )}
            </div>
          </form>
        </div>
        <div>
          <button onClick={handleSubmit}>submit</button>
        </div>
      </div>
    </div>
  );
};
export const SearchModal = ({
  projectName,
  fromDate,
  toDate,
  organization,
}) => {
  const close = () => {
    let modal = document.getElementById('searchModal');
    modal.style.display = 'none';
  };
  return (
    <div
      style={{
        //padding: '20px',
        paddingLeft: '40px',
        paddingBottom: '40px',
        paddingRight: '40px',
      }}
      id="searchModal"
      className="modal"
    >
      <div style={{ width: '100%' }} className="modal-content">
        <div className="header">
          <span className="close" onClick={close}>
            &times;
          </span>
          <h5>Search User</h5>
        </div>
        <div>
          <div
            style={{
              width: '100%',
              overflow: 'hidden',
              height: '80vh',
              textAlign: 'center',
            }}
          >
            <Search
              projectName={projectName}
              fromDate={fromDate}
              toDate={toDate}
              organization={organization}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ForecastSummaryModal = ({
  datas,
  organization,
  changeYear,
}) => {
  const close = () => {
    let modal = document.getElementById('forecastSummaryModal');
    modal.style.display = 'none';
  };
  const [year, setYear] = useState(new Date().getFullYear());
  if (!datas) datas = [];
  const tableHead = [
    'UserName',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return (
    <div
      style={{
        //padding: '20px',
        paddingLeft: '40px',
        paddingBottom: '40px',
        paddingRight: '40px',
        paddingTop: '100px',
        //display: 'block',
      }}
      id="forecastSummaryModal"
      className="modal"
    >
      <div style={{ width: '100%' }} className="modal-content">
        <div className="header">
          <span className="close" onClick={close}>
            &times;
          </span>
        </div>
        <div>
          <div
            style={{
              width: '100%',
              overflow: 'hidden',
              height: '80vh',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            <div style={{ overflowX: 'none' }} className="table">
              <div>
                <div style={{ float: 'right' }}>
                  <select
                    id="forecast-select-year"
                    onChange={e => {
                      let { value } = e.target;
                      console.log('the value is ', value);
                      changeYear(organization, value);
                    }}
                    style={{
                      //appearance: 'none',
                      //'-webkit-appearance': 'none',
                      //width: '100px',
                      //lineHeight: '22px',
                      border: '2px',
                      borderStyle: 'solid',
                      borderColor: 'grey',
                      height: '33px',
                      marginTop: '3px',
                      marginRight: '20px',
                    }}
                  >
                    <option>{year}</option>
                    <option>{year + 1}</option>
                  </select>
                </div>

                <div className="header">
                  <h4>Forecast Summary</h4>
                </div>
              </div>
              <table
                style={{
                  width: '100%',
                }}
              >
                <tr>
                  {tableHead.map((name, index) => {
                    return (
                      <th key={index} scope="col">
                        <div>{name}</div>
                      </th>
                    );
                  })}
                </tr>
                <tbody style={{ maxHeight: '60vh' }}>
                  {datas.map((data, index) => {
                    return (
                      <>
                        <tr key={index}>
                          {Object.values(data).map((item, index) => {
                            //console.log(item);
                            if (typeof item === 'number') {
                              if (item < 0.8) {
                                return (
                                  <td
                                    style={{
                                      color: 'white',
                                      border: 'solid',

                                      backgroundColor: 'green',
                                      opacity: 0.5,
                                    }}
                                    key={index}
                                  >
                                    {item}
                                  </td>
                                );
                              } else if (item >= 0.8 && item <= 1.2) {
                                return (
                                  <td
                                    style={{
                                      color: 'white',
                                      border: 'solid',
                                      marginBottom: '1px',
                                      backgroundColor: '#c3c344',
                                      opacity: 0.5,
                                    }}
                                    key={index}
                                  >
                                    {item}
                                  </td>
                                );
                              } else {
                                return (
                                  <td
                                    style={{
                                      color: 'white',
                                      border: 'solid',
                                      backgroundColor: 'red',
                                      opacity: 0.5,
                                    }}
                                    key={index}
                                  >
                                    {item}
                                  </td>
                                );
                              }
                            } else {
                              return (
                                <td
                                  style={{
                                    color: 'white',
                                    border: 'solid',
                                    backgroundColor: 'black',
                                    opacity: 0.5,
                                  }}
                                >
                                  {item}
                                </td>
                              );
                            }
                          })}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UsersInfoModal = ({
  projectName,
  fromDate,
  toDate,
  organization,
}) => {
  const close = () => {
    let modal = document.getElementById('userInfoModal');
    modal.style.display = 'none';
  };
  return (
    <div
      style={{
        //padding: '20px',
        paddingLeft: '40px',
        paddingBottom: '40px',
        paddingRight: '40px',
      }}
      id="userInfoModal"
      className="modal"
    >
      <div style={{ width: '100%' }} className="modal-content">
        <div className="header">
          <span className="close" onClick={close}>
            &times;
          </span>
          <h5>Search User</h5>
        </div>
        <div>
          <div
            style={{
              width: '100%',
              overflow: 'hidden',
              height: '80vh',
              textAlign: 'center',
            }}
          >
            <Search
              projectName={projectName}
              fromDate={fromDate}
              toDate={toDate}
              organization={organization}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    locations: state.locations,
    disciplines: state.disciplines,
    organizations: state.organizations,
    managers: state.managers,
  };
};

const mapDispatchToProps = {
  loadLocations,
  loadDisciplines,
  loadOrganizations,
  loadManagers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProjectModal);
