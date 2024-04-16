import React from "react";
import { connect } from "react-redux";
import { updateEducation } from "../../../Redux/Actions/actions";
import "./UserEducation.css";

const UserEducation = ({ onNext, onBack, updateEducation }) => {
  const handleNextClick = () => {
    onNext();
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleEducationInputChange = (e) => {
    const { name, value } = e.target;
    updateEducation({ ...updateEducation, [name]: value });
  };

  return (
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
        <h1>Education</h1>
        <p>Tell us more about your education</p>
      </div>

      <div className="user-education">
        {[
          {
            label: "School Name",
            name: "schoolName",
            input: "text",
          },
          {
            label: "School Location",
            name: "schoolLocation",
            input: "text",
          },
          {
            label: "Start Date",
            name: "startDate",
            input: "date",
          },
          {
            label: "End Date",
            name: "endDate",
            input: "date",
          },
          {
            label: "Degree",
            name: "degree",
            input: "text",
          },
          {
            label: "Field of Study",
            name: "fieldOfStudy",
            input: "text",
          },
        ].map((input, index) => (
          <div key={index} className="user-edu-wrap">
            <label>{input.label}</label>
            <input
              type={input.input}
              name={input.name}
              onChange={handleEducationInputChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  educationInfo: state.userEducationInfoReducer, 
});

export default connect(mapStateToProps, { updateEducation })(UserEducation); // Added updateEducation as mapDispatchToProps
