import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ErrorPrevention.module.scss';
import Button from '../Button/Button';
import HomeIcon from '../../assets/Home-icon.svg';

type ErrorPreventionProps = {
  text: string;
  type?: 'success' | 'error';
  onClose?: () => void;
};

function ErrorPrevention({ text, type = 'error', onClose }: ErrorPreventionProps) {
  const navigate = useNavigate();

  const handleHomeClick = () => { 
    navigate('/home');
  };

  const handleYesClick = () => {
    navigate('/set');
  };

  const handleNoClick = () => {
    if (onClose) onClose(); // Call onClose prop to notify the parent component to hide the modal
  };

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${styles[type]}`}>
        <p className={styles.text}>{text}</p>
        <div className={styles.buttons}>
          {type === 'success' ? (
            <Button 
              icon={HomeIcon}
              label="HomePage" 
              onClick={handleHomeClick} 
              variant="orange" 
              size="default" 
            />
          ) : (
            <>
              <Button 
                label="Yes" 
                onClick={handleYesClick} 
                variant="blue" 
                size="small" 
              />
              <Button 
                label="No" 
                onClick={handleNoClick} 
                variant="outline" 
                size="small" 
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorPrevention;
