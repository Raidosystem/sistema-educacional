import React from 'react'
import { Box, Typography, Card, CardContent, Grid, Alert } from '@mui/material'
import { School, CheckCircle, Error } from '@mui/icons-material'
import { useSystemDiagnosis } from '../hooks/useSystemDiagnosis'

const SecretaryModuleDebug: React.FC = () => {
  const diagnosis = useSystemDiagnosis()

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            🎓 Módulo Secretário Escolar (Debug)
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Sistema completo de gestão educacional
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <School color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Status do Sistema
                  </Typography>
                  <Typography variant="h6">
                    Funcionando!
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Diagnóstico do Sistema
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Alert 
                      severity={diagnosis.token ? "success" : "error"}
                      icon={diagnosis.token ? <CheckCircle /> : <Error />}
                    >
                      Token de Autenticação: {diagnosis.token ? 'Presente' : 'Ausente'}
                    </Alert>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Alert 
                      severity={diagnosis.localStorage ? "success" : "error"}
                      icon={diagnosis.localStorage ? <CheckCircle /> : <Error />}
                    >
                      LocalStorage: {diagnosis.localStorage ? 'Funcionando' : 'Bloqueado'}
                    </Alert>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Alert 
                      severity={diagnosis.networkStatus === 'online' ? "success" : "warning"}
                      icon={diagnosis.networkStatus === 'online' ? <CheckCircle /> : <Error />}
                    >
                      Rede: {diagnosis.networkStatus}
                    </Alert>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Alert severity="info">
                      Ambiente: {diagnosis.environment}
                    </Alert>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Informações Técnicas:
                </Typography>
                <Typography variant="body2" component="div">
                  • URL API: {diagnosis.apiUrl}<br/>
                  • User Agent: {diagnosis.userAgent.substring(0, 100)}...<br/>
                  • Timestamp: {new Date().toISOString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SecretaryModuleDebug
