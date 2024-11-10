import React from 'react';
import Button from '../components/Button/Button'; 
import Header from '../components/Header/Header';
import Log from '../components/Log/Log';
import LogOverview from '../components/LogOverview/LogOverview';
import Suggestion from '../components/Suggestion/Suggestion';
import SetOverview from '../components/SetOverview/SetOvervie';

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
     <LogOverview exercise={'SQUAT'} set={1} reps={5} weight={'55kg'} onEdit={function (): void {
        throw new Error('Function not implemented.');
      } }/>
      <Suggestion message={'Nice set, try to go deeper next time or maybe do more quality stretching bla bla bla bla bla bla '}/>

      <SetOverview exercise={'Squat'} reps={10} weight={55}/>
    </div>
  );
};

export default Login;
