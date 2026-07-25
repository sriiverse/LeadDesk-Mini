import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App.jsx'
import { AuthProvider } from '../contexts/AuthContext.jsx'
import LoadingScreen from './ui/LoadingScreen.jsx'

export default function Bootstrap() {
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 500)
    return () => window.clearTimeout(timer)
  }, [])

  if (booting) return <LoadingScreen />

  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  )
}
