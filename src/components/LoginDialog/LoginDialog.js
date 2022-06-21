import React from 'react'
import styles from './LoginDialog.module.css'

import { Header } from '../Header/Header'
import { Target } from '../Target/Target'
import { Instruction } from '../Instruction/Instruction'
import { LoginButtons } from '../LoginButtons/LoginButtons'
import { Permissions } from '../Permissions/Permissions'

export function LoginDialog() {
  const target = {
    name: 'Torimies',
    image:
      'https://cdn.discordapp.com/avatars/746084561062068345/fa4ccd88f599bc6b890c8db7528f64b6.webp?width=702&height=702',
    scopes: ['token', 'id', 'account', 'contact', 'security']
  }

  const accept = [
    'discord',
    'google',
    'twitter',
    'github',
    'testausserveri',
    'wilmaplus'
  ]

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
