import React from "react";
import "./AuthButton.css";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthButton = ({ Icon, label, provider, setLoading }) => {
  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();

  const handleAuthClick = async () => {
    setLoading(true);
    try {
      let authProvider;
      switch (provider) {
        case "GoogleAuthProvider":
          authProvider = googleAuthProvider;
          break;
        case "GithubAuthProvider":
          authProvider = githubAuthProvider;
          break;
        default:
          authProvider = googleAuthProvider;
          break;
      }

      const result = await signInWithPopup(auth, authProvider);
      toast.success(`Logged In successfully!`);
      setTimeout(() => {
        setLoading(false); // hide loader
        localStorage.setItem("isLoggedIn", true);
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      setLoading(false); // hide loader in case of error
      console.error("Authentication Error:", error.message);
      toast.error(`Authentication failed: ${error.message}`);
    }
  };

  return (
    <div onClick={handleAuthClick} className="auth-btn-div">
      <Icon className="auth-btn-icon" />
      <p>{label}</p>
    </div>
  );
};

export default AuthButton;
