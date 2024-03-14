import './App.css'
import LandingPage from './component/LandingPage'
import LoginPage from "./component/Login/LoginPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} /> 
      </Routes>
    </BrowserRouter>
        
    </>
  )
}

export default App
