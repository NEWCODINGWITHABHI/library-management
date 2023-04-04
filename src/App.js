import { useState } from "react";
import "./App.css";
import Dashboard from "./components/dashboardpage/Dashboard";
import LoginPage from "./components/loginpage/LoginPage";
import RegisterPage from "./components/registerpage/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [user,setLoginUser]=useState({})
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
           <Route  path="/" element={<RegisterPage/>} />
         
          {/* {true ? (
            <Route path="/" element={<Dashboard />} />
          ) : (
            <Route path="/register" element={<RegisterPage />} />
          )} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
