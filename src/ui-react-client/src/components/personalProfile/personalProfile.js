import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileMain from './profileMain';
import Sidebar from './sidebar';
import { loadPersonalProfile } from '../../redux/actions/personalProfileAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { deleteDiscipline } from '../../redux/actions/personalProfileAction';
import { deleteSkill } from '../../redux/actions/personalProfileAction';
import { addDiscipline } from '../../redux/actions/personalProfileAction';
import { addSkill } from '../../redux/actions/personalProfileAction';
import { updateSkillTable } from '../../redux/actions/personalProfileAction';
import { addFeedback } from '../../redux/actions/feedbackAction';
import { loadDisciplines } from '../../redux/actions/disciplinesActions';
import { loadDetails } from '../../redux/actions/personalProfileAction';
const PersonalProfile = ({
  personalProfileUser,
  loadPersonalProfile,
  loadDisciplines,
  deleteDiscipline,
  deleteSkill,
  addDiscipline,
  addSkill,
  updateSkillTable,
  addFeedback,
  disciplines,
  loadDetails,
}) => {
  useEffect(() => {
    if (Object.keys(personalProfileUser).length === 0) {
      loadPersonalProfile().catch(error => {
        alert('Loading personalProfile failed' + error);
      });
    }
    if (Object.keys(disciplines).length === 0) {
      loadDisciplines().catch(error => {
        alert('Loading disciplines failed' + error);
      });
    }
  }, [personalProfileUser]);

  const [currentState, setCurrentState] = useState('discipline');
  console.log('personalProfile', currentState);
  const renderPersonalProfile = () => {
    if (Object.keys(personalProfileUser).length === 0) {
      return <div>loading</div>;
    }
    // console.log('sss', personalProfileUser);
    return (
      <div>
        <Sidebar
          personalProfileUser={personalProfileUser.userProfile}
          setCurrentState={setCurrentState}
          currentState={currentState}
        />
        <ProfileMain
          personalProfileUser={personalProfileUser.userProfile}
          disciplines={personalProfileUser.disciplines}
          skills={personalProfileUser.skills}
          projects={personalProfileUser.projects}
          deleteDiscipline={deleteDiscipline}
          deleteSkill={deleteSkill}
          addDiscipline={addDiscipline}
          addSkill={addSkill}
          updateSkillTable={updateSkillTable}
          addFeedback={addFeedback}
          currentState={currentState}
          currentDiscipline={personalProfileUser.currentDiscipline}
          AllDisciplines={disciplines.map(discipline => {
            return discipline.name;
          })}
          skillsOfDiscipline={personalProfileUser.skillsOfDiscipline}
          util={personalProfileUser.util}
          details={personalProfileUser.details}
          projectName={personalProfileUser.projectName}
          loadDetails={loadDetails}
        />
      </div>
    );
  };

  return <div>{renderPersonalProfile()}</div>;
};

PersonalProfile.propTypes = {
  personalProfileUser: PropTypes.object.isRequired,
  disciplines: PropTypes.array.isRequired,
  loadPersonalProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  personalProfileUser: state.currentUserProfile,
  disciplines: state.disciplines,
});

const mapDispatchToProps = {
  loadPersonalProfile: loadPersonalProfile,
  deleteDiscipline: deleteDiscipline,
  deleteSkill: deleteSkill,
  addDiscipline: addDiscipline,
  addSkill: addSkill,
  updateSkillTable: updateSkillTable,
  addFeedback: addFeedback,
  loadDisciplines: loadDisciplines,
  loadDetails: loadDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonalProfile);
