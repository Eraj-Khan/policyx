import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';

import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<LoginSignup/>}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Home/>
     <LoginSignup/> */}
    </div>
  );
}

export default App;
