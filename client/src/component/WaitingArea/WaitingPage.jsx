import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./WaitingPage.css";
import axios from "axios";

const WaitingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {

    // Periodically check email verification status every 5 seconds
    const interval = setInterval(checkEmailVerificationStatus, 50000);

    return () => clearInterval(interval);
  }, [navigate]);

  const checkEmailVerificationStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6969/waiting/email-verification-status"
      );
  
      if (response.data.isEmailVerified) {
        // Email verified, redirect to home page
        navigate("/");
        // Show success notification
        toast.success("Email verification successful!");
      }
    } catch (error) {
      console.error("Error checking email verification status:", error);
      // Show error notification
      toast.error("Error checking email verification status.");
    }
  };
  

  return (
    <div className="waiting-container">
      <h2 className="waiting-title">Verify your email</h2>
      <ToastContainer />
    </div>
  );
};

export default WaitingPage;
