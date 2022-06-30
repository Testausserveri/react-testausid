import React from 'react'

import { LoginDialog } from './LoginDialog'

export default {
  component: LoginDialog
}

const Template = (args) => <LoginDialog {...args} />

export const Primary = Template.bind({})
Primary.args = {
  accept: ['discord', 'google', 'twitter', 'github', 'members', 'wilmaplus'],
  target: {
    name: 'Torimies',
    image:
      'https://cdn.discordapp.com/avatars/746084561062068345/fa4ccd88f599bc6b890c8db7528f64b6.webp?width=702&height=702',
    scopes: ['id', 'account', 'contact', 'security']
  },
  client: false // Add your client ID here!
}
