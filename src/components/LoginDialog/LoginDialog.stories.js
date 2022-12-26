import React from 'react'

import { LoginDialog } from './LoginDialog'

export default {
  component: LoginDialog
}

const Template = (args) => <LoginDialog {...args} />

export const PopupMode = Template.bind({})
PopupMode.args = {
  accept: ['discord', 'google', 'twitter', 'github', 'members', 'wilmaplus'],
  target: {
    name: 'Torimies',
    image:
      'https://cdn.discordapp.com/avatars/746084561062068345/fa4ccd88f599bc6b890c8db7528f64b6.webp?width=702&height=702'
  },
  scopes: ['id', 'account', 'contact', 'security'],
  client: '181937620043556561658238287560538816854', // Add your client ID here!
  onlyToken: true // Do you want just the token or the user data?
}

export const TabMode = Template.bind({})
TabMode.args = {
  accept: ['discord', 'google', 'twitter', 'github', 'members', 'wilmaplus'],
  target: {
    name: 'Torimies',
    image:
      'https://cdn.discordapp.com/avatars/746084561062068345/fa4ccd88f599bc6b890c8db7528f64b6.webp?width=702&height=702'
  },
  scopes: ['id', 'account', 'contact', 'security'],
  client: '181937620043556561658238287560538816854', // Add your client ID here!
  onlyToken: true, // Do you want just the token or the user data?
  mode: 'tab',
  redirectURI: 'http://localhost:6006/?path=/story/tokenchild--primary'
}
