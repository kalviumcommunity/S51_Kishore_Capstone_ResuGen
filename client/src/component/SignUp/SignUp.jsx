import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../HeaderComponent/Header";
import AuthButton from "../AuthButtonCompo/AuthButton";
import { FaGoogle, FaGithub } from "react-icons/fa6";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    // Check if user is already authenticated and redirect if necessary
    // Add your authentication logic here if needed
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:6969/signup", {
        userEmail: formData.email,
        userPassword: formData.password
      })
      if (response.status === 200){
        toast.success("Registration successful! Please check your email for verification.");
        setFormData({ email: "", password: "", confirmPassword: "" });
        navigate("/waiting");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error during registration. Please try again later.");
    }
  };

  return (
    <>
      <Header />
      <div className="login-div">
        <div className="log-div">
          <form className="form" onSubmit={handleSubmit}>
            <p className="title">Register </p>
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
                type="password"
                className="input"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span>Password</span>
            </label>
            <label>
              <input
                required
                type="password"
                className="input"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span>Confirm Password</span>
            </label>
            <button type="submit" className="submit">
              Submit  
            </button>
            <p className="signin">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
          <p className="continue-with">Or continue with</p>
          <div className="flex-row">
            <AuthButton
              Icon={FaGoogle}
              label={"Continue with Google"}
              provider={"GoogleAuthProvider"}
            />
            <AuthButton
              Icon={FaGithub}
              label={"Continue with Github"}
              provider={"GithubAuthProvider"}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUpPage;
