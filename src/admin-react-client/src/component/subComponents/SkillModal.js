import Modal from 'react-bootstrap/Modal';
import React from "react";
import Button from "react-bootstrap/Button";
import {useState, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import "../../css/admin.css";
import {createSkill} from "../../redux/actions/skillsAction";
import {addFeedback} from "../../redux/actions/feedbackAction";
import {loadDisciplines} from "../../redux/actions/disciplinesActions";
import Select from 'react-select';




function SkillModal(props) {

    const [skill, setSkill] = useState({
        name: '',
        disciplineName: '',
    });

    const initialState = {
        name: '',
        disciplineName: '',
    };
    const disciplines = useSelector(state => state.disciplines);

    useEffect(() => {
        if (disciplines.length === 0) {
            dispatch(loadDisciplines())
                .catch(error => {
                alert('Loading users failed' + error);
            });
        }


    });

    function convertToOption(){
        let disName = disciplines.map(a => a.name);
        let disOption = [];

        for( const name of disName) {
            disOption.push({value:name, label:name});
        }
        return disOption;
    }

    const disOption = convertToOption();

    const [submitted, setSubmitted] = useState(false);

    const [created, setCreated] = useState(false);
    const [createdWrong, setCreatedWrong] = useState(false);
    const dispatch = useDispatch();

    function handleChange(e) {
        let {name, value} = e.target;

        setSkill(skill => ({...skill, [name]: value}));
    }

    function handleSelected(optionSelected){
        let name = optionSelected.value;
        setSkill(skill => ({...skill, disciplineName:name}));
    }
    function handleSubmit(e) {
        e.preventDefault();

        let disciplineName = document.getElementById("disciplineName");
        console.log(disciplines);
        setSubmitted(true);
        if(skill.disciplineName && skill.name) {
            dispatch(createSkill(skill))
                .then(() => {
                    dispatch(addFeedback({
                        type: 'success',
                        data: '  :'+ skill.name + ' created successfully',
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
        setSkill({...initialState});
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
                    Create New Skill
                    {submitted && created &&
                    <div className="created-block">Skill is successfully created.</div>
                    }
                    {submitted && createdWrong &&
                    <div className="help-block">Skill is unsuccessfully created. Check your skill name.</div>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (submitted && !skill.name ? ' has-error' : '')}>
                        <label>Skill Name</label>
                        <input type="text" name="name" value={skill.name} onChange={handleChange} className={'form-control'} />
                        {submitted && !skill.name &&
                        <div className="help-block">Skill Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && skill.disciplineName ? ' has-error' : '')}>
                        <label>Discipline Name</label>
                        <Select
                            name="disciplineName"
                            defaultValue={"Disciplines"}
                            onChange={handleSelected}
                            options={disOption}
                        />
                        {submitted && !skill.disciplineName &&
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
                    Create SKill
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default SkillModal;

