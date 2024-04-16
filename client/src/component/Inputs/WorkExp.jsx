import React from "react";
import { connect } from "react-redux";

const WorkExperience = ({ experienceInfo }) => {
  const { positionTitle, companyName, startDate, endDate, workSummary } = experienceInfo;

  return (
    <div className="work-experience">
      <h2>Work Experience</h2>
      <div className="experience-item">
        <h3>{companyName}</h3>
        <p>{positionTitle}</p>
        <p>{startDate}</p>
        <p>{endDate}</p>
        <p>{workSummary}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  experienceInfo: state.experienceInfo
});

export default connect(mapStateToProps)(WorkExperience);
