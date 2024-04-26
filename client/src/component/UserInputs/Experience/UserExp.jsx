import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  addNewExperience,
} from "../../../Redux/Actions/actions";
import "./UserExp.css";
// import AddMoreExp from "../../AddFields/AddExp/AddMoreExp";

const UserExp = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const experienceFormData = useSelector(
    (state) => state.experienceInfo.experienceDataList
  );
  console.log(experienceFormData);

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

  const handleInputType = (key) => {
    if (key == "StartDate" || key == "LastDate") {
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
            <>
             <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
            
            <div className="user-exp" key={index}>
             
              <div className="user-exp">
                
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
              </div>
            </div>
            </>
          ))}
        <div onClick={handleAddExperience} className="user-exp-add-exp-btn-div">
          <div className="user-exp-add-exp-btn">+ Add More Experience</div>
        </div>
      </div>
    </>
  );
};

export default UserExp;
