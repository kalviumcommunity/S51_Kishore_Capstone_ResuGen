import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import LandingPage from './component/LandingPage';
import LoginPage from './component/Login/LoginPage';
import BuildResume from './component/Build/BuildResume';
import MyResume from './component/UserResumes/MyResume';
import SignUpPage from './component/SignUp/SignUp';
import ProtectUserData from './component/ProtectUserData';
import ForgotPassCompo from './component/ForgotPass/ForgotPassCompo';
import ResTemp1 from './component/pages/ResTemp1';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const queryClient = new QueryClient();

  return (
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
          <Route path="/templates" element={<ResTemp1 />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" theme="dark" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
