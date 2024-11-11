import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ErrorPrevention.module.scss';
import Button from '../Button/Button';
import HomeIcon from '../../assets/Home-icon.svg';

type ErrorPreventionProps = {
  text: string;
  type?: 'success' | 'error';
};

function ErrorPrevention({ text, type = 'error' }: ErrorPreventionProps) {
  const navigate = useNavigate();

  const handleHomeClick = () => { 
    navigate('/');
  };

  const handleYesClick = () => {
    navigate('/login');
  };

  const handleNoClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${styles[type]}`}>
        <p className={styles.text}>{text}</p>
        <div className={styles.buttons}>
          {type === 'success' ? (
            <Button 
              icon= {HomeIcon}
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
