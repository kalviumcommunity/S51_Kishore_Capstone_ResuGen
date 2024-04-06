import React from "react";
import "./Spinner.css";
import { PacmanLoader } from "react-spinners";

const Spinner = () => {
  return (
    <>
      <div className="spinner">
        <PacmanLoader size={35} />
      </div>
    </>
  );
};

export default Spinner;
