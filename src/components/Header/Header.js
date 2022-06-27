import styles from './Header.module.css'
import logo from '../../assets/logo.svg'

import React from 'react'
import { MdKeyboardBackspace } from 'react-icons/md'

export function Header({ onClose }) {
  return (
    <div className={styles.header}>
      {onClose ? (
        <button onClick={onClose}>
          <MdKeyboardBackspace />
        </button>
      ) : null}
      <div className={styles.logo}>
        <img src={logo.src || logo} alt='logo' />
      </div>
    </div>
  )
}
