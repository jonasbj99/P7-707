import React from 'react';
import styles from './Header.module.scss';

type HeaderProps = {
  title?: string;
  paragraph?: string;
};

function Header({ title, paragraph }: HeaderProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{paragraph}</p>
    </div>
  );
}

export default Header;
