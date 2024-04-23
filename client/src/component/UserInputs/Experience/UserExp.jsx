// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch } from "react-redux";
import { addExperience } from "../../../Redux/Actions/actions";
import "./UserExp.css";

// eslint-disable-next-line react/prop-types
const UserExp = ({ onNext, onBack }) => {
  const dispatch = useDispatch();

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
                onChange={handleExpInputChange}
              />
            </div>
          ))}
        </div>
        <div className="user-exp-work-summary-div">
          <label>Work Summary</label>
          <input
            type="text"
            name="workSummary"
            onChange={handleExpInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default UserExp;
