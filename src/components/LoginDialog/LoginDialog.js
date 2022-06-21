import React from 'react'
import styles from './LoginDialog.module.css'

import { Header } from '../Header/Header'
import { Target } from '../Target/Target'
import { Instruction } from '../Instruction/Instruction'
import { LoginButtons } from '../LoginButtons/LoginButtons'
import { Permissions } from '../Permissions/Permissions'

export function LoginDialog({ target, accept }) {
  return (
    <div className={styles.loginDialog}>
      <Header />
      <Target image={target.image} name={target.name} />
      <Instruction />
      <LoginButtons accept={accept} />
      <Permissions name={target.name} scopes={target.scopes} />
    </div>
  )
}
