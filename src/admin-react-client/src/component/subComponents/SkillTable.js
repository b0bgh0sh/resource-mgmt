import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "../../css/admin.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { loadSkills } from '../../redux/actions/skillsAction'
import {connect, useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import SkillModal from "./SkillModal";
import {deleteASkill} from "../../redux/actions/skillsAction";
import {addFeedback} from "../../redux/actions/feedbackAction";

const SkillTable = ({
                        skills,
                        loadSkills,
                    }) => {
    useEffect(() => {
        if (skills.length === 0) {
            loadSkills().catch(error => {
                alert('Loading skills failed' + error);
            });
        }
    }, [skills, loadSkills]);

    const [modalShow, setModalShow] = React.useState(false);
    const [skillToBeDel, setSkillName] = useState ({
        name:'',
    });
    const dispatch = useDispatch();


    function onRowSelect(row, isSelected, e) {

            const val = row.name;
            setSkillName(prevState => {
                return {...prevState, name: val}
            });

    }

    function onSelectAll(isSelected, rows) {

    }

    function handleDelete(e) {
        e.preventDefault();

        if(skillToBeDel.name) {
            dispatch(deleteASkill(skillToBeDel))
                .then(() => {
                    dispatch(addFeedback({
                        type: 'success',
                        data: skillToBeDel.name + ' removed successfully',
                        show: true,
                    }));
                })
                .catch(error => {
                    dispatch(addFeedback({
                        type: 'success',
                        data: skillToBeDel.name + ' removed unsuccessfully',
                        show: true,
                    }));
                });
        }
    }

    const selectRowProp = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: onRowSelect,
        onSelectAll: onSelectAll
    };



    return (
        <div>
            <ButtonToolbar>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Add Skill
                </Button>

                <SkillModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />

                <div className="divider"/>
                <Button variant="danger" onClick={handleDelete}>Remove Skill</Button>
            </ButtonToolbar>
            <BootstrapTable data={ skills } search = {true} selectRow={ selectRowProp} pagination>
                <TableHeaderColumn width="150" dataField='id' isKey hidden>Id</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='disciplineName'> Discipline Name</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='name'> Skill Name</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='numberOfPeople'> Number of People</TableHeaderColumn>
            </BootstrapTable>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        skills: state.skills,
    };
};

const mapDispatchToProps = {
    loadSkills,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SkillTable);