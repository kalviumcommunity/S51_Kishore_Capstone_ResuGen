import React from 'react';
import { connect } from 'react-redux';
import educationInfoReducer from './../../Redux/Reducers/educationInfoReducer';

const Education = ({ educationInfo }) => {
  return (
    <div className="education">
      <h2>Education</h2>
      {educationInfo.map((education, index) => (
        <div key={index} className="education-item">
          <h3>{education.schoolName}</h3>
          <p>{education.schoolLocation}</p>
          <p>{education.startDate}</p>
          <p>{education.endDate}</p>
          <p>{education.degree}</p>
          <p>{education.fieldOfStudy}</p>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  educationInfo: state.educationInfoReducer // Assuming `educationInfo` is an array of education entries
});

export default connect(mapStateToProps)(Education);
