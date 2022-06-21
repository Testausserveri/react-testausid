import styles from './Target.module.css'

import React from 'react'

export function Target({image, name}) {
  return (
    <div className={styles.target}>
      <div className={styles.image}>
        <img src={image} />
      </div>
      <div className={styles.name}>
        <h2>{name}</h2>
      </div>
    </div>
  )
}
