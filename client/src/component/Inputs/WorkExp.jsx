import React from 'react';

const WorkExperience = ({ experiences }) => {
  return (
    <div className="work-experience">
      <h2>Work Experience</h2>
      {experiences.map((experience, index) => (
        <div key={index} className="experience-item">
          <h3>{experience.company}</h3>
          <p>{experience.title}</p>
          <p>{experience.duration}</p>
          <p>{experience.description}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkExperience;
