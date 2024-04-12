import React from "react";

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
