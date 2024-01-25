import React, { Children } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedUser = ({ children, ...rest }) => {
  let auth = localStorage.getItem("auth");
  let parseAuth = JSON.parse(auth)
  return parseAuth?.role==='normal' ?  <Outlet /> : <Navigate to="/login" />; 

};

export default ProtectedUser;