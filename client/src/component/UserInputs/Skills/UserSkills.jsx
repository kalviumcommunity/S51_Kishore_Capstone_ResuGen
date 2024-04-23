// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch } from "react-redux";
import { updateSkills } from "../../../Redux/Actions/actions";
import "./UserSkills.css";

// eslint-disable-next-line react/prop-types
const UserSkills = ({ onNext, onBack }) => {
  const dispatch = useDispatch();

  const handleNextClick = () => {
    onNext();
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleSkillsInputChange = (e) => {
    const { name, value } = e.target;
    updateSkills({ [name]: value }, dispatch); 
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
                // placeholder={input.placeholder}
                onChange={handleSkillsInputChange}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserSkills;
