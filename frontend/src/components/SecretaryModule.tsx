// 🎓 COMPONENTES FRONTEND - MÓDULO SECRETÁRIO ESCOLAR
// Interface principal do sistema de gestão educacional

import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  Person,
  School,
  Assignment,
  Assessment,
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList,
  Download,
  People,
  Class,
  TrendingUp,
  CheckCircle,
  Dashboard,
  Grade,
  CalendarToday
} from '@mui/icons-material'

// Interfaces TypeScript
interface Person {
  id: string
  name: string
  cpf: string
  email?: string
  phone?: string
  birth_date: string
  gender: 'M' | 'F'
  address?: string
  active: boolean
  created_at: string
}

interface Student extends Person {
  registration: string
  allergies?: string
  medications?: string
  observations?: string
  enrollments: Enrollment[]
}

interface Enrollment {
  id: string
  student_id: string
  class_id: string
  school_year_id: string
  registration_number: string
  enrollment_date: string
  status: 'ACTIVE' | 'INACTIVE' | 'TRANSFERRED' | 'GRADUATED'
  student: Student
  class: SchoolClass
}

interface SchoolClass {
  id: string
  name: string
  grade: Grade
  school: School
  capacity: number
  current_enrollment: number
}

interface Grade {
  id: string
  name: string
  level: 'INFANTIL' | 'FUNDAMENTAL_I' | 'FUNDAMENTAL_II' | 'MEDIO'
}

interface School {
  id: string
  code: string
  name: string
  address: string
  phone?: string
  email?: string
  active: boolean
}

interface DashboardStats {
  total_students: number
  total_teachers: number
  total_classes: number
  average_frequency: number
  monthly_enrollments: Array<{ month: number; count: number }>
}

