import Modal from 'react-bootstrap/Modal';
import React from "react";
import Button from "react-bootstrap/Button";
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../../css/admin.css";
import {createLocation} from "../../redux/actions/locationsActions";
import {addFeedback} from "../../redux/actions/feedbackAction";



function LocationModal(props) {
    const [location, setLocation] = useState({
        code: '',
        name: '',
    });

    const initialState = {
        code: '',
        name: '',
    };

    const [submitted, setSubmitted] = useState(false);
    const [created, setCreated] = useState(false);
    const [createdWrong, setCreatedWrong] = useState(false);
    const dispatch = useDispatch();

    function handleChange(e) {
        const {name, value} = e.target;
        setLocation(location => ({...location, [name]: value}));
    }
    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if(location.code && location.name) {
            dispatch(createLocation(location))
                .then(() => {
                    dispatch(addFeedback({
                        type: 'success',
                        data: '  :'+ location.name + ' created successfully',
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
        setLocation({...initialState});
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
                    Create New Location
                    {submitted && created &&
                    <div className="created-block">Location is successfully created.</div>
                    }
                    {submitted && createdWrong &&
                    <div className="help-block">Location is unsuccessfully created. Check your Location code.</div>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (submitted && !location.name ? ' has-error' : '')}>
                        <label>Location Name</label>
                        <input type="text" name="name" value={location.name} onChange={handleChange} className={'form-control'} />
                        {submitted && !location.name &&
                        <div className="help-block">Location Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && location.code ? ' has-error' : '')}>
                        <label>Location Code</label>
                        <input type="text" name="code" value={location.code} onChange={handleChange} className={'form-control'} />
                        {submitted && !location.code &&
                        <div className="help-block">Location Code is required</div>
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
                    Create Location
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LocationModal;