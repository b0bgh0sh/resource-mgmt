import { Route, Switch } from 'react-router-dom';
//Import all needed Components
import Header from './common/Header';
import HomePage from './home/HomePage';
import UsersPage from './users/UsersPage';
import LocationsPage from './locations/LocationsPage';
import PageNotFound from './PageNotFound';
import AdminPage from './admin/AdminPage';
import Loading from './loading/loading';
import ProjectInfoPage from './projects/ProjectInfoPage';
import UserInfoPage from './projects/UserInfoPage';
import ProjectsPage from './projects/ProjectsPage';
import PersonalProfile from './personalProfile/personalProfile';
import Search from './search/search';
import '../scss/sidebar.scss';
import '../scss/profileMain.scss';
import './App.css';
import '../scss/search.scss';
import '../scss/loading.scss';
import '../scss/table.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadPersonalProfile } from '../redux/actions/personalProfileAction';
import { connect } from 'react-redux';
import ShowFeedbackMsg from './feedbackMsg/feedbackMsg';

const App = ({ personalProfileUser, loadPersonalProfile }) => {
  useEffect(() => {
    if (Object.keys(personalProfileUser).length === 0) {
      loadPersonalProfile().catch(error => {
        alert('Loading personalProfile failed' + error);
      });
      console.log('tyeepeppe', personalProfileUser);
      // userType = personalProfileUser.userProfile.type;
    }
  }, [personalProfileUser]);

  const userType = personalProfileUser.userProfile
    ? personalProfileUser.userProfile.type
    : '';

  const renderPrivateRoute = () => {
    if (
      userType === 'Resource Manager' ||
      userType === 'Project Manager'
    ) {
      return <Route path="/projects" component={ProjectsPage} />;
    }
  };

  const renderAll = () => {
    if (userType && Object.keys(personalProfileUser).length !== 0) {
      return (
        <div className="App">
          <Header />
          <ShowFeedbackMsg />
          <Switch>
            {/*All our Routes goes here!*/}
            <Route
              path="/projects/:project/:user"
              component={UserInfoPage}
            />
            {renderPrivateRoute()}
            {/* <Route
              path="/projects/:project"
              component={ProjectInfoPage}
            /> */}
            <Route path="/locations" component={LocationsPage} />
            <Route exact path="/" component={PersonalProfile} />
            {/* add admin component */}
            <Route path="/admin" component={AdminPage} />
            <Route path="/search" component={Search} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: '60px' }}>
          <Loading />
        </div>
      );
    }
  };

  return renderAll();
};
Header.propTypes = {
  personalProfileUser: PropTypes.object.isRequired,
  loadPersonalProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  personalProfileUser: state.currentUserProfile,
});

const mapDispatchToProps = {
  loadPersonalProfile: loadPersonalProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
