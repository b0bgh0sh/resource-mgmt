import React, { useState } from 'react';
import '../../scss/autoComplete.scss';
import PropTypes from 'prop-types';

const AutoComplete = ({ elements, id }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState('');
  const onTextChanged = e => {
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
  return (
    <div className="autoCompleteText">
      <input
        id={id}
        value={text}
        onChange={onTextChanged}
        type="text"
      />
      {renderSuggestions()}
    </div>
  );
};
export default AutoComplete;
