// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEducation,
  addNewEducation,
} from "../../../Redux/Actions/actions";
import "./UserEducation.css";

// eslint-disable-next-line react/prop-types
const UserEducation = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const educationFormData = useSelector(
    (state) => state.educationInfo.educationFormData
  );

  const handleNextClick = () => {
    onNext();
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleEducationInputChange = (e, index) => {
    const { name, value } = e.target;
    // Dispatch action to update education information
    dispatch(updateEducation({ [name]: value }, index));
  };

  const handleAddEducation = () => {
    dispatch(addNewEducation());
  };

  return (
    <div className="user-input-div">
      <div className="user-exp-top-buttons">
        <div className="user-exp-back-btn-div" onClick={handleBackClick}>
          <div className="user-exp-back-btn">Back</div>
        </div>
        <div className="user-exp-next-btn-div" onClick={handleNextClick}>
          <div className="user-exp-next-btn">Next</div>
        </div>
      </div>

      <div className="user-input-top">
        <h1>Education</h1>
        <p>Tell us more about your education</p>
      </div>

      {educationFormData &&
        educationFormData.map((eduData, index) => (
          <div className="user-education" key={index}>
            <div className="user-education">
              {Object.keys(eduData).map((key, inputIndex) => (
                <div key={inputIndex} className="user-edu-wrap">
                  <label>{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={eduData[key]}
                    onChange={(e) => handleEducationInputChange(e, index)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

      <div onClick={handleAddEducation} className="user-exp-add-exp-btn-div">
        <div className="user-exp-add-exp-btn">+ Add More Education</div>
      </div>
    </div>
  );
};

export default UserEducation;
