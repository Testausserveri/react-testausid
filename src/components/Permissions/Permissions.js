import styles from './Permissions.module.css'

import React from 'react'
import {
  MdOutlineShield,
  MdOutlineInfo,
  MdOutlinePermContactCalendar
} from 'react-icons/md'
import { TbLockAccess, TbSnowflake } from 'react-icons/tb'

const permissions = {
  token: {
    title: 'Pääsy tilillesi',
    description: 'Täysi pääsy käyttäjätilillesi, jota käytit kirjautumiseen',
    Icon: TbLockAccess
  },
  id: {
    title: 'Yksilöivä tunniste',
    description: 'Yksilöivä uniikki tunniste',
    Icon: TbSnowflake
  },
  account: {
    title: 'Julkiset tiedot',
    description: 'Yleiset tilitiedot kuten nimi ja profiilikuva',
    Icon: MdOutlineInfo
  },
  contact: {
    title: 'Yhteystiedot',
    description: 'Sähköposti ja/tai puhelinnumero',
    Icon: MdOutlinePermContactCalendar
  },
  security: {
    title: 'Turvallisuustiedot',
    description: 'Tilin turvallisuustietokonfiguraatio',
    Icon: MdOutlineShield
  }
}

function Permission({ data }) {
  if (!data) return <li>Tuntematon</li>
  return (
    <li>
      <span>
        <data.Icon />
      </span>
      <span>{data.title}</span>
    </li>
  )
}
export function Permissions({ scopes }) {
  return (
    <div className={styles.permissions}>
      <p>Torimies saa pääsyn seuraaviin tietoihin:</p>
      <ul>
        {scopes.map((scope) => (
          <Permission key={scope} data={permissions[scope]} />
        ))}
      </ul>
    </div>
  )
}
