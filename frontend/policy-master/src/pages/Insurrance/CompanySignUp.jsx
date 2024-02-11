import React, { useState } from "react";
import "../Insurrance/CompanySignUp.css";
import user_icon from "../../Components/Assets/person.png";
import email_icon from "../../Components/Assets/email.png";
import password_icon from "../../Components/Assets/password.png";
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
// import { act } from "react-dom/test-utils";
const navigation = [
  { name: "Home", href: "#" },
  { name: "Insurance", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Contact Us", href: "#" },
];



const CompanySignup = () => {
  const [action, setAction] = useState("Sign In");
  // const [formData, setFormData] = useState({
  //   firstname: "",
  //   lastname: "",
  //   name: "",
  //   email: "",
  //   password: "",
  //   confirmpassword: "",
  // });
  const [company_name, setCompanyName] = useState("");
  const [business_type, setBusinessType] = useState("");
  const [business_address, setBusinessAddress] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [industry, setIndustry] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [terms_and_conditions_accepted, setTermsAccepted] = useState(false);
  const[loggedIn, setIsLoggedIn] = useState("");
  const navigate = useNavigate();
  
  // const [forgetPassword, setForgetPassword] = useState(false);

  const role= "company";

  const handleSignUp = () => {
    setAction("Sign Up");
  };
  const handleSignIn = () => {
    setAction("Sign In");
  };

   const handleChange = (e) => {
    const newPassword = e.target.value;
    // Check if the new password meets the length requirement
    if (newPassword.length >= 6) {
      setPassword(newPassword);
    }
  };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  //   setPasswordError('');
  //   setPasswordMatch(e.target.value === confirm_password)
  // };

  // const handleConfirmPasswordChange = (e) => {
  //   setConfirmPassword(e.target.value);
  //   setPasswordMatch(e.target.value === password)
  // };


  const handleSignUpClick = async () => {
  


      try {

        if (!contact_person || !email || !phone_number || !industry || !username || !password) {
          swal('Please enter all the required fields.');
          return; 
        }
       
        const response = await axios.post('http://127.0.0.1:8000/accounts/api/auth/users/', {
          email,
          username,
          first_name: null,
          last_name: null,
          role,
          password,
          company_name,
          business_type,
          business_address,
          contact_person,
          phone_number,
          industry,
          terms_and_conditions_accepted,
        });
  
        console.log(response.data);

        
        if (response.status === 201) {
          
          // setIsLoggedIn(true);
          sessionStorage.clear();
          sessionStorage.setItem("company_name", company_name);
          sessionStorage.setItem("business_type", business_type);
          sessionStorage.setItem("business_address", business_address);
          sessionStorage.setItem("contact_person", contact_person);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("phone_number", phone_number);
          sessionStorage.setItem("industry", industry);
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("password", password);
          sessionStorage.setItem("terms_and_conditions_accepted", terms_and_conditions_accepted)
          // navigation('/home');
          swal("Company Registered Successfully!");
        } else {
          swal("Sign-Up failed... Please try again.");
        }
      } catch (error) {
        console.log("Error:", error);
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
          company_name:company_name

        }
        
        console.log("data",data)
        localStorage.setItem("user",JSON.stringify(data))
        setTimeout(()=>{
          navigate('/company')
          swal("Successfully Logged In")
        },100)
      }
     else {
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
          {/* <img src={user_icon} alt="" /> */}
          <input
          className="sign-up-input"
          type="text"
          value={company_name}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder=" Company Name"
          required
        />

          {/* <img src={user_icon} alt="" /> */}
          <input
          className="sign-up-input"
          type="text"
          value={business_type}
          onChange={(e) => setBusinessType(e.target.value)}
          placeholder=" Business Type"
          required
        />
        </div>

        <div className="input">
          {/* <img src={user_icon} alt="" /> */}
          <input
          className="sign-up-input_business"
          type="text"
          value={business_address}
          onChange={(e) => setBusinessAddress(e.target.value)}
          placeholder=" Business Address"
          required
        />
        </div>
      </div>
    );

  

  return (
   
    <div className="">
  
        <div className="company_signup_img">
       <div className="company_signup_popup">
     <div className="company_popup_signin">
      <div className="popup_company">
      <div className="headers">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        
        {dynamicFields}
        {
          action === "Sign In" ? <div></div> : 
        <div className="input">
          {/* <img src={email_icon} alt="" /> */}
          <input
          className="sign-up-input"
          type="text"
          value={contact_person}
          onChange={(e) => setContactPerson(e.target.value)}
          placeholder="Contact Person"
          required
        />
        </div>
}
        <div className="input">
          {/* <img src={password_icon} alt="" /> */}
          <input
          className="input-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
        />
        </div>
        {
          action === "Sign In" ? <div></div> : 
          <div className="input">
          {/* <img src={password_icon} alt="" /> */}
          <input 
          className="input-phonenumber"
          type="tel"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
        />
        </div>
        }       
          {
          action === "Sign In" ? <div></div> : 
          <div className="input">
          {/* <img src={password_icon} alt="" /> */}
          <input
          className="sign-up-input"
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="Industry"
          required
        />
        </div>
        }  
           {
          action === "Sign In" ? <div></div> : 
          <div className="input">
          {/* <img src={password_icon} alt="" /> */}
          <input
          className="sign-up-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        </div>
        }  
         <div className="input">
          {/* <img src={password_icon} alt="" /> */}
          <input
          className="input-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        </div>
        {
          action === "Sign In" ? <div></div> : 
        <label className="terms">
          Terms and Conditions Acceptance
          <input
            type="checkbox"
            checked={terms_and_conditions_accepted}
            onChange={(e) =>setTermsAccepted(e.target.checked)}
            required
          />
        </label>
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
        </div>
        {/* )} */}
        </div>
        </div>
      </div>
      <div className="company_sign_img ">
          <img className="animate_animated animate_pulse " src={Login_img} alt="" />
        </div>
    </div>
    </div>
    </div>
  );
};

export default CompanySignup;











