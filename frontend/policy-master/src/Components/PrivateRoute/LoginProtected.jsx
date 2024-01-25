import React, { Children } from "react";
import { Navigate, Outlet } from "react-router";

const LoginProtected = ({ children, ...rest }) => {
  let auth = localStorage.getItem("auth");
 console.log("auth",JSON.parse(auth))
 
  return !auth ?  <Outlet /> : <Navigate to="/" />; 

};

export default LoginProtected;
