import React, { useState, useEffect } from 'react'
import styles from './LoginDialog.module.css'

import { Header } from '../Header/Header'
import { Target } from '../Target/Target'
import { Instruction } from '../Instruction/Instruction'
import { LoginButtons } from '../LoginButtons/LoginButtons'
import { Permissions } from '../Permissions/Permissions'
import dummy from '../../util/dummy'
import OAuthHost from '../../util/OAuthHost'

export function LoginDialog({ onClose, target, accept, onClick, client }) {
  const [application, setApplication] = useState({})
  useEffect(() => {
    // Fetch the application information
    // TODO: Somehow display home URL?
    if (target && !client)
      setApplication({
        target: target.name,
        image: target.image
      })
    else {
      // eslint-disable-next-line no-undef
      fetch(
        // eslint-disable-next-line prettier/prettier
        `${OAuthHost}/api/v1/application?client_id=${client ?? new URL(window.location.href).searchParams.get('client_id')}`
      )
        .then((res) => res.json())
        .then((res) =>
          setApplication({
            target: res.name, // Cannot be .name
            image: res.icon !== '' ? res.icon : dummy()
          })
        )
    }
  }, [])
  return (
    <div className={styles.loginDialog} onClick={onClick}>
      <Header onClose={onClose} />
      <Target image={application.image} name={application.target} />
      <Instruction />
      <LoginButtons
        accept={accept}
        client={client}
        scopes={
          target.scopes ?? // eslint-disable-next-line prettier/prettier
          (new URL(window.location.href).searchParams.get('scope') ?? '').split(',')} />
      <Permissions
        name={application.target}
        scopes={
          target.scopes ?? // eslint-disable-next-line prettier/prettier
          (new URL(window.location.href).searchParams.get('scope') ?? '').split(',')
        }
      />
    </div>
  )
}
