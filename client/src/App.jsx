// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import LandingPage from "./component/LandingPage";
import LoginPage from "./component/Login/LoginPage";
import BuildResume from "./component/Build/BuildResume";
import MyResume from "./component/UserResumes/MyResume";
import SignUpPage from "./component/SignUp/SignUp";
import ProtectUserData from "./component/ProtectUserData";
import ForgotPassCompo from "./component/ForgotPass/ForgotPassCompo";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UserInput from "./component/UserInputs/PersonalDetails/UserInput";
import CreateResume from "./component/CreateResume/CreateResume";
import UserExp from "./component/UserInputs/Experience/UserExp";
import WaitingPage from "./component/WaitingArea/WaitingPage";
import LinkedInBuilder from "./component/CreateResume/LinkedInBuilder";
import ResumeBuilderMain from "./ResumeBuilderMain";


function App() {
  const queryClient = new QueryClient();
  // const [signUp, isSignUp] = useState(false);
  return (
    <>
      
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/build" element={<BuildResume />} />
            <Route path="/my-resumes" element={<MyResume />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<ProtectUserData />}>
              <Route path="/" element={<LandingPage />} />
            </Route>
            <Route path="/forgotpass" element={<ForgotPassCompo />} />
            {/* <Route path="/profile/:uid" element={<MyResume />} /> */}
            {/* Remove this route after testing */}
            <Route path="/inputs" element={<UserInput />}></Route>{" "}
            {/* Remove this route after testing */}
            <Route path="/build/create-resume" element={<CreateResume />} />
            <Route path="/build/linkedin" element={<LinkedInBuilder />}></Route>
            <Route path="/work-experience" element={<UserExp />}></Route>
            <Route path="/verify-email/" element={<WaitingPage />}></Route>

          </Routes>
        </BrowserRouter>
        <ToastContainer position="top-right" theme="dark" />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
