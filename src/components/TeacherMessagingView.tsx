import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PaperPlaneRight, MagnifyingGlass, Funnel, CheckCircle, Clock, UserCircle } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { Student, CustomMessage, User } from '@/lib/types'

interface TeacherMessagingViewProps {
  students: Student[]
  currentUser: User
  sentMessages: CustomMessage[]
  onSendMessage: (message: Omit<CustomMessage, 'id' | 'timestamp'>) => void
}

export function TeacherMessagingView({ 
  students, 
  currentUser, 
  sentMessages,
  onSendMessage 
}: TeacherMessagingViewProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const [selectedStudentId, setSelectedStudentId] = useState<string>('')
  const [messageCategory, setMessageCategory] = useState<CustomMessage['category']>('general')
  const [messageSubject, setMessageSubject] = useState('')
  const [messageBody, setMessageBody] = useState('')
  const [messagePriority, setMessagePriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [requiresResponse, setRequiresResponse] = useState(false)

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.enrollmentNumber.includes(searchTerm)
  )

  const filteredMessages = sentMessages.filter(msg => {
    if (filterCategory === 'all') return true
    return msg.category === filterCategory
  })

  const categoryLabels = {
    behavioral: 'Comportamental',
    academic: 'Acadêmico',
    attendance: 'Frequência',
    health: 'Saúde',
    general: 'Geral'
  }

  const categoryColors = {
    behavioral: 'bg-orange-100 text-orange-800 border-orange-200',
    academic: 'bg-blue-100 text-blue-800 border-blue-200',
    attendance: 'bg-purple-100 text-purple-800 border-purple-200',
    health: 'bg-red-100 text-red-800 border-red-200',
    general: 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const priorityLabels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta'
  }

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  }

  const handleSendMessage = () => {
    if (!selectedStudentId || !messageSubject.trim() || !messageBody.trim()) {
      toast.error('Por favor, preencha todos os campos obrigatórios')
      return
    }

    const selectedStudent = students.find(s => s.id === selectedStudentId)
    if (!selectedStudent) {
      toast.error('Aluno não encontrado')
      return
    }

    const message: Omit<CustomMessage, 'id' | 'timestamp'> = {
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      recipientParentIds: selectedStudent.parentIds,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      category: messageCategory,
      subject: messageSubject.trim(),
      message: messageBody.trim(),
      priority: messagePriority,
      requiresResponse,
      responseReceived: false
    }

    onSendMessage(message)
    
    setIsDialogOpen(false)
    setSelectedStudentId('')
    setMessageSubject('')
    setMessageBody('')
    setMessageCategory('general')
    setMessagePriority('medium')
    setRequiresResponse(false)

    toast.success('Mensagem enviada com sucesso!', {
      description: `Enviada para responsáveis de ${selectedStudent.name}`
    })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Agora'
    if (diffMins < 60) return `${diffMins} min atrás`
    if (diffHours < 24) return `${diffHours}h atrás`
    if (diffDays < 7) return `${diffDays}d atrás`
    
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-['Space_Grotesk']">
            Mensagens para Pais
          </h1>
          <p className="text-muted-foreground mt-1">
            Envie comunicações personalizadas sobre preocupações específicas
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <PaperPlaneRight weight="bold" />
              Nova Mensagem
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-['Space_Grotesk']">Enviar Mensagem aos Pais</DialogTitle>
              <DialogDescription>
                Comunique-se diretamente com os responsáveis sobre situações específicas do aluno
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="student">Aluno *</Label>
                <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                  <SelectTrigger id="student">
                    <SelectValue placeholder="Selecione um aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredStudents.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} - {student.enrollmentNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select 
                    value={messageCategory} 
                    onValueChange={(value) => setMessageCategory(value as CustomMessage['category'])}
                  >
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridade *</Label>
                  <Select 
                    value={messagePriority} 
                    onValueChange={(value) => setMessagePriority(value as 'low' | 'medium' | 'high')}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(priorityLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Assunto *</Label>
                <Input
                  id="subject"
                  placeholder="Ex: Necessidade de reforço em matemática"
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem *</Label>
                <Textarea
                  id="message"
                  placeholder="Descreva a situação e, se aplicável, sugira ações que os pais podem tomar..."
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {messageBody.length} caracteres
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="requires-response"
                  checked={requiresResponse}
                  onChange={(e) => setRequiresResponse(e.target.checked)}
                  className="w-4 h-4 rounded border-input cursor-pointer"
                />
                <Label htmlFor="requires-response" className="cursor-pointer font-normal">
                  Solicitar resposta dos pais
                </Label>
              </div>

              <Alert>
                <AlertDescription className="text-sm">
                  Esta mensagem será enviada para todos os responsáveis cadastrados do aluno selecionado.
                  Eles receberão uma notificação imediata.
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSendMessage} className="gap-2">
                <PaperPlaneRight weight="bold" />
                Enviar Mensagem
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Enviadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-['Space_Grotesk']">
              {sentMessages.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Alta Prioridade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-['Space_Grotesk'] text-destructive">
              {sentMessages.filter(m => m.priority === 'high').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Aguardando Resposta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-['Space_Grotesk'] text-accent">
              {sentMessages.filter(m => m.requiresResponse && !m.responseReceived).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Últimos 7 dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-['Space_Grotesk']">
              {sentMessages.filter(m => {
                const msgDate = new Date(m.timestamp)
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return msgDate > weekAgo
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="font-['Space_Grotesk']">Mensagens Enviadas</CardTitle>
              <CardDescription>Histórico de comunicações com os pais</CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 sm:w-64">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar mensagens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Funnel className="mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <UserCircle size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {sentMessages.length === 0 
                  ? 'Nenhuma mensagem enviada ainda'
                  : 'Nenhuma mensagem encontrada com os filtros aplicados'
                }
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <Card key={message.id} className="border-l-4" style={{
                    borderLeftColor: message.priority === 'high' 
                      ? 'rgb(239 68 68)' 
                      : message.priority === 'medium' 
                      ? 'rgb(234 179 8)' 
                      : 'rgb(34 197 94)'
                  }}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <CardTitle className="text-base font-['Space_Grotesk']">
                              {message.subject}
                            </CardTitle>
                            <Badge 
                              variant="outline" 
                              className={categoryColors[message.category]}
                            >
                              {categoryLabels[message.category]}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={priorityColors[message.priority]}
                            >
                              {priorityLabels[message.priority]}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="font-medium">{message.studentName}</span>
                            <Separator orientation="vertical" className="h-4" />
                            <span>{formatDate(message.timestamp)}</span>
                          </div>
                        </div>
                        {message.requiresResponse && (
                          <div className="flex items-center gap-2">
                            {message.responseReceived ? (
                              <div className="flex items-center gap-1 text-success text-sm">
                                <CheckCircle weight="bold" />
                                <span>Respondida</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-accent text-sm">
                                <Clock weight="bold" />
                                <span>Aguardando</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {message.message}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
