import React, { useState } from 'react';
import {useSelector} from "react-redux";

const AutoComplete = ({ dataType,
                        id,
                        placeHolder}) => {

    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState('');

    const onTextChanged = e => {
        const value = e.target.value;

        setText(value);
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');

            let tempItem = [];

            if (dataType != null) {
                tempItem = dataType.sort().filter(item => regex.test(item));
            }

            setSuggestions(tempItem);
        } else {
            setSuggestions([]);
        }

    };

    const renderSuggestions = () => {
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
        <div>
            <input
                type = "text"
                value ={text}
                placeholder={placeHolder}
                onChange={onTextChanged}
                className={'form-control'}
            />
            {renderSuggestions()}
        </div>
    );
};
export default AutoComplete;
