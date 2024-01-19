import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';

import Home from './pages/Home';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './pages/User/Register';
import { Company } from './pages/Company';
import UserDash from './pages/UserDash'
import { useState } from 'react';
<<<<<<< HEAD
=======
import Review from './pages/User/Review';
import CompanySignUp from "./pages/Company/CompanySignUp"
>>>>>>> 090fe525388868b3c8943007651689da404614be

function App() {
  
    return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<LoginSignup/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        <Route path='/userDash' element={<UserDash/>}></Route>
<<<<<<< HEAD
=======
        <Route path='/review' element={<Review/>}></Route>
        <Route path='/companySignUp' element={<CompanySignUp/>}></Route>
>>>>>>> 090fe525388868b3c8943007651689da404614be
        </Routes>
      </BrowserRouter>  
    {/* <Home/>
     <LoginSignup/> */}
     {/* <Company/> */}
     {/* <UserDash/> */}

    </div>
  );
}

export default App;
