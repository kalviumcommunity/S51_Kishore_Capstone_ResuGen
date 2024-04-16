
  import React from 'react';
  import { connect } from 'react-redux';

  const PersonalInformation = ({ personalInfo }) => {
      const { firstName, lastName, email, phone, jobTitle, city, state, zipCode, country, profileDescription } = personalInfo;

      return (
          <div>
              <h1>{firstName} {lastName}</h1>
              <p>Email: {email}</p>
              <p>Phone: {phone}</p>
              <p>Job Title: {jobTitle}</p>
              <p>Address: {city} {state} {zipCode} {country}</p>
              <p>About:<br /> 
                {profileDescription}</p>
          </div>
      );
  };

  // Map state to props
  const mapStateToProps = (state) => ({
    personalInfo: state.personalInfo 
});

  // Connect component to Redux store
  export default connect(mapStateToProps)(PersonalInformation);
import React from "react";


const PersonalInformation = ({ photo, name, email, phone }) => {
  return (
    <div className="personal-info">
      <h2>{name}</h2>
      <img src={photo} alt="profile" />
const PersonalInformation = ({ name, email, phone }) => {
  return (
    <div className="personal-info">
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
    </div>
  );
};

export default PersonalInformation;
