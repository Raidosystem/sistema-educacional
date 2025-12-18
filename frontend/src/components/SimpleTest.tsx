import React from 'react'

const SimpleTest: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: 'red' }}>🚨 TESTE SIMPLES - SE VOCÊ VÊ ISSO, O REACT ESTÁ FUNCIONANDO</h1>
      <p>Data/Hora: {new Date().toLocaleString()}</p>
      <p>URL: {window.location.href}</p>
      <p>User Agent: {navigator.userAgent}</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'yellow' }}>
        <h2>Informações Técnicas:</h2>
        <ul>
          <li>NODE_ENV: {process.env.NODE_ENV || 'undefined'}</li>
          <li>Ambiente: {window.location.hostname.includes('vercel') ? 'PRODUCTION' : 'LOCAL'}</li>
          <li>Console errors: Abra o DevTools e verifique o console</li>
        </ul>
      </div>
    </div>
  )
}

export default SimpleTest
