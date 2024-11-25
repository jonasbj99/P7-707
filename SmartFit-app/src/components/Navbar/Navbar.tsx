import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import loginIcon from '../../assets/Log-icon.svg';

type NavbarProps = {
  logoImg: string;
  logoAlt: string;
};

function Navbar({ logoImg, logoAlt }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/home">
          <img src={logoImg} alt={logoAlt} className={styles.logoImage} />
        </Link>
      </div>

      {/*Burger menu lines*/}
      <div className={styles.burger} onClick={toggleMenu}>
        <span className={`${styles.line} ${menuOpen ? styles.lineOpen : ''}`}></span>
        <span className={`${styles.line} ${menuOpen ? styles.lineOpen : ''}`}></span>
        <span className={`${styles.line} ${menuOpen ? styles.lineOpen : ''}`}></span>
      </div>

      {/*Menu links*/}
      <nav className={`${styles.navLinks} ${menuOpen ? styles.menuOpen : ''}`}>
        <Link to="/start-workout">
          <img src={loginIcon} alt="Login Icon" className={styles.icon} /> Start workout
        </Link>
        <Link to="/logs">
          <img src={loginIcon} alt="Login Icon" className={styles.icon} /> Logs
        </Link>
        <Link to="/home">
          <img src={loginIcon} alt="Login Icon" className={styles.icon} /> Profile
        </Link>
        <Link to="/" className={styles.logoutButton}>
          <img src={loginIcon} alt="Login Icon" className={styles.icon} /> Log out
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
