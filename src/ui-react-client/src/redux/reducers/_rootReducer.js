import { combineReducers } from 'redux';
import users from './usersReducer';
import projects from './projectsReducer';
import locations from './locationsReducer';
import personalProfileReducer from './personalProfileReducer';
import disciplinesReducer from './disciplinesReducer';
import skillsReducer from './skillsReducer';
import feedbackReducer from './feedbackReducer';
import searchReducer from './searchReducer';
import organizations from './organizationReducer';
import managers from './managerReducer';


const rootReducer = combineReducers({
  users: users,
  projects: projects,
  locations: locations,
  currentUserProfile: personalProfileReducer,
  disciplines: disciplinesReducer,
  skills: skillsReducer,
  feedbacks: feedbackReducer,
  search: searchReducer,
  organizations:organizations,
  managers:managers,
});

export default rootReducer;
