
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanySignUp.css";

const SignUp = () => {
  const navigate = useNavigate();


  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [industry, setIndustry] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

 
  const handleSignUp = (e) => {
    e.preventDefault();

   

  
    navigate("/");
  };

  return (
    <div className="com-signup">
      <div className="text-sign">Company Sign Up</div>
      <div className="underline-sign"></div>
      <form className="inputs-cont" onSubmit={handleSignUp}>
        <input
          className="sign-up-input"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder=" Company Name"
          required
        />

        <input
          className="sign-up-input"
          type="text"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          placeholder=" Business Type"
          required
        />

        <input
          className="sign-up-input"
          type="text"
          value={businessAddress}
          onChange={(e) => setBusinessAddress(e.target.value)}
          placeholder=" Business Address"
          required
        />

        <input
          className="sign-up-input"
          type="text"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          placeholder="Contact Person"
          required
        />

        <input
          className="input-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
        />

        <input
          className="input-phonenumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
        />

        <input
          className="sign-up-input"
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="Industry"
          required
        />

        <input
          className="sign-up-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />

        <input
          className="input-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <label>
          Terms and Conditions Acceptance:
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            required
          />
        </label>

        <button className="submit_btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
