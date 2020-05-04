import React from 'react';
import {
  Route,
  Switch,
  NavLink,
  BrowserRouter as Router,
} from 'react-router-dom';
//Import all needed Components
// import AdminPage from './components/admin/AdminPage';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { Login } from './components/login/login';
const store = configureStore();
render(
  <Provider store={store}>
    <Login />
    {/* <Router>
      <NavLink to="/admin/login"></NavLink>
      <Switch>
        <nav>
          <Route path="/admin/login" component={Login} />
        </nav>
      </Switch>
    </Router> */}
  </Provider>,
  document.getElementById('root'),
);
