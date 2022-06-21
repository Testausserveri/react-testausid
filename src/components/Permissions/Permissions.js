import styles from './Permissions.module.css'

import React from 'react'
import { MdOutlineShield, MdOutlineInfo } from 'react-icons/md'

export function Permissions() {
  return (
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
  )
}
