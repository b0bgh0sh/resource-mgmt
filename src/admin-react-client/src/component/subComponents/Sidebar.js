import React, {Component, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../scss/sidebar.scss";
import AEimage from "../image/AEimage.png";
import "font-awesome/css/font-awesome.min.css";
import { Link } from 'react-router-dom';
import {logout} from "../../redux/actions/adminActions";
import {connect} from "react-redux";
import {adminAction} from "../../redux/actions/adminActions";
import EditModal from "./EditModal";


class Sidebar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {time: new Date(),
            modalShow: false,  }

        this.loggingOut = this.loggingOut.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    currentTime () {
        this.setState({
            time: new Date()
        })
    }
    componentWillMount() {
        setInterval(() =>this.currentTime(),1000)
    }

    loggingOut = () => {
        const admin = this.props;

        this.props.logout(admin);
    }

    toggleModal() {
        const modalShow = !this.state.modalShow;
        this.setState({

            modalShow: modalShow
        });
    }


    render() {
      return (
          <div>
              <div className="sidebar">
                  <div className="AESectionImage">
                      <div className="AEImage">
                          <img src={AEimage}></img>
                          <div className= "timeSection">
                              <h3>Welcome</h3>
                              <h3>{this.state.time.toLocaleTimeString()}</h3>
                              <div className="profileText">
                                  <h3><button onClick= {() => this.props.table("user")}><i className ="fa fa-user"></i>User</button></h3>
                                  <h4><button onClick= {() => this.props.table("organization")}><i className ="fa fa-building"></i>Organization</button></h4>
                                  <h3><button onClick = {() =>this.props.table("location")}><i
                                      className="fa fa-map-marker"></i>Location</button></h3>
                                  <h4><button onClick = {() => this.props.table("skill")}><i className="fa fa-book"></i>Skill</button></h4>
                                  <h3><button onClick = {() => this.props.table("discipline")}><i
                                      className="fa fa-users"></i>Discipline</button></h3>
                                  <h4><Link to="/" className="btn btn-primary" onClick={this.loggingOut}>Log out</Link></h4>
                                  <h4><label className="btn btn-warning" onClick={this.toggleModal}>Edit</label></h4>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <EditModal
                  show={this.state.modalShow}
                  onHide={this.toggleModal}
              />
          </div>

      );
    }
}

function mapStateToProps(state) {
    return {
        admin: state.admin,
    };
}

const actionCreators = {
    logout: adminAction.logout
};

export default connect(
    mapStateToProps,
    actionCreators,
)(Sidebar);

