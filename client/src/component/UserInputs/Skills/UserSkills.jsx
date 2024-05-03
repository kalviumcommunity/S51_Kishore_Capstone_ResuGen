// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSkills, addNewSkills } from "../../../Redux/Actions/actions";
import "./UserSkills.css";

// eslint-disable-next-line react/prop-types
const UserSkills = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const skillsFormData = useSelector(
    (state) => state.skillsInfo.skillsFormData
  );

  const handleNextClick = () => {
    onNext();
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleSkillsInputChange = (e, index) => {
    const { name, value } = e.target;
    dispatch(updateSkills({ [name]: value }, index));
  };
  

  const handleNewSkills = () => {
    dispatch(addNewSkills())
  }

  const handleSkillsInput = (key) => {
    if (key == "expertiseLevel"){
      return "range"
    }
  }

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

        {skillsFormData &&
          skillsFormData.map((skillData, index) => (
            <div className="user-skills" key={index}>
              {Object.keys(skillData).map((key, inputIndex) => (
                <div className="user-skill-wrap" key={inputIndex}>
                  <label>{key}</label>
                  <input
                    type={handleSkillsInput(key)}
                    name={key}
                    value={skillData[key]}
                    onChange={(e) => handleSkillsInputChange(e, index)}
                  />
                </div>
              ))}
            </div>
          ))}
        <div onClick={handleNewSkills} className="user-exp-add-exp-btn-div">
          <div className="user-exp-add-exp-btn">+ Add More Skills</div>
        </div>
      </div>
    </>
  );
};

export default UserSkills;
