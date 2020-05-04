import Modal from 'react-bootstrap/Modal';
import React from "react";
import Button from "react-bootstrap/Button";
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../../css/admin.css";
import {createSkill} from "../../redux/actions/skillsAction";
import {addFeedback} from "../../redux/actions/feedbackAction";
import {createAOrganization} from "../../redux/actions/organizationActions";


function OrganizationModal(props) {

    const [organization, setOrganization] = useState({
        name: '',
    });

    const initialState = {
        name: '',
    };
    //const disciplines = useSelector(state => state.disciplines);
    const [submitted, setSubmitted] = useState(false);
    const [created, setCreated] = useState(false);
    const [createdWrong, setCreatedWrong] = useState(false);
    const dispatch = useDispatch();

    function handleChange(e) {
        let {name, value} = e.target;

        setOrganization(organization => ({...organization, [name]: value}));
    }
    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if(organization.name) {
            dispatch(createAOrganization(organization))
                .then(() => {
                    dispatch(addFeedback({
                        type: 'success',
                        data: '  :'+ organization.name + ' created successfully',
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
        setOrganization({...initialState});
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
                    Create New Organization

                    {submitted && createdWrong &&
                    <div className="help-block">Organization is unsuccessfully created. Check your name.</div>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (submitted && !organization.name ? ' has-error' : '')}>
                        <label>Organization Name</label>
                        <input type="text" name="name" value={organization.name} onChange={handleChange} className={'form-control'} />
                        {submitted && !organization.name &&
                        <div className="help-block">Organization Name is required</div>
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
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrganizationModal;