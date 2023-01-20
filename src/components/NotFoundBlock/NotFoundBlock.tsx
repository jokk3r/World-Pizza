import React from 'react'
import styles from './NotFoundBlock.module.scss';
import error from './../../assets/img/404error.png'
import { Link } from 'react-router-dom';

const NotFoundBlock: React.FC = ()=> {
  return (
    <div className={styles.root}>
        <img src={error} alt="error" />
        <h3 className={styles.header}> Page not found</h3>
        <p className={styles.description}>Sorry, page you were looking for does not exist</p>
        <Link to="/World-of-Pizza">
          <div className="button about__button">Choose pizza</div>
        </Link>
    </div>
  )
}

export default NotFoundBlock