import React, { useState, useEffect } from 'react'
import styles from './LoginDialog.module.css'

import { Header } from '../Header/Header'
import { Target } from '../Target/Target'
import { Instruction } from '../Instruction/Instruction'
import { LoginButtons } from '../LoginButtons/LoginButtons'
import { Permissions } from '../Permissions/Permissions'
import dummy from '../../util/dummy'
import OAuthHost from '../../util/OAuthHost'

/**
 * @typedef User
 * @property {string?} token User account access token
 * @property {string?} id User account id
 * @property {string?} name User account name
 * @property {{ avatar: string?, color: string?, createdAt: string?, language: string? }} account User account details
 * @property {{ has2FA: boolean?, hasSMSBackup: boolean? }} security User account security details
 * @property {{ email: string?, phone: string? }} contact User contact details
 * @property {string[]} scopes Array of scopes
 * @property {string} applicationId Testausid client id
 * @property {{ id: string, name: string }} platform OAuth platform information
 */

/**
 * @callback onLoginFunction
 * @param {User} user
 */

/**
 * @callback onBlockedFunction
 * @param {Error} error
 */

/**
 * @typedef LoginDialog
 * @property {Function} onClose Function triggered when the dialog close event is emitted
 * @property {*} target (DEV) Storybook manual login target data
 * @property {*} accept (DEV) Storybook manual login methods accepted
 * @property {*} onClick (DEV) Storybook manual login methods click event emitted
 * @property {string[]} scopes Testausid login scopes
 * @property {string} client Your Testausid client ID
 * @property {onLoginFunction} onLogin Function triggered when the user has logged in successfully
 * @property {onBlockedFunction} onBlocked Function triggered if the browser blocks the login process
 * @property {boolean?} onlyToken Should the login return only the TestausID login token without user information (useful for passing-on to a backend component)
 * @property {"prefer-popup"|"popup-only"|"tab"} mode Which way of displaying the login we should use
 * @property {string} redirectURI Where to redirect new login tab, incase mode is "tab" or "prefer-popup"
 */

/**
 * [ REACT-TESTAUSID-COMPONENT ] Main login component
 * @param {LoginDialog} param0
 * @returns {JSX.IntrinsicElements.div}
 */
export function LoginDialog({
  onClose,
  target,
  accept,
  onClick,
  scopes,
  client,
  onLogin,
  onBlocked,
  onlyToken,
  mode,
  redirectURI
}) {
  const [application, setApplication] = useState({})
  useEffect(() => {
    // Fetch the application information
    // TODO: Somehow display home URL?
    if (target !== undefined && !client)
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
  }, {})

  const loginCallback = (user) => {
    // Basic wrapper for now
    if (typeof onLogin === 'function') onLogin(user)
    else if (onLogin !== undefined)
      throw new Error(
        `Invalid onLogin parameter. Expected "function" got "${typeof onLogin}".`
      )
    else
      console.warn(
        "Missing onLogin parameter in a react-testausid component, account data won't be supplied anywhere.",
        user
      )
  }
  return (
    <div className={styles.loginDialog} onClick={onClick}>
      <Header onClose={onClose} />
      <Target image={application.image} name={application.target} />
      <Instruction />
      <LoginButtons
        accept={accept}
        client={client}
        callback={loginCallback}
        onBlocked={onBlocked}
        onlyToken={onlyToken}
        scopes={
          scopes ?? // eslint-disable-next-line prettier/prettier
          (new URL(window.location.href).searchParams.get('scope') ?? '').split(',')}
        mode={mode ?? 'popup-only'} // Has to default to popup-only
        redirectURI={redirectURI}
      />
      <Permissions
        name={application.target}
        scopes={
          scopes ?? // eslint-disable-next-line prettier/prettier
          (new URL(window.location.href).searchParams.get('scope') ?? '').split(',')
        }
      />
    </div>
  )
}
