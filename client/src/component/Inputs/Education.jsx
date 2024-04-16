import React from 'react';
import { connect } from 'react-redux';

const Education = ({ educationInfo }) => {

  const {schoolName, schoolLocation, startDate, endDate, degree, fieldOfStudy} = educationInfo

  return (
    <div className="education">
      <h2>Education</h2>
        <div className="education-item">
          <h3></h3>
          <p>{schoolName}</p>

          <p>{schoolLocation}</p>
          <p>{startDate}</p>
          <p>{endDate}</p>
          <p>{degree}</p>
          {/* <p>{}</p> */}
        </div>

    </div>
  );
};

const mapStateToProps = (state) => ({
  educationInfo: state.educationInfo
})

export default connect(mapStateToProps)(Education);
