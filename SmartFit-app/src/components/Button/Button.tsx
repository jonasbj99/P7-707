import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  label: string;
  onClick: () => void;
  icon?: string;
}

function Button ({ label, onClick, icon }: ButtonProps)
{
  return (
    <button className={styles.button} onClick={onClick}>
     {icon && <img src={icon} alt="Button icon" className={styles.icon} />}
     {label}
    </button>
  );
};

export default Button;
