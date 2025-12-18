import { useState, useEffect } from 'react'

export const useSystemDiagnosis = () => {
  const [diagnosis, setDiagnosis] = useState({
    token: false,
    userAgent: '',
    apiUrl: '',
    environment: '',
    localStorage: false,
    networkStatus: 'offline'
  })

  useEffect(() => {
    const runDiagnosis = async () => {
      try {
        // Check token
        const token = localStorage.getItem('token')
        
        // Check localStorage access
        let hasLocalStorage = false
        try {
          localStorage.setItem('test', 'test')
          localStorage.removeItem('test')
          hasLocalStorage = true
        } catch (e) {
          hasLocalStorage = false
        }

        // Check network
        let networkStatus = 'offline'
        if (navigator.onLine) {
          try {
            await fetch('/api/health', { method: 'HEAD' })
            networkStatus = 'online'
          } catch {
            networkStatus = 'limited'
          }
        }

        setDiagnosis({
          token: !!token,
          userAgent: navigator.userAgent,
          apiUrl: window.location.origin + '/api',
          environment: window.location.hostname.includes('vercel') ? 'production' : 'development',
          localStorage: hasLocalStorage,
          networkStatus
        })
      } catch (error) {
        console.error('Diagnosis error:', error)
      }
    }

    runDiagnosis()
  }, [])

  return diagnosis
}
