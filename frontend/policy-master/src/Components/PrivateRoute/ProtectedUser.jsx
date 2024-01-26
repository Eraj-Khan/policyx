import React, { Children } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedUser = ({ children, ...rest }) => {
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  let parseUser = JSON.parse(user)
  return parseUser?.role==='normal' && token?  <Outlet /> : <Navigate to="/login" />; 

};

export default ProtectedUser;