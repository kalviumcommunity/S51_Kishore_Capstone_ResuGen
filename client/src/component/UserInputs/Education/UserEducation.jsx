// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateEducation } from "../../../Redux/Actions/actions";
import "./UserEducation.css";


// eslint-disable-next-line react/prop-types
const UserEducation = ({ onNext, onBack }) => {

  const dispatch = useDispatch();

  const handleNextClick = () => {
    onNext();
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleEducationInputChange = (e) => {
    const { name, value } = e.target;
    // Dispatch action to update education information
    dispatch(updateEducation({ [name]: value }));
  };

  // const handleAddMoreEducation = () => {
  //   addEducation({}); // Dispatch addEducation action with an empty object or with default values
  //   setAdditionalEducations([...additionalEducations, {}]);
  // };

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

      {/* {additionalEducations.map((education, index) => ( */}
      <div className="user-education">
        {[
          {
            label: "School Name",
            name: "schoolName",
            input: "text",
          },
          {
            label: "School Location",
            name: "schoolLocation",
            input: "text",
          },
          {
            label: "Start Date",
            name: "startDate",
            input: "date",
          },
          {
            label: "End Date",
            name: "endDate",
            input: "date",
          },
          {
            label: "Degree",
            name: "degree",
            input: "text",
          },
          {
            label: "Field of Study",
            name: "fieldOfStudy",
            input: "text",
          },
        ].map((input, inputIndex) => (
          <div key={inputIndex} className="user-edu-wrap">
            <label>{input.label}</label>
            <input
              type={input.input}
              name={input.name}
              onChange={handleEducationInputChange}
            />
          </div>
        ))}
      </div>

      {/* <div className="add-more-btn-div" onClick={handleAddMoreEducation}>
        <div>+ Add more Education</div>
      </div> */}
    </div>
  );
};

export default UserEducation;
