// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

import ResTemp1 from "../pages/ResTemp1";
import ResTemp2 from './../pages/ResTemp2';
import ResTemp3 from "../pages/ResTemp3";
import UserInput from "../UserInputs/PersonalDetails/UserInput";
import UserExp from "../UserInputs/Experience/UserExp";
import "./CreateResume.css";
import Header from "../HeaderComponent/Header";
import UserEducation from "./../UserInputs/Education/UserEducation";
import UserSkills from "../UserInputs/Skills/UserSkills";
import UserAddiInfo from "../UserInputs/UserAdditional/UserAddiInfo";



const CreateResume = () => {
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
      <div className="create-res">
        {step === 1 && <UserInput onNext={handleNext} />}
        {step === 2 && <UserExp onNext={handleNext} onBack={handleBack} />}
        {step === 3 && (
          <UserEducation
            onNext={handleNext}
            onBack={handleBack}
            // addEducation={addEducation}
          />
        )}
        {step === 4 && <UserSkills onNext={handleNext} onBack={handleBack} />}
        {step == 5 && <UserAddiInfo onBack={handleBack} /> }
        <div className="temp">
          <ResTemp1 />
          {/* <ResTemp2 /> */}
          {/* <ResTemp3 /> */}
        </div>
        
      </div>
    </>
  );
};


export default CreateResume
