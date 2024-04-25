// eslint-disable-next-line no-unused-vars
import React from "react";
import "./ResTemp1.css";
import { useSelector } from "react-redux";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoMdHome } from "react-icons/io";

const ResTemp1 = () => {
  const formData = useSelector((state) => state.personalInfo.formData);
  const experienceFormData = useSelector(
    (state) => state.experienceInfo.experienceFormData
  );
  const educationFormData = useSelector(
    (state) => state.educationInfo.educationFormData
  );
  const skillsFormData = useSelector((state) => state.skillsInfo.skillsFormData);

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
                  <IoMdHome /> {formData.zipCode} {formData.city}{" "}
                  {formData.state} {formData.country}
                </p>
              </div>
            </div>
            <div className="skills-info-div">
              <h2>Technical Skills</h2>
              <div className="info-skills">
                <div className="skill">
                  <li>{skillsFormData.skills}</li>
                  <p>{skillsFormData.expertiseLevel}</p>
                </div>
                <div className="skill">
                  <li>{skillsFormData.skills}</li>
                  <p>{skillsFormData.expertiseLevel}</p>
                </div>
              </div>
            </div>
          </div>

          <br />
          <div className="res1-top-right">
            <div className="res1-user-description">
              <h2>Summary</h2>
              <div className="res1-profile-desc">
                <p>{formData.profileDescription}</p>
              </div>
            </div>
            <div className="education-info-div">
              <h2>Education</h2>
              <div className="res1-education">
                <h3>
                  {educationFormData.schoolName},{" "}
                  {educationFormData.schoolLocation}
                </h3>
                <p>
                  {educationFormData.startDate} - {educationFormData.endDate}
                </p>
                <pre>
                <p>{educationFormData.degree}</p>
                <p>{educationFormData.fieldOfStudy}</p>
                </pre>
                
              </div>
            </div>
            {/* <div className="user-summary">
            <h2>Summary</h2>
            <p>{experienceFormData.workSummary}</p>
          </div> */}
            <div className="res1-experience-info-div">
              <h2>Experience</h2>
              <div className="res1-exp">
                <h3>{experienceFormData.positionTitle}</h3>
                <p className="res1-exp-startDate">{experienceFormData.startDate} - {experienceFormData.lastDate}</p>

                <p>{experienceFormData.companyName}</p>

               
              </div>
            </div>
          </div>
        </div>

        {/* <p>{formData.profileDescription}</p> */}
      </div>
    </>
  );
};

export default ResTemp1;
