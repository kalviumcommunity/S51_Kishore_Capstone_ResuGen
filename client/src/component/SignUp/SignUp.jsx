import React, { useEffect, useRef, useState } from "react";
// import "./LoginPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"
import Header from "../HeaderComponent/Header";
import AuthButton from "../AuthButtonCompo/AuthButton";
import { FaGoogle, FaGithub } from "react-icons/fa6";
import useUser from "../../Hooks/useUser";
import Spinner from "../SpinnerCompo/Spinner";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SignUpPage = () => {
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
    confirmPassword: ""
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
              Signup now to explore our webste more{" "}
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
            <label>
              <input
                required
                placeholder=""
                type="password"
                className="input"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span>Confirm password</span>
            </label>
            <button type="submit" className="submit">
              Submit  
            </button>
            <p className="signin">
              Already have an account? <Link to="/signup">Login</Link>
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

export default SignUpPage;
