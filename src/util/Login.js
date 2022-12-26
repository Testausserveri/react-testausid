import OAuthHost from './OAuthHost'

/**
 * Get login methods
 * @returns {Promise<{ id: string, name: string }[]>}
 */
export async function getMethods() {
  try {
    return await (await fetch(`${OAuthHost}/api/v1/methods`)).json()
  } catch (e) {
    console.debug('react-testausid getMethods', e)
    throw new Error('Failed to fetch available login methods')
  }
}

/**
 * Redirect to login method page
 * @param {string} methodId
 */
export async function redirectToLogin(methodId) {
  const state = new URL(window.location).searchParams.get('state')
  if (!state)
    throw new Error('Current URL does not include the login state code')
  window.location.href.replace(
    `/api/v1/login?state=${encodeURIComponent(
      state
    )}&method=${encodeURIComponent(methodId)}`
  )
}

/**
 * Open login popup
 * @param {string} methodId
 * @param {string} redirectId
 * @returns {Promise<false|string>} In case of "false", an error ocurred
 */
async function openLoginPopup(methodId, redirectId) {
  const settings = {
    menubar: false,
    toolbar: false,
    location: false,
    status: false,
    resizable: true,
    width: 500,
    height: 800
  }

  const params = Object.keys(settings)
    .map((key) => `${key}=${settings[key]}`)
    .join(',')

  const popup = window.open(
    `${OAuthHost}/api/v1/login?state=${redirectId}&method=${methodId}`,
    'Login ...',
    params
  )

  // Check if popup was allowed
  if (!popup || typeof popup.closed === 'undefined' || popup.closed)
    return false

  // Wait for token
  await new Promise((resolve) => {
    const interval = setInterval(() => {
      try {
        if (popup?.window?.location?.href.includes('token=')) {
          clearInterval(interval)
          resolve()
        }
      } catch (_) {}
    }, 300)
  })

  // Close popup and fetch token
  const popupParams = new URLSearchParams(popup.window.location.search)
  popup.close()
  return popupParams.get('token')
}

/**
 * Open login tab
 * @param {string} methodId
 * @param {string} redirectId
 * @returns {Promise<false|string>} In case of "false", an error ocurred
 */
async function openLoginPage(methodId, redirectId) {
  // Open a new tab
  const tab = window.open(
    `${OAuthHost}/api/v1/login?state=${redirectId}&method=${methodId}`,
    'Login ...'
  )

  let result = null

  await new Promise((resolve) => {
    // Check if tab is closed
    let cleared = false
    const interval = setInterval(() => {
      try {
        if (tab?.closed === true) {
          cleared = true
          clearInterval(interval)
          if (result === null) {
            result = false
            resolve()
          }
        }
      } catch (_) {}
    }, 300)

    // Wait for callback data
    window.addEventListener('testausid-callback', (e) => {
      if (result === null) {
        result = e.detail
        if (!cleared) clearInterval(interval)
        resolve()
      }
    })
  })

  return result
}

async function fetchUser(token) {
  return await (
    await fetch(`${OAuthHost}/api/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  ).json()
}

export async function login(
  methodId,
  client,
  scopes,
  onlyToken,
  mode,
  redirectURI
) {
  // Create authenticate request
  const authenticateRequest = await fetch(
    `${OAuthHost}/api/v2/authenticate?client_id=${client}&scope=${scopes}&redirect_uri=${
      mode === 'tab' ? encodeURIComponent(redirectURI) : window.location.origin
    }&response_type=token&noRedirect`
  )
  if (authenticateRequest.status !== 200)
    throw new Error(
      'Unable to begin login session. Make sure this origin is an allowed redirect URI'
    )

  // Get redirect id
  const responseParams = new URLSearchParams(await authenticateRequest.text())
  const redirectId = responseParams.get('state')

  // Display login
  let loginResult

  if (mode === 'popup-only') {
    // Only do popup
    loginResult = await openLoginPopup(methodId, redirectId)
    if (loginResult === false) return null
  } else if (mode === 'prefer-popup') {
    // Do popup and fallback to redirect to tab
    loginResult = await openLoginPopup(methodId, redirectId)
    if (loginResult === false)
      return login(methodId, client, scopes, onlyToken, 'tab', redirectURI)
  } else if (mode === 'tab') {
    // Open new tab
    loginResult = await openLoginPage(methodId, redirectId)
    if (loginResult === false) return null
  }

  // Return only the token, if that is preferred
  if (onlyToken) return { token: loginResult }

  // Fetch user info
  return fetchUser(loginResult)
}
