import styles from './LoginButtons.module.css'

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

function LoginButton({ data }) {
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
      onClick={() => setSize(0)}
      onMouseMove={(e) => onMouseMove(e)}
    >
      <span>{Icon}</span>
      <span>{data.name}</span>
      <div ref={ripple} className={styles.ripple} style={{ '--size': size }} />
    </li>
  )
}

export function LoginButtons({ setLoginState }) {
  // Fetch login methods
  const [data, setData] = useState(Array(6).fill({ loading: true }))
  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch('https://id.testausserveri.fi/api/v1/methods')
      .then((methods) => methods.json())
      .then((methods) => setData(methods))
  }, [])

  const loginDummy = () =>
    setLoginState({ state: 'logged in', data: { sub: 'dummy' } })

  return (
    <div className={styles.loginButtons}>
      <ul>
        {data.map((method, index) => (
          <LoginButton onClick={loginDummy} key={index} data={method} />
        ))}
      </ul>
    </div>
  )
}
