import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./WaitingPage.css";

const WaitingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const verifyEmail = async () => {
    try {
      const response = await axios.get(`http://localhost:6969/verify-email?token=${token}`);
      if (response.status === 200) {
        toast.success("Email verified successfully! Please Login to continue");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error("Email verification failed. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="waiting-container">
      <h2>Verifying your email...</h2>
      <button onClick={verifyEmail}>Go Back</button>
      <ToastContainer />
    </div>
  );
};

export default WaitingPage;
