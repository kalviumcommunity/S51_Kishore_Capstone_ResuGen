// eslint-disable-next-line no-unused-vars
import React from 'react';
import "./MyResume.css";
// import Scrollbars from 'react-custom-scrollbars';
// eslint-disable-next-line no-unused-vars
import Logo from '../../assets/Logo.png'; 
import Header from '../HeaderComponent/Header';

const MyResume = () => {
  return (
    <>
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
    </>
  );
};

export default MyResume;
