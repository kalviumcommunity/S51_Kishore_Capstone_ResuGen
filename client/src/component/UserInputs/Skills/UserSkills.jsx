import React from "react";
import { connect } from "react-redux";
import { updateSkills } from "../../../Redux/Actions/actions"; // Import the updateSkills action
import "./UserSkills.css";

const UserSkills = ({ onNext, onBack, skillsInfo, updateSkills }) => {
  const handleNextClick = () => {
    onNext();
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleSkillsInputChange = (e) => {
    const { name, value } = e.target;
    // Dispatch action to update skills information
    updateSkills({ ...skillsInfo, [name]: value });
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

        <div className="user-skills">
          {[
            {
              label: "Skills",
              name: "skills",
              type: "text",
              placeholder: "Enter your skills",
            },
            {
              label: "Expertise Level",
              name: "expertiseLevel",
              type: "range",
            },
          ].map((input, index) => (
            <div key={index} className="user-skill-wrap">
              <label>{input.label}</label>
              <input
                type={input.type}
                name={input.name}
                placeholder={input.placeholder || false}
                onChange={handleSkillsInputChange}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Map state to props
const mapStateToProps = (state) => ({
  skillsInfo: state.skillsInfo,
});

// Connect component to Redux store
export default connect(mapStateToProps, { updateSkills })(UserSkills);
