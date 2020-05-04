import React from 'react';
import {useParams} from "react-router-dom";

let project1 = {
    id: 1,
    name: "Project1",
    status: "Active",
    location: "Vancouver",
    startDate: "20190401",
    endDate: "20200201",
    utilization: "100%"
};
let project2 = {
    id: 2,
    name: "Project2",
    status: "Active",
    location: "Toronto",
    startDate: "20190821",
    endDate: "20191105",
    utilization: "60%"
};
let project3 = {
    id: 3,
    name: "Project3",
    status: "Inactive",
    location: "Richmond",
    startDate: "20200121",
    endDate: "20211010",
    utilization: "0%"
};
let projects = [project1, project2, project3];

// let user1 = {id: 1, name: "user1", utilization: "30%"}
// let user2 = {id: 2, name: "user2", utilization: "40%"}
// let user3 = {id: 3, name: "user3", utilization: "0%"}
// let users = [user1, user2, user3]
//

function ProjectInfoPage(props) {
    // const {project} = useParams();
    // noinspection JSAnnotator
    return (
        <div>
            <h5> {props.project.name} Details</h5>
            <hr/>
            <div className="container-projectInfo">
                <div className="d4">
                    <table>
                        <tr>
                            <th colSpan={2}>INFO</th>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{project1.status}</td>
                        </tr>
                        <tr>
                            <td>Location</td>
                            <td>{project1.location}</td>
                        </tr>
                        <tr>
                            <td>Start Date</td>
                            <td>{project1.startDate}</td>
                        </tr>
                        <tr>
                            <td>End Date</td>
                            <td>{project1.endDate}</td>
                        </tr>
                    </table>
                </div>
                <div className="d3">
                    <table id="t01">
                        <thead>
                        <tr>
                            <th>Members</th>
                            <th>Availability</th>
                            {/*<th>edit</th>*/}
                            {/*<th>delete</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {props.users.map(user => (
                            <tr key={user.id}>
                                <td>
                                    {user.name}
                                </td>
                                {/*<td>{user.name}</td>*/}
                                <td>{user.utilization}</td>
                                <td>
                                    <button type="button">Edit</button>
                                </td>
                                <td>
                                    <button type="button">Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


export default ProjectInfoPage;