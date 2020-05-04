import '../../scss/feedbackMsg.scss';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {deleteFeedback, addFeedback} from '../../redux/actions/feedbackAction';



const ShowFeedbackMsg = ({
                             feedbacks,
                             deleteFeedback,
                         }) => {
    return (
        <ul className="msgContainer">
            {feedbacks.map((msg, index) => (
                <li style={{ 'list-style-type': 'none' }}>
                    <div className={msg.type}>
            <span
                className="closebtn"
                onClick={() => {
                    deleteFeedback(index);
                }}
            >
              &times;
            </span>
                        <strong>{msg.type}</strong> {msg.data}
                    </div>
                </li>
            ))}
        </ul>
    );
};

const mapStateToProps = state => ({
    feedbacks: state.feedbacks,
});

const mapDispatchToProps = {
    addFeedback: addFeedback,
    deleteFeedback: deleteFeedback,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShowFeedbackMsg);
