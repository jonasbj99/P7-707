import React, { useState } from 'react';
import '../../pages/Recording/Recording.scss';
import Button from '../../components/Button/Button';
import NoIcon from '../../assets/No-icon.svg';
import Header from '../../components/Header/Header';
import ErrorPrevention from '../../components/ErrorPrevention/ErrorPrevention';
import PoseDetection from '../../components/PoseDetection/PoseDetection';

const Recording = () => {  
  const [showErrorPrevention, setShowErrorPrevention] = useState(false);

  const handleEndClick = () => {
    setShowErrorPrevention(true); 
  };

  const handleCloseModal = () => {
    setShowErrorPrevention(false); // Reset showErrorPrevention when the modal is closed
  };

  return (
    <div className='recordingPage'>
      <Header
        variant={'phoneM'}
        title='Recording'
      />

      {/* Placeholder */}
      <div className='recordingArea'>
        <img 
          src="https://via.placeholder.com/600x300?text=Recording+in+Progress" 
          alt="Recording in progress" 
          className='placeholderImageArea' 
        />
      </div>

      <Button
        icon={NoIcon}
        label="End Recording"
        onClick={handleEndClick}
        variant="red"
      />

      <PoseDetection/>
      {showErrorPrevention && (
        <ErrorPrevention
          text="Are you sure you want to end the recording?"
          type="error"
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default Recording;
