/* eslint-global fetch */
import styles from './LoginButtons.module.css'
import OAuthHost from '../../util/OAuthHost'

import React, { useRef, useState, useEffect } from 'react'
import { FaDiscord, FaGoogle, FaTwitter, FaGithub } from 'react-icons/fa'

import testausserveri from '../../assets/providers/testausserveri.svg'
import wilmaplus from '../../assets/providers/wilmaplus.svg'

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

async function popOpenLogin(method, client, scopes) {
  // Popup settings
  const settings = {
    menubar: false,
    toolbar: false,
    location: false,
    status: false,
    resizable: false,
    width: 500,
    height: 800
  }

  const params = Object.keys(settings)
    .map((key) => `${key}=${settings[key]}`)
    .join(',')

  const authenticateRequest = await fetch(
    `${OAuthHost}/api/v1/authenticate?client_id=${client}&scope=${scopes}&redirect_uri=${window.location.origin}&response_type=token&noRedirect`
  )
  if (authenticateRequest.status !== 200)
    throw new Error(
      'Unable to begin popup session. Make sure this origin is an allowed redirect URI.'
    )

  const redirectId = (await authenticateRequest.text())
    .split('state=')[1]
    .split('&')[0]

  const popup = window.open(
    `${OAuthHost}/api/v1/login?state=${redirectId}&method=${method.id}`,
    'Kirjaudu...',
    params
  )
  // TODO: Cover/disable action on main page
  await new Promise((resolve) => {
    const interval = setInterval(() => {
      try {
        if (popup.window.location.href.includes('token=')) {
          clearInterval(interval)
          resolve()
        }
      } catch (_) {}
    }, 500)
  })
  popup.close()
  const token = popup.window.location.href.split('token=')[1].split('&')[0]
  const user = await (
    await fetch(`${OAuthHost}/api/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  ).json()
  // TODO: Implement callback to UI
  // eslint-disable-next-line no-undef
  alert(JSON.stringify(user))
}

/**
 * @param {{ accept: string[] }} param0 Either method IDs or names
 */
export function LoginButtons({ accept, client, scopes }) {
  // Fetch login methods
  const [data, setData] = useState(Array(6).fill({ loading: true }))
  useEffect(() => {
    if (!accept) {
      accept = (
        new URL(window.location).searchParams.get('methods') ?? '*'
      ).split(',')
    }

    fetch('https://id.testausserveri.fi/api/v1/methods')
      .then((methods) => methods.json())
      .then((methods) =>
        setData(
          accept[0] !== '*' // eslint-disable-next-line prettier/prettier
            ? methods.filter((method) => accept.includes(method.id) || accept.includes(method.name.replace(/ /g, "").toLowerCase()))
            : methods
        )
      )
  }, [])

  return (
    <div className={styles.loginButtons}>
      <ul>
        {data.map((method, index) => (
          <LoginButton
            key={index}
            data={method}
            onClick={() => {
              if (window.location.host === 'id.testausserveri.fi') {
                // Use redirect login
                window.location.href.replace(
                  `/api/v1/login?state=${new URL(
                    window.location
                  ).searchParams.get('state')}&method=${method.id}`
                )
              } else {
                // Use popup login
                popOpenLogin(method, client, scopes)
              }
            }}
          />
        ))}
      </ul>
    </div>
  )
}
