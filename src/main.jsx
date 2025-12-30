import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import App from './App'
import { supabase } from './utils/supabase'

// Handle OAuth callback BEFORE React app mounts
// This is necessary because HashRouter conflicts with Supabase OAuth fragments
const handleAuthCallback = async () => {
  const hash = window.location.hash

  // Check if this is an OAuth callback (has access_token in hash)
  if (hash && hash.includes('access_token')) {
    console.log('OAuth callback detected, processing tokens...')

    // Parse the hash to extract auth tokens
    // The URL looks like: http://localhost:5173#access_token=xxx&expires_in=3600&...
    const hashParams = new URLSearchParams(hash.substring(1)) // Remove the #
    const accessToken = hashParams.get('access_token')
    const refreshToken = hashParams.get('refresh_token')

    if (accessToken) {
      try {
        // Set the session manually using the tokens from the URL
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || ''
        })

        if (error) {
          console.error('Error setting session:', error)
          window.location.hash = '#/signin'
        } else if (data.session) {
          console.log('Session established for:', data.session.user.email)
          // Redirect to dashboard with clean URL
          window.location.hash = '#/dashboard'
        }
      } catch (err) {
        console.error('Error processing OAuth callback:', err)
        window.location.hash = '#/signin'
      }
    }
  }
}

// Handle auth callback then render app
handleAuthCallback().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})