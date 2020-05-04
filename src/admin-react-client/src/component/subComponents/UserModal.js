import Modal from 'react-bootstrap/Modal';
import React from "react";
import Button from "react-bootstrap/Button";
import {createAUser} from "../../redux/actions/usersActions";
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../../css/admin.css";
import {addFeedback} from "../../redux/actions/feedbackAction";
import {loadLocations} from "../../redux/actions/locationsActions";
import {loadOrganizations} from "../../redux/actions/organizationActions";
import Select from "react-select";



function UserModal(props) {
    const [user, setUser] = useState({
        id: 1,
        firstName: '',
        lastName: '',
        username: '',
        location: '',
        type: '',
        organization:'',
    });

    const initialState = {
        id: 1,
        firstName: '',
        lastName: '',
        username: '',
        location: '',
        type: '',
        organization:'',
    };

    const locations = useSelector(state => state.locations);
    const organizations = useSelector(state => state.organizations);

    useEffect(() => {
        if (locations.length === 0) {
            dispatch(loadLocations())
                .catch(error => {
                    alert('Loading location failed' + error);
                });
        }

        if (organizations.length === 0) {
            dispatch(loadOrganizations())
                .catch(error => {
                    alert('Loading organization failed' + error);
                });
        }

    });

    function convertToOption(dataType){
        let disName = dataType.map(a => a.name);
        let disOption = [];

        for( const name of disName) {
            if(dataType === locations)
                disOption.push({value:name, label:name});
            else
                disOption.push({value:name, label:name});
        }
        return disOption;
    }

    const locOp = convertToOption(locations);
    const orOp = convertToOption(organizations);

    const [submitted, setSubmitted] = useState(false);
    const [createdWrong, setCreatedWrong] = useState(false);
    const dispatch = useDispatch();

    function handleChange(e) {
        const {name, value} = e.target;
        setUser(user => ({...user, [name]: value}));
    }

    function handleSelectedLoc(optionSelected){

        const {value, label} = optionSelected;
        setUser(user => ({...user,location:label }));
    }

    function handleSelectedOr(optionSelected){

        const {value, label} = optionSelected;
        setUser(user => ({...user,organization:label }));
    }

    function handleSubmit(e) {
       // e.preventDefault();

        setSubmitted(true);
        if(user.firstName && user.lastName && user.location && user.type && user.username && user.organization) {
            dispatch(createAUser(user))
                .then(() => {
                    dispatch(addFeedback({
                        type: 'success',
                        data: '  :'+ user.username + ' created successfully',
                        show: true,
                    }));
                    closing();
                })
                .catch(error => {
                    setCreatedWrong(true);
                });
        }
    }

    function closing(){
        setInitialState();
        props.onHide();
    }

    function setInitialState() {
        setSubmitted(false);
        setCreatedWrong(false);
        setUser({...initialState});
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create New User
                    {submitted && createdWrong &&
                    <div className="help-block">User is unsuccessfully created. Check your user name.</div>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (submitted && !user.organization ? ' has-error' : '')}>
                        <label>Organization</label>
                        <Select
                            name="organization"
                            defaultValue={"organization"}
                            onChange={handleSelectedOr}
                            options={orOp}
                        />
                        {submitted && !user.organization &&
                        <div className="help-block">Organization Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label>First Name</label>
                        <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control'} />
                        {submitted && !user.firstName &&
                        <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control'} />
                        {submitted && !user.lastName &&
                        <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label>Username</label>
                        <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' } />
                        {submitted && !user.username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.location ? ' has-error' : '')}>
                        <label>Location</label>
                        <Select
                            name="location"
                            defaultValue={"location"}
                            onChange={handleSelectedLoc}
                            options={locOp}
                        />
                        {submitted && !user.location &&
                        <div className="help-block">location is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.type ? ' has-error' : '')}>
                        <label htmlFor="inputState">Type of User</label>
                        <select type = "text" name= "type" value ={user.type} onChange={handleChange} className={"form-control"}>
                            <option selected>Choose...</option>
                            <option>Individual Contributor</option>
                            <option>Resource Manager</option>
                            <option>Project Manager</option>
                        </select>
                        {submitted && !user.type &&
                        <div className = "help-block">User type is required</div>
                        }
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer><Button variant="secondary" onClick={() => {
                setInitialState();
                props.onHide();
            }}>
                Close
            </Button>
                <Button variant="primary" onClick = {() => {
                    handleSubmit();
                }}>
                    Create User
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserModal;