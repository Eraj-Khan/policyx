import React, { Children } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedCompany = ({ children, ...rest }) => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    let parseUser = JSON.parse(user)
  return parseUser?.role==='company' && token ?  <Outlet /> : <Navigate to="/companysignup" />; 

};

export default ProtectedCompany;
