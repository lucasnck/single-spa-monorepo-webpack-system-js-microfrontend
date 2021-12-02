import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";

export function AppRoutes() {
  return (
    <BrowserRouter basename="/<%= projectName %>">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
