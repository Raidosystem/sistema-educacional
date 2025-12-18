import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CircularProgress, Box } from '@mui/material'
import { useAuthStore } from './store/auth'
import Layout from './components/Layout'
import LoginPage from './pages/auth/LoginPage'
import Dashboard from './pages/Dashboard'
import StudentsPage from './pages/students/StudentsPage'
import TeachersPage from './pages/teachers/TeachersPage'
import ClassesPage from './pages/classes/ClassesPage'
import QueuePage from './pages/queue/QueuePage'
import MenuPage from './pages/menu/MenuPage'
import ParentPortal from './pages/portals/ParentPortal'
import TeacherPortal from './pages/portals/TeacherPortal'
import StudentPortal from './pages/portals/StudentPortal'
import SecretaryModule from './components/SecretaryModule'
import SchoolManagement from './components/SchoolManagement'

function App() {
  const { user, isAuthenticated, isLoading, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schools" element={<SchoolManagement />} />
        
        {/* Secretário Escolar Routes */}
        {(user?.role === 'ADMIN' || user?.role === 'SECRETARY') && (
          <>
            <Route path="/secretary" element={<SecretaryModule />} />
            <Route path="/secretary/people" element={<SecretaryModule />} />
            <Route path="/secretary/students" element={<StudentsPage />} />
            <Route path="/secretary/teachers" element={<TeachersPage />} />
            <Route path="/secretary/staff" element={<SecretaryModule />} />
            <Route path="/secretary/classes" element={<ClassesPage />} />
            <Route path="/secretary/enrollments" element={<SecretaryModule />} />
            <Route path="/secretary/transfers" element={<SecretaryModule />} />
            <Route path="/secretary/queue" element={<QueuePage />} />
            <Route path="/secretary/attendance" element={<SecretaryModule />} />
            <Route path="/secretary/grades" element={<SecretaryModule />} />
            <Route path="/secretary/reports" element={<SecretaryModule />} />
            <Route path="/secretary/subjects" element={<SecretaryModule />} />
            <Route path="/secretary/calendar" element={<SecretaryModule />} />
            <Route path="/secretary/events" element={<SecretaryModule />} />
            <Route path="/secretary/analytics" element={<SecretaryModule />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/queue" element={<QueuePage />} />
          </>
        )}
        
        {/* Nutricionista Routes */}
        {(user?.role === 'ADMIN' || user?.role === 'NUTRITIONIST') && (
          <Route path="/menu" element={<MenuPage />} />
        )}
        
        {/* Portal Routes */}
        {user?.role === 'PARENT' && (
          <Route path="/parent" element={<ParentPortal />} />
        )}
        
        {user?.role === 'TEACHER' && (
          <Route path="/teacher" element={<TeacherPortal />} />
        )}
        
        {user?.role === 'STUDENT' && (
          <Route path="/student" element={<StudentPortal />} />
        )}
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
