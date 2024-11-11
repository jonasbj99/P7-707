import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import logo from '../../assets/Logo.svg';
import '../../pages/Login/Login.scss';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/home');
  };

  return (
    <div className="login-page">
      <div className="image-section" ></div>
  
      <div className="login-section">
        <img src={logo} alt="SMARTFIT Logo" className="logo" />

        <Header
          variant={'phoneS'}
          paragraph={
            <span>
              <strong>SMARTFIT</strong> tracks your workouts for you!
              <br />
              Record your workouts and improve.
            </span>
          }
        />

        <div className="button-group">
          <Button
            label="Login"
            onClick={handleLoginClick}
            variant="blue"
          />
          <Button
            label="Sign up"
            onClick={handleLoginClick}
            variant="dark"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
