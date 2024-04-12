import React from "react";
import "./UserInput.css";

const UserInput = ({ onNext }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Assuming onPersonalInfoChange is defined elsewhere
    onPersonalInfoChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="user-input-div">
        <div className="user-input-next-btn-div" onClick={onNext}>
          <div className="user-input-next-btn">Next</div>
        </div>
        <div className="user-input-top">
          <h1>Personal Details</h1>
          <p>Get started with the basics: your name and contact information</p>
        </div>
        <div className="user-input">
          <div className="user-input-wrap">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              onChange={handleInputChange}
            />
          </div>
          <div className="user-input-wrap">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              onChange={handleInputChange}
            />
          </div>
          <div className="user-input-wrap">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required={true}
              onChange={handleInputChange}
            />
          </div>
          <div className="user-input-wrap">
            <label>Phone</label>
            <input type="text" name="phone" onChange={handleInputChange} />
          </div>
          <div className="user-input-wrap">
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              placeholder="Enter your job title"
              onChange={handleInputChange}
            />
          </div>
          <div className="user-input-wrap">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              onChange={handleInputChange}
            />
          </div>
          <div className="user-input-wrap">
            <label>Profile Description</label>
            <input type="text" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInput;
