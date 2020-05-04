import { combineReducers } from 'redux';
import users from './usersReducer';
import projects from './projectsReducer';
import locations from './locationsReducer';
import skills from './skillsReducer';
import disciplines from './disciplinesReducer';
import feedbacks from './feedbackReducer';
import admin from './adminReducer';
import organizations from './organizationReducer';

const rootReducer = combineReducers({
  users: users,
  projects: projects,
  locations: locations,
  skills: skills,
  disciplines: disciplines,
  feedbacks: feedbacks,
  admin: admin,
  organizations: organizations,
});

export default rootReducer;
