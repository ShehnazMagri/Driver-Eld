import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getloginuserAction } from "./Redux/Action/adminauth";

const AuthCheck = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    const checkAuthToken = async () => {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        toast.error("Your token has expired! Please login again.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return; // Exit if there's no token
      }

      try {
        // Make an API call to verify the token
        const response = await dispatch(getloginuserAction())
        
        if (response === undefined) {
            toast.error("Session expired. Please log in again.");
            localStorage.removeItem("authToken");
            localStorage.removeItem("tokenExpiry");
            navigate("/login");
        }
      } catch (error) {
        console.log(error)
      }
    };

    checkAuthToken();
  }, [navigate]);

  return <>{children}</>;
};

export default AuthCheck;
