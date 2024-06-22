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
    setLoading(true); // show loader
    try {
      switch (provider) {
        case "GoogleAuthProvider":
          await signInWithPopup(auth, googleAuthProvider);
          toast.success("Google login successful!");
          setTimeout(() => {
            setLoading(false); // hide loader
            localStorage.setItem("isLoggedIn", true);
            window.location.href = "/";
          }, 2000);
          break;
        case "GithubAuthProvider":
          await signInWithPopup(auth, githubAuthProvider);
          toast.success("GitHub login successful!");
          setTimeout(() => {
            setLoading(false); // hide loader
            localStorage.setItem("isLoggedIn", true);
            window.location.href = "/";
          }, 2000);
          break;
        default:
          await signInWithPopup(auth, googleAuthProvider);
          toast.success("Google login successful!");
          setTimeout(() => {
            setLoading(false); // hide loader
            localStorage.setItem("isLoggedIn", true);
            window.location.href = "/";
          }, 2000);
          break;
      }
    } catch (error) {
      setLoading(false); // hide loader in case of error
      console.error("Error", error.message);
      toast.error("Authentication failed. Please try again.");
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
