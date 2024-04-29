import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  addNewExperience,
  deleteExperience,
} from "../../../Redux/Actions/actions";
import { MdDeleteOutline } from "react-icons/md";
import "./UserExp.css";

const UserExp = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const experienceFormData = useSelector(
    (state) => state.experienceInfo.experienceDataList
  );

  const handleNextClick = () => {
    onNext();
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleExpInputChange = (e, index) => {
    const { name, value } = e.target;
    dispatch(addExperience({ [name]: value }, index));
  };

  const handleAddExperience = () => {
    dispatch(addNewExperience());
  };

  const handleDeleteExperience = (index) => {
    dispatch(deleteExperience(index));
  };

  const handleInputType = (key) => {
    if (key === "StartDate" || key === "LastDate") {
      return "date";
    }
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
        {experienceFormData &&
          experienceFormData.map((expData, index) => (
            <div className="user-exp" key={index}>
              {index > 0 && ( // Render delete button from index 1 onwards
                <div
                  className="delete-btn"
                  onClick={() => handleDeleteExperience(index)}
                >
                  <MdDeleteOutline />
                </div>
              )}
              {Object.keys(expData).map((key, inputIndex) => (
                <div key={inputIndex} className="user-exp-wrap">
                  <label>{key}</label>
                  <input
                    type={handleInputType(key)}
                    name={key}
                    value={expData[key]}
                    onChange={(e) => handleExpInputChange(e, index)}
                  />
                </div>
              ))}
              <br />
            </div>
          ))}

        <div onClick={handleAddExperience} className="user-exp-add-exp-btn-div">
          <div className="user-exp-add-exp-btn">+ Add More Experience</div>
        </div>
      </div>
    </>
  );
};

export default UserExp;
