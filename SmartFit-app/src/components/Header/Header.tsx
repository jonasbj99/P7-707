import React from 'react';
import styles from './Header.module.scss';

type HeaderProps = {
  title?: string;
  paragraph?: string;
  headerHeight?: string; 
};

function Header({ title, paragraph, headerHeight = 'auto'}: HeaderProps) {
  return (
    <div className={styles.headerContainer}>
       <h1 style={{ height: headerHeight }}>{title}</h1>
      <p>{paragraph}</p>
    </div>
  );
}

export default Header;
