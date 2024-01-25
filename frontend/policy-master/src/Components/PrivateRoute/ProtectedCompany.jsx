import React, { Children } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedCompany = ({ children, ...rest }) => {
  let auth = localStorage.getItem("auth");
 console.log("auth",JSON.parse(auth))
 let parseAuth = JSON.parse(auth)
  return parseAuth?.role==='company' ?  <Outlet /> : <Navigate to="/companysignup" />; 

};

export default ProtectedCompany;
