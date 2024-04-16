import React from "react";
import { connect } from "react-redux";
import { addExperience } from "../../../Redux/Actions/actions"; 

import "./UserExp.css";

const UserExp = ({ onNext, onBack, experienceInfo, addExperience }) => {
  const handleNextClick = () => {
    onNext();
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleExpInputChange = (e) => {
    const { name, value } = e.target;
    // Dispatch action to add experience information
    addExperience({ ...experienceInfo, [name]: value });
  };

  return (
    <>
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
          <h1>Experience</h1>
          <p>Tell us more about your work experience</p>
        </div>
        <div className="user-exp">
          {[
            {
              label: "Position title",
              name: "positionTitle",
              type: "text",
            },
            {
              label: "Company Name",
              name: "companyName",
              type: "text"
            },
            {
              label: "Start Date",
              name: "startDate",
              type: "date"
            },
            {
              label: "Last Date",
              name: "lastDate",
              type: "date"
            }
          ].map((input, index) => (
            <div key={index} className="user-exp-wrap">
              <label>{input.label}</label>
              <input
                type={input.type}
                name={input.name}
                value={experienceInfo[input.name]}
                onChange={handleExpInputChange}
              />
            </div>
          ))}
        </div>
        <div className="user-exp-work-summary-div">
          <label>Work Summary</label>
          <input type="text" onChange={handleExpInputChange} />
        </div>
      </div>
    </>
  );
};

// Map state to props
const mapStateToProps = (state) => ({
  experienceInfo: state.experienceInfo,
});

// Connect component to Redux store
export default connect(mapStateToProps, { addExperience })(UserExp);
