// AddMoreExp.js
import React from "react";
import "./AddMoreExp.css";
import { useDispatch } from "react-redux";
import { addNewExperience } from "../../../Redux/Actions/actions";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

const AddMoreExp = () => {
  const dispatch = useDispatch();

  const handleAddMoreExp = () => {
    // Generate a unique UUID for the new experience object
    const experienceId = uuidv4();
    console.log(experienceId)

    // Dispatch the "ADD_NEW_EXPERIENCE" action with new experience data including the generated ID
    dispatch(addNewExperience({
      id: experienceId, 
      positionTitle: "",
      companyName: "",
      startDate: "",
      lastDate: "",
      workSummary: "",
    }));
  };

  return (
    <div onClick={handleAddMoreExp} className="user-exp-add-exp-btn-div">
      <div className="user-exp-add-exp-btn">+ Add More Experience</div>
    </div>
  );
};

export default AddMoreExp;
