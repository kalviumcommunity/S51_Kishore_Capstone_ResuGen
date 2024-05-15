import React, { useEffect, useState } from "react";
import "./BuildResume.css";
import Logo from "../../assets/Logo.png";
// import { Scrollbars } from "react-custom-scrollbars";
import Header from "../HeaderComponent/Header";
import { Link } from "react-router-dom";

const BuildResume = () => {
  useEffect(() => {
    fetchTemplateData()
  },[])
  const [tempImg, setTemplateImg] = useState("");
  const fetchTemplateData = async () => {
    try {
      const response = await fetch("http://localhost:6969/template");
      const templateData = await response.json();
      setTemplateImg(templateData);
      console.log(tempImg, "templateData");
    } catch (err) {
      console.log("Error fetching data", err.message);
    }
  };
  return (
    <>
      {/* <Scrollbars style={{ width: "100%", height: "92.8vh" }}> */}
      <Header />

      <div className="template-heading">
        <h1>Choose a Template!</h1>
        <p>Select a template to get started!</p>
      </div>

      <Link to="/build/create-resume">
      <div className="templates">
        
      {Array.isArray(tempImg) &&
            tempImg.map((data) => (
              <div className="template">
                <img key={data.id} src={data.templateImg} alt="template" />
              </div>
            ))}
            
      </div>
      </Link>

      <div className="template-footer">
        <p>@2024 Copyrights blah blah blah!!..</p>
      </div>
      {/* </Scrollbars> */}
    </>
  );
};

export default BuildResume;
