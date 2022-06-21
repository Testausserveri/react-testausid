import styles from './Target.module.css'

import React from 'react'

export function Target() {
  return (
    <div className={styles.target}>
      <div className={styles.image}>
        <img src='https://cdn.discordapp.com/avatars/746084561062068345/fa4ccd88f599bc6b890c8db7528f64b6.webp?width=702&height=702' />
      </div>
      <div className={styles.name}>
        <h2>Torimies</h2>
      </div>
    </div>
  )
}
