import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup";

export function AppRoutes() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
