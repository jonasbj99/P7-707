import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  label: string;
  onClick: () => void;
  icon?: string;
  variant: 'orange' | 'red' | 'blue' | 'dark' | 'outline'; 
  size?: 'default' | 'small'; 
}

function Button ({ label, onClick, icon, variant = 'orange', size = 'default'  }: ButtonProps)
{
  const buttonClass = `${styles.button} ${styles[variant]} ${size === 'small' ? styles.small : ''}`;
  return (
    <button className={buttonClass}  onClick={onClick}>
     {icon && <img src={icon} alt="Button icon" className={styles.icon} />}
     {label}
    </button>
  );
};

export default Button;
