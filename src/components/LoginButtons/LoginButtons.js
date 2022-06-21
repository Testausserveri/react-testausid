import styles from './LoginButtons.module.css'

import React from 'react'
import { FaDiscord } from 'react-icons/fa'

export function LoginButtons() {
  return (
    <div className={styles.loginButtons}>
      <ul>
        <li>
          <span>
            <FaDiscord />
          </span>
          <span>Discord</span>
        </li>
        <li>
          <span>
            <FaDiscord />
          </span>
          <span>Discord</span>
        </li>
        <li>
          <span>
            <FaDiscord />
          </span>
          <span>Discord</span>
        </li>
        <li>
          <span>
            <FaDiscord />
          </span>
          <span>Discord</span>
        </li>
      </ul>
    </div>
  )
}
