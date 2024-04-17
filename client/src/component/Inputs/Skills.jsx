import React from 'react';
import { connect } from 'react-redux';

const Skills = ({ skillsInfo }) => {

  const {skills, expertiseLevel} = skillsInfo

  return (
    <div className="skills">
    <h2>Skills</h2>
      <ul>
        <li>{skills}</li>
        {expertiseLevel}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  skillsInfo: state.skillsInfo
})

export default connect(mapStateToProps)(Skills);
