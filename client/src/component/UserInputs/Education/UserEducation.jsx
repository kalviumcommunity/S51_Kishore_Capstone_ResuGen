import React, { useState } from "react";
import { connect } from "react-redux";
import { updateEducation } from "../../../Redux/Actions/actions";
import { addEducation } from "../../../Redux/Actions/actions";
import "./UserEducation.css";

const UserEducation = ({ onNext, onBack, updateEducation }) => {
  const [additionalEducations, setAdditionalEducations] = useState([{}]);

  const handleNextClick = () => {
    onNext();
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleEducationInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAdditionalEducations = [...additionalEducations];
    updatedAdditionalEducations[index] = {
      ...updatedAdditionalEducations[index],
      [name]: value
    };
    setAdditionalEducations(updatedAdditionalEducations);
  };

  const handleAddMoreEducation = () => {
    addEducation({}); // Dispatch addEducation action with an empty object or with default values
    setAdditionalEducations([...additionalEducations, {}]);
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

      {additionalEducations.map((education, index) => (
        <div key={index} className="user-education">
          {[
            {
              label: "School Name",
              name: "schoolName",
              input: "text"
            },
            {
              label: "School Location",
              name: "schoolLocation",
              input: "text"
            },
            {
              label: "Start Date",
              name: "startDate",
              input: "date"
            },
            {
              label: "End Date",
              name: "endDate",
              input: "date"
            },
            {
              label: "Degree",
              name: "degree",
              input: "text"
            },
            {
              label: "Field of Study",
              name: "fieldOfStudy",
              input: "text"
            }
          ].map((input, inputIndex) => (
            <div key={inputIndex} className="user-edu-wrap">
              <label>{input.label}</label>
              <input
                type={input.input}
                name={input.name}
                value={education[input.name] || ""}
                onChange={(e) => handleEducationInputChange(e, index)}
              />
            </div>
          ))}
        </div>
      ))}

      <div className="add-more-btn-div" onClick={handleAddMoreEducation}>
        <div>+ Add more Education</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  educationInfo: state.educationInfoReducer
});

export default connect(mapStateToProps, { updateEducation })(UserEducation);
