import React from 'react'
import styles from './Footer.module.scss';
import logoBlack from "../../assets/img/logo-black.svg"
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../../hooks/useWindowWidth';

export const Footer: React.FC = () => {
  const [width] = useWindowWidth();
  return (
    <div className={styles.footer__main}>
      {width > 809 ?
      (<>
        <div className={styles.footer__contactInfo}>
            <img src={logoBlack} alt="logo-black" />
            <div className={styles.footer__blockInfo}>
                <p className={styles.footer__number}>+49 199 99 99 99</p>
                <p className={styles.footer__email}>World_of_Pizza@gmail.com</p>
            </div>
        </div >
        <div className={styles.footer__nav}>
            <Link to="/World-of-Pizza">Choose Pizza</Link>
            <Link to="/World-of-Pizza/about">About</Link>
            <Link to="/World-of-Pizza/contacts">Contacts</Link>
            <div className={styles.footer__text}><p> World of Pizza © 2023</p>
            </div>
        </div>
      </>
     ):  (
     <>
      <div className={styles.footer__nav}>
          <Link to="/World-of-Pizza">Choose Pizza</Link>
          <Link to="/World-of-Pizza/about">About</Link>
          <Link to="/World-of-Pizza/contacts">Contacts</Link>
      </div>
      <div className={styles.footer__contactInfo}>
          <img src={logoBlack} alt="logo-black" />
          <div className={styles.footer__blockInfo}>
              <p className={styles.footer__number}>+49 199 99 99 99</p>
              <p className={styles.footer__email}>World_of_Pizza@gmail.com</p>
          </div>
      </div>
      <div className={styles.footer__text}><p> World of Pizza © 2023</p>
      </div>
     </>
      )}
        
    </div>
  )
}

