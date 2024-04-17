    import React from 'react';
    import PersonalInformation from '../Inputs/PersonalInformation';
    import Education from '../Inputs/Education';
    import Skills from '../Inputs/Skills';
    import WorkExperience from '../Inputs/WorkExp';
    import './ResTemp1.css';

    const ResTemp1 = ({ personalInfo, experienceInfo, educationInfo }) => {

      // const skillsData = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'];

      return (
        <div className="resume-template1">
          <PersonalInformation {...personalInfo} />
          <WorkExperience {...experienceInfo} />
          <Education education={educationInfo} />
          <Skills  />
        </div>
      );
    };

    export default ResTemp1;
