import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar.js/Navbar";
import Departmentpage from "./pages/Departmentpage";
import Employeepage from "./pages/Employeepage";



const App = () => {
  return (
    
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employee" element={<Employeepage />} />
          <Route path="/department" element={<Departmentpage />} />
        </Routes>
      </BrowserRouter>
    
  );
};

export default App;
