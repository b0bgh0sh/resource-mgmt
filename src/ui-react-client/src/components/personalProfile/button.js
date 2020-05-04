import React from 'react';

const WButton = ({
  buttonNameOne,
  buttonNameTwo,
  onClickButtonOne,
  onClickButtonTwo,
  id,
}) => {
  const edit = () => {
    // let location = document.getElementById('location');
    // location.disabled = false;
    // location.focus();
    let content = document.getElementById(id);
    content.style.transform = 'translateY(-24px)';
    if (onClickButtonOne) onClickButtonOne();
  };
  const cancel = () => {
    // let location = document.getElementById('location');
    // location.disabled = false;
    // location.focus();
    let content = document.getElementById(id);
    content.style.transform = 'translateY(0px)';
    if (onClickButtonTwo) onClickButtonTwo();
  };
  const submit = () => {
    // let location = document.getElementById('location');
    let content = document.getElementById(id);

    // personalProfileUser.location = location.value;
    // editLocation(personalProfileUser)
    //   .then(() => {
    //     location.disabled = true;
    //     content.style.transform = 'translateY(0px)';
    //     addFeedback({
    //       type: 'success',
    //       data: 'Edit Location successfully',
    //       show: true,
    //     });
    //   })
    //   .catch(error => {
    //     addFeedback({
    //       type: 'error',
    //       data: 'Edit Location unsuccessfully',
    //       show: true,
    //     });
    //   });
    // console.log('the status is ', status);
    // if (status === '202') {
    //   content.style.transform = 'translateY(0px)';
    // }
  };
  return (
    <div className="swipe-button">
      <div id={id} className="content">
        <div className="btn-red" onClick={edit}>
          {buttonNameOne}
        </div>
        <div>
          {/* <div className="btn-green" onClick={submit}>
            {buttonNameTwo}
          </div> */}
          <div className="btn-cancel" onClick={cancel}>
            {buttonNameTwo}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WButton;
