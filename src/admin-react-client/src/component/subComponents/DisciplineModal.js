import Modal from 'react-bootstrap/Modal';
import React from "react";
import Button from "react-bootstrap/Button";
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../../css/admin.css";
import {createDiscipline} from "../../redux/actions/disciplinesActions";
import {createSkill} from "../../redux/actions/skillsAction";
import {addFeedback} from "../../redux/actions/feedbackAction";


function DisciplineModal(props) {
    const [discipline, setDiscipline] = useState({
        name: '',
    });

    const initialState = {
        name: '',
    };

    const [submitted, setSubmitted] = useState(false);
    const [created, setCreated] = useState(false);
    const [createdWrong, setCreatedWrong] = useState(false);
    const dispatch = useDispatch();

    function handleChange(e) {
        const {name, value} = e.target;
        setDiscipline(discipline => ({...discipline, [name]: value}));
    }
    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if(discipline.name) {
            dispatch(createDiscipline(discipline))
                .then(() => {
                    dispatch(addFeedback({
                        type: 'success',
                        data: '  :'+ discipline.name + ' created successfully',
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
        setDiscipline({...initialState});
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
                    Create New Discipline

                    {submitted && createdWrong &&
                    <div className="help-block">Discipline is unsuccessfully created. Check your discipline name.</div>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (submitted && !discipline.name ? ' has-error' : '')}>
                        <label>Discipline Name</label>
                        <input type="text" name="name" value={discipline.name} onChange={handleChange} className={'form-control'} />
                        {submitted && !discipline.name &&
                        <div className="help-block">Discipline Name is required</div>
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
                    Create Discipline
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DisciplineModal;