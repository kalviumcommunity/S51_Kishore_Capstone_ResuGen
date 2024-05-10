import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePersonalInfo } from "../../../Redux/Actions/actions";
import "./UserInput.css";

const UserInput = ({onNext}) => {
  const dispatch = useDispatch();
  const [summary, setSummary] = useState("");
  const [formData, setFormData] = useState({});

  const handleNextClick = () => {
    onNext()
  }

  const handlePersonalInfoInputChange = async (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    dispatch(updatePersonalInfo({ formData: { [name]: value } }));

    // Update formData state with latest user input
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    try {
      const response = await fetch("http://localhost:6969/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Use updated formData here
      });
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  return (
    <>
      <div className="user-input-full-div">
        <div className="user-input-div">
          <div className="user-input-next-btn-div">
            <div className="user-input-next-btn" onClick={handleNextClick}>Next</div>
          </div>
          <div className="user-input-top">
            <h1>Personal Details</h1>
            <p>
              Get started with the basics: your name and contact information
            </p>
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
          <div className="pro-description">
            <label>Profile Description</label>
            <textarea
              name="profileDescription"
              onChange={handlePersonalInfoInputChange}
              value={summary}
            />
          </div>
          {summary && (
            <div className="summary">
              <h2>Summary</h2>
              <p>{summary}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserInput;
