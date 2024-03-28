import React from 'react';
import "./MyResume.css";
import Scrollbars from 'react-custom-scrollbars';
import Logo from '../../assets/Logo.png'; 
import Header from '../HeaderComponent/Header';

const MyResume = () => {
  return (
    <>
      <Scrollbars style={{ width: "100%", height: "100vh" }}>
        <Header />  
        <div className="user-resume-div">
            <h2 className="user-resume-heading">Your Resumes</h2>
            <div className="user-resume">
                <div className="user"></div>
                <div className="user"></div>
                <div className="user"></div>
                <div className="user"></div>
                <div className="user"></div>
                <div className="user"></div>
            </div>
        </div>
      </Scrollbars>
    </>
  );
};

export default MyResume;
