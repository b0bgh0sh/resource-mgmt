import React, { useState } from "react";
import "./App.css";
import Login from "./component/login";
import Admin from "./component/admin/admin";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import {connect} from "react-redux";

const App = ({
              admin,
          }) => {


    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={props =>
                admin.authenticate === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/"
                        }}
                    />
                )
            }
        />
    );

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props => (
                            <Login
                                {...props}

                            />
                        )}
                    />
                    <PrivateRoute path="/admin" component={Admin} />
                </Switch>
            </Router>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        admin: state.admin,
    };
};

export default connect(
    mapStateToProps,
)(App);




