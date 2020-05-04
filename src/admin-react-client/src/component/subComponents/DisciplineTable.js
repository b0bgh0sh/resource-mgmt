import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "../../css/admin.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {deleteADiscipline, loadDisciplines} from "../../redux/actions/disciplinesActions"
import {connect, useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import DisciplineModal from "./DisciplineModal";
import {addFeedback} from "../../redux/actions/feedbackAction";





const DisciplineTable = ({
                             disciplines,
                             loadDisciplines,
                         }) => {
    useEffect(() => {
        if (disciplines.length === 0) {
            loadDisciplines().catch(error => {
                alert('Loading disciplines failed' + error);
            });
        }
    }, [disciplines, loadDisciplines]);

    const [modalShow, setModalShow] = useState(false);
    const [disToBeDel, setDisName] = useState ({
        name:'',
    });
    const dispatch = useDispatch();


    function onRowSelect(row, isSelected, e) {
            const val = row.name;
            setDisName(prevState => {
                return {...prevState, name: val}
            });


    }

    function onSelectAll(isSelected, rows) {

    }

    function handleDelete(e) {
        e.preventDefault();

        if(disToBeDel.name) {
            dispatch(deleteADiscipline(disToBeDel))
                .then(() => {
                    dispatch(addFeedback({
                        type: 'success',
                        data: disToBeDel.name + ' removed successfully',
                        show: true,
                    }));
                })
                .catch(error => {
                    dispatch(addFeedback({
                        type: 'success',
                        data: disToBeDel.name + ' removed unsuccessfully',
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
                    Add Discipline
                </Button>

                <DisciplineModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <div className="divider"/>
                <Button variant="danger" onClick={handleDelete}>Remove Discipline</Button>
            </ButtonToolbar>

            <BootstrapTable data={ disciplines } search={true} selectRow = {selectRowProp} pagination>
                <TableHeaderColumn width="150" dataField='id' isKey>Id</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='name'> Discipline Name</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='numberOfPeople'> Number of People</TableHeaderColumn>
            </BootstrapTable>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        disciplines: state.disciplines,
    };
};

const mapDispatchToProps = {
    loadDisciplines,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DisciplineTable);
