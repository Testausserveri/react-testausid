import styles from './Header.module.css'
import logo from '../../assets/logo.svg'

import React from 'react'
import { MdKeyboardBackspace } from 'react-icons/md'

export function Header() {
  return (
    <div className={styles.header}>
      <button>
        <MdKeyboardBackspace />
      </button>
      <div className={styles.logo}>
        <img src={logo.src || logo} alt='logo' />
      </div>
    </div>
  )
}
