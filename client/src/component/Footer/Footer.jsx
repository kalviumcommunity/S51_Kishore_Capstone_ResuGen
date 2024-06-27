import React from "react";
import "./Footer.css";
import Logo from "../../assets/Logo.png";
import { chakra, Flex, Icon } from "@chakra-ui/react";

import { FiGithub } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
import { AiOutlineInstagram } from "react-icons/ai";

const Foot = () => {
  return (
    <div className="footer-div">
      <div className="footer-logo-div">
        <img className="footer-logo" src={Logo} alt="logo" />
        <pre>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto{" "}
          <br />
          tenetur nisi suscipit doloremque nobis praesentium <br />
          perferendis, quam
        </pre>
      </div>
      <div className="footer-socails-div">
        <div className="footer-socails">
          <pre className="footer-socails-heading">To contact us</pre>
          <div className="footer-social-handles">
            <a
              href="https://github.com/KishoreGhost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub
                style={{
                  color: "#000000",
                  fontSize: "30px",
                }}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/kishore-kumar-d-a4b49927a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CiLinkedin
                style={{
                  color: "#000000",
                  fontSize: "30px",
                }}
              />
            </a>
            <a href="#">
              <AiOutlineInstagram
                style={{
                  color: "#000000",
                  fontSize: "30px",
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foot;
