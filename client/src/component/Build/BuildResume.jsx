import React from "react";
import { Link } from "react-router-dom";
import Header from "../HeaderComponent/Header";
import "./BuildResume.css";
import resumeBuilderImg from "../../assets/build-resume-img.png";
import resumeBuilderLinkedInImg from "../../assets/resume-build-linkedin.png";

const BuildResume = () => {
  return (
    <>
      <Header />
      <div className="template-heading">
        <h1>How do you want to start?</h1>
        <p>Start from scratch, or upload your LinkedIn profile.</p>
      </div>

      <div className="card-container">
        <Link to="/build/create-resume" className="card-link">
          <div className="container-1 resume-box">
            <h1>Create a new Resume</h1>
            <p>Start with a blank paper. We'll guide you step by step.</p>
            <div className="card-img">
              <img src={resumeBuilderImg} alt="img" />
            </div>
          </div>
        </Link>
        <Link to="/build/linkedin" className="card-link">
          <div className="container-2 resume-box">
            <h1>Import from LinkedIn</h1>
            <p>
              If you have a great LinkedIn profile, save time by importing your
              profile straight into your resume.
            </p>
            <div className="card-img1">
              <img src={resumeBuilderLinkedInImg} alt="img" />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default BuildResume;
