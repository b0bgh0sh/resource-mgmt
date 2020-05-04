import React from 'react';
import {useParams} from "react-router-dom";

let project1 = {id:1,name:"Project1", status:"Active", location:"Vancouver", startDate:"20190401", endDate:"20200201",utilization:"100%"};
let project2 = {id:2,name:"Project2", status:"Active", location:"Toronto", startDate:"20190821", endDate:"20191105",utilization:"60%"};
let project3 = {id:3,name:"Project3", status:"Inactive", location:"Richmond", startDate:"20200121", endDate:"20211010",utilization:"0%"};
let projects = [project1, project2, project3];

let user1 = {id:1,name:"user1",utilization:"30%"}
let user2 = {id:2,name:"user2",utilization:"40%"}
let user3 = {id:3,name:"user3",utilization:"0%"}
let users = [user1,user2,user3]


const UserInfoPage = () => {
    const {project,user} = useParams();
    // noinspection JSAnnotator
    return (
        <>
            <h1>USER INFO PAGE </h1>
        </>
    );
};


export default UserInfoPage;