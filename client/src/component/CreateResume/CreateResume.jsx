import React, {useState} from "react";
import { connect } from "react-redux"; // Import connect
import ResTemp1 from "../pages/ResTemp1";
import UserInput from "../UserInputs/PersonalDetails/UserInput";
import UserExp from "../UserInputs/Experience/UserExp";
import "./CreateResume.css";
import Header from "../HeaderComponent/Header";
import UserEducation from "./../UserInputs/Education/UserEducation";
import UserSkills from "../UserInputs/Skills/UserSkills";

const CreateResume = ({ personalInfo, experienceInfo, educationInfo }) => { 
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <Header />
      <div className="create-res-div"></div>
      <div className="create-res">
        {step === 1 && (
          <UserInput onNext={handleNext} />
        )}
        {step === 2 && (
          <UserExp onNext={handleNext} onBack={handleBack} />
        )}
        {step == 3 && (
          <UserEducation onNext={handleNext} onBack={handleBack} />
        )}
        {step == 4 && (
          <UserSkills onNext={handleNext} onBack={handleBack} />
        )}
        <ResTemp1
            personalInfo={personalInfo} //from Redux store
            experienceInfo={experienceInfo} 
            educationInfo={educationInfo}
          />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  personalInfo: state.personalInfo,
  experienceInfo: state.experienceInfo,
});

export default connect(mapStateToProps)(CreateResume);
