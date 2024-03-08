
import React, { useState } from "react";
import "./appLayout.css";
import HorizontalNavbar from "../horizontalNavbar/horizontalNavbar";
import VerticalNavbar from "../verticalNavbar/verticalNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../../allPages/dashboard/Dashboard";
import Home from "../../allPages/CourseException/Home"
import OnlineForm from '../../allPages/CourseException/OnlineCourse/OnlineForm'
import OneCredit from "../../allPages/CourseException/OneCredit/OneCredit"
import OnlineHome from "../../allPages/CourseException/OnlineCourse/OnlineHome"
import CreditHome from "../../allPages/CourseException/OneCredit/CreditHome"


function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleVerticalNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeVerticalNavbar = () => {
    setIsMenuOpen(false); // Set isMenuOpen to false to close the vertical navbar
  };

  return (
    <div className="total-app-layout">
      <BrowserRouter>
        <div className="h-navbar">
          <HorizontalNavbar toggleVerticalNavbar={toggleVerticalNavbar} />
        </div>
        <div className="v-nav-and-content">
          <div className={`v-navbar ${isMenuOpen ? "open" : ""}`}>
            <VerticalNavbar onClose={closeVerticalNavbar} />
          </div>
          <div className="content">
            <div className="content-with-margin">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/onlineCourse" element={<OnlineForm/>}/>
                <Route path="/onecredit" element={<OneCredit />}/>
                <Route path="/courseExcp" element={<Home/>}/>
                <Route path="/OnlineHome" element={<OnlineHome/>}/>
                <Route path="/CreditHome" element={<CreditHome/>}/>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default AppLayout;
