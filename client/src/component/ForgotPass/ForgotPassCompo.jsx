import React from 'react';
import './ForgotPassCompo.css';
import Head from '../HeaderComponent/Header';

const ForgotPassCompo = () => {
  return (
    <>
      <Head />
      <div className="forgot-pass-container">
        <div className="forgot-pass-div">
          <div className="forgot-pass-heading">
            <h2>Uh-oh Forgot Your Password :(</h2>
          </div>
          <div className="forgot-pass-desc">
            Please Enter your email below
          </div>
          <div className="email-input-div">
            {/* Replace the input field with CustomInput */}
            <input
              type="email"
              name="email"
              placeholder="Enter your Email..."
              label="Email"
            />
          </div>
          <div className="otp-btn-div">
            <button className="otp-btn">Send OTP</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassCompo;
