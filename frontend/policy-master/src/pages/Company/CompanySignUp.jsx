// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CompanySignUp.css";


const SignUp = () => {
const navigate = useNavigate();
 

  // State for form fields
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [industry, setIndustry] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Function to handle form submission
  const handleSignUp = (e) => {
    e.preventDefault();

    // Perform sign-up logic here (e.g., API request)

    // Redirect to home page after successful sign-up
    navigate('/');
  };

  return (
    <div className='com-signup'>
        
        
     <div className="text-sign">Company Sign Up</div>
     <div className="underline-sign"></div>
      <form onSubmit={handleSignUp}>
        <label>
          Company Name:
          <input
          className='sign-up-input'
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </label>
    

        <label>
          Business Type:
          <input
          className='sign-up-input'
            type="text"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            required
          />
        </label>
    

        <label>
          Business Address:
          <input
          className='sign-up-input'
            type="text"
            value={businessAddress}
            onChange={(e) => setBusinessAddress(e.target.value)}
            required
          />
        </label>
       

        <label>
          Contact Person:
          <input
          className='sign-up-input'
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            required
          />
        </label>
     

        <label>
          Email Address:
          <input
          className='sign-up-input'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
    

        <label>
          Phone Number:
          <input
          className='sign-up-input'
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
 

        <label>
          Industry:
          <input
          className='sign-up-input'
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          />
        </label>
    

        <label>
          Username:
          <input
          className='sign-up-input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
     

        <label>
          Password:
          <input
          className='sign-up-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
     

        <label>
          Terms and Conditions Acceptance:
          <input

            type="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            required
          />
        </label>
    

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
