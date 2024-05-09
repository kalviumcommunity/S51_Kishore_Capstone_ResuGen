import React, { useState } from "react";
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

  const [currentlyWorking, setCurrentlyWorking] = useState(false);

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
    if (key === "StartDate" || (key === "LastDate" && !currentlyWorking)) {
      return "date";
    }
  };

  const handleLastDateValue = () => {
    return currentlyWorking ? "Present" : "";
  };

  return (
    <>
      <div className="user-input-full-div">
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
          <label className="switch">
            <input
              type="checkbox"
              onChange={() => setCurrentlyWorking(!currentlyWorking)}
            />
            <span className="slider"></span>
            <label>Are you currently working there</label>
          </label>
          {experienceFormData &&
            experienceFormData.map((expData, index) => (
              <div className="user-exp" key={index}>
                {index > 0 && (
                  <div
                    className="delete-btn"
                    onClick={() => handleDeleteExperience(index)}
                  >
                    <MdDeleteOutline />
                  </div>
                )}
                {Object.keys(expData).map((key, inputIndex) => (
                  <div key={inputIndex} className="user-exp-wrap">
                    {key === "WorkSummary" ? (
                      <div className="work-summary">
                        <label>{key}</label>
                        <textarea
                          name={key}
                          value={expData[key]}
                          onChange={(e) => handleExpInputChange(e, index)}
                        />
                      </div>
                    ) : (
                      <div className="other-input-wrap">
                        <label>{key}</label>
                        <input
                          type={handleInputType(key)}
                          name={key}
                          value={
                            key === "LastDate"
                              ? handleLastDateValue()
                              : expData[key]
                          }
                          onChange={(e) => handleExpInputChange(e, index)}
                          readOnly={key === "LastDate" && currentlyWorking}
                        />
                      </div>
                    )}
                  </div>
                ))}

                <br />
              </div>
            ))}

          <div className="user-exp-add-exp-btn-div">
            <div onClick={handleAddExperience} className="user-exp-add-exp-btn">
              + Add More Experience
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserExp;
