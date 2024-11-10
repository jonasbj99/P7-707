import React from 'react';
import Button from '../components/Button/Button'; 

const Login = () => {
  const handleLoginClick = () => {
    console.log("Login button clicked!");
  };

  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <p>Please log in to continue.</p>
      
      <Button 
        label="Login" 
        onClick={handleLoginClick} 
        variant="blue" 
      />
    </div>
  );
};

export default Login;
