
import React, { useState } from 'react';
import "./SignUpForm.css";



const SignUpForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    
    <div className=" app signup-container">
        <div class="boxes">
    <ul className='animation_li'>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
      <div className="selectone"><h1>Join as a Company Or User</h1></div>
      <div className='cards_signinup'>
        <div
          className={`signup-card user ${selectedOption === 'user' ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('user')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0b5485" className="w-8 h-8 ml-16">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>


          <h2>Sign In as User</h2>
        </div>
        <div
          className={`signup-card company ${selectedOption === 'company' ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('company')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0b5485" className="w-8 h-8 ml-16">
            <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
          </svg>

          <h2>Sign In as Company</h2>
        </div>
      </div>
      <div className='selected_button'>
      {selectedOption && (
        <a href={selectedOption === 'user' ? "/login" : "/companysignup"} className="selected-option-button">
          {`Sign in as ${selectedOption}`}
        </a>
        
      )}
    </div>
    </div>
  );
};

export default SignUpForm;

