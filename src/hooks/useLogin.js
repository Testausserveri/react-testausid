import React, { useState } from 'react'
import { LoginDialog } from '../components/LoginDialog/LoginDialog.js'

export default function useLogin() {
  const [loginState, setLoginState] = useState({
    state: 'logged out'
  })

  return [
    // eslint-disable-next-line react/jsx-key
    (props) => (
      <LoginDialog
        {...props}
        setLoginState={setLoginState}
        loginState={loginState}
      />
    ),
    loginState
  ]
}
