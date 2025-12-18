import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material'
import {
  Add,
  Edit,
  Delete,
  Visibility,
  School,
  People,
  Class,
} from '@mui/icons-material'

// Interfaces
interface School {
  id: string
  name: string
  code: string
  address: string
  phone: string
  email: string
  principal: string
  type: 'MUNICIPAL' | 'ESTADUAL' | 'FEDERAL' | 'PRIVADA'
  level: 'INFANTIL' | 'FUNDAMENTAL' | 'MEDIO' | 'TECNICO' | 'SUPERIOR'
  status: 'ATIVA' | 'INATIVA' | 'MANUTENCAO'
  students_count: number
  teachers_count: number
  classes_count: number
  created_at: string
  updated_at: string
}

interface SchoolStats {
  total_schools: number
  active_schools: number
  inactive_schools: number
  total_students: number
  total_teachers: number
  total_classes: number
  schools_by_type: Array<{ type: string; count: number }>
  schools_by_level: Array<{ level: string; count: number }>
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`school-tabpanel-${index}`}
      aria-labelledby={`school-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

// Componente Principal
const SchoolManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [schools, setSchools] = useState<School[]>([])
  const [stats, setStats] = useState<SchoolStats | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSchool, setEditingSchool] = useState<School | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [schoolToDelete, setSchoolToDelete] = useState<School | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    address: '',
    phone: '',
    email: '',
    principal: '',
    type: 'MUNICIPAL' as School['type'],
    level: 'FUNDAMENTAL' as School['level'],
    status: 'ATIVA' as School['status']
  })

  useEffect(() => {
    loadSchools()
    loadStats()
  }, [])

  const loadSchools = async () => {
    try {
      // Simulando dados para demonstração
      const mockSchools: School[] = [
        {
          id: '1',
          name: 'Escola Municipal João Silva',
          code: 'EM001',
          address: 'Rua das Flores, 123 - Centro',
          phone: '(11) 3456-7890',
          email: 'joaosilva@educacao.gov.br',
          principal: 'Maria Santos',
          type: 'MUNICIPAL',
          level: 'FUNDAMENTAL',
          status: 'ATIVA',
          students_count: 450,
          teachers_count: 25,
          classes_count: 18,
          created_at: '2023-01-15',
          updated_at: '2024-11-20'
        },
        {
          id: '2',
          name: 'EMEI Pequenos Sonhos',
          code: 'EMEI002',
          address: 'Av. dos Estudantes, 456 - Jardim Esperança',
          phone: '(11) 3456-7891',
          email: 'pequenossonhos@educacao.gov.br',
          principal: 'Ana Costa',
          type: 'MUNICIPAL',
          level: 'INFANTIL',
          status: 'ATIVA',
          students_count: 180,
          teachers_count: 12,
          classes_count: 8,
          created_at: '2023-02-10',
          updated_at: '2024-11-18'
        },
        {
          id: '3',
          name: 'Escola Estadual Professor Carlos',
          code: 'EE003',
          address: 'Rua da Educação, 789 - Vila Nova',
          phone: '(11) 3456-7892',
          email: 'profcarlos@educacao.sp.gov.br',
          principal: 'Roberto Lima',
          type: 'ESTADUAL',
          level: 'MEDIO',
          status: 'MANUTENCAO',
          students_count: 850,
          teachers_count: 45,
          classes_count: 32,
          created_at: '2022-08-20',
          updated_at: '2024-11-15'
        }
      ]
      setSchools(mockSchools)
    } catch (error) {
      console.error('Erro ao carregar escolas:', error)
    }
  }

  const loadStats = async () => {
    try {
      const mockStats: SchoolStats = {
        total_schools: 3,
        active_schools: 2,
        inactive_schools: 1,
        total_students: 1480,
        total_teachers: 82,
        total_classes: 58,
        schools_by_type: [
          { type: 'MUNICIPAL', count: 2 },
          { type: 'ESTADUAL', count: 1 }
        ],
        schools_by_level: [
          { level: 'INFANTIL', count: 1 },
          { level: 'FUNDAMENTAL', count: 1 },
          { level: 'MEDIO', count: 1 }
        ]
      }
      setStats(mockStats)
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    }
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleAddSchool = () => {
    setEditingSchool(null)
    setFormData({
      name: '',
      code: '',
      address: '',
      phone: '',
      email: '',
      principal: '',
      type: 'MUNICIPAL',
      level: 'FUNDAMENTAL',
      status: 'ATIVA'
    })
    setDialogOpen(true)
  }

  const handleEditSchool = (school: School) => {
    setEditingSchool(school)
    setFormData({
      name: school.name,
      code: school.code,
      address: school.address,
      phone: school.phone,
      email: school.email,
      principal: school.principal,
      type: school.type,
      level: school.level,
      status: school.status
    })
    setDialogOpen(true)
  }

  const handleDeleteSchool = (school: School) => {
    setSchoolToDelete(school)
    setDeleteDialogOpen(true)
  }

  const handleSaveSchool = async () => {
    try {
      if (editingSchool) {
        // Atualizar escola existente
        console.log('Atualizando escola:', { ...editingSchool, ...formData })
      } else {
        // Criar nova escola
        console.log('Criando nova escola:', formData)
      }
      setDialogOpen(false)
      await loadSchools()
    } catch (error) {
      console.error('Erro ao salvar escola:', error)
    }
  }

  const confirmDeleteSchool = async () => {
    try {
      if (schoolToDelete) {
        console.log('Deletando escola:', schoolToDelete.id)
        setDeleteDialogOpen(false)
        setSchoolToDelete(null)
        await loadSchools()
      }
    } catch (error) {
      console.error('Erro ao deletar escola:', error)
    }
  }

  const getStatusColor = (status: School['status']) => {
    switch (status) {
      case 'ATIVA': return 'success'
      case 'INATIVA': return 'error'
      case 'MANUTENCAO': return 'warning'
      default: return 'default'
    }
  }

  const getTypeLabel = (type: School['type']) => {
    switch (type) {
      case 'MUNICIPAL': return 'Municipal'
      case 'ESTADUAL': return 'Estadual'
      case 'FEDERAL': return 'Federal'
      case 'PRIVADA': return 'Privada'
      default: return type
    }
  }

  const getLevelLabel = (level: School['level']) => {
    switch (level) {
      case 'INFANTIL': return 'Educação Infantil'
      case 'FUNDAMENTAL': return 'Ensino Fundamental'
      case 'MEDIO': return 'Ensino Médio'
      case 'TECNICO': return 'Ensino Técnico'
      case 'SUPERIOR': return 'Ensino Superior'
      default: return level
    }
  }

  // Componente Dashboard
  const DashboardContent = () => (
    <Grid container spacing={3}>
      {/* Cards de Estatísticas */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <School sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h6">Total de Escolas</Typography>
            </Box>
            <Typography variant="h4" color="primary">
              {stats?.total_schools || 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <People sx={{ color: 'success.main', mr: 1 }} />
              <Typography variant="h6">Total de Alunos</Typography>
            </Box>
            <Typography variant="h4" color="success.main">
              {stats?.total_students || 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <People sx={{ color: 'info.main', mr: 1 }} />
              <Typography variant="h6">Total de Professores</Typography>
            </Box>
            <Typography variant="h4" color="info.main">
              {stats?.total_teachers || 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Class sx={{ color: 'warning.main', mr: 1 }} />
              <Typography variant="h6">Total de Turmas</Typography>
            </Box>
            <Typography variant="h4" color="warning.main">
              {stats?.total_classes || 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Status das Escolas */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Status das Escolas
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Chip label="Ativas" color="success" size="small" />
                </ListItemIcon>
                <ListItemText primary={`${stats?.active_schools || 0} escolas`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Chip label="Em Manutenção" color="warning" size="small" />
                </ListItemIcon>
                <ListItemText primary={`${stats?.inactive_schools || 0} escolas`} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Distribuição por Tipo */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Escolas por Tipo
            </Typography>
            <List>
              {stats?.schools_by_level.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={getLevelLabel(item.level as School['level'])} 
                    secondary={`${item.count} escolas`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )

  // Componente Lista de Escolas
  const SchoolListContent = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">
          Lista de Escolas
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddSchool}
        >
          Adicionar Escola
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Nível</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Alunos</TableCell>
              <TableCell>Professores</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schools.map((school) => (
              <TableRow key={school.id}>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      {school.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {school.principal}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{school.code}</TableCell>
                <TableCell>{getTypeLabel(school.type)}</TableCell>
                <TableCell>{getLevelLabel(school.level)}</TableCell>
                <TableCell>
                  <Chip 
                    label={school.status} 
                    color={getStatusColor(school.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{school.students_count}</TableCell>
                <TableCell>{school.teachers_count}</TableCell>
                <TableCell>
                  <Tooltip title="Visualizar">
                    <IconButton size="small">
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton size="small" onClick={() => handleEditSchool(school)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton size="small" onClick={() => handleDeleteSchool(school)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Gestão de Escolas Municipal
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          Gerencie todas as escolas da rede municipal de ensino. 
          Visualize estatísticas, cadastre novas unidades e mantenha as informações atualizadas.
        </Typography>
      </Alert>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Dashboard" />
          <Tab label="Lista de Escolas" />
          <Tab label="Configurações" />
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <DashboardContent />
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <SchoolListContent />
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Configurações do Sistema
          </Typography>
          <Alert severity="info">
            Configurações avançadas em desenvolvimento.
          </Alert>
        </Box>
      </TabPanel>

      {/* Dialog para Adicionar/Editar Escola */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingSchool ? 'Editar Escola' : 'Adicionar Nova Escola'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Nome da Escola"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Código"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Endereço"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Telefone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Diretor(a)"
                value={formData.principal}
                onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as School['status'] })}
                  label="Status"
                >
                  <MenuItem value="ATIVA">Ativa</MenuItem>
                  <MenuItem value="INATIVA">Inativa</MenuItem>
                  <MenuItem value="MANUTENCAO">Em Manutenção</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as School['type'] })}
                  label="Tipo"
                >
                  <MenuItem value="MUNICIPAL">Municipal</MenuItem>
                  <MenuItem value="ESTADUAL">Estadual</MenuItem>
                  <MenuItem value="FEDERAL">Federal</MenuItem>
                  <MenuItem value="PRIVADA">Privada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Nível de Ensino</InputLabel>
                <Select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as School['level'] })}
                  label="Nível de Ensino"
                >
                  <MenuItem value="INFANTIL">Educação Infantil</MenuItem>
                  <MenuItem value="FUNDAMENTAL">Ensino Fundamental</MenuItem>
                  <MenuItem value="MEDIO">Ensino Médio</MenuItem>
                  <MenuItem value="TECNICO">Ensino Técnico</MenuItem>
                  <MenuItem value="SUPERIOR">Ensino Superior</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSaveSchool} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de Confirmação para Deletar */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir a escola "{schoolToDelete?.name}"?
            Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={confirmDeleteSchool} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SchoolManagement
