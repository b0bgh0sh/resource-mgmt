import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "../../css/admin.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { loadSkills } from '../../redux/actions/skillsAction'
import { connect } from 'react-redux';
import React, { useEffect } from 'react';

// const $ = window.$;

// function createData(name,number) {
//     return{"id":name,"code":number};
// }

// const rows = [
//     createData("Sql server",355),
//     createData("C++", 348),
//     createData("azure AD", 247),
//     createData("docker",144),
//     createData("Java",108),
//     createData("JavaScript",104),
//     createData("Rubys on Rails",100),
//     createData("Google Dev Tool", 97),
//     createData("C#",88),
//     createData("APS.NET CORE",76),
//     createData("RESTful API", 65),
//     createData("React", 50),
//     createData("Bootstrap", 20)

// ];


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
    
  
    return (
        <div>
            <button type="button" className="myBotton">Add Skill</button>
            <button type="button" className="myBotton">Remove Skill</button>
            <BootstrapTable data={ skills } striped hover condensed
                className="scrollbar table-wrapper-scroll-y">
                <TableHeaderColumn width="150" dataField='id' isKey>Id</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='disciplineId'> Discipline Id</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='name'> Skill Name</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='TODO'> Number of People</TableHeaderColumn>
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