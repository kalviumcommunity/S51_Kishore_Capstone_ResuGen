// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch } from 'react-redux';
import { updatePersonalInfo } from "../../../Redux/Actions/actions";
import "./UserInput.css";

// eslint-disable-next-line react/prop-types
const UserInput = ({onNext}) => {
  const dispatch = useDispatch();

  const handlePersonalInfoInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updatePersonalInfo({ [name]: value }));
  };

  return (
    <>
      <div className="user-input-div">
        <div className="user-input-next-btn-div">
          <div className="user-input-next-btn" onClick={onNext}>Next</div>
        </div>
        <div className="user-input-top">
        <h1>Personal Details</h1>
        <p>Get started with the basics your name and contact information</p>
      </div>
      <div className="user-input">
        {[
          {
            label: "First Name",
            name: "firstName",
            type: "text",
            placeholder: "Enter your first name",
          },
          {
            label: "Last Name",
            name: "lastName",
            type: "text",
            placeholder: "Enter your last name",
          },
          {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Enter your email",
          },
          {
            label: "Phone",
            name: "phone",
            type: "text",
            placeholder: "Enter your phone number",
          },
          {
            label: "Job Title",
            name: "jobTitle",
            type: "text",
            placeholder: "Enter your job title",
          },
          {
            label: "City",
            name: "city",
            type: "text",
            placeholder: "Enter your city",
          },
          {
            label: "Zip Code",
            name: "zipCode",
            type: "text",
            placeholder: "Enter your zip code",
          },
          {
            label: "State",
            name: "state",
            type: "text",
            placeholder: "Enter your state",
          },
          {
            label: "Country",
            name: "country",
            type: "text",
            placeholder: "Enter your country",
          },
          {
            label: "Profile Description",
            name: "profileDescription",
            type: "text",
            placeholder: "Enter your profile description",
          },
        ].map((input, index) => (
          <div key={index} className="user-input-wrap">
            <label>{input.label}</label>
            <input
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              onChange={handlePersonalInfoInputChange}
            />
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default UserInput;
