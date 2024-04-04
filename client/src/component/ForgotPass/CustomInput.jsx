import React, { useState } from 'react';
import './CustomInput.css';

const CustomInput = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="wave-group">
      <input
        {...props}
        className={`input ${isFocused || props.value ? 'focused' : ''}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <span className="bar"></span>
      <label className={`label ${isFocused || props.value ? 'focused' : ''}`}>
        {label.split('').map((char, index) => (
          <span className="label-char" style={{ '--index': index }} key={index}>
            {char}
          </span>
        ))}
      </label>
    </div>
  );
};

export default CustomInput;
