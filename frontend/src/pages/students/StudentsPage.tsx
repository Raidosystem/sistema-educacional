import { Typography, Box } from '@mui/material'

function StudentsPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestão de Estudantes
      </Typography>
      <Typography variant="body1">
        Módulo para gerenciamento completo de estudantes incluindo:
      </Typography>
      <ul>
        <li>Cadastro de novos estudantes</li>
        <li>Matrícula e rematrícula</li>
        <li>Histórico escolar</li>
        <li>Documentos escolares</li>
        <li>Controle de frequência</li>
        <li>Lançamento de notas</li>
      </ul>
    </Box>
  )
}

export default StudentsPage
