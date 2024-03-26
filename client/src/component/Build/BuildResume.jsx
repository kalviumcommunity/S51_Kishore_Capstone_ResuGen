import React, { useState } from "react";
import "./BuildResume.css";
import Logo from "../../assets/Logo.png";
import { Scrollbars } from "react-custom-scrollbars";

const BuildResume = () => {
  return (
    <>
      <Scrollbars style={{ width: "100%", height: "92.8vh" }}>
        <div className="header">
          <img className="logo" src={Logo} alt="logo" />
        </div>

        <div className="template-heading">
          <h1>Choose a Template!</h1>
          <p>Select a color and a template to get started</p>
        </div>

        {/* <div className="colored-squares">
          <div className="default-colors">
            <div className="square square-1"></div>
            <div className="square square-2"></div>
            <div className="square square-3"></div>
            <div className="square square-4"></div>
            <div className="square square-5"></div>
          </div>

          <div className="custom-color-picker">
            <p>Custom:</p>
            <input className="custom-color" type="color" value="#000" />
          </div>
        </div> */}

        <div className="templates">
          <div className="template"></div>
          <div className="template"></div>
          <div className="template"></div>
          <div className="template"></div>
          <div className="template"></div>
          <div className="template"></div>
          <div className="template"></div>
          <div className="template"></div>
          <div className="template"></div>
          <div className="template"></div>
        </div>

        <div className="template-footer">
          <p>@2024 Copyrights blah blah blah!!..</p>
        </div>
      </Scrollbars>
    </>
  );
};

export default BuildResume;
