import React from 'react';
import Button from '../components/Button/Button'; 
import Header from '../components/Header/Header';
import Log from '../components/Log/Log';

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
    <Log date={'13.10.2024'} workoutName={'Workout6'} onEdit={function (): void {
        throw new Error('Function not implemented.');
      } }/>
     <Header title='Welcome' paragraph='this is a paragraph' variant={'phoneS'}/> 
    </div>
  );
};

export default Login;
