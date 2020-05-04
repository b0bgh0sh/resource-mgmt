import React, { Component, useEffect, useState } from 'react';
import personImage from '../../image/person.png';
import { editLocation } from '../../redux/actions/personalProfileAction';
import { connect } from 'react-redux';
import ShowFeedbackMsg from '../feedbackMsg/feedbackMsg';
import { addFeedback } from '../../redux/actions/feedbackAction';
import AutoComplete from '../autocomplete/autocomplete';
import { loadLocations } from '../../redux/actions/locationsActions';

export const Sidebar = ({
  personalProfileUser,
  editLocation,
  addFeedback,
  setCurrentState,
  currentState,
  loadLocations,
  locations,
}) => {
  useEffect(() => {
    if (locations.length === 0) {
      loadLocations().catch(error => {
        alert('Loading locations failed' + error);
      });
    }
  }, [locations, loadLocations]);

  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState('');
  let elements = [];
  const onTextChanged = e => {
    elements = getLocationNames(locations);
    const value = e.target.value;
    // console.log('the value length is ', value.length);
    setText(value);
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      // console.log(suggestions);
      let tempItem = [];
      // console.log('items are', elements);
      if (elements != null) {
        tempItem = elements.sort().filter(item => regex.test(item));
      }
      // console.log(tempItem);
      setSuggestions(tempItem);
    } else {
      setSuggestions([]);
    }
    // console.log(suggestions);
  };
  const renderSuggestions = () => {
    // console.log('the length is ', suggestions.length);
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map(item => {
          return (
            <li onClick={() => suggestionSelect(item)}>{item}</li>
          );
        })}
      </ul>
    );
  };
  const suggestionSelect = item => {
    setText(item);
    setSuggestions([]);
  };

  const edit = () => {
    let location = document.getElementById('location');
    location.disabled = false;
    location.focus();
    let content = document.getElementById('content');
    content.style.transform = 'translateY(-24px)';
  };
  const submit = () => {
    let location = document.getElementById('location');
    let content = document.getElementById('content');

    personalProfileUser.location = location.value;
    editLocation(personalProfileUser)
      .then(() => {
        location.disabled = true;
        content.style.transform = 'translateY(0px)';
        addFeedback({
          type: 'success',
          data: 'Edit Location successfully',
          show: true,
        });
      })
      .catch(error => {
        addFeedback({
          type: 'error',
          data: 'Edit Location unsuccessfully',
          show: true,
        });
      });
    // console.log('the status is ', status);
    // if (status === '202') {
    //   content.style.transform = 'translateY(0px)';
    // }
  };
  let originalBarPosition;
  const moveBar = e => {
    // let offsets = e.getBoundingClientRect();
    // let top = offsets.top;
    // let left = offsets.left;
    let bar = document.getElementById('bar');
    if (originalBarPosition === undefined) {
      originalBarPosition = document
        .getElementById('bar')
        .getBoundingClientRect().x;
    }
    let difference =
      e.target.getBoundingClientRect().x - originalBarPosition - 4;
    console.log('the difference is ', bar.style.transform);
    bar.style.transform = 'translate(' + difference + 'px)';
    bar.style.width =
      e.target.getBoundingClientRect().width + 8 + 'px';
    console.log('the width  ', bar.style.width);
  };
  console.log('sidebar currentState', currentState);

  const getLocationNames = locationsList => {
    let names = [];
    // for (location in locationsList){
    //     console.log(location.name);
    //     names.concat(location.name);
    // }
    locationsList.forEach(location => {
      console.log(location.name);
      names.push(location.name);
    });
    return names;
  };
  //
  // return (
  //   <div>
  //     <div className="sidebar">
  //       <div>
  //         <div className="profileImage">
  //           <div className="personImage">
  //             <img src={personImage}></img>
  //           </div>
  //           <div className="profileText">
  //             {/* <h4>Welcome</h4> */}
  //             <h6 style={{ color: 'grey', marginBottom: '0px' }}>
  //               {personalProfileUser.username}
  //             </h6>
  //             <div className="location">
  //               <h6 style={{ color: 'grey', marginBottom: '0px' }}>
  //                 location:
  //               </h6>
  //               <div>
  //                 <h6 style={{ color: 'grey', margin: '0px' }}>
  //                   <input
  //                     id="location"
  //                     value={text}
  //                     placeholder={personalProfileUser.location}
  //                     onChange={onTextChanged}
  //                     disabled={true}
  //                   ></input>
  //                     {renderSuggestions()}
  //                     {/*<AutoComplete*/}
  //                         {/*elements={getLocationNames(locations)}*/}
  //                         {/*placeholder={personalProfileUser.location}*/}
  //                         {/*id={'editLocation'}*/}
  //                     {/*/>*/}
  //                 </h6>
  //               </div>
  //             </div>
  //             <div>
  //               <div className="button">
  //                 <div id="content" className="content">
  //                   <div className="btn-red" onClick={edit}>
  //                     Edit
  //                   </div>
  //                   <div className="btn-green" onClick={submit}>
  //                     Submit
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //
  //         {/* <Modal /> */}
  //       </div>
  //       <div style={{ marginTop: '20px' }}></div>
  //       <div className="content">
  //         <div
  //           className="item"
  //           onClick={() => setCurrentState('discipline')}
  //         >
  //           <i className="fas fa-user-graduate mr-4 fa-lg"></i>
  //           disciplines
  //         </div>
  //         <div
  //           className="item"
  //           onClick={() => setCurrentState('project')}
  //         >
  //           <i className="fas fa-calendar-minus mr-4 fa-lg"></i>
  //           Project
  //         </div>
  //         <div
  //           className="item"
  //           onClick={() => setCurrentState('availability')}
  //         >
  //           <i className="far fa-clock mr-4 fa-lg"></i>Utilization
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div>
      <div className="sidebar">
        <div>
          <div className="profileImage">
            <div className="personImage">
              <img src={personImage}></img>
            </div>
            <div className="profileText">
              {/* <h4>Welcome</h4> */}
              <h6 style={{ color: 'grey', marginBottom: '0px' }}>
                {personalProfileUser.username}
              </h6>
              <div className="location">
                <h6 style={{ color: 'grey', marginBottom: '0px' }}>
                  location:
                </h6>
                {/*<div className="con-add">*/}
                  {/*<input*/}
                    {/*id="location"*/}
                    {/*value={text}*/}
                    {/*placeholder={personalProfileUser.location}*/}
                    {/*// onChange={onTextChanged}*/}
                    {/*disabled={true}*/}
                  {/*></input>*/}
                  {/*{renderSuggestions()}*/}
                {/*</div>*/}
                  <h6 style={{ color: 'grey', margin: '0px' }}>
                      <input
                          id="location"
                          placeholder={personalProfileUser.location}
                          disabled={true}
                      ></input>
                  </h6>

              </div>
              <div>
                <div className="button">
                  <div id="content" className="content">
                    <div className="btn-red" onClick={edit}>
                      Edit
                    </div>
                    <div className="btn-green" onClick={submit}>
                      Submit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <Modal /> */}
        </div>
        <div style={{ marginTop: '20px' }}></div>
        <div className="content">
          <div
            className="item"
            onClick={() => setCurrentState('discipline')}
          >
            <i className="fas fa-user-graduate mr-4 fa-lg"></i>
            disciplines
          </div>
          <div
            className="item"
            onClick={() => setCurrentState('project')}
          >
            <i className="fas fa-calendar-minus mr-4 fa-lg"></i>
            Project
          </div>
          <div
            className="item"
            onClick={() => setCurrentState('availability')}
          >
            <i className="far fa-clock mr-4 fa-lg"></i>Utilization
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  editLocation: editLocation,
  addFeedback: addFeedback,
  loadLocations: loadLocations,
};
const mapStateToProps = state => {
  return {
    locations: state.locations,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
//export default Sidebar;
