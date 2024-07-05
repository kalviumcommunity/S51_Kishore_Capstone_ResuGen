import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Spinner from "./component/SpinnerCompo/Spinner";

const LandingPage = React.lazy(() => import("./component/LandingPage"));
const LoginPage = React.lazy(() => import("./component/Login/LoginPage"));
const BuildResume = React.lazy(() => import("./component/Build/BuildResume"));
const MyResume = React.lazy(() => import("./component/UserResumes/MyResume"));
const SignUpPage = React.lazy(() => import("./component/SignUp/SignUp"));
const ProtectUserData = React.lazy(() => import("./component/ProtectUserData"));
const ForgotPassCompo = React.lazy(() => import("./component/ForgotPass/ForgotPassCompo"));
const UserInput = React.lazy(() => import("./component/UserInputs/PersonalDetails/UserInput"));
const CreateResume = React.lazy(() => import("./component/CreateResume/CreateResume"));
const UserExp = React.lazy(() => import("./component/UserInputs/Experience/UserExp"));
const WaitingPage = React.lazy(() => import("./component/WaitingArea/WaitingPage"));
const LinkedInBuilder = React.lazy(() => import("./component/CreateResume/LinkedInBuilder"));
const ResumeBuilderMain = React.lazy(() => import("./ResumeBuilderMain"));

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
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
              {/* Remove this route after testing */}
              <Route path="/inputs" element={<UserInput />}></Route>{" "}
              {/* Remove this route after testing */}
              <Route path="/build/create-resume" element={<CreateResume />} />
              <Route path="/build/linkedin" element={<LinkedInBuilder />}></Route>
              <Route path="/work-experience" element={<UserExp />}></Route>
              <Route path="/verify-email/" element={<WaitingPage />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer position="top-right" theme="dark" />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
