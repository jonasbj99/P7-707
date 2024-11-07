import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  label: string;
  onClick: () => void;
  icon?: string;
  variant: 'orange' | 'red' | 'blue' | 'dark'; 
}

function Button ({ label, onClick, icon, variant = 'orange'  }: ButtonProps)
{
  return (
    <button className={`${styles.button} ${styles[variant]}`}  onClick={onClick}>
     {icon && <img src={icon} alt="Button icon" className={styles.icon} />}
     {label}
    </button>
  );
};

export default Button;
