import React from 'react';

const Education = ({ education }) => {
  return (
    <div className="education">
      <h2>Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="education-item">
          <h3>{edu.institution}</h3>
          <p>{edu.location}</p>
          <p>{edu.duration}</p>
          <p>{edu.degree}</p>
        </div>
      ))}
    </div>
  );
};

export default Education;
