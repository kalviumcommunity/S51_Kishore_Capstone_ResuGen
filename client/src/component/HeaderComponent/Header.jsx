import React from "react";
import "./Header.css";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header">
        <Link to="/">
          <img className="logo" src={Logo} alt="logo" />
        </Link>
      </div>
    </>
  );
};

export default Header;
