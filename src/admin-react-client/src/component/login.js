import React, {useState} from "react";
import loginImg from "../svg/login.svg";
import "../scss/login.scss";
import { NavLink } from "react-router-dom";
import {login} from "../redux/actions/adminActions";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";



const Login = ({ authenticate,
                 setAuthenticate,
                }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        Username:'',
        Password:'',
        authenticate: false,
    });

    const [submitted, setSubmitted] = useState(false);
    const [eitherWrong, setEitherWrong] = useState(false);




    function handleChange(e) {
        let {name, value} = e.target;
        setUser(user => ({...user, [name]: value}));
    }


    function validate(e) {
        e.preventDefault();
        setSubmitted(true);
        if (user.Username && user.Password) {
            dispatch(login(user))
                .then((loggedIn) => {
                    if (loggedIn) {
                        history.push("/admin");
                    } else {
                        setEitherWrong(true);
                    }
                })
                .catch(error => {
                    throw error;
                });
        }
    };

        return (
            <div className="base-container">
                <div className="header">Login</div>
                {submitted && eitherWrong &&
                <div className="help-block">Wrong password or user name. Please try again.</div>
                }
                <div className="content">
                    <div className="image">
                        <img src={loginImg}/>
                    </div>
                    <div className="form">
                        <div className={'form-group' + (submitted && !user.Username ? ' has-error' : '')}>
                            <label htmlFor="Username">Username</label>
                            <input type="text" className="form-control" name="Username" value={user.Username}
                                   onChange={handleChange}/>
                            {submitted && !user.Username &&
                            <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.Password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="Password" value={user.Password}
                                   onChange={handleChange}/>
                            {submitted && !user.Password &&
                            <div className="help-block">Password is required</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <NavLink className="item" to="/admin">
                        <div className="btn-purple" onClick={validate}>
                            Login
                        </div>
                    </NavLink>
                </div>
            </div>
        );
    }

export default Login;