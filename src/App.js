// App.js

import React from "react";
import MainPg from "./Login-pg/MainPg";
import OTPVerification from "./OTPPage/OTPVerification";
import Dashboard from "../src/Dashboard/Dashboard";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./generateNewKey";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPg />} />
        <Route path="/OTP/*" element={<OTPVerification />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
