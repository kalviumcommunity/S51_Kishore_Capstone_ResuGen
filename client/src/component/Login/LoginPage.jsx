import React, { useEffect } from "react";
import "./LoginPage.css";
import Logo from "../../assets/Logo.png";
import { FaGoogle, FaGithub } from "react-icons/fa6";
import AuthButton from "../AuthButtonCompo/AuthButton";
import useUser from "../../Hooks/useUser";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

import Header from "./../HeaderComponent/Header";
import Spinner from "../SpinnerCompo/Spinner";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useUser();

  useEffect(() => {
    if (!isLoading && data) {
      navigate("/", { replace: true });
    }
  }, [isLoading, data, navigate]);

  console.log(isLoading, "Loading")

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

  return (
    <>
      <Header />

      <div className="login-content">
        <div className="box-shadow">
          <div className="content-logo">
            <img className="logo" src={Logo} alt="logo" />
          </div>
          <h2>
            Welcome to <span className="title">ResuGen</span>
          </h2>
          <div className="login-description">
            <h1>The Best Online Resume Builder Out There.</h1>
            <p>A Quick and Efficient way to make your resume stand out.</p>
          </div>

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
