/* eslint-disable import/first */
import React from 'react'
import ReactDOM from 'react-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './App'
import './styles/index.scss'

const possibleScopes = [
  'write:sources',
  'read:sources',
  'read:dataModels',
  'write:dataModels',
]

const auth0Domain = process.env.AUTH0_DOMAIN as string
const clientId = process.env.AUTH0_CLIENT_ID as string
const auth0ApiAudience = process.env.AUTH0_API_AUDIENCE as string

ReactDOM.render(
  <Auth0Provider
    domain={auth0Domain}
    clientId={clientId}
    audience={auth0ApiAudience}
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
    scope={possibleScopes.join(' ')}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root'),
)
