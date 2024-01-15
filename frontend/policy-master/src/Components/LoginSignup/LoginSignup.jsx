import React, { useState } from "react";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import swal from "sweetalert";
import axios from "axios";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router";
// import { act } from "react-dom/test-utils";
const navigation = [
  { name: "Home", href: "#" },
  { name: "Insurance", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Contact Us", href: "#" },
];



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
  // const navigation = useNavigate(null);
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
        navigation('/userDashboard');
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
       <Popover as="header" className="relative">
          <div className="bg-sky-300 pt-6 pb-6">
            <nav
              className="relative mx-auto flex max-w-7xl items-center justify-between px-6"
              aria-label="Global"
            >
              <div className="flex flex-1 items-center">
                <div className="flex w-full items-center justify-between md:w-10">
                  <a href="#">
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src="https://tailwindui.com/img/logos/mark.svg?from-color=teal&from-shade=200&to-color=cyan&to-shade=400&toShade=400"
                      alt=""
                    />
                  </a>
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
                    </Popover.Button>
                  </div>
                </div>
                <div className="hidden space-x-8 md:ml-10 md:flex">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className=" text-xl font-medium text-white hover:text-sky-600"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-6">
                {/* <a
                  href="/login"
                  className="inline-flex items-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white hover:bg-sky-400"
                >
                  Log out
                </a> */}
                {/* <a
                  href="#"
                  className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
                >
                  Start free trial
                </a> */}
              </div>
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 origin-top transform p-2 transition md:hidden"
            >
              <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                <div className="flex items-center justify-between px-5 pt-4">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?from-color=teal&from-shade=500&to-color=cyan&to-shade=600&toShade=600"
                      alt=""
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                      <span className="sr-only">Close menu</span>
                      {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                    </Popover.Button>
                  </div>
                </div>
                <div className="pt-5 pb-6">
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="mt-6 px-5">
                    <a
                      href="#"
                      className="block w-full rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 py-3 px-4 text-center font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700"
                    >
                      Start free trial
                    </a>
                  </div>
                  <div className="mt-6 px-5">
                    <p className="text-center text-base font-medium text-gray-500">
                      Existing customer?{" "}
                      <a href="#" className="text-gray-900 hover:underline">
                        Login
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      <div className="popup">
      <div className="headers">
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
    </div>
  );
};

export default LoginSignup;
