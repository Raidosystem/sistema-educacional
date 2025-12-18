import { ReactNode } from 'react'
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Collapse,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard,
  School,
  Person,
  Class,
  Queue,
  Restaurant,
  AccountCircle,
  ExitToApp,
  People,
  PersonAdd,
  Assignment,
  Grade,
  CalendarToday,
  EventNote,
  Assessment,
  Schedule,
  Book,
  ManageAccounts,
  CheckCircle,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

const drawerWidth = 240

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [secretaryMenuOpen, setSecretaryMenuOpen] = useState(false)
  const [nutritionistMenuOpen, setNutritionistMenuOpen] = useState(false)
  const [parentMenuOpen, setParentMenuOpen] = useState(false)
  const [teacherMenuOpen, setTeacherMenuOpen] = useState(false)
  const [studentMenuOpen, setStudentMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleClose()
  }

  const menuItems = [
    { text: '🏠 Dashboard', icon: <Dashboard />, path: '/' },
    { text: '🏫 Gestão de Escolas', icon: <School />, path: '/schools' },
  ]

  const secretaryMenuItems = [
    { text: 'Visão Geral', icon: <Dashboard />, path: '/secretary' },
    { text: 'Gestão de Pessoas', icon: <People />, path: '/secretary/people' },
    { text: 'Estudantes', icon: <Person />, path: '/secretary/students' },
    { text: 'Professores', icon: <ManageAccounts />, path: '/secretary/teachers' },
    { text: 'Funcionários', icon: <PersonAdd />, path: '/secretary/staff' },
    { text: 'Turmas e Classes', icon: <Class />, path: '/secretary/classes' },
    { text: 'Matrículas', icon: <Assignment />, path: '/secretary/enrollments' },
    { text: 'Transferências', icon: <Schedule />, path: '/secretary/transfers' },
    { text: 'Fila de Vagas', icon: <Queue />, path: '/secretary/queue' },
    { text: 'Frequência', icon: <CheckCircle />, path: '/secretary/attendance' },
    { text: 'Notas e Avaliações', icon: <Grade />, path: '/secretary/grades' },
    { text: 'Boletins', icon: <Assessment />, path: '/secretary/reports' },
    { text: 'Disciplinas', icon: <Book />, path: '/secretary/subjects' },
    { text: 'Calendário Escolar', icon: <CalendarToday />, path: '/secretary/calendar' },
    { text: 'Eventos', icon: <EventNote />, path: '/secretary/events' },
    { text: 'Relatórios', icon: <Assessment />, path: '/secretary/analytics' },
  ]

  const nutritionistMenuItems = [
    { text: 'Cardápios', icon: <Restaurant />, path: '/menu' },
  ]

  const parentMenuItems = [
    { text: 'Portal dos Pais', icon: <Person />, path: '/parent' },
  ]

  const teacherMenuItems = [
    { text: 'Portal do Professor', icon: <School />, path: '/teacher' },
  ]

  const studentMenuItems = [
    { text: 'Portal do Aluno', icon: <Person />, path: '/student' },
  ]

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          🏫 Sistema Escolar Municipal
        </Typography>
      </Toolbar>
      <List>
        {/* Menu Principal */}
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Módulo Secretário */}
        {(user?.role === 'ADMIN' || user?.role === 'SECRETARY') && (
          <>
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => setSecretaryMenuOpen(!secretaryMenuOpen)}
                sx={{ backgroundColor: secretaryMenuOpen ? 'primary.light' : 'transparent' }}
              >
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText primary="📚 SECRETÁRIO ESCOLAR (NOVO)" />
                {secretaryMenuOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={secretaryMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {secretaryMenuItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton 
                      sx={{ pl: 4 }} 
                      onClick={() => navigate(item.path)}
                    >
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        )}

        {/* Módulo Nutricionista */}
        {(user?.role === 'ADMIN' || user?.role === 'NUTRITIONIST') && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setNutritionistMenuOpen(!nutritionistMenuOpen)}>
                <ListItemIcon>
                  <Restaurant />
                </ListItemIcon>
                <ListItemText primary="Módulo Nutricionista" />
                {nutritionistMenuOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={nutritionistMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {nutritionistMenuItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton 
                      sx={{ pl: 4 }} 
                      onClick={() => navigate(item.path)}
                    >
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        )}

        {/* Portal dos Pais */}
        {user?.role === 'PARENT' && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setParentMenuOpen(!parentMenuOpen)}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Portal dos Pais" />
                {parentMenuOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={parentMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {parentMenuItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton 
                      sx={{ pl: 4 }} 
                      onClick={() => navigate(item.path)}
                    >
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        )}

        {/* Portal do Professor */}
        {user?.role === 'TEACHER' && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setTeacherMenuOpen(!teacherMenuOpen)}>
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText primary="Portal do Professor" />
                {teacherMenuOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={teacherMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {teacherMenuItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton 
                      sx={{ pl: 4 }} 
                      onClick={() => navigate(item.path)}
                    >
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        )}

        {/* Portal do Aluno */}
        {user?.role === 'STUDENT' && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setStudentMenuOpen(!studentMenuOpen)}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Portal do Aluno" />
                {studentMenuOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={studentMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {studentMenuItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton 
                      sx={{ pl: 4 }} 
                      onClick={() => navigate(item.path)}
                    >
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        )}
      </List>
    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Sistema Municipal de Ensino
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar>
                <AccountCircle />
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Typography>{user?.person?.name || user?.email}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} />
                Sair
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default Layout
