import React from "react";
import "./ResTemp1.css";
import { useSelector } from "react-redux";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoMdHome } from "react-icons/io";

const ResTemp1 = () => {
  const formData = useSelector((state) => state.personalInfo.formData);
  const experienceDataList = useSelector((state) => state.experienceInfo.experienceDataList);
  const educationFormData = useSelector((state) => state.educationInfo.educationFormData);
  const skillsFormData = useSelector((state) => state.skillsInfo.skillsFormData);
  console.log(skillsFormData)

  return (
    <>
    <div className="res-temp1">
      <h1>
        {formData.firstName} {formData.lastName}
      </h1>
      <p className="job-title">{formData.jobTitle}</p>
      <div className="res1-contents">
        <div className="res1-top-left">
          <div className="user-contacts">
            <h2>Contacts</h2>
            <div className="contacts">
              <p>
                <FaPhoneAlt /> {formData.phone}
              </p>
              <p>
                <IoMdMail /> {formData.email}
              </p>
              <p>
                <IoMdHome /> {formData.zipCode} {formData.city} {formData.state} {formData.country}
              </p>
            </div>
          </div>
          <div className="skills-info-div">
            <h2>Technical Skills</h2>
            {skillsFormData.map((skillData, index) => (
              <div className="info-skills" key={index}>
                <p>{skillData.skills}</p>
                <p>{skillData.expertiseLevel}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="res1-top-right">
          <div className="res1-user-description">
            <h2>Summary</h2>
            <div className="res1-profile-desc">
              <p>{formData.profileDescription}</p>
            </div>
          </div>
          <div className="education-info-div">
            <h2>Education</h2>
            {educationFormData.map((eduData, index) => (
              <div className="res1-education" key={index}>
                <h3>{eduData.schoolName || "Hallo"}</h3>
                <p>{eduData.schoolLocation}</p>
                <p>{eduData.startDate}</p>
                <p>{eduData.lastDate}</p>
                <p>{eduData.degree}</p>
                <p>{eduData.fieldOfStudy}</p>
              </div>
            ))}
          </div>
          <div className="res1-experience-info-div">
            <h2>Experience</h2>
            {experienceDataList.map((expData, index) => (
              <div className="res1-exp" key={index}>
                <h2>{expData.PositionTitle}</h2>
                <p>{expData.CompanyName}</p>
                <p>{expData.StartDate} - {expData.LastDate}</p>
                <p>{expData.WorkSummary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ResTemp1;
