import React from "react";
import { connect } from "react-redux";
import "./UserSkills.css";

const UserSkills = ({ onNext, onBack, skillsInfo, updateSkillInfo }) => {
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
          <h1>Skills</h1>
          <p>Tell us more about your work Skills</p>
        </div>
      </div>
    </>
  );
};

export default UserSkills;
