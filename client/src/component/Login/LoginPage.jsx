import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import Logo from "../../assets/Logo.png";
import { FaGoogle, FaGithub } from "react-icons/fa6";
import AuthButton from "../AuthButtonCompo/AuthButton";
import useUser from "../../Hooks/useUser";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

import Header from "./../HeaderComponent/Header";
import Spinner from "../SpinnerCompo/Spinner";

const LoginPage = ({ setSignUp }) => {
  const navigate = useNavigate();
  const { isLoading, data } = useUser();

  useEffect(() => {
    if (!isLoading && data) {
      navigate("/", { replace: true });
    }
  }, [isLoading, data, navigate]);

  console.log(isLoading, "Loading");

  // if (isLoading == true){
  //   <Spinner />
  // }

  const handleSignIn = async (provider) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredentials);
      const user = userCredentials.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    const response = await axios.post("http://localhost:6969/signup", {
      userEmail: formData.email,
      userPassword: formData.password
    })
    if (response.status === 200){
      const { token } = response.data
      document.cookie = `token=${token}; path=/signup`
      document.cookie = `id=${response.data.user._id};`
      alert("sucess")
      setSignUp(true)
      navigate("/")
    }
  };

  return (
    <>
      <Header />
      <div className="login-div">
        <div className="log-div">
          <form className="form" onSubmit={handleSubmit}>
            <p className="title">Register </p>
            <p className="message">
              Login now {" "}
            </p>

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
            <button type="submit" className="submit">
              Submit
            </button>
            <p className="signin">
              Are you new to your Website!? <Link to="/login">Sign in</Link>
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
    </>
  );
};

export default LoginPage;
