import { Calendar, Clock, Users, Video, MapPin, FileText, CheckCircle, TrendingUp } from 'lucide-react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import type { AssessoriaPedagogica } from '../lib/types'
import { useState } from 'react'

export default function AssessoriaPedagogicaView() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-2')

  // Dados de exemplo
  const assessorias: AssessoriaPedagogica[] = [
    {
      id: '1',
      titulo: 'Implementação BNCC - Educação Infantil',
      descricao: 'Orientações práticas para implementação dos Campos de Experiência',
      data: '2024-02-15',
      horario: '14:00-17:00',
      modalidade: 'presencial',
      local: 'Secretaria Municipal de Educação',
      assessor: 'Dra. Maria Helena Silva',
      escolas: ['EMEF Francisco Gomes', 'EMEF Padre Mário Lano'],
      participantes: 25,
      cargaHoraria: 3,
      materiaisCompartilhados: ['Slides da apresentação', 'Guia prático BNCC', 'Modelos de planejamento'],
      status: 'concluido',
      relatorioDisponivel: true
    },
    {
      id: '2',
      titulo: 'Estratégias de Alfabetização',
      descricao: 'Métodos de alfabetização baseados em evidências científicas',
      data: '2024-03-20',
      horario: '09:00-12:00',
      modalidade: 'online',
      local: 'Plataforma Teams',
      assessor: 'Prof. Dr. João Pedro Santos',
      escolas: ['Todas as escolas'],
      participantes: 45,
      cargaHoraria: 3,
      materiaisCompartilhados: ['Vídeo da sessão', 'Artigos científicos', 'Atividades práticas'],
      status: 'concluido',
      relatorioDisponivel: true
    },
    {
      id: '3',
      titulo: 'Preparação SAEB 2024',
      descricao: 'Estratégias para preparar alunos do 5º ano para avaliações externas',
      data: '2024-05-10',
      horario: '14:00-17:00',
      modalidade: 'presencial',
      local: 'EMEF Vera Lucia Vitali',
      assessor: 'Equipe Técnica INEP',
      escolas: ['EMEF Vera Lucia Vitali', 'EMEF Vicencina Morsoleto'],
      participantes: 18,
      cargaHoraria: 3,
      materiaisCompartilhados: ['Matriz SAEB', 'Simulados', 'Guia do professor'],
      status: 'concluido',
      relatorioDisponivel: true
    },
    {
      id: '4',
      titulo: 'Educação Inclusiva: Estratégias Práticas',
      descricao: 'Adaptações curriculares e metodologias inclusivas',
      data: '2024-06-12',
      horario: '09:00-12:00',
      modalidade: 'hibrido',
      local: 'Secretaria + Online',
      assessor: 'Dra. Ana Paula Costa',
      escolas: ['Todas as escolas'],
      participantes: 38,
      cargaHoraria: 3,
      materiaisCompartilhados: ['Manual de adaptações', 'Estudos de caso', 'Checklist'],
      status: 'concluido',
      relatorioDisponivel: true
    },
    {
      id: '5',
      titulo: 'Uso de Tecnologias Digitais em Sala',
      descricao: 'Ferramentas digitais e metodologias ativas',
      data: '2024-08-15',
      horario: '14:00-17:00',
      modalidade: 'online',
      local: 'Plataforma Google Meet',
      assessor: 'Prof. Carlos Mendes',
      escolas: ['Todas as escolas'],
      participantes: 52,
      cargaHoraria: 3,
      materiaisCompartilhados: ['Tutorial de ferramentas', 'Planos de aula digitais'],
      status: 'concluido',
      relatorioDisponivel: true
    },
    {
      id: '6',
      titulo: 'Avaliação Formativa e Feedback',
      descricao: 'Como avaliar para promover aprendizagem',
      data: '2024-09-20',
      horario: '09:00-12:00',
      modalidade: 'presencial',
      local: 'EMEF Francisco Gomes',
      assessor: 'Dra. Lucia Fernandes',
      escolas: ['EMEF Francisco Gomes', 'EMEF Padre Mário Lano'],
      participantes: 28,
      cargaHoraria: 3,
      materiaisCompartilhados: ['Rubrica de avaliação', 'Modelos de feedback'],
      status: 'concluido',
      relatorioDisponivel: false
    },
    {
      id: '7',
      titulo: 'Planejamento 2025 - Alinhamento BNCC',
      descricao: 'Planejamento anual com base na BNCC e diagnóstico',
      data: '2024-11-25',
      horario: '14:00-17:00',
      modalidade: 'presencial',
      local: 'Secretaria Municipal de Educação',
      assessor: 'Dra. Maria Helena Silva',
      escolas: ['Todas as escolas'],
      participantes: 60,
      cargaHoraria: 3,
      materiaisCompartilhados: [],
      status: 'agendado',
      relatorioDisponivel: false
    },
    {
      id: '8',
      titulo: 'Gestão de Sala de Aula',
      descricao: 'Estratégias para ambiente de aprendizagem positivo',
      data: '2024-12-10',
      horario: '09:00-12:00',
      modalidade: 'online',
      local: 'Plataforma Teams',
      assessor: 'Prof. Ricardo Alves',
      escolas: ['Todas as escolas'],
      participantes: 0,
      cargaHoraria: 3,
      materiaisCompartilhados: [],
      status: 'agendado',
      relatorioDisponivel: false
    }
  ]

  const estatisticas = {
    totalSessoes: 20,
    sessoesRealizadas: 15,
    sessoesPendentes: 5,
    horasTotais: 60,
    participantesMedio: 35,
    satisfacaoGeral: 4.6
  }

  const getModalidadeIcon = (modalidade: string) => {
    switch (modalidade) {
      case 'presencial': return <MapPin className="h-4 w-4" />
      case 'online': return <Video className="h-4 w-4" />
      case 'hibrido': return <Users className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  const getModalidadeColor = (modalidade: string) => {
    switch (modalidade) {
      case 'presencial': return 'bg-blue-100 text-blue-700'
      case 'online': return 'bg-green-100 text-green-700'
      case 'hibrido': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido': return 'bg-green-100 text-green-700'
      case 'agendado': return 'bg-blue-100 text-blue-700'
      case 'cancelado': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const assessoriasConcluidas = assessorias.filter(a => a.status === 'concluido')
  const assessoriasAgendadas = assessorias.filter(a => a.status === 'agendado')
  const horasRealizadas = assessoriasConcluidas.reduce((sum, a) => sum + a.cargaHoraria, 0)
  const metaAnual = 60
  const progressoMeta = (horasRealizadas / metaAnual) * 100

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessoria Pedagógica</h1>
        <p className="text-gray-600">Acompanhamento e formação em serviço</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.sessoesRealizadas}</div>
          <div className="text-sm text-gray-600">Sessões Realizadas</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold">{horasRealizadas}h</div>
          <div className="text-sm text-gray-600">Horas de Formação</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.participantesMedio}</div>
          <div className="text-sm text-gray-600">Média Participantes</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.satisfacaoGeral}</div>
          <div className="text-sm text-gray-600">Satisfação Geral</div>
        </Card>

        <Card className="p-4 col-span-2">
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold">Meta Anual 2024</span>
              <span className="text-sm text-gray-600">{horasRealizadas}h / {metaAnual}h</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${progressoMeta >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(progressoMeta, 100)}%` }}
              />
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {progressoMeta >= 100 ? 'Meta atingida! ✓' : `Faltam ${metaAnual - horasRealizadas}h para a meta`}
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white"
        >
          <option value="2024-1">1º Semestre 2024</option>
          <option value="2024-2">2º Semestre 2024</option>
          <option value="2025-1">1º Semestre 2025</option>
        </select>
      </div>

      {/* Tabs Horizontais */}
      <Tabs defaultValue="todas" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="todas">Todas as Sessões</TabsTrigger>
          <TabsTrigger value="concluidas">Concluídas</TabsTrigger>
          <TabsTrigger value="agendadas">Agendadas</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="todas">
          <div className="space-y-4">
            {assessorias.map((assessoria) => (
              <Card key={assessoria.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{assessoria.titulo}</h3>
                      <Badge className={getStatusColor(assessoria.status)}>
                        {assessoria.status === 'concluido' ? 'Concluído' : 'Agendado'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{assessoria.descricao}</p>
                  </div>
                  <Badge className={getModalidadeColor(assessoria.modalidade)}>
                    <span className="flex items-center gap-1">
                      {getModalidadeIcon(assessoria.modalidade)}
                      {assessoria.modalidade}
                    </span>
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(assessoria.data).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {assessoria.horario} ({assessoria.cargaHoraria}h)
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {assessoria.participantes > 0 ? `${assessoria.participantes} participantes` : 'Vagas abertas'}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {assessoria.local}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Assessor(a): {assessoria.assessor}</p>
                  <p className="text-sm text-gray-600">
                    <strong>Escolas participantes:</strong> {assessoria.escolas.join(', ')}
                  </p>
                </div>

                {assessoria.materiaisCompartilhados.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Materiais Compartilhados:</p>
                    <div className="flex flex-wrap gap-2">
                      {assessoria.materiaisCompartilhados.map((material, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {assessoria.status === 'concluido' && (
                    <>
                      {assessoria.relatorioDisponivel && (
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Relatório
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Ver Materiais
                      </Button>
                    </>
                  )}
                  {assessoria.status === 'agendado' && (
                    <Button size="sm">
                      Confirmar Presença
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="concluidas">
          <div className="space-y-4">
            {assessoriasConcluidas.map((assessoria) => (
              <Card key={assessoria.id} className="p-6 bg-green-50 border-l-4 border-green-500">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{assessoria.titulo}</h3>
                    <p className="text-sm text-gray-600">{assessoria.descricao}</p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-sm">
                    <span className="text-gray-600">Data:</span>
                    <div className="font-semibold">{new Date(assessoria.data).toLocaleDateString('pt-BR')}</div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Duração:</span>
                    <div className="font-semibold">{assessoria.cargaHoraria} horas</div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Participantes:</span>
                    <div className="font-semibold">{assessoria.participantes}</div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Assessor:</span>
                    <div className="font-semibold text-xs">{assessoria.assessor}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {assessoria.relatorioDisponivel && (
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Relatório
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Baixar Materiais
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agendadas">
          <div className="space-y-4">
            {assessoriasAgendadas.map((assessoria) => (
              <Card key={assessoria.id} className="p-6 bg-blue-50 border-l-4 border-blue-500">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{assessoria.titulo}</h3>
                    <p className="text-sm text-gray-600">{assessoria.descricao}</p>
                  </div>
                  <Badge className={getModalidadeColor(assessoria.modalidade)}>
                    <span className="flex items-center gap-1">
                      {getModalidadeIcon(assessoria.modalidade)}
                      {assessoria.modalidade}
                    </span>
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-sm">
                    <span className="text-gray-600">Data:</span>
                    <div className="font-semibold">{new Date(assessoria.data).toLocaleDateString('pt-BR')}</div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Horário:</span>
                    <div className="font-semibold">{assessoria.horario}</div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Local:</span>
                    <div className="font-semibold text-xs">{assessoria.local}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm"><strong>Assessor(a):</strong> {assessoria.assessor}</p>
                  <p className="text-sm"><strong>Escolas:</strong> {assessoria.escolas.join(', ')}</p>
                </div>

                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Confirmar Presença
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="relatorios">
          <div className="space-y-4">
            {assessoriasConcluidas.filter(a => a.relatorioDisponivel).map((assessoria) => (
              <Card key={assessoria.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{assessoria.titulo}</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-600">Data:</span>
                        <div className="font-semibold">{new Date(assessoria.data).toLocaleDateString('pt-BR')}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Participantes:</span>
                        <div className="font-semibold">{assessoria.participantes}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Duração:</span>
                        <div className="font-semibold">{assessoria.cargaHoraria}h</div>
                      </div>
                    </div>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Baixar Relatório Completo (PDF)
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
