import React from 'react';
import PersonalInformation from '../Inputs/PersonalInformation';
import Education from '../Inputs/Education'; // Make sure to import the Education component
import Skills from '../Inputs/Skills';
import WorkExperience from '../Inputs/WorkExp';
import './ResTemp1.css';

const ResTemp1 = ({ personalInfo, experienceInfo, educationInfo }) => {
  return (
    <div className="resume-template1">
      <PersonalInformation {...personalInfo} />
      <WorkExperience {...experienceInfo} />
      <Education education={educationInfo} /> {/* Pass educationInfo as a prop */}
      <Skills />
    </div>
  );
};

export default ResTemp1;