// Componente Principal do Módulo Secretário
const SecretaryModule: React.FC = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(0)
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)

  // Mapear rotas para tabs específicas
  useEffect(() => {
    const routeTabMap: { [key: string]: number } = {
      '/secretary': 0,
      '/secretary/people': 1,
      '/secretary/staff': 1,
      '/secretary/enrollments': 2,
      '/secretary/transfers': 2,
      '/secretary/attendance': 3,
      '/secretary/grades': 4,
      '/secretary/reports': 5,
      '/secretary/subjects': 6,
      '/secretary/calendar': 6,
      '/secretary/events': 6,
      '/secretary/analytics': 5,
    }
    
    const tabIndex = routeTabMap[location.pathname] ?? 0
    setActiveTab(tabIndex)
  }, [location.pathname])

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const response = await fetch('/api/secretary/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      setDashboardStats(data)
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error)
    }
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      {/* Header com Dashboard */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            🎓 Módulo Secretário Escolar
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Sistema completo de gestão educacional
          </Typography>
        </Grid>

        {/* Cards de Estatísticas */}
        {dashboardStats && (
          <>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <People color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Total de Alunos
                      </Typography>
                      <Typography variant="h4">
                        {dashboardStats.total_students}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Class color="secondary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Total de Turmas
                      </Typography>
                      <Typography variant="h4">
                        {dashboardStats.total_classes}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <TrendingUp color="success" sx={{ mr: 2 }} />
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Frequência Média
                      </Typography>
                      <Typography variant="h4">
                        {dashboardStats.average_frequency.toFixed(1)}%
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <CheckCircle color="info" sx={{ mr: 2 }} />
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Status Sistema
                      </Typography>
                      <Typography variant="h6" color="success.main">
                        Operacional
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>

      {/* Navegação por Abas */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<Dashboard />} label="Dashboard" />
          <Tab icon={<Person />} label="Pessoas" />
          <Tab icon={<Assignment />} label="Matrículas" />
          <Tab icon={<CheckCircle />} label="Frequência" />
          <Tab icon={<Grade />} label="Notas" />
          <Tab icon={<Assessment />} label="Relatórios" />
          <Tab icon={<CalendarToday />} label="Calendário" />
          <Tab icon={<School />} label="Gestão" />
        </Tabs>
      </Paper>

      {/* Conteúdo das Abas */}
      <Box>
        {activeTab === 0 && <DashboardContent stats={dashboardStats} />}
        {activeTab === 1 && <PeopleManagement />}
        {activeTab === 2 && <EnrollmentManagement />}
        {activeTab === 3 && <AttendanceManagement />}
        {activeTab === 4 && <GradeManagement />}
        {activeTab === 5 && <ReportsManagement />}
        {activeTab === 6 && <CalendarManagement />}
        {activeTab === 7 && <SchoolManagement />}
      </Box>
    </Box>
  )
}

// Componente de Gestão de Pessoas
const PeopleManagement: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([])
  const [_loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  useEffect(() => {
    loadPeople()
  }, [searchTerm, filterType])

  const loadPeople = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (filterType !== 'all') params.append('type', filterType)

      const response = await fetch(`/api/secretary/people?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const result = await response.json()
      setPeople(result.data || [])
    } catch (error) {
      console.error('Erro ao carregar pessoas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPerson = () => {
    setSelectedPerson(null)
    setOpenDialog(true)
  }

  const handleEditPerson = (person: Person) => {
    setSelectedPerson(person)
    setOpenDialog(true)
  }

  const handleViewPerson = async (person: Person) => {
    try {
      const response = await fetch(`/api/secretary/people/${person.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      console.log('Dados completos da pessoa:', data)
      // Implementar modal de visualização detalhada
    } catch (error) {
      console.error('Erro ao carregar dados da pessoa:', error)
    }
  }

  return (
    <Box>
      {/* Barra de Ferramentas */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              placeholder="Buscar por nome, CPF ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Filtrar por tipo</InputLabel>
              <Select
                value={filterType}
                label="Filtrar por tipo"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="student">Alunos</MenuItem>
                <MenuItem value="teacher">Professores</MenuItem>
                <MenuItem value="parent">Pais/Responsáveis</MenuItem>
                <MenuItem value="staff">Funcionários</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Box display="flex" gap={1} justifyContent="flex-end">
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddPerson}
              >
                Nova Pessoa
              </Button>
              <Button startIcon={<Download />}>Exportar</Button>
              <Button startIcon={<FilterList />}>Filtros</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de Pessoas */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Foto</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow key={person.id} hover>
                <TableCell>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {person.name.charAt(0)}
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{person.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(person.birth_date).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>{person.cpf}</TableCell>
                <TableCell>{person.email || '-'}</TableCell>
                <TableCell>{person.phone || '-'}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label="Pessoa"
                    color="default"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={person.active ? 'Ativo' : 'Inativo'}
                    color={person.active ? 'success' : 'error'}
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Visualizar">
                    <IconButton
                      size="small"
                      onClick={() => handleViewPerson(person)}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      size="small"
                      onClick={() => handleEditPerson(person)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton size="small" color="error">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog de Criação/Edição */}
      <PersonDialog
        open={openDialog}
        person={selectedPerson}
        onClose={() => setOpenDialog(false)}
        onSave={() => {
          setOpenDialog(false)
          loadPeople()
        }}
      />
    </Box>
  )
}

// Componente de Dialog para Pessoa
const PersonDialog: React.FC<{
  open: boolean
  person: Person | null
  onClose: () => void
  onSave: () => void
}> = ({ open, person, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    birth_date: '',
    gender: 'M' as 'M' | 'F',
    address: ''
  })

  useEffect(() => {
    if (person) {
      setFormData({
        name: person.name,
        cpf: person.cpf,
        email: person.email || '',
        phone: person.phone || '',
        birth_date: person.birth_date,
        gender: person.gender,
        address: person.address || ''
      })
    } else {
      setFormData({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        birth_date: '',
        gender: 'M',
        address: ''
      })
    }
  }, [person])

  const handleSubmit = async () => {
    try {
      const url = person
        ? `/api/secretary/people/${person.id}`
        : '/api/secretary/people'
      
      const method = person ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        onSave()
      }
    } catch (error) {
      console.error('Erro ao salvar pessoa:', error)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {person ? 'Editar Pessoa' : 'Nova Pessoa'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Nome Completo"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="CPF"
              value={formData.cpf}
              onChange={(e) => setFormData({...formData, cpf: e.target.value})}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Telefone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Data de Nascimento"
              type="date"
              value={formData.birth_date}
              onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Gênero</InputLabel>
              <Select
                value={formData.gender}
                label="Gênero"
                onChange={(e) => setFormData({...formData, gender: e.target.value as 'M' | 'F'})}
              >
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Feminino</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Endereço"
              multiline
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {person ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// Placeholder para outros componentes de gestão
// Componente Dashboard
const DashboardContent: React.FC<{ stats: DashboardStats | null }> = ({ stats }) => (
  <Box>
    <Typography variant="h5" gutterBottom>
      📊 Dashboard - Visão Geral do Sistema
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📈 Estatísticas Gerais
            </Typography>
            <Typography>Total de Alunos: {stats?.total_students || 0}</Typography>
            <Typography>Total de Turmas: {stats?.total_classes || 0}</Typography>
            <Typography>Total de Professores: {stats?.total_teachers || 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🎯 Ações Rápidas
            </Typography>
            <Button variant="contained" sx={{ mr: 1, mb: 1 }}>Nova Matrícula</Button>
            <Button variant="outlined" sx={{ mr: 1, mb: 1 }}>Relatório Mensal</Button>
            <Button variant="outlined" sx={{ mr: 1, mb: 1 }}>Frequência Hoje</Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
)

const ReportsManagement: React.FC = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      📋 Gestão de Relatórios
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Relatórios Acadêmicos</Typography>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Boletins por Turma</Button>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Relatório de Frequência</Button>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Desempenho por Disciplina</Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Relatórios Administrativos</Typography>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Matrículas por Período</Button>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Transferências</Button>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Estatísticas Gerais</Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
)

const CalendarManagement: React.FC = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      📅 Gestão de Calendário e Eventos
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Calendário Escolar</Typography>
            <Typography>Visualização do calendário acadêmico será implementada aqui.</Typography>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" sx={{ mr: 1 }}>Adicionar Evento</Button>
              <Button variant="outlined" sx={{ mr: 1 }}>Ver Feriados</Button>
              <Button variant="outlined">Configurar Semestre</Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Eventos Próximos</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>• Reunião de Pais - 20/08</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>• Prova Bimestral - 25/08</Typography>
            <Typography variant="body2">• Conselho de Classe - 30/08</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
)

const SchoolManagement: React.FC = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      🏫 Gestão Escolar Avançada
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Disciplinas</Typography>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Gerenciar Disciplinas</Button>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Associar Professores</Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Funcionários</Typography>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Lista de Funcionários</Button>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Adicionar Funcionário</Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Configurações</Typography>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Ano Letivo</Button>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Períodos</Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
)

const EnrollmentManagement: React.FC = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      📝 Gestão de Matrículas e Transferências
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Novas Matrículas</Typography>
            <Button variant="contained" fullWidth sx={{ mb: 1 }}>Nova Matrícula</Button>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Matrículas Pendentes</Button>
            <Button variant="outlined" fullWidth>Fila de Espera</Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Transferências</Typography>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Solicitar Transferência</Button>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Transferências Ativas</Button>
            <Button variant="outlined" fullWidth>Histórico</Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
)

const AttendanceManagement: React.FC = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      ✅ Controle de Frequência
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Frequência Diária</Typography>
            <Box sx={{ mb: 2 }}>
              <TextField label="Selecionar Turma" select fullWidth sx={{ mr: 1, mb: 1 }}>
                <MenuItem value="">Selecione uma turma</MenuItem>
              </TextField>
            </Box>
            <Button variant="contained" sx={{ mr: 1 }}>Registrar Frequência</Button>
            <Button variant="outlined">Ver Histórico</Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Estatísticas</Typography>
            <Typography variant="body2">Presentes hoje: --</Typography>
            <Typography variant="body2">Ausentes hoje: --</Typography>
            <Typography variant="body2">Taxa de frequência: --%</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
)

const GradeManagement: React.FC = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      📊 Gestão de Notas e Avaliações
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Lançamento de Notas</Typography>
            <TextField label="Disciplina" select fullWidth sx={{ mb: 1 }}>
              <MenuItem value="">Selecione uma disciplina</MenuItem>
            </TextField>
            <TextField label="Turma" select fullWidth sx={{ mb: 1 }}>
              <MenuItem value="">Selecione uma turma</MenuItem>
            </TextField>
            <Button variant="contained" fullWidth>Acessar Diário</Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Relatórios de Notas</Typography>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Boletim por Aluno</Button>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }}>Relatório de Turma</Button>
            <Button variant="outlined" fullWidth>Estatísticas</Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
)

export default SecretaryModule
