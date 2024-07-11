import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { FaGoogle, FaGithub } from "react-icons/fa";
import AuthButton from "../AuthButtonCompo/AuthButton";
import useUser from "../../Hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./../HeaderComponent/Header";
import { FallingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const resumeState = localStorage.getItem("resumeContent")
    if (resumeState){
      localStorage.setItem("isLoggedIn", true)
      navigate("/build/create-resume")
    }else{
      try {
        const response = await axios.post("http://localhost:6969/login", {
          userEmail: formData.email,
          userPassword: formData.password,
        });
  
        if (response.status === 200) {
          toast.success("Login successful!");
          setFormData({ email: "", password: "" });
  
          setTimeout(() => {
            setLoading(false); // hide loader
            navigate("/", { replace: true });
            localStorage.setItem("isLoggedIn", true);
          }, 2000);
        }
      } catch (error) {
        setLoading(false); // hide loader in case of error
        if (error.response) {
          switch (error.response.status) {
            case 400:
              toast.error("Please provide email and password");
              break;
            case 404:
              toast.error("User not found");
              break;
            case 401:
              toast.error("Invalid email or password");
              break;
            case 403:
              toast.error("Email not verified. Please verify your email to log in.");
              break;
            default:
              toast.error("Error during login. Please try again later.");
          }
        } else {
          console.log("Error", error.message);
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  return (
    <>
      <Header/>
      {loading && (
        <div className="loader-container">
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      )}
      <div className={`login-div ${loading ? "blur" : ""}`}>
        <div className="log-div">
          <form className="form" onSubmit={handleSubmit}>
            <p className="title">Login </p>
            <pre>Already have an account? Log In here!  </pre>
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
              Are you new to your Website!? <Link to="/signup">Sign in</Link>
            </p>
          </form>
          <p className="continue-with">Or continue with</p>
          <div className="flex-row">
            <AuthButton
              Icon={FaGoogle}
              label={"Continue with Google"}
              provider={"GoogleAuthProvider"}
              setLoading={setLoading}
            />
            <AuthButton
              Icon={FaGithub}
              label={"Continue with Github"}
              provider={"GithubAuthProvider"}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{
          backgroundColor: "lightgreen",
          color: "#fff",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.5)",
        }}
      />
    </>
  );
};

export default LoginPage;
