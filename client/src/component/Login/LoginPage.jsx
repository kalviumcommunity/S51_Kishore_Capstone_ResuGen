import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { FaGoogle, FaGithub } from "react-icons/fa6";
import AuthButton from "../AuthButtonCompo/AuthButton";
import useUser from "../../Hooks/useUser";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./../HeaderComponent/Header";
import Spinner from "../SpinnerCompo/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!isLoading && data) {
      navigate("/", { replace: true });
    }
  }, [isLoading, data, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:6969/login", {
        userEmail: formData.email,
        userPassword: formData.password,
      });
      if (response.status === 200) {
        toast.success(
          "Registration successful! Please check your email for verification."
        );
        setFormData({ email: "", password: "" });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSignIn = async () => {
    try {
      

      
    } catch (error) {
      console.log("Error", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Header />
      <div className="login-div">
        <div className="log-div">
          <form className="form" onSubmit={handleSubmit}>
            <p className="title">Login </p>
            <pre>Lorem ipsum dolor sit amet consectetur</pre>
            <label>
              <input
                required
                type="email"
                className="input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <span>Email</span>
            </label>

            <label>
              <input
                required
                placeholder=""
                type="password"
                className="input"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span>Password</span>
            </label>
            <button onClick={handleSubmit} type="submit" className="submit">
              Submit
            </button>
            <p className="signin">
              Are you new to your Website!? <Link to="/signup">Sign in</Link>
            </p>
          </form>
          <p className="continue-with">Or continue with</p>
          <div className="flex-row">
            <AuthButton
              Icon={FaGoogle}
              label={"Continue with Google"}
              provider={"GoogleAuthProvider"}
              onClick={handleSignIn}
            />
            <AuthButton
              Icon={FaGithub}
              label={"Continue with Github"}
              provider={"GithubAuthProvider"}
              onClick={handleSignIn}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
