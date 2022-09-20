import React from 'react'

import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <div className={styles.root}>
        <h1>
            <span>&#128533;</span>
            <br />
            nothing found
        </h1>
        <p className={styles.description}>Unfortunately, this page was not found on our website</p>
    </div>
  )
}

export default NotFoundBlock