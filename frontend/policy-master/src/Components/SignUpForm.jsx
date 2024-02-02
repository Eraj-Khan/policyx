
import React, { useState } from 'react';
import "./SignUpForm.css";



const SignUpForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="signup-container">
      <div
        className={`signup-card user ${selectedOption === 'user' ? 'selected' : ''}`}
        onClick={() => handleOptionSelect('user')}
      >
        <h2>Sign Up as User</h2>
      </div>
      <div
        className={`signup-card company ${selectedOption === 'company' ? 'selected' : ''}`}
        onClick={() => handleOptionSelect('company')}
      >
        <h2>Sign Up as Company</h2>
      </div>
      {selectedOption && (
        <button className="selected-option-button">{`Selected: ${selectedOption}`}</button>
      )}
    </div>
  );
};

export default SignUpForm;

