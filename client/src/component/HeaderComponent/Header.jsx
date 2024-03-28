import React from "react";
import "./Header.css"
import Logo from "../../assets/Logo.png";

const Header = () => {
  return (
    <>
      <div className="header">
        <img className="logo" src={Logo} alt="logo" />
      </div>
    </>
  );
};

export default Header;
