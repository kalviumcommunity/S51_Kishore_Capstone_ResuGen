import React from "react";
import "./AuthButton.css";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";

const AuthButton = ({ Icon, label, provider }) => {
  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();

  const handleAuthClick = async () => {
    try {
      switch (provider) {
        case "GoogleAuthProvider":
          await signInWithPopup(auth, googleAuthProvider);
          break;
        case "GithubAuthProvider":
          await signInWithPopup(auth, githubAuthProvider);
          break;
        default:
          await signInWithPopup(auth, googleAuthProvider);
          break;
      }
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  return (
    <div onClick={handleAuthClick} className="auth-btn-div">
      <Icon />
      <p>{label}</p>
    </div>
  );
};

export default AuthButton;
