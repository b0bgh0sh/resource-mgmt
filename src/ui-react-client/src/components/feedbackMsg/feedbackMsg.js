import '../../scss/feedbackMsg.scss';
import React, { useState, useEffect } from 'react';
//import {  } from '../../../redux/actions/feedbackAction';
import { connect } from 'react-redux';
import {
  deleteFeedback,
  addFeedback,
} from '../../redux/actions/feedbackAction';
import { loadLocations } from '../../redux/actions/locationsActions';

const ShowFeedbackMsg = ({
  locations,
  feedbacks,
  deleteFeedback,
  loadLocations,
}) => {
  return (
    <ul className="msgContainer">
      {feedbacks.map((msg, index) => (
        <li style={{ 'list-style-type': 'none' }}>
          <div class={msg.type}>
            <span
              class="closebtn"
              onClick={() => {
                // console.log('the index is ', index);
                //feedbacks.splice(index, 1);
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
  locations: state.locations,
});

const mapDispatchToProps = {
  addFeedback: addFeedback,
  deleteFeedback: deleteFeedback,
  loadLocations: loadLocations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowFeedbackMsg);
