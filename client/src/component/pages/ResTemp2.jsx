  import React from "react";
  import { useSelector } from "react-redux";
  import { FaPhoneAlt } from "react-icons/fa";
  import { IoMdMail, IoMdHome } from "react-icons/io";
  import "../../utils/CustomScrollBar.css";
  import "./ResTemp2.css";

  const ResTemp2 = () => {
    const formData = useSelector((state) => state.personalInfo.formData);
    const experienceDataList = useSelector(
      (state) => state.experienceInfo.experienceDataList
    );
    const educationFormData = useSelector(
      (state) => state.educationInfo.educationFormData
    );
    const skillsFormData = useSelector(
      (state) => state.skillsInfo.skillsFormData
    );

    return (
      <div className="restemp2-resume">
        <header>
          <h1 className="restemp2-name">{formData.firstName} {formData.lastName}</h1>
          <p className="restemp2-job-title">{formData.jobTitle}</p>
        </header>
        <section className="restemp2-contact-section">
          <h2>Contacts</h2>
          <div className="restemp2-contact-info">
            <p>
              <FaPhoneAlt /> {formData.phone || "0123456789"}
            </p>
            <p>
              <IoMdMail /> {formData.email || "john.doe@example.com"}
            </p>
            <p>
              <IoMdHome /> {formData.city}, {formData.state}, {formData.country} {formData.zipCode}
            </p>
          </div>
        </section>
        <section className="restemp2-skills-section">
          <h2>Technical Skills</h2>
          <ul className="restemp2-skills-list">
            {skillsFormData.map((skillData, index) => (
              <li key={index}>
                <strong>{skillData.skills}</strong> - {skillData.expertiseLevel}
              </li>
            ))}
          </ul>
        </section>
        <section className="restemp2-summary-section">
          <h2>Summary</h2>
          <p className="restemp2-summary-content">{formData.profileDescription}</p>
        </section>
        <section className="restemp2-education-section">
          <h2>Education</h2>
          {educationFormData.map((eduData, index) => (
            <div className="restemp2-education-info" key={index}>
              <h3>{eduData.SchoolName || "ABC School"}</h3>
              <p>{eduData.Degree}, {eduData.FieldOfStudy}</p>
              <p>{eduData.StartDate} - {eduData.LastDate}</p>
              <p>{eduData.SchoolLocation || "Paris"}</p>
            </div>
          ))}
        </section>
        <section className="restemp2-experience-section">
          <h2>Experience</h2>
          {experienceDataList.map((expData, index) => (
            <div className="restemp2-experience-info" key={index}>
              <h3>{expData.PositionTitle}</h3>
              <p>{expData.CompanyName}</p>
              <p>{expData.StartDate} - {expData.LastDate}</p>
              <p>{expData.WorkSummary}</p>
            </div>
          ))}
        </section>
      </div>
    );
  };

  export default ResTemp2;