import React from 'react';
import styles from './Header.module.scss';

type HeaderProps = {
  title?: string;
  paragraph?: string | JSX.Element;
  variant: 'phoneS' | 'phoneM' | 'phoneL';
};

function Header({ title, paragraph, variant = 'phoneS' }: HeaderProps) {
  return (
    <div className={styles.headerContainer}>
      <h1 className={`${styles.titleHeader} ${styles[variant]}`}>{title}</h1>
      <p className={styles.headerParagraph}>{paragraph}</p>
    </div>
  );
}

export default Header;
