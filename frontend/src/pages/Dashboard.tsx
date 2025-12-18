import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
} from '@mui/material'
import {
  School,
  Person,
  Class,
  TrendingUp,
} from '@mui/icons-material'
import { useAuthStore } from '../store/auth'

function Dashboard() {
  const { user } = useAuthStore()

  const stats = [
    {
      title: 'Estudantes',
      value: '1,234',
      icon: <Person fontSize="large" />,
      color: '#1976d2',
    },
    {
      title: 'Professores',
      value: '87',
      icon: <School fontSize="large" />,
      color: '#388e3c',
    },
    {
      title: 'Turmas',
      value: '45',
      icon: <Class fontSize="large" />,
      color: '#f57c00',
    },
    {
      title: 'Taxa de Aprovação',
      value: '94%',
      icon: <TrendingUp fontSize="large" />,
      color: '#d32f2f',
    },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Bem-vindo, {user?.person?.name || user?.email}!
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      backgroundColor: stat.color,
                      color: 'white',
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h5">
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Atividades Recentes
            </Typography>
            <Typography variant="body2" color="textSecondary">
              • Nova matrícula: Maria Silva - Turma 5º A
            </Typography>
            <Typography variant="body2" color="textSecondary">
              • Nota lançada: João Santos - Matemática - 8.5
            </Typography>
            <Typography variant="body2" color="textSecondary">
              • Frequência registrada: Turma 3º B - 28/11/2024
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Calendário Escolar
            </Typography>
            <Typography variant="body2" color="textSecondary">
              • 15/12 - Último dia de aula
            </Typography>
            <Typography variant="body2" color="textSecondary">
              • 20/12 - Conselho de Classe
            </Typography>
            <Typography variant="body2" color="textSecondary">
              • 22/12 - Entrega de boletins
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
