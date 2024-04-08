// ResTemp1.jsx
import React from 'react';
import PersonalInformation from '../Inputs/PersonalInformation';
import Education from '../Inputs/Education';
import Skills from '../Inputs/Skills';
import WorkExperience from '../Inputs/WorkExp';

const ResTemp1 = () => {
  const personalInfoData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890'
  };

  const workExperienceData = [
    {
      company: 'ABC Company',
      title: 'Front-end Developer',
      duration: 'Jan 2018 - Present',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    // Add more work experiences as needed
  ];

  const educationData = [
    {
      institution: 'XYZ University',
      location: 'City, Country',
      duration: 'Sep 2014 - May 2018',
      degree: 'Bachelor of Science in Computer Science'
    },
    // Add more education details as needed
  ];

  const skillsData = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'];

  return (
    <>
      <PersonalInformation {...personalInfoData} />
      <WorkExperience experiences={workExperienceData} />
      <Education education={educationData} />
      <Skills skills={skillsData} />
    </>
  );
};

export default ResTemp1;
