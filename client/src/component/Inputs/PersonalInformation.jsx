import React from "react";

const PersonalInformation = ({ photo, name, email, phone }) => {
  return (
    <div className="personal-info">
      <h2>{name}</h2>
      <img src={photo} alt="profile" />
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
    </div>
  );
};

export default PersonalInformation;
