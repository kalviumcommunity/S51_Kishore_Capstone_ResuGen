import React, { useEffect, useRef, useState } from "react";
// import "./LoginPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"
import Head from "../HeaderComponent/Header";
import AuthButton from "../AuthButtonCompo/AuthButton";
import { FaGoogle, FaGithub } from "react-icons/fa6";
import useUser from "../../Hooks/useUser";
import Spinner from "../SpinnerCompo/Spinner";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeLogintoSignup, setChangeLogintoSingup] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [eye, setEye] = useState(false);
  const [confirmEye, setConfirmEye] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password, 
        confirmPassword
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

  const handlePassEye = () => {
    setEye(!eye);
  };

  const handleConfirmPassEye = () => {
    setConfirmEye(!confirmEye);
  };


  const { data, isLoading, isError } = useUser();

  const navigate = useNavigate();

    useEffect(() => {
      console.log("isLoading:", isLoading);
      console.log("data:", data);
      if (!isLoading && data) {
        console.log("Redirecting to home page...");
        navigate("/", { replace: true });   
      }
    }, [isLoading, data, navigate]);

//   if (isLoading) {
//     return <Spinner />;
//   }

  return (
    <>
      
        <Head />

        <div className="login-content">
          <div className="login-content-left">
            <div className="content-left-logo">
              <img className="logo" src={Logo} alt="logo" />
            </div>
            <div className="login-description">
              <h1>The Best Online Resume Builder Out There.</h1>
              <p>A Quick and Efficient way to make your resume stand out.</p>
            </div>
          </div>

          <div className="login-right">
            <div className="signup-form">
              <h2>
                Welcome to <span className="title">ResuGen</span>
              </h2>
              <form className="form" onSubmit={handleSubmit}>
                <div className="flex-column">
                  <label>Email </label>
                </div>
                <div className="inputForm">
                  <svg
                    key="email-icon"
                    height="20"
                    viewBox="0 0 32 32"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                  </svg>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex-column">
                  <label>Password </label>
                </div>
                <div className="inputForm">
                  <svg
                    key="password-icon"
                    height="20"
                    viewBox="-64 0 512 512"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                    <path d="M304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                  </svg>
                  {eye ? (
                    <>
                      <input
                        type="text"
                        className="input"
                        placeholder="Enter your Password"
                        onChange={(e) => setPassword(e.target.value)}
                        // ref={passwordRef}
                      />
                      <GoEyeClosed onClick={handlePassEye} />
                    </>
                  ) : (
                    <>
                      <input
                        type="password"
                        className="input"
                        placeholder="Enter your Password"
                        onChange={(e) => setPassword(e.target.value)}
                        // ref={passwordRef}
                      />
                      <GoEye onClick={handlePassEye} />
                    </>
                  )}
                </div>

                <div className="flex-column">
                  <label>Confirm Password </label>
                </div>
                <div className="inputForm">
                  <svg
                    key="password-icon"
                    height="20"
                    viewBox="-64 0 512 512"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                    <path d="M304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                  </svg>
                  {confirmEye ? (
                    <>
                      <input
                        type="text"
                        className="input"
                        placeholder="Enter your Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <GoEyeClosed onClick={handleConfirmPassEye} />
                    </>
                  ) : (
                    <>
                      <input
                        type="password"
                        className="input"
                        placeholder="Confirm your Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <GoEye onClick={handleConfirmPassEye} />
                    </>
                  )}
                </div>

                <button
                  className="button-submit"
                  type="submit"
                  // onClick={handleSignUp}
                >
                  Sign up
                </button>

                <p className="p">
                  Already have an account?
                  <Link to="/login">
                    <span className="span">
                      Login
                    </span>
                  </Link>
                </p>

                <p className="p line">Or Continue With</p>

                <div className="flex-row">
                  <AuthButton
                    Icon={FaGoogle}
                    label={"Sign in with Google"}
                    provider={"GoogleAuthProvider"}
                  />
                  <AuthButton
                    Icon={FaGithub}
                    label={"Sign in with Github"}
                    provider={"GithubAuthProvider"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
};

export default SignUpPage;
