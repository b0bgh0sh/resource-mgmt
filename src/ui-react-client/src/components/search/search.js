import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AutoComplete from './autocomplete';
import { loadDisciplines } from '../../redux/actions/disciplinesActions';
import { loadSkills } from '../../redux/actions/skillsActions';
import { loadLocations } from '../../redux/actions/locationsActions';
import WTable from '../personalProfile/my_table';
import {
  searchUsers,
  addPeopleToProject,
} from '../../redux/actions/searchActions';
import { addFeedback } from '../../redux/actions/feedbackAction';
import Loading from '../loading/loading';
const Search = ({
  disciplines,
  loadDisciplines,
  skills,
  loadSkills,
  locations,
  loadLocations,
  searchUsers,
  searchUsersResult,
  projectName,
  addPeopleToProject,
  fromDate,
  toDate,
  addFeedback,
  organization,
}) => {
  // const [parsedDisciplines, setParsedDisciplines] = useState([]);
  useEffect(() => {
    if (disciplines.length === 0) {
      loadDisciplines().catch(error => {
        alert('Loading disciplines failed' + error);
      });
    }
    if (skills.length === 0) {
      loadSkills().catch(error => {
        alert('Loading skills failed' + error);
      });
    }
    if (locations.length === 0) {
      loadLocations().catch(error => {
        alert('Loading locations failed' + error);
      });
    }
  }, [
    disciplines,
    loadDisciplines,
    skills,
    loadSkills,
    locations,
    loadLocations,
  ]);
  const parseDisciplines = () => {
    if (disciplines.length !== 0) {
      let disciplinesName = disciplines.map(discipline => {
        return discipline.name;
      });
      // setParsedDisciplines(disciplinesName);
      return disciplinesName;
    }
  };
  const parseSkills = () => {
    if (skills.length !== 0) {
      let skillsName = skills.map(skill => {
        return skill.name;
      });
      // setParsedDisciplines(disciplinesName);
      return skillsName;
    }
  };
  const parseLocations = () => {
    if (locations.length !== 0) {
      let locationName = locations.map(location => {
        return location.name;
      });
      // setParsedDisciplines(disciplinesName);
      return locationName;
    }
  };
  const tableHead = [
    'Name',
    'Experience',
    'Skill',
    'Location',
    'Availability',
    'Add',
  ];
  const renderResultTable = () => {
    if (searchUsersResult.length === 0) {
      return (
        <>
          <WTable
            tableName="Result"
            tableHead={tableHead}
            checkBox={true}
            datas={[{ noresult: 'no results' }]}
          ></WTable>
          <div>
            <div
              style={{
                width: '10vw',

                marginBottom: '20px',
              }}
              className="btn-green"
              onClick={addPeople}
            >
              Add People
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <WTable
            tableName="Result"
            tableHead={tableHead}
            checkBox={true}
            datas={searchUsersResult}
          ></WTable>
          <div>
            <div
              style={{
                width: '10vw',

                marginBottom: '20px',
              }}
              className="btn-green"
              onClick={addPeople}
            >
              Add People
            </div>
          </div>
        </>
      );
    }
  };
  const renderSearchResult = () => {
    if (searchState === 'notSearching') {
      return (
        <>
          <WTable
            tableName="Result"
            tableHead={tableHead}
            checkBox={true}
            datas={searchUsersResult}
          ></WTable>
          <div>
            <div
              style={{
                width: '10vw',

                marginBottom: '20px',
              }}
              className="btn-green"
              onClick={addPeople}
            >
              Add People
            </div>
          </div>
        </>
      );
    } else if (searchState === 'searching') {
      return <Loading></Loading>;
    } else if (searchState === 'doneSearching') {
      return renderResultTable();
    }
  };
  const [searchState, setSearchState] = useState('notSearching');
  const search = () => {
    let content = {
      discipline: undefined,
      yoe: undefined,
      skill: undefined,
      fromDate: undefined,
      toDate: undefined,
      location: undefined,
      availability: undefined,
    };
    //console.log('in search ', content);
    content.discipline =
      document.getElementById('search-discipline').value === ''
        ? undefined
        : document.getElementById('search-discipline').value;
    if (!content.discipline) {
      let discipline = document.getElementById('search-discipline');
      console.log('in dicipline');
      discipline.parentElement.style.borderColor = 'red';
    } else {
      let discipline = document.getElementById('search-discipline');

      discipline.parentElement.style.borderColor = '#ccc';
    }
    let tempExperience = document.getElementById('search-experience')
      .value;

    //console.log(tempExperience);
    switch (tempExperience) {
      case '0':
        content.yoe = '1-3 years';
        break;
      case '1':
        content.yoe = '3-5 years';
        break;
      case '2':
        content.yoe = '5-10 years';
        break;
      case '3':
        content.yoe = '10+ years';
        break;
    }

    content.skill =
      document.getElementById('search-skills').value === ''
        ? undefined
        : document.getElementById('search-skills').value;
    content.location =
      document.getElementById('search-location').value === ''
        ? undefined
        : document.getElementById('search-location').value;
    content.fromDate =
      document.getElementById('search-fromDate').value === ''
        ? undefined
        : document.getElementById('search-fromDate').value;
    content.toDate =
      document.getElementById('search-toDate').value === ''
        ? undefined
        : document.getElementById('search-toDate').value;
    content.availability =
      document.getElementById('search-availability').value === ''
        ? undefined
        : parseInt(
            document.getElementById('search-availability').value,
          );
    console.log('serach content is ', content);

    if (!content.fromDate) {
      let fromDate = document.getElementById('search-fromDate');
      fromDate.style.borderColor = 'red';
    } else {
      let fromDate = document.getElementById('search-fromDate');
      fromDate.style.borderColor = '#ccc';
    }
    if (!content.toDate) {
      let toDate = document.getElementById('search-toDate');
      toDate.style.borderColor = 'red';
    } else {
      let toDate = document.getElementById('search-toDate');
      toDate.style.borderColor = '#ccc';
    }
    if (!(content.discipline && content.fromDate && content.toDate)) {
      return;
    }
    setSearchState('searching');
    searchUsers(content, organization)
      .then(() => {
        //setTimeout(1000);
        setSearchState('doneSearching');
      })
      .catch //setTimeout(setSearchState('doneSearching'), 3000)
      ();
  };
  const addPeople = () => {
    let checkboxes = document.querySelectorAll('.searchCheckbox');
    let people = [];
    checkboxes.forEach(checkBox => {
      if (checkBox.checked) {
        people.push({ Username: checkBox.name });
      }
    });
    addPeopleToProject(people, projectName, fromDate, toDate)
      .then(() => {
        console.log('added');
        addFeedback({
          type: 'success',
          data: 'add people successfully',
          show: true,
        });
      })
      .catch(error => {
        console.log('not added');
        addFeedback({
          type: 'error',
          data: 'add people unsuccessfully',
          show: true,
        });
      });
    console.log(people, projectName);
  };
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          //width: '100vw',
          height: '100vh',
          margin: 0,
          // position: 'fixed',
          // padding: '10px',
        }}
        className="card"
      >
        <div
          style={{
            width: '37vw',
            padding: '10px',
          }}
          className="col1"
        >
          <div
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: 0,
              //marginTop: '30px',
              padding: '20px',
              paddingTop: '5px',
            }}
          >
            <div className="search">
              <div
                style={{
                  borderBottom: '2px solid #ccc',
                  margin: '0',
                }}
                className="row"
              >
                <div className="header">
                  <h3>Search</h3>
                </div>
              </div>
              <div className="line"></div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="title">
                        <i className="fas fa-user-graduate mr-4 fa-lg"></i>
                        Discipline*
                      </div>
                    </td>
                    <td>
                      <AutoComplete
                        id="search-discipline"
                        elements={parseDisciplines()}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="title">
                        <i className="fas fa-user-clock mr-3 fa-lg"></i>
                        experience
                      </div>
                    </td>
                    <td>
                      <select
                        id="search-experience"
                        className="searchBox"
                      >
                        <option value="0">1-3 years</option>
                        <option value="1">3-5 years</option>
                        <option value="2">5-10 years</option>
                        <option value="3">10+ years</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="title">
                        <i className="fas fa-book mr-4 fa-lg"></i>
                        Skills
                      </div>
                    </td>
                    <td>
                      <AutoComplete
                        id="search-skills"
                        elements={parseSkills()}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="title">
                        <i className="fas fa-calendar-day mr-4 fa-lg"></i>
                        FromDate*
                      </div>
                    </td>
                    <td>
                      <input
                        id="search-fromDate"
                        placeholder="YYYY-MM-DD"
                        className="searchBox"
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="title">
                        <i className="fas fa-calendar-day mr-4 fa-lg"></i>
                        ToDate*
                      </div>
                    </td>
                    <td>
                      <input
                        id="search-toDate"
                        placeholder="YYYY-MM-DD"
                        className="searchBox"
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="title">
                        <i className="fas fa-street-view mr-4 fa-lg"></i>
                        Location
                      </div>
                    </td>
                    <td>
                      <AutoComplete
                        id="search-location"
                        elements={parseLocations()}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="title">
                        <i className="fas fa-calendar-check mr-4 fa-lg"></i>
                        Availability
                      </div>
                    </td>
                    <td>
                      <input
                        id="search-availability"
                        type="text"
                        className="searchBox"
                      ></input>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div>
                <div
                  style={{
                    width: '7vw',
                    marginTop: '20px',
                  }}
                  className="btn-green"
                  onClick={search}
                >
                  Search
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ width: '62vw', padding: '10px' }}
          className="col2"
        >
          <div
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: 0,
              marginTop: '0px',
              padding: '20px',
              paddingTop: '5px',
              //height: '75vh',
            }}
          >
            {renderSearchResult()}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    disciplines: state.disciplines,
    skills: state.skills,
    locations: state.locations,
    searchUsersResult: state.search,
  };
};

const mapDispatchToProps = {
  loadDisciplines,
  loadSkills,
  loadLocations,
  searchUsers,
  addPeopleToProject,
  addFeedback,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
