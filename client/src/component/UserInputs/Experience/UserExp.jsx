import React from 'react';
import './UserExp.css';

const UserExp = ({ onNext }) => {
  const handleNextClick = () => {
    // Call onNext function to handle the next action
    onNext();
  };

  return (
    <>
      <div className="user-exp-div">
        <div className="user-exp-next-btn-div" onClick={handleNextClick}>
          <div className="user-exp-next-btn">Next</div>
        </div>
        <div className="user-exp-top">
          <h1>Experience</h1>
          <p>Add your work experience</p>
        </div>
        <div className="user-exp">
          {/* Input fields for work experience */}
        </div>
      </div>
    </>
  );
};

export default UserExp;
