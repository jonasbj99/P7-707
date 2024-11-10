import React from 'react';
import styles from './Header.module.scss';

type HeaderProps = {
  title?: string;
  paragraph?: string;
  variant: 'phoneS' | 'phoneM' | 'phoneL' | 'desktopS' | 'desktopM'
};

function Header({ title, paragraph, variant = 'phoneS'}: HeaderProps) {
  return (
    <div className={styles.headerContainer}>
       <h1 className={`${styles.titleHeader} ${styles[variant]}`}>{title}</h1>
      <p>{paragraph}</p>
    </div>
  );
}

export default Header;
