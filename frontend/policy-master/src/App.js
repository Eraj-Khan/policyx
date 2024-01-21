import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';

import Home from './pages/Home';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './pages/User/Register';
import { Company } from './pages/Company';
import UserDash from './pages/UserDash'
import { useState } from 'react';
import Review from './pages/User/Review';
import CompanySignUp from "./pages/Company/CompanySignUp"
import Biding from './pages/Biding';
import Notification from './pages/Notification';

function App() {
  
    return (
    <div>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<LoginSignup/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        <Route path='/userDash' element={<UserDash/>}></Route>
        <Route path='/review' element={<Review/>}></Route>
        <Route path='/companySignUp' element={<CompanySignUp/>}></Route>
        </Routes>
      </BrowserRouter>   */}
    {/* <Home/>
     <LoginSignup/> */}
     {/* <Company/> */}
     {/* <UserDash/> */}
<Notification/>

{/* <Biding/> */}
    </div>
  );
}

export default App;
