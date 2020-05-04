import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "../../css/admin.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { loadDisciplines } from "../../redux/actions/disciplinesActions"
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import {table} from "react-bootstrap-table";
const $ = window.$;

// var React = require('react');
// var ReactDOM = require('react-dom');
// var ReactBsTable  = require('react-bootstrap-table');

// function createData(name,number) {
//     return{"id":name,"code":number};
// }

// const rows = [
//     createData("Software Engineer",355),
//     createData("Electrical Engineer", 348),
//     createData("Civil Engineer", 247),
//     createData("Aircraft Engineer",144),
//     createData("Computer Engineer",108),
//     createData("Elevator Engineer",104),
//     createData("System Engineer",100),
//     createData("Site Reliability Engineer ", 97),
//     createData("Qualty Assurance Enginer",88),
//     createData("Test Engineer",76),
//     createData("Full Stack Engineer", 65),
//     createData("Product Manager", 50),
//     createData("District Manager", 20)

// ];

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
  
    return (
        <div>
            <button type="button" className="myBotton">Add Discipline</button>
            <button type="button" className="myBotton">Remove Discipline</button>
            <BootstrapTable data={ disciplines } striped hover condensed
                className="scrollbar table-wrapper-scroll-y">
                <TableHeaderColumn width="150" dataField='id' isKey>Id</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='name'> Discipline Name</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='TODO'> Number of People</TableHeaderColumn>
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



// export default class LocationTable extends React.Component {

//     render() {

//         return (
            // <div>
            //     <button type="button" className="myBotton">Add Discipline</button>
            //     <button type="button" className="myBotton">Remove Discipline</button>
            // <BootstrapTable data={ rows } striped hover condensed>
            //     <TableHeaderColumn width="150" dataField='id' isKey>Skill Name</TableHeaderColumn>
            //     <TableHeaderColumn width="150" dataField='code'>  Number of People</TableHeaderColumn>
            // </BootstrapTable>
            // </div>



//         );


//     }
// }