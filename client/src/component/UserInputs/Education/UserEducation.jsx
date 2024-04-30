// UserEducation.js

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEducation,
  addNewEducation,
  deleteEducation
} from "../../../Redux/Actions/actions";
import { MdDeleteOutline } from "react-icons/md";
import "./UserEducation.css";

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
    dispatch(updateEducation({ [name]: value }, index));
  };

  const handleAddEducation = () => {
    dispatch(addNewEducation());
  };

  const handleDeleteEducation = (index) => {
    dispatch(deleteEducation(index));
  };

  const handleInputType = (key) => {
    if (key === "StartDate" || key === "LastDate") {
      return "date";
    }
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
            {index > 0 && (
              <div
                className="delete-btn"
                onClick={() => handleDeleteEducation(index)}
              >
                <MdDeleteOutline />
              </div>
            )}
            <div className="user-education">
              {Object.keys(eduData).map((key, inputIndex) => (
                <div key={inputIndex} className="user-edu-wrap">
                  <label>{key}</label>
                  <input
                    type={handleInputType(key)}
                    name={key}
                    value={eduData[key]}
                    onChange={(e) => handleEducationInputChange(e, index)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

      <div
        
        className="user-exp-add-exp-btn-div"
      >
        <div onClick={handleAddEducation} className="user-exp-add-exp-btn">+ Add More Education</div>
      </div>
    </div>
  );
};

export default UserEducation;
