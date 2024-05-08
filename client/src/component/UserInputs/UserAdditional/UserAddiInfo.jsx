import React from "react";
import "./UserAddiInfo.css";
import { PiCertificateBold } from "react-icons/pi";
import { GrAchievement } from "react-icons/gr";
import { TbLanguageKatakana } from "react-icons/tb";
import { BiSolidCustomize } from "react-icons/bi";

function UserAddiInfo({ onBack }) {
  const handleBackClick = () => {
    onBack();
  };

  return (
    <>
      <div className="user-addiInfo-div">
        <div className="user-exp-top-buttons addi-top">
          <div className="user-exp-back-btn" onClick={handleBackClick}>
            Back
          </div>

          <div className="user-exp-next-btn-div">
            <div className="finish-btn">Finish</div>
          </div>
        </div>

        <div className="user-input-top">
          <h1>Add custom section</h1>
          <p>Do you want to add any other details</p>
        </div>
        <div className="additional-info-div">
          <div className="additional-info-custom addi">
            <BiSolidCustomize style={{ fontSize: "30px" }} /> Add Custom Section
          </div>
          <div className="additional-info-certificates addi">
            <PiCertificateBold style={{ fontSize: "30px" }} />
            Certificates
          </div>
          <div className="additional-info-achievements addi">
            <GrAchievement style={{ fontSize: "30px" }} /> Achievements
          </div>
          <div className="additional-info-languages addi">
            <TbLanguageKatakana style={{ fontSize: "30px" }} /> Languages
          </div>
        </div>
      </div>
    </>
  );
}

export default UserAddiInfo;
