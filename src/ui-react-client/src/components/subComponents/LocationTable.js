import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "../../css/admin.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { loadLocations } from "../../redux/actions/locationsActions"
import { connect } from 'react-redux';
import React, { useEffect } from 'react';

// function createData(id,code,name,number) {
//     return{"id":id,"code":code,"name":name,"numberOfPeople":number};
// }

// const rows = [
//     createData(1,778,"Vancouver",355),
//     createData(2,778,"Burnaby", 348),
//     createData(5,649,"Surrey", 247),
//     createData(3,880,"Langley",144),
//     createData(3,880,"Kamloops",108),
//     createData(3,880,"Toronto",104),
//     createData(3,880,"Calgary",100),
//     createData(3,880,"Edmonton", 97),
//     createData(3,880,"Thompson",88),
//     createData(3,880,"Seattle",76),
//     createData(3,880,"Los angles", 65),
//     createData(3,880,"San fransisco", 50),
//     createData(3,880,"New york", 20)

// ];
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
  
    return (
        <div>
            <button type="button" className="myBotton">Add Location</button>
            <button type="button" className="myBotton">Remove Location</button>
            <BootstrapTable data={ locations } striped hover condensed
                className="scrollbar table-wrapper-scroll-y">
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
