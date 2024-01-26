import React, { Children } from "react";
import { Navigate, Outlet } from "react-router";

const LoginProtected = ({ children, ...rest }) => {
  let token = localStorage.getItem("token");
 
 
  return !token ?  <Outlet /> : <Navigate to="/" />; 

};

export default LoginProtected;
