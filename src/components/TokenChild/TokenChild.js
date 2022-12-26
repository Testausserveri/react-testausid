/* globals CustomEvent */

import React from 'react'

/**
 * A secondary component that should live in it's dedicated page.
 * It supplies token data to a parent page in case the "tab" method of displaying the method login is used
 */
export function TokenChild() {
  // First we test if this is the child
  if (window.opener) {
    try {
      const callbackEvent = new CustomEvent('testausid-callback', {
        detail: new URLSearchParams(window.location.search).searchParams.get(
          'token'
        )
      })
      window.opener.dispatchEvent(callbackEvent)
      window.close()
    } catch (e) {
      console.debug('react-testausid failed to send callback data', e)
      throw new Error('Failed to send callback data to parent page')
    }
  }
  return <></>
}
