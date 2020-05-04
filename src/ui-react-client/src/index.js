import { runWithAdal } from 'react-adal';
import { authContext, headers } from './config/adalConfig';
import initialState from './redux/reducers/_initialState';
const DO_NOT_LOGIN = false;

runWithAdal(
  authContext,
  () => {
    console.log(
      'the user is ',
      authContext.getCachedUser().userName.split('@')[0],
    );
    // eslint-disable-next-line
    require('./indexApp.js');
  },
  DO_NOT_LOGIN,
);
