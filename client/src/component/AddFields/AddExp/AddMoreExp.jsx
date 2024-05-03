// AddMoreExp.js
import React from "react";
import "./AddMoreExp.css";
import { useDispatch } from "react-redux";
import { addNewExperience } from "../../../Redux/Actions/actions";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

const AddMoreExp = () => {
  const dispatch = useDispatch();

  const handleAddExperience = () => {
    dispatch(addNewExperience());
  };

  return (
    <div onClick={handleAddExperience} className="user-exp-add-exp-btn-div">
      <div className="user-exp-add-exp-btn">+ Add More Experience</div>
    </div>
  );
};

export default AddMoreExp;
