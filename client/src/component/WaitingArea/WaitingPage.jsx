import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./WaitingPage.css";
import axios from "axios";

const WaitingPage = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // const { token } = useParams();
        const response = await axios.get(
          "http://localhost:6969/waiting/"
        );
        if (response.status === 200) {
          toast.success("Email verified successfully!");
          setTimeout(() => {
            navigate("/"); // Redirect to homepage after verification
          }, 2000);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    verifyEmail();
  }, [navigate]);

  return (
    <div className="waiting-container">
      <h2 className="waiting-title">
        Please check your email for verification
      </h2>
      <ToastContainer />
    </div>
  );
};

export default WaitingPage;
