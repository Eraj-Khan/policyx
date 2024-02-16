import React, { useState } from "react";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import swal from "sweetalert";
import axios from "axios";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/400.css";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router";
import Login_img from "../../image/login.png"
import logotwo from "../../image/logo1.png";

// import { act } from "react-dom/test-utils";
const navigation = [
  { name: "Home", href: "#" },
  { name: "Insurance", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Contact Us", href: "#" },
];



const LoginSignup = () => {
  const [action, setAction] = useState("Sign In");
  // const [formData, setFormData] = useState({
  //   firstname: "",
  //   lastname: "",
  //   name: "",
  //   email: "",
  //   password: "",
  //   confirmpassword: "",
  // });
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[passwordMatch, setPasswordMatch] = useState(true);
  

 
  const navigate = useNavigate();
  
  // const [forgetPassword, setForgetPassword] = useState(false);
const role= "normal";

  const handleSignUp = () => {
    setAction("Sign Up");
  };
  const handleSignIn = () => {
    setAction("Sign In");
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    console.log('New Password:', newPassword);
  
    setPassword(newPassword);
    setPasswordMatch(newPassword === confirm_password);
  
    if (newPassword.length < 6) {
      console.log('Password length less than 6');
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
  };
  
 
  

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password)
  };


  const handleSignUpClick = async () => {
    if (!first_name || !last_name || !username || !email || !password || !confirm_password) {
      swal( "Please fill out all the required fields");
      return;
    }
    if(passwordMatch){
      try {
      
        const response = await axios.post('http://localhost:8000/accounts/api/auth/users/', {
          first_name,
          last_name,
          username,
          email,
          password,
          confirm_password,
          role
        });
  
        console.log(response.data);
        if (response.status === 201) {
          // setIsLoggedIn(true);
          sessionStorage.clear();
          sessionStorage.setItem("firstname", first_name);
          sessionStorage.setItem("lastname", last_name);
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("password", password);
          sessionStorage.setItem("confirmpassword", confirm_password);
          sessionStorage.setItem("role", role);
          // navigation('/home');
          swal("User Created Successfully!");
        } else {
          swal("Sign-Up failed... Please try again.");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }

     else{
      swal("password not matched.");  
     }
     

      
   
  };

  // const handleSignInClick = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:8000/accounts/auth/token/login/", {
  //       username,
  //       password,
  //     });
  //     if (response.status === 200) {
  //       setIsLoggedIn(true);
  //       // sessionStorage.clear();
  //       sessionStorage.setItem("username", username);
  //       sessionStorage.setItem("password", password);
  //       navigation('/userDashboard');
  //       swal("Successfully Logged In")
  //     } else {
  //       swal("Please sign in with correct credentials.");
  //     }
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // };
  const handleSignInClick = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/accounts/api/auth/login/', {
        email,
        password,
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
        // sessionStorage.clear();
        // sessionStorage.setItem("username", username);
        // sessionStorage.setItem("password", password);
       const {refresh,access,user_name,role,id,email,company_name} = response.data;
       localStorage.setItem("token", access)
       localStorage.setItem("refresh-token", refresh)
        let data= {

          id:id,
          role:role,
          user_name:user_name,
          email:email,
          

          

        }
        
        console.log("data",data)
        localStorage.setItem("user",JSON.stringify(data))
        setTimeout(()=>{
          navigate('/userDash')
          swal("Successfully Logged In")
        },100)
      
        
      } else {
        swal("Please sign in with correct credentials.");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };


  
 
  const dynamicFields =
    action === "Sign In" || action === "Forget Password" ? null : (
      <div>
        <div className="inputsmall">
          {/* <img src={user_icon} alt="" /> */}
          <input
            type="text"
            placeholder="Firstname"
            onChange={(e) => setFirstName(e.target.value)}
            value={first_name}
            required
          />

          {/* <img src={user_icon} alt="" /> */}
          <input
            type="text"
            placeholder="Lastname"
            onChange={(e) => setLastName(e.target.value)}
            value={last_name}
            required
          />
        </div>

        <div className="input">
          {/* <img src={user_icon} alt="" /> */}
          <input className="username_input"
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
            required
          />
        </div>
      </div>
    );

  

  return (
   
    <div className="sign_up_main">
    <div className="signup_logo">
<img className="w-28 h-28 ml-10" src={logotwo} alt="" />
  </div>
        <div className="signup_img">
       <div className="signup_popup">
      <div className="popup">
      <div className="headers">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {dynamicFields}

        <div className="input">
          {/* <img src={email_icon} alt="" /> */}
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="input">
          {/* <img src={password_icon} alt="" /> */}
          <input
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
            required
          />
          

        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}
        {
          action === "Sign In" ? <div></div> : 
          <div className="input">
          {/* <img src={password_icon} alt="" /> */}
          <input className="place"
            type="password"
            placeholder="ConfirmPassword"
            onChange={handleConfirmPasswordChange}
            value={confirm_password}
            required
          />
        </div>
        }      
          
      </div>
   

     
      <div className="switch-action">
      
       
          <div className="switch">
          <button
            type="submit"
            className="submittion"
            onClick={
              action === "Sign Up" ? handleSignUpClick : handleSignInClick  
            }
          >
            {action}
            {console.log("action:", action)}
          </button>
          {action === "Sign Up" ? (
           <div></div>
          ) : (
            
            <div className="account">
              
             Don't have an account? <span onClick={handleSignUp}>Sign Up</span>
            </div>
          )}

            {action === "Sign In" ? (
            <div></div>
          ) : (
            <div className="account">
              
             <span onClick={handleSignIn}>Sign In</span>
            </div>
           
          )}
        {/* )} */}
        </div>
      </div>
      </div>
      </div>
      <div className="sign_img ">
          <img className="animate_animated animate_pulse" src={Login_img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;

