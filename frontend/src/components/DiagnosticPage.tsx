import React, { useEffect, useState } from 'react'
import { Box, Typography, Card, CardContent, Alert, Button } from '@mui/material'

const DiagnosticPage: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState({
    supabaseUrl: '',
    supabaseKey: '',
    environment: '',
    userAgent: '',
    localStorage: false,
    timestamp: ''
  })

  useEffect(() => {
    try {
      // Test localStorage
      let localStorageWorks = false
      try {
        localStorage.setItem('test', 'test')
        localStorage.removeItem('test')
        localStorageWorks = true
      } catch (e) {
        console.error('LocalStorage test failed:', e)
      }

      setDiagnostics({
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'NOT_SET',
        supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT_SET',
        environment: window.location.hostname.includes('vercel') ? 'PRODUCTION' : 'DEVELOPMENT',
        userAgent: navigator.userAgent,
        localStorage: localStorageWorks,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Diagnostics error:', error)
    }
  }, [])

  const testSupabaseConnection = async () => {
    try {
      const response = await fetch('/api/health')
      const data = await response.json()
      alert(`API Response: ${JSON.stringify(data, null, 2)}`)
    } catch (error) {
      alert(`API Error: ${error}`)
    }
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        🔍 Diagnóstico do Sistema
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Variáveis de Ambiente
          </Typography>
          <Alert severity={diagnostics.supabaseUrl !== 'NOT_SET' ? 'success' : 'error'} sx={{ mb: 1 }}>
            VITE_SUPABASE_URL: {diagnostics.supabaseUrl}
          </Alert>
          <Alert severity={diagnostics.supabaseKey !== 'NOT_SET' ? 'success' : 'error'} sx={{ mb: 1 }}>
            VITE_SUPABASE_ANON_KEY: {diagnostics.supabaseKey}
          </Alert>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Ambiente e Browser
          </Typography>
          <Typography variant="body2" component="div">
            <strong>Ambiente:</strong> {diagnostics.environment}<br/>
            <strong>LocalStorage:</strong> {diagnostics.localStorage ? '✅ Funcionando' : '❌ Bloqueado'}<br/>
            <strong>URL Atual:</strong> {window.location.href}<br/>
            <strong>Timestamp:</strong> {diagnostics.timestamp}<br/>
            <strong>User Agent:</strong> {diagnostics.userAgent.substring(0, 100)}...
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Teste de Conectividade
          </Typography>
          <Button 
            variant="contained" 
            onClick={testSupabaseConnection}
            sx={{ mr: 2 }}
          >
            Testar API Backend
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => window.location.reload()}
          >
            Recarregar Página
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default DiagnosticPage
