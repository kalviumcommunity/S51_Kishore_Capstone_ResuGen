import React from 'react';
import PersonalInformation from '../Inputs/PersonalInformation';
import Education from '../Inputs/Education';
import Skills from '../Inputs/Skills';
import WorkExperience from '../Inputs/WorkExp';
import './ResTemp1.css';

const ResTemp1 = ({ personalInfo, experienceInfo }) => {


  const educationData = [
    {
      institution: 'XYZ University',
      location: 'City, Country',
      duration: 'Sep 2014 - May 2018',
      degree: 'Bachelor of Science in Computer Science'
    },
    // Additional education details can be added here
  ];

  const skillsData = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'];

  return (
    <div className="resume-template1">
      <PersonalInformation {...personalInfo} />
      <WorkExperience {...experienceInfo} />
      <Education education={educationData} />
      <Skills skills={skillsData} />
    </div>
  );
};

export default ResTemp1;
