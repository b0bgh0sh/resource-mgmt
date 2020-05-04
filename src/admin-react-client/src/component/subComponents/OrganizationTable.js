import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "../../css/admin.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {connect, useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {addFeedback} from "../../redux/actions/feedbackAction";
import OrganizationModal from "./OrganizationModal";
import {createAOrganization, deleteAOrganization, loadOrganizations} from "../../redux/actions/organizationActions";


const OrganizationTable = ({
                       organizations,
                       loadOrganizations,
                   }) => {
    useEffect(() => {
        if (organizations.length === 0) {
            loadOrganizations().catch(error => {
                alert('Loading users failed' + error);
            });
        }


    }, [organizations,loadOrganizations]);

    const [modalShow, setModalShow] = useState(false);
    const [orgToBeDel, setOrgName] = useState ({
        id:'',
    });
    const dispatch = useDispatch();


    function onRowSelect(row, isSelected, e) {

        const val = Number(row.id);
        setOrgName(orgToBeDel => {
            return {...orgToBeDel, id:val}
        });
    }

    function onSelectAll(isSelected, rows) {

    }

    function handleDelete(e) {
        e.preventDefault();
        if(orgToBeDel.id) {
            dispatch(deleteAOrganization(orgToBeDel))
                .then(() => {
                    dispatch(addFeedback({
                        type: 'success',
                        data: 'Organization removed successfully',
                        show: true,
                    }));
                })
                .catch(error => {
                    dispatch(addFeedback({
                        type: 'error',
                        data: 'Organization removed unsuccessfully',
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
                    Add Organization
                </Button>
                <div className="divider"/>
                <Button variant="danger" onClick={handleDelete}>Remove Organization</Button>

                <OrganizationModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </ButtonToolbar>

            <BootstrapTable data={ organizations } search ={true} selectRow={ selectRowProp} pagination>
                <TableHeaderColumn width="150" dataField='id' isKey>Id</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='num'>Number of People</TableHeaderColumn>
            </BootstrapTable>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        organizations: state.organizations
    };
};

const mapDispatchToProps = {
    loadOrganizations,
    createAOrganization,
    deleteAOrganization,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrganizationTable);



