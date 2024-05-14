import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./WaitingPage.css"; // Import CSS file
// import Spinner from "../SpinnerCompo/Spinner"; // Import your spinner component

const WaitingPage = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const success = queryParams.get("success");
    const message = queryParams.get("message");

    if (success === "true") {
      toast.success(message || "Email verified successfully");
    } else {
      toast.error(message || "Failed to verify email");
    }

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 10000);
  }, [navigate]);

  return (
    <div className="waiting-container">
      <ToastContainer />
      {/* {loading ? (
        <Spinner />
      ) : ( */}
        <>
          <h2 className="waiting-title">Please wait...</h2>
          {/* <Spinner /> */}
        </>
      {/* )} */}
    </div>
  );
};

export default WaitingPage;
