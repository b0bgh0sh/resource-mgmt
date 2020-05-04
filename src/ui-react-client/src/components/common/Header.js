import { NavLink } from 'react-router-dom';
import UserHeaderMenu from './UserHeaderMenu';
import '../../scss/admin.scss';
import '../../scss/header.scss';
import AEICON from '../icons/associated-engineering-logo-png-transparent.png';
import { authContext } from '../../config/adalConfig';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadPersonalProfile } from '../../redux/actions/personalProfileAction';
import { connect } from 'react-redux';

const Header = ({ personalProfileUser, loadPersonalProfile }) => {
  const activeStyle = {
    // color: '#B39CD0',
  };

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

  const renderProject = () => {
    console.log('the user type is ', userType);
    if (
      userType === 'Resource Manager' ||
      userType === 'Project Manager'
    ) {
      return (
        <li>
          <div>
            <NavLink
              className="item"
              to="/projects"
              activeStyle={activeStyle}
            >
              <div onClick={e => moveBar(e)}>
                <i
                  style={{
                    display: 'block',
                  }}
                  className="fas fa-calendar-minus fa-lg"
                ></i>
                Projects
              </div>
            </NavLink>
          </div>
        </li>
      );
    }
    return <div></div>;
  };
  let originalBarPosition = 90;
  const moveBar = e => {
    // let offsets = e.getBoundingClientRect();
    // let top = offsets.top;
    // let left = offsets.left;
    let bar = document.getElementById('bar');
    if (originalBarPosition === undefined) {
      console.log("it's undefined");
      originalBarPosition = document
        .getElementById('bar')
        .getBoundingClientRect().x;
    }
    //console.log('the originalBarPosition is ', originalBarPosition);
    let difference =
      e.target.getBoundingClientRect().x - originalBarPosition - 4;
    // console.log('the difference is ', difference);
    // console.log(
    //   'current position is ',
    //   e.target.getBoundingClientRect().x,
    // );
    bar.style.transform = 'translate(' + difference + 'px)';
    bar.style.width =
      e.target.getBoundingClientRect().width + 8 + 'px';
    //console.log('the width  ', bar.style.width);
  };
  return (
    <div>
      <div className="Hnavbar">
        <div>
          <NavLink to="/">
            <img src={AEICON}></img>
          </NavLink>
        </div>
        <div>
          <ul>
            <li style={{ marginLeft: '0px' }}>
              <NavLink
                className="item"
                to="/"
                activeStyle={activeStyle}
                exact
              >
                <div onClick={e => moveBar(e)}>
                  <i
                    style={{
                      display: 'block',
                    }}
                    className="far fa-user fa-lg"
                  ></i>
                  Profile
                </div>
              </NavLink>
            </li>
            <li>
              <a
                className="item"
                href="https://turtle-319-admin.azurewebsites.net/"
                activeStyle={activeStyle}
              >
                <div id="search" onClick={e => moveBar(e)}>
                  <i
                    style={{
                      display: 'block',
                    }}
                    className="fas fa-users-cog fa-lg"
                  ></i>
                  Admin
                </div>
              </a>
            </li>
            {/* <li>
              <NavLink
                className="item"
                to="/personalProfile"
                activeStyle={activeStyle}
              >
                <div onClick={e => moveBar(e)}>
                  <i
                    style={{
                      display: 'block',
                    }}
                    className="far fa-user fa-lg"
                  ></i>
                  Profile
                </div>
              </NavLink>
            </li> */}
            {renderProject()}
          </ul>
          <div id="bar" className="bar"></div>
        </div>
        <div className="logout" onClick={() => authContext.logOut()}>
          <i
            style={{
              display: 'block',
              color: 'white',
            }}
            className="fas fa-sign-out-alt fa-lg"
          >
            <h6 style={{ fontSize: '15px', fontWeight: 'bold' }}>
              Log out
            </h6>
          </i>
        </div>
      </div>
      <div className="space-occupy"></div>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
// export default Header;
