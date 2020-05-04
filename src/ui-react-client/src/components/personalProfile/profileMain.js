import React, { Component, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Posts from './post';
// import Table from './table';
import * as msg from '../feedbackMsg/feedbackMsg';
import personImage from '../../image/person.png';
import WTable from './my_table';
import { headers } from '../../config/adalConfig';
import WButton from './button';
import AutoComplete from '../autocomplete/autocomplete';

const ProfileMain = ({
  personalProfileUser,
  AllDisciplines,
  skills,
  deleteDiscipline,
  deleteSkill,
  addSkill,
  addDiscipline,
  updateSkillTable,
  addFeedback,
  disciplines,
  currentState,
  projects,
  currentDiscipline,
  skillsOfDiscipline,
  util,
  details,
  loadDetails,
  projectName,
}) => {
  // console.log('All disciplines', AllDisciplines);
  const [showAddDiscipline, setShowAddDiscipline] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const addSkillButton = () => {
    setShowAddSkill(true);
  };
  const addDisciplineButton = () => {
    console.log('show adddiscipline'.showAddDiscipline);

    setShowAddDiscipline(true);
    console.log('show adddiscipline'.showAddDiscipline);
  };
  const cancelAddSkill = () => {
    setShowAddSkill(false);
  };
  const cancelAddDiscipline = () => {
    setShowAddDiscipline(false);
  };
  const submitAddDiscipline = () => {
    let discipline = document.getElementById('addDisciplineName')
      .value;
    let yoe = document.getElementById('addDisciplineYOE').value;
    //console.log('yoe isisisisiisis', yoe);
    addDiscipline(discipline, yoe)
      .then(() => {
        addFeedback({
          type: 'success',
          data: '  :add discipline successfully',
          show: true,
        });
      })
      .catch(error => {
        addFeedback({
          type: 'error',
          data: '  :add unsuccessfully',
          show: true,
        });
      });
    // console.log('disdflasdkfj', discipline, yoe);
  };
  const submitAddSkill = () => {
    let skill = document.getElementById('addSkillName').value;
    addSkill(skill)
      .then(() => {
        addFeedback({
          type: 'success',
          data: '  :add skill successfully',
          show: true,
        });
      })
      .catch(error => {
        addFeedback({
          type: 'error',
          data: '  :add unsuccessfully',
          show: true,
        });
      });
    // console.log('disdflasdkfj', skill);
  };
  const getColor = value => {
    if (value <= 0.8) return 'rgba(99, 212, 129,0.5)';
    else if (value > 0.8 && value <= 1.2)
      return 'rgba(230, 226, 28,0.5)';
    else return 'rgba(255,99,132,0.5)';
  };
  const getColorOnHover = value => {
    if (value <= 0.8) return 'rgba(99, 212, 129)';
    else if (value > 0.8 && value <= 1.2) return 'rgba(230, 226, 28)';
    else return 'rgba(255,99,132)';
  };
  const renderUtil = number => {
    if (util.length !== 0) {
      const data = {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            label: `util: ${util[number].year}`,
            backgroundColor: [
              `${getColor(`${util[number].jan}`)}`,
              `${getColor(`${util[number].feb}`)}`,
              `${getColor(`${util[number].mar}`)}`,
              `${getColor(`${util[number].apr}`)}`,
              `${getColor(`${util[number].may}`)}`,
              `${getColor(`${util[number].jun}`)}`,
              `${getColor(`${util[number].jul}`)}`,
              `${getColor(`${util[number].aug}`)}`,
              `${getColor(`${util[number].sep}`)}`,
              `${getColor(`${util[number].oct}`)}`,
              `${getColor(`${util[number].nov}`)}`,
              `${getColor(`${util[number].dec}`)}`,
            ],
            borderColor: 'rgba(255,99,132,1)',
            // borderWidth: 1,
            hoverBackgroundColor: [
              `${getColorOnHover(`${util[number].jan}`)}`,
              `${getColorOnHover(`${util[number].feb}`)}`,
              `${getColorOnHover(`${util[number].mar}`)}`,
              `${getColorOnHover(`${util[number].apr}`)}`,
              `${getColorOnHover(`${util[number].may}`)}`,
              `${getColorOnHover(`${util[number].jun}`)}`,
              `${getColorOnHover(`${util[number].jul}`)}`,
              `${getColorOnHover(`${util[number].aug}`)}`,
              `${getColorOnHover(`${util[number].sep}`)}`,
              `${getColorOnHover(`${util[number].oct}`)}`,
              `${getColorOnHover(`${util[number].nov}`)}`,
              `${getColorOnHover(`${util[number].dec}`)}`,
            ],
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [
              `${util[number].jan}`,
              `${util[number].feb}`,
              `${util[number].mar}`,
              `${util[number].apr}`,
              `${util[number].may}`,
              `${util[number].jun}`,
              `${util[number].jul}`,
              `${util[number].aug}`,
              `${util[number].sep}`,
              `${util[number].oct}`,
              `${util[number].nov}`,
              `${util[number].dec}`,
            ],
          },
        ],
      };
      return (
        <>
          <Bar
            data={data}
            width={400}
            height={250}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </>
      );
    } else {
      console.log('the tueil is ', util);
    }
  };

  const renderMain = () => {
    console.log('PROFILE main currentState', currentState);
    if (currentState === 'discipline') {
      return (
        <div className="profileMain">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100vw',
              height: '100vh',
              margin: 0,
              position: 'fixed',
            }}
            className="card"
          >
            <div
              style={{
                width: '50vw',
              }}
              className="col1"
            >
              <div
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px',
                }}
              >
                <WTable
                  datas={disciplines}
                  tableHead={[
                    'Discipline',
                    'Years of experience',
                    'operation',
                  ]}
                  remove={deleteDiscipline}
                  selectRow={updateSkillTable}
                  addFeedback={addFeedback}
                  tableName={'Discipline'}
                />
                <div style={{ float: 'left' }}>
                  <WButton
                    buttonNameOne={'Add'}
                    buttonNameTwo={'Cancel'}
                    id={'addDiscipline'}
                    onClickButtonOne={addDisciplineButton}
                    onClickButtonTwo={cancelAddDiscipline}
                  />
                </div>

                {/* add discipline component */}
                {showAddDiscipline ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    className="content-add"
                  >
                    <AutoComplete
                      elements={AllDisciplines}
                      placeholder={'disciplines'}
                      id={'addDisciplineName'}
                    />
                    {/* <AutoComplete
                      elements={[]}
                      placeholder="Years of experience"
                      id={'addDisciplineYOE'}
                    /> */}
                    <select
                      style={{
                        height: '30px',
                      }}
                      id="addDisciplineYOE"
                    >
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-7 years">5-7 years</option>
                      <option value="7-10 years">7-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                    <button
                      onClick={submitAddDiscipline}
                      style={{ borderRadius: '5px' }}
                    >
                      submit
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            {/* column 2 */}
            <div className="col2">
              <div
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px',
                  marginLeft: 0,
                  width: '30vw',
                }}
              >
                <WTable
                  datas={skills}
                  tableHead={['skills', 'operation']}
                  remove={deleteSkill}
                  addFeedback={addFeedback}
                  tableName={
                    'Skills: ' +
                    (currentDiscipline
                      ? currentDiscipline.discipline
                      : '')
                  }
                />
                <WButton
                  buttonNameOne={'Add'}
                  buttonNameTwo={'Cancel'}
                  id={'addSkill'}
                  onClickButtonOne={addSkillButton}
                  onClickButtonTwo={cancelAddSkill}
                />

                {/* add skill component */}
                {showAddSkill ? (
                  <div className="content-add">
                    <AutoComplete
                      elements={skillsOfDiscipline}
                      placeholder={'skill'}
                      id={'addSkillName'}
                    />

                    <button
                      onClick={submitAddSkill}
                      style={{ borderRadius: '5px' }}
                    >
                      submit
                    </button>
                  </div>
                ) : null}
              </div>

              {/* pagination table */}
              {/* <div>
              <Table />
            </div> */}
            </div>
          </div>
        </div>
      );
    } else if (currentState === 'project') {
      return (
        <div className="profileMain">
          {/* <Modal /> */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100vw',
              height: '100vh',
              margin: 0,
              position: 'fixed',
              padding: '20px',
            }}
            className="card"
          >
            <div className="col1">
              <div
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px',
                  width: '74vw',
                }}
              >
                <WTable
                  datas={projects}
                  tableName={'Project'}
                  tableHead={[
                    'Name',
                    'Location',
                    'Start Date',
                    'End Date',
                    'Update Time',
                    'Status',
                  ]}
                  width={'100%'}
                ></WTable>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (currentState === 'availability') {
      return (
        <div>
          <div className="profileMain">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100vw',
                height: '100vh',
                margin: 0,
                position: 'fixed',
                padding: '20px',
              }}
              className="card"
            >
              <div className="col1">
                <div
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px',
                    width: '74vw',
                  }}
                >
                  {renderUtil(0)}
                </div>
                <div
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px',
                    width: '74vw',
                  }}
                >
                  {renderUtil(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{renderMain()}</div>;
};
export default ProfileMain;
