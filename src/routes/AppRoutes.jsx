import React from 'react'
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import HomePage from "../pages/HomePage.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/"  element={<LoginPage />}/>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<HomePage />} />
        </Routes>
    )
}
export default AppRoutes
