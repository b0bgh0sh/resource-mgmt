import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "../../css/admin.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {deleteALocation, loadLocations} from "../../redux/actions/locationsActions"
import {connect, useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import LocationModal from "./LocationModal";
import {addFeedback} from "../../redux/actions/feedbackAction";



const LocationTable = ({
                           locations,
                           loadLocations
                       }) => {
    useEffect(() => {
        if (locations.length === 0) {
            loadLocations().catch(error => {
                alert('Loading locations failed' + error);
            });
        }
    }, [locations, loadLocations]);
    const [modalShow, setModalShow] = React.useState(false);
    const [locToBeDel, setLocCode] = useState ({
        code:'',
    });
    const [locToBeDelName, setLocName] = useState ({
        name:'',
    });
    const dispatch = useDispatch();

    function onRowSelect(row, isSelected, e) {

        const val = row.code;
        const locname = row.name;
        setLocCode(prevState => {
            return {...prevState, code:val}
        });
        setLocName(prevState => {
            return {...prevState, name:locname};
        });

    }

    function onSelectAll(isSelected, rows) {

    }

    function handleDelete(e) {
        e.preventDefault();

        if(locToBeDel.code) {
            dispatch(deleteALocation(locToBeDel))
                .then(() => {
                    dispatch(addFeedback({
                        type: 'success',
                        data: locToBeDelName.name + ' removed successfully',
                        show: true,
                    }));
                })
                .catch(error => {
                    dispatch(addFeedback({
                        type: 'success',
                        data: locToBeDelName.name + ' removed unsuccessfully',
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
                    Add Location
                </Button>

                <LocationModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <div className="divider"/>
                <Button variant="danger" onClick={handleDelete}>Remove Location</Button>
            </ButtonToolbar>

            <BootstrapTable data={ locations } search = {true} selectRow ={selectRowProp} pagination>
                <TableHeaderColumn width="150" dataField='id' isKey>Location id</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='code'> Location Code</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='name' >Location Name</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='numberOfPeople'> Number of People</TableHeaderColumn>
            </BootstrapTable>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        locations: state.locations,
    };
};

const mapDispatchToProps = {
    loadLocations,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LocationTable);
