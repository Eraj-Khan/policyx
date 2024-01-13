import React, { useState } from "react";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import swal from "sweetalert";
import axios from "axios";
import Home from "../../pages/Home";
import { useNavigate } from "react-router";
// import { act } from "react-dom/test-utils";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
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
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigate(null);
  // const [forgetPassword, setForgetPassword] = useState(false);

  const handleSignUp = () => {
    setAction("Sign Up");
  };
  const handleSignIn = () => {
    setAction("Sign In");
  };
  const handleSignUpClick = async () => {
    try {
      // give api path for calling signUp api on get('/api/signup)
      const response = await axios.post("http://localhost:5000/api/register", {
        first_name,
        last_name,
        username,
        email,
        password,
        confirm_password,
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
        // navigation('/home');
        swal("User Created Successfully!");
      } else {
        swal("Sign-Up failed... Please try again.");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSignInClick = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
        // sessionStorage.clear();
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
        navigation('/');
        swal("Successfully Logged In")
      } else {
        swal("Please sign in with correct credentials.");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // const handleChange = (field, value) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [field]: value,
  //   }));
  // };

  // const handleAction = () => {
  //   if (action === "Login") {
  //     console.log("Logging in with:", formData);
  //   } else if (action === "Sign Up") {
  //     console.log("Signing up with:", formData);
  //   } else {
  //     console.log("Forget Password for:", formData.email);

  //     // setFormData({ firstname:"", lastname:"",name: "", email: "", password: "", confirmpassword:""});
  //   }

  //   // setFormData({ firstname:"", lastname:"", name: "", email: "", password: "",confirmpassword:""});
  // };

  const dynamicFields =
    action === "Sign In" || action === "Forget Password" ? null : (
      <div>
        <div className="inputsmall">
          <img src={user_icon} alt="" />
          <input
            type="text"
            placeholder="Firstname"
            onChange={(e) => setFirstName(e.target.value)}
            value={first_name}
          />

          <img src={user_icon} alt="" />
          <input
            type="text"
            placeholder="Lastname"
            onChange={(e) => setLastName(e.target.value)}
            value={last_name}
          />
        </div>

        <div className="input">
          <img src={user_icon} alt="" />
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
          />
        </div>
      </div>
    );

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {dynamicFields}

        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {
          action === "Sign In" ? <div></div> : 
          <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="ConfirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirm_password}
          />
        </div>
        }       
      </div>
      {/* {(action === 'Sign Up' || action === 'Login') && (
        <div className='forgot-password' onClick={() => setAction('Forgot Password')}>
          Forgot Password?<span>Click Here..</span>
        </div>
      )} */}

      {/* {action === "Sign Up" || forgetPassword ? (
        <div></div>
      ) : (
        <div
          className="forgot-password"
          onClick={() => setAction("Forget Password")}
        >
          Forget Password? <span> Click Here..</span>
        </div>
      )} */}
      {/* <div className="submit-container">
        <div className="submit">
          {action === "Forget Password" ? "Reset" : action}
        </div>
      </div> */}

      {/* <div className='submit-container'>
        <div className='submit' onClick={handleAction}>
          {action === 'Login' ? 'Login' : 'Sign Up'}
        </div>
      </div> */}
      <div className="switch-action">
        {/* <div className="switch">
          <button
            type="submit"
            className="submit"
            onClick={
              action === "Sign Up" ? handleSignInClick : handleSignUpClick
            }
          >
            {action}
            {console.log("action:",action)}
          </button>
          {action === "Sign In" ? (
            <div></div>
          ) : (
            <div className="account">
              Click here to create account{" "}
              <span onClick={handleSignUp}>Sign In</span>
            </div>
          )}
        </div> */}
        {/* {isLoggedIn ? (
          <div></div>
          // <a href="/login"></a>
        ) : ( */}
          <div className="switch">
          <button
            type="submit"
            className="submit"
            onClick={
              action === "Sign Up" ? handleSignUpClick : handleSignInClick  
            }
          >
            {action}
            {console.log("action:", action)}
          </button>
          {action === "Sign In" ? (
            <div></div>
          ) : (
            <div className="account">
              
             Already have an account? <span onClick={handleSignIn}>Sign In</span>
            </div>
          )}
        </div>
        {/* )} */}
        
      </div>
    </div>
  );
};

export default LoginSignup;
