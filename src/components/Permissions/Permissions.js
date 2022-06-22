import styles from './Permissions.module.css'

import React from 'react'
import {
  MdOutlineShield,
  MdOutlineInfo,
  MdOutlinePermContactCalendar
} from 'react-icons/md'
import { TbLockAccess, TbSnowflake } from 'react-icons/tb'
import Tippy from '@tippyjs/react'
// import 'tippy.js/dist/tippy.css'

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
    <Tippy className={styles.tip} content={data.description}>
      <li>
        <span>
          <data.Icon />
        </span>
        <span>{data.title}</span>
      </li>
    </Tippy>
  )
}
export function Permissions({ name, scopes }) {
  return (
    <div className={styles.permissions}>
      <p>{name} saa pääsyn seuraaviin tietoihin:</p>
      <ul>
        {scopes.map((scope) => (
          <Permission key={scope} data={permissions[scope]} />
        ))}
      </ul>
    </div>
  )
}
