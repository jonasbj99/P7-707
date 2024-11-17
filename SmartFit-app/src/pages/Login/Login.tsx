import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import logo from '../../assets/Logo.svg';
import workoutImage from '../../assets/Workout-image.svg';
import '../../pages/Login/Login.scss';
import ErrorPrevention from '../../components/ErrorPrevention/ErrorPrevention';

const Login = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Track success modal visibility

  const handleLoginClick = () => {
    setShowSuccessModal(true); // Show the success modal when the login button is clicked
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false); // Hide the modal
  };

  return (
    <div className="login-page">
      <div className="image-section">
        <img src={workoutImage} alt="Workout" className="background-image" />
      </div>

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
          <Button label="Login" onClick={handleLoginClick} variant="blue" />
          <Button label="Sign up" onClick={handleLoginClick} variant="dark" />
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <ErrorPrevention
          text="Logged successfully!"
          type="success"
          onClose={handleCloseModal} // Close modal when action is taken
        />
      )}
    </div>
  );
};

export default Login;
