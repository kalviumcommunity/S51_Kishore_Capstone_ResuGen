import React, { useState } from "react";
import ResTemp1 from "../pages/ResTemp1";
import "./CreateResume.css";
import UserInput from "../UserInputs/PersonalDetails/UserInput";
import UserExp from "../UserInputs/Experience/UserExp";

import UserSkills from "../UserInputs/Skills/UserSkills";

const CreateResume = () => {

    let count = 0
    const handleNext = () => {
        if (count == 0){
            setLeftCompo(<UserInput />)
        }
        // Handle the next action here
        // For example, update the left component to UserExp
        setLeftCompo(<UserExp />);
      };

  const [leftCompo, setLeftCompo] = useState(<UserInput onNext={handleNext} />);

 

  return (
    <>
      <div className="create-res-div">
        {leftCompo}
        <ResTemp1 />
      </div>
    </>
  );
};

export default CreateResume;
