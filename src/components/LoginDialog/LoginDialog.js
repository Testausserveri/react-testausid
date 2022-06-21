import React from 'react'
import styles from './LoginDialog.module.css'

import { Header } from '../Header/Header'
import { Target } from '../Target/Target'
import { Instruction } from '../Instruction/Instruction'
import { LoginButtons } from '../LoginButtons/LoginButtons'
import { Permissions } from '../Permissions/Permissions'

export function LoginDialog() {
  // eslint-disable-next-line prettier/prettier
  return (
    <div className={styles.loginDialog}>
      <Header />
      <Target />
      <Instruction />
      <LoginButtons />
      <Permissions />
    </div>
  )
}
