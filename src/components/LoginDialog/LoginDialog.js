import React from 'react'
import styles from './LoginDialog.module.css'
import logo from '../../assets/logo.svg'
import { MdKeyboardBackspace, MdOutlineShield, MdOutlineInfo } from 'react-icons/md'
import { FaDiscord } from 'react-icons/fa'

export function LoginDialog() {
  // eslint-disable-next-line prettier/prettier
  return (
    <div className={styles.loginDialog}>
      <div className={styles.header}>
        <button>
          <MdKeyboardBackspace />
        </button>
        <div className={styles.logo}>
          <img src={logo} alt='logo' />
        </div>
      </div>
      <div className={styles.target}>
        <div className={styles.image}>
          <img src='https://cdn.discordapp.com/avatars/746084561062068345/fa4ccd88f599bc6b890c8db7528f64b6.webp?width=702&height=702' />
        </div>
        <div className={styles.name}>
          <h2>Torimies</h2>
        </div>
      </div>
      <div className={styles.instruction}>
        <p>Kirjaudu sisään seuraavien vaihtoehtojen avulla</p>
      </div>
      <div className={styles.loginButtons}>
        <ul>
          <li>
            <span>
              <FaDiscord />
            </span>
            <span>Discord</span>
          </li>
          <li>
            <span>
              <FaDiscord />
            </span>
            <span>Discord</span>
          </li>
          <li>
            <span>
              <FaDiscord />
            </span>
            <span>Discord</span>
          </li>
          <li>
            <span>
              <FaDiscord />
            </span>
            <span>Discord</span>
          </li>
        </ul>
      </div>
      <div className={styles.permissions}>
        <p>
          Torimies saa pääsyn seuraaviin tietoihin:
        </p>
        <ul>
          <li>
            <span>
              <MdOutlineShield />
            </span>
            <span>Turvallisuustiedot</span>
          </li>
          <li>
            <span>
              <MdOutlineInfo />
            </span>
            <span>Julkiset tiedot</span>
          </li>
          <li>
            <span>
              <MdOutlineShield />
            </span>
            <span>Turvallisuustiedot</span>
          </li>
          <li>
            <span>
              <MdOutlineInfo />
            </span>
            <span>Julkiset tiedot</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
