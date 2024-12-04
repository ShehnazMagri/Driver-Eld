import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import store from "./Redux/store";
import AdminLayout from "layouts/Admin.js";
import Login from "components/Authentication/Login";
import Signup from "components/Authentication/Signup";
import ForgetPassword from "components/Authentication/Forget-password";
import ResetPassword from "components/Authentication/Reset-password";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import AuthCheck from "authCheck";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected routes */}
      <Route path="/admin/*" element={
        <AuthCheck>
          <AdminLayout />
        </AuthCheck>
      } />
      <Route path="/owner/*" element={
        <AuthCheck>
          <AdminLayout />
        </AuthCheck>
      } />
      <Route path="/driver/*" element={
        <AuthCheck>
          <AdminLayout />
        </AuthCheck>
      } />

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
    <ToastContainer />
  </BrowserRouter>
</Provider>
);
