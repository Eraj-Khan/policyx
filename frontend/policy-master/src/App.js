import logo from "./logo.svg";
import "./App.css";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import toast, { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/User/Register";
import { Company } from "./pages/Company";
import UserDash from "./pages/UserDash";
import { useState } from "react";
import Review from "./pages/User/Review";
import CompanySignUp from "./pages/Insurrance/CompanySignUp.jsx";
import { Notification } from "./pages/Notification.jsx";
import UserList from "./pages/Insurrance/UserList.jsx";
import Bid from "./pages/Insurrance/Bid.jsx";
import UserNotification from "./pages/User/UserNotification.jsx";
import ProtectedUser from "./Components/PrivateRoute/ProtectedUser.jsx";
import ProtectedCompany from "./Components/PrivateRoute/ProtectedCompany.jsx";
import LoginProtected from "./Components/PrivateRoute/LoginProtected.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>

          <Route element={<LoginProtected/>}>
          <Route path="/login" element={<LoginSignup />}></Route>
          <Route path="/companySignUp" element={<CompanySignUp />}></Route>
          </Route>
          <Route element={<ProtectedUser/>}>
            <Route path="/userDash" element={<UserDash />}></Route>
            <Route path="/review/:case_id" element={<Review />}></Route>
            <Route
              path="/usernotification"
              element={<UserNotification />}
            ></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>

          <Route element={<ProtectedCompany/>}>
          <Route path="/company" element={<Company />}></Route>
          <Route path="/notification" element={<Notification />}></Route>
          <Route path="/userList" element={<UserList />}></Route>
          <Route path="/bid" element={<Bid />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
     
    </div>
  );
}

export default App;
