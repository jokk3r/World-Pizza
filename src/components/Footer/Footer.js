import React from 'react'
import styles from './Footer.module.scss';
import logoBlack from "../../assets/img/logo-black.svg"
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../../hooks/useWindowWidth';

function Footer() {
  const {width} = useWindowWidth();
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
            <Link to="/">Choose Pizza</Link>
            <Link to="/about">About</Link>
            <Link to="contacts">Contacts</Link>
        </div>
        <div className={styles.footer__text}><p> World of Pizza © 2023</p>
        </div>
      </>
     ):  (
     <>
      <div className={styles.footer__nav}>
          <Link to="/">Choose Pizza</Link>
          <Link to="/about">About</Link>
          <Link to="contacts">Contacts</Link>
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

export default Footer