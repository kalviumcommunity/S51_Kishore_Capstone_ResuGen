import React from "react";
import "./LandingPage.css";
import Logo from "../assets/Logo.png";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className="nav-bar">
        <div className="top-left">
          <Link to="/">
            <img className="logo" src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="navi-bar">
          <div className="middle">
            <p className="context">Build Your Resume</p>
            <p className="context">Resume Examples</p>
            <p className="context">Resume Templates</p>
          </div>

          <div className="top-right">
            <Link className="login" to="/login">
              <p className="login context pointer">Login</p>
            </Link>

            <div className="build-res-btn pointer">
              <Button
                sx={{
                  border: "2px solid orange",
                  color: "black",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "orange",
                    color: "white",
                  },
                  transition: "background-color 0.3s ease",
                }}
              >
                Build my Resume
              </Button>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default LandingPage;
