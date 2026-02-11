import React from 'react'
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/"  element={<LoginPage />}/>
            <Route path="/signup" element={<SignupPage />} />
        </Routes>
    )
}
export default AppRoutes
