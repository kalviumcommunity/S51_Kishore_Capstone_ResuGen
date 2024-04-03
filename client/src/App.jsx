import LandingPage from './component/LandingPage';
import LoginPage from './component/Login/LoginPage';
import BuildResume from './component/Build/BuildResume';
import MyResume from './component/UserResumes/MyResume';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

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
        </Routes>
      </BrowserRouter>
      <ToastContainer position='top-right' theme='dark'/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
