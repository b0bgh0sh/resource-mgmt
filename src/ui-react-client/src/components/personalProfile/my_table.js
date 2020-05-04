import React, { useState, useEffect } from 'react';
const WTable = ({
  tableName,
  datas,
  tableHead,
  selectRow,
  remove,
  addFeedback,
  width,
  checkBox,
  renderModal,
  detail,
  loadDetails,
}) => {
  if (!datas) datas = [];
  if (!tableHead) tableHead = [];

  const renderRemove = (data, index) => {
    if (remove) {
      return (
        <td>
          <button
            onClick={() => {
              remove(data)
                .then(() => {
                  addFeedback({
                    type: 'success',
                    data: '  :delete successfully',
                    show: true,
                  });
                })
                .catch(error => {
                  addFeedback({
                    type: 'error',
                    data: error,
                    show: true,
                  });
                });
              deleteRow(index);
            }}
            className="fas fa-trash-alt fa-1x"
          ></button>
        </td>
      );
    }
  };
  const [datas1, setDatas] = useState(datas);
  // console.log('the datas', datas1, datas);
  const deleteRow = index => {
    datas1.splice(index, 1);
    datas.splice(index, 1);
    setDatas([...datas1]);
    console.log('delete is clicked');
  };

  const renderCheckBox = projectName => {
    if (checkBox) {
      return (
        <td>
          <div style={{ width: '22px', height: '22px' }}>
            <label className="checkBoxContainer">
              <input
                name={projectName}
                className="searchCheckbox"
                type="checkbox"
              ></input>
              <span className="checkMark"></span>
            </label>
          </div>
        </td>
      );
    }
  };

  const renderDetail = data => {
    if (detail) {
      console.log('detail clicked');
      return (
        <td onClick={() => loadDetails(data.project)}>
          <i className="far fa-caret-square-down fa-1x"></i>
        </td>
      );
    }
  };

  const renderProgressBar = number => {
    let value = number.split('%')[0];

    if (value > 20) {
      return (
        <div className="progress">
          <p className="counter">{number}</p>
          <div
            style={{
              'max-width': `${value}%`,
              background: '#4caf50',
            }}
            className="bar"
          ></div>
        </div>
      );
    } else {
      return (
        <div className="progress">
          <p className="counter">{number}</p>
          <div
            style={{
              'max-width': `${value}%`,
              background: '#ff9800',
            }}
            className="bar"
          ></div>
        </div>
      );
    }
  };
  return (
    <div className="table">
      <div
        style={{
          borderBottom: '2px solid #ccc',
          margin: '0',
          width: '100%',
        }}
        className="row"
      >
        <div className="header">
          <h4>{tableName}</h4>
        </div>
      </div>
      <table
        style={{
          width: '100%',
        }}
      >
        <tr>
          {tableHead.map((name, index) => {
            return (
              <th key={index} scope="col">
                <div>{name}</div>
              </th>
            );
          })}
        </tr>
        <tbody>
          {datas.map((data, index) => {
            return (
              <>
                <tr key={index}>
                  {Object.values(data).map((item, index) => {
                    if (typeof item === 'number') {
                      if (item < 0.8) {
                        return (
                          <td
                            style={{
                              color: 'white',
                              border: 'solid',

                              backgroundColor: 'green',
                              opacity: 0.5,
                            }}
                            key={index}
                          >
                            {item}
                          </td>
                        );
                      } else if (item >= 0.8 && item <= 1.2) {
                        return (
                          <td
                            style={{
                              color: 'white',
                              border: 'solid',
                              marginBottom: '1px',
                              backgroundColor: '#c3c344',
                              opacity: 0.5,
                            }}
                            key={index}
                          >
                            {item}
                          </td>
                        );
                      } else {
                        return (
                          <td
                            style={{
                              color: 'white',
                              border: 'solid',
                              backgroundColor: 'red',
                              opacity: 0.5,
                            }}
                            key={index}
                          >
                            {item}
                          </td>
                        );
                      }
                    }
                    if (
                      typeof item == 'string' &&
                      item.includes('%')
                    ) {
                      return (
                        <td key={index}>{renderProgressBar(item)}</td>
                      );
                    } else {
                      return (
                        <td
                          key={index}
                          onClick={() => {
                            if (selectRow) {
                              selectRow(data);
                            }
                            console.log(
                              'the index of the row is ',
                              index,
                            );
                          }}
                        >
                          {item}
                        </td>
                      );
                    }
                  })}
                  {renderRemove(data, index)}
                  {renderCheckBox(Object.values(data)[0])}
                  {renderDetail(data)}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WTable;
