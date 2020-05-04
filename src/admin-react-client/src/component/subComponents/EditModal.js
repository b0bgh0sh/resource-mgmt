import Modal from 'react-bootstrap/Modal';
import React from "react";
import Button from "react-bootstrap/Button";
import {useState, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import "../../css/admin.css";
import {addFeedback} from "../../redux/actions/feedbackAction";
import {updatePassword} from "../../redux/actions/adminActions";



function EditModal(props){

    const admin = useSelector(state => state.admin);

    const [user, setUser] = useState({
        name:admin.Username,
        oldPassword:admin.Password,
        password:'',
        newPassword:'',
        checkPassword:'',
    });

    const initialState = {
        name:'',
        oldPassword:'',
        password:'',
        newPassword:'',
        checkPassword:'',
    };


    const [submitted, setSubmitted] = useState(false);
    const [updatedWrong, setUpdatedWrong] = useState(false);
    const [samePassword, setSamePassword] = useState(false);
    const dispatch = useDispatch();

    function handleChange(e) {
        let {name, value} = e.target;

        setUser(user => ({...user, [name]: value}));
    }
    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);

        if(user.newPassword === user.oldPassword) {
           setSamePassword(true);
           return;
       }

        if(user.checkPassword !== user.newPassword) {
            setUpdatedWrong(true);
            return;
        }


        if(user.name && user.password && user.checkPassword && user.newPassword) {
            dispatch(updatePassword(user))
                .then(() => {
                    dispatch(addFeedback({
                        type: 'success',
                        data: '  :password changed successfully',
                        show: true,
                    }));
                    closing();
                })
                .catch(error => {
                    dispatch(addFeedback({
                        type: 'error',
                        data: '  :password changed unsuccessfully',
                        show: true,

                    }));
                });
        }
    }

    function closing(){
        setInitialState();
        props.onHide();
    }

    function setInitialState() {
        setSubmitted(false);
        setSamePassword(false);
        setUpdatedWrong(false);
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
                   Change Password
                    {submitted && samePassword &&
                    <div className="help-block">password should be different with old password</div>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label>Password</label>
                        <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control'} />
                        {submitted && !user.password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && user.newPassword ? ' has-error' : '')}>
                        <label>New Password</label>
                        <input type="password" name="newPassword" value={user.newPassword} onChange={handleChange} className={'form-control'} />
                        {submitted && !user.newPassword &&
                        <div className="help-block">New Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && user.checkPassword ? ' has-error' : '')}>
                        <label>Confirm Password</label>
                        <input type="password" name="checkPassword" value={user.checkPassword} onChange={handleChange} className={'form-control'} />
                        {submitted && !user.checkPassword &&
                        <div className="help-block">New Password is required</div>
                        }
                        {submitted && updatedWrong &&
                        <div className="help-block">both passwords should be the same.</div>
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
                <Button variant="primary" onClick={handleSubmit}>
                    Change Password
                </Button>
            </Modal.Footer>
        </Modal>
    );
}



export default EditModal;