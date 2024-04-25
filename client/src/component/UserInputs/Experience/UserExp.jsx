import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExperience } from "../../../Redux/Actions/actions";
import "./UserExp.css";
import AddMoreExp from "../../AddFields/AddExp/AddMoreExp";

const UserExp = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const experienceFormData = useSelector(state => state.experienceInfo.experienceFormData);
  const [additionalExperiences, setAdditionalExperiences] = useState([]);

  const handleNextClick = () => {
    onNext();
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleExpInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(addExperience({ [name]: value }));
  };

  const handleAddExperience = (experience) => {
    setAdditionalExperiences([...additionalExperiences, experience]);
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
        {Object.keys(experienceFormData.experiences).map((key, index) => (
          <div key={key} className="user-exp">
            {[
              {
                label: "Position title",
                name: "positionTitle",
                type: "text",
              },
              {
                label: "Company Name",
                name: "companyName",
                type: "text",
              },
              {
                label: "Start Date",
                name: "startDate",
                type: "date",
              },
              {
                label: "Last Date",
                name: "lastDate",
                type: "date",
              },
            ].map((input, index) => (
              <div key={index} className="user-exp-wrap">
                <label>{input.label}</label>
                <input
                  type={input.type}
                  name={input.name}
                  value={experienceFormData.experiences[key][input.name]}
                  onChange={handleExpInputChange}
                />
              </div>
            ))}
            <div className="user-exp-work-summary-div">
              <label>Work Summary</label>
              <input
                type="text"
                name="workSummary"
                value={experienceFormData.experiences[key].workSummary}
                onChange={handleExpInputChange}
              />
            </div>
          </div>
        ))}
        <AddMoreExp onAddExperience={handleAddExperience} />
      </div>
    </>
  );
};

export default UserExp;
