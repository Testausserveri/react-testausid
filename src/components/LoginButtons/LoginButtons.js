/* eslint-global fetch */
import styles from './LoginButtons.module.css'

import React, { useRef, useState, useEffect } from 'react'
import { FaDiscord, FaGoogle, FaTwitter, FaGithub } from 'react-icons/fa'

import testausserveri from '../../assets/providers/testausserveri.svg'
import wilmaplus from '../../assets/providers/wilmaplus.svg'
import { getMethods, login, redirectToLogin } from '../../util/Login'

const loginProviderIcons = {
  discord: <FaDiscord />,
  google: <FaGoogle />,
  twitter: <FaTwitter />,
  github: <FaGithub />,
  members: <img src={testausserveri.src || testausserveri} />,
  wilmaplus: (
    <img src={wilmaplus.src || wilmaplus} style={{ transform: 'scale(1.3)' }} />
  )
}

function LoginButton({ data, onClick }) {
  if (!data) return <li>Tuntematon</li>
  if (data.loading) return <li>&nbsp;</li>
  const ripple = useRef()
  const [size, setSize] = useState(0)

  function onMouseMove(e) {
    const rect = e.target.getBoundingClientRect()
    ripple.current.style.top = `${e.clientY - rect.top - 50}px`
    ripple.current.style.left = `${e.clientX - rect.left - 50}px`
  }
  function onTouchMove(e) {
    const rect = e.target.getBoundingClientRect()
    const touch = e.touches[0]
    ripple.current.style.top = `${touch.clientY - rect.top - 50}px`
    ripple.current.style.left = `${touch.clientX - rect.left - 50}px`
  }

  const Icon =
    loginProviderIcons[data.name.toLowerCase().replace(/ /g, '')] ?? '?'

  return (
    <li
      onMouseLeave={() => setSize(0)}
      onMouseEnter={() => setSize(1)}
      onMouseDown={() => setSize(1.2)}
      onMouseUp={() => setSize(1)}
      onTouchStart={() => setSize(1)}
      onTouchEnd={() => setSize(0)}
      onTouchMove={(e) => onTouchMove(e)}
      onClick={() => {
        setSize(0)
        onClick()
      }}
      onMouseMove={(e) => onMouseMove(e)}
    >
      <span>{Icon}</span>
      <span>{data.name}</span>
      <div ref={ripple} className={styles.ripple} style={{ '--size': size }} />
    </li>
  )
}

/**
 * @param {{ accept: string[] }} param0 Either method IDs or names
 */
export function LoginButtons({
  accept,
  client,
  scopes,
  callback,
  onBlocked,
  onlyToken,
  mode,
  redirectURI
}) {
  // Fetch login methods
  const [data, setData] = useState(Array(6).fill({ loading: true }))
  useEffect(() => {
    if (!accept) {
      accept = (
        new URL(window.location).searchParams.get('methods') ?? '*'
      ).split(',')
    }

    // Set available methods
    getMethods().then((methods) => {
      setData(
        accept[0] !== '*' // eslint-disable-next-line prettier/prettier
          ? methods.filter((method) => accept.includes(method.id) || accept.includes(method.name.replace(/ /g, "").toLowerCase()))
          : methods
      )
    })
  }, [])

  return (
    <div className={styles.loginButtons}>
      <ul>
        {data.map((method, index) => (
          <LoginButton
            key={index}
            data={method}
            onClick={async () => {
              if (window.location.host === 'id.testausserveri.fi') {
                // Use redirect login while displaying on the main login page
                redirectToLogin(method.id)
              } else {
                // Login
                // TODO: onBlocked logic
                const loginResult = await login(
                  method.id,
                  client,
                  scopes,
                  onlyToken,
                  mode,
                  redirectURI
                )
                callback(loginResult)
              }
            }}
          />
        ))}
      </ul>
    </div>
  )
}
