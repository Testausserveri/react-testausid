import styles from './LoginButtons.module.css'

import React, { useRef, useState } from 'react'
import { FaDiscord, FaGoogle, FaTwitter, FaGithub } from 'react-icons/fa'

import testausserveri from '../../assets/providers/testausserveri.svg'
import wilmaplus from '../../assets/providers/wilmaplus.svg'


const loginProviders = {
  discord: {
    title: 'Discord',
    Icon: FaDiscord
  },
  google: {
    title: 'Google',
    Icon: FaGoogle
  },
  twitter: {
    title: 'Twitter',
    Icon: FaTwitter
  },
  github: {
    title: 'GitHub',
    Icon: FaGithub
  },
  testausserveri: {
    title: 'Jäsenet',
    Icon: () => <img src={testausserveri} />
  },
  wilmaplus: {
    title: 'Wilma Plus',
    Icon: () => <img src={wilmaplus} style={{ transform: 'scale(1.3)' }} />
  }
}

function LoginButton({ data }) {
  if (!data) return <li>Tuntematon</li>

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
      onMouseMove={(e) => onMouseMove(e)}>
      <span>
        <data.Icon />
      </span>
      <span>{data.title}</span>
      <div ref={ripple} className={styles.ripple} style={{ '--size': size }} />
    </li>
  )
}

export function LoginButtons({ accept }) {
  return (
    <div className={styles.loginButtons}>
      <ul>
        {accept.map((provider) => (
          <LoginButton key={provider} data={loginProviders[provider]} />
        ))}
      </ul>
    </div>
  )
}
