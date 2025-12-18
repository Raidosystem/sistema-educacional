import { GraduationCap, Calendar, Users, Clock, CheckCircle, Video, MapPin, Laptop } from 'lucide-react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import type { Curso, Inscricao } from '../lib/types'
import { useState } from 'react'

export default function CursosView() {
  const [selectedFilter, setSelectedFilter] = useState<'todos' | 'presencial' | 'online' | 'hibrido'>('todos')

  // Dados de exemplo
  const cursos: Curso[] = [
    {
      id: '1',
      titulo: 'BNCC na Prática - Educação Infantil',
      descricao: 'Implementação da Base Nacional Comum Curricular na Educação Infantil com foco nos Campos de Experiência',
      modalidade: 'presencial',
      cargaHoraria: 20,
      dataInicio: '2025-02-10',
      dataFim: '2025-02-14',
      local: 'Secretaria Municipal de Educação',
      vagas: 50,
      vagasOcupadas: 38,
      instrutor: 'Dra. Maria Silva',
      certificado: true
    },
    {
      id: '2',
      titulo: 'Alfabetização e Letramento',
      descricao: 'Estratégias para alfabetização com base em evidências científicas',
      modalidade: 'hibrido',
      cargaHoraria: 40,
      dataInicio: '2025-03-01',
      dataFim: '2025-04-15',
      local: 'Plataforma Online + 3 encontros presenciais',
      vagas: 80,
      vagasOcupadas: 65,
      instrutor: 'Prof. Dr. João Santos',
      certificado: true
    },
    {
      id: '3',
      titulo: 'Preparação para SAEB - Estratégias Avaliativas',
      descricao: 'Técnicas e metodologias para preparar alunos do 5º ano para avaliações externas',
      modalidade: 'online',
      cargaHoraria: 15,
      dataInicio: '2025-02-20',
      dataFim: '2025-03-05',
      local: 'Plataforma EAD',
      vagas: 100,
      vagasOcupadas: 72,
      instrutor: 'Equipe Técnica INEP',
      certificado: true
    },
    {
      id: '4',
      titulo: 'Tecnologias Digitais na Educação',
      descricao: 'Ferramentas digitais e metodologias ativas para engajamento de alunos',
      modalidade: 'online',
      cargaHoraria: 30,
      dataInicio: '2025-03-10',
      dataFim: '2025-04-20',
      local: 'Plataforma EAD',
      vagas: 120,
      vagasOcupadas: 45,
      instrutor: 'Prof. Carlos Mendes',
      certificado: true
    },
    {
      id: '5',
      titulo: 'Educação Inclusiva: Práticas e Estratégias',
      descricao: 'Atendimento a estudantes com necessidades educacionais especiais',
      modalidade: 'presencial',
      cargaHoraria: 25,
      dataInicio: '2025-04-05',
      dataFim: '2025-04-12',
      local: 'EMEF Francisco Gomes',
      vagas: 40,
      vagasOcupadas: 40,
      instrutor: 'Dra. Ana Paula Costa',
      certificado: true
    },
    {
      id: '6',
      titulo: 'Gestão de Sala de Aula e Convivência',
      descricao: 'Estratégias para criar ambiente de aprendizagem positivo e produtivo',
      modalidade: 'hibrido',
      cargaHoraria: 20,
      dataInicio: '2025-05-10',
      dataFim: '2025-05-30',
      local: 'Plataforma Online + 2 encontros presenciais',
      vagas: 60,
      vagasOcupadas: 28,
      instrutor: 'Prof. Ricardo Alves',
      certificado: true
    }
  ]

  const minhasInscricoes: Inscricao[] = [
    {
      id: '1',
      cursoId: '2',
      usuarioId: 'teacher-1',
      dataInscricao: '2025-01-15',
      status: 'em_andamento',
      progressoPorcentagem: 45,
      certificadoEmitido: false
    },
    {
      id: '2',
      cursoId: '3',
      usuarioId: 'teacher-1',
      dataInscricao: '2025-01-20',
      status: 'concluido',
      progressoPorcentagem: 100,
      certificadoEmitido: true,
      dataConclusao: '2025-02-15'
    }
  ]

  const estatisticas = {
    totalCursos: 18,
    cursosAtivos: 6,
    totalParticipantes: 320,
    taxaConclusao: 87,
    horasFormacao: 450
  }

  const getModalidadeIcon = (modalidade: string) => {
    switch (modalidade) {
      case 'presencial': return <MapPin className="h-5 w-5" />
      case 'online': return <Laptop className="h-5 w-5" />
      case 'hibrido': return <Video className="h-5 w-5" />
      default: return <GraduationCap className="h-5 w-5" />
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
      case 'em_andamento': return 'bg-blue-100 text-blue-700'
      case 'pendente': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const cursosDisponiveis = cursos.filter(curso => {
    if (selectedFilter === 'todos') return true
    return curso.modalidade === selectedFilter
  })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Formação Continuada</h1>
        <p className="text-gray-600">Cursos e capacitações para educadores</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.totalCursos}</div>
          <div className="text-sm text-gray-600">Cursos Oferecidos</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.cursosAtivos}</div>
          <div className="text-sm text-gray-600">Cursos Ativos</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.totalParticipantes}</div>
          <div className="text-sm text-gray-600">Participantes</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-8 w-8 text-orange-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.taxaConclusao}%</div>
          <div className="text-sm text-gray-600">Taxa Conclusão</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-8 w-8 text-teal-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.horasFormacao}h</div>
          <div className="text-sm text-gray-600">Horas de Formação</div>
        </Card>
      </div>

      {/* Tabs Horizontais */}
      <Tabs defaultValue="disponiveis" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="disponiveis">Cursos Disponíveis</TabsTrigger>
          <TabsTrigger value="inscricoes">Minhas Inscrições</TabsTrigger>
          <TabsTrigger value="certificados">Meus Certificados</TabsTrigger>
        </TabsList>

        <TabsContent value="disponiveis">
          {/* Filtros por Modalidade */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <Button
              variant={selectedFilter === 'todos' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('todos')}
              size="sm"
            >
              Todos
            </Button>
            <Button
              variant={selectedFilter === 'presencial' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('presencial')}
              size="sm"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Presencial
            </Button>
            <Button
              variant={selectedFilter === 'online' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('online')}
              size="sm"
            >
              <Laptop className="h-4 w-4 mr-2" />
              Online
            </Button>
            <Button
              variant={selectedFilter === 'hibrido' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('hibrido')}
              size="sm"
            >
              <Video className="h-4 w-4 mr-2" />
              Híbrido
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cursosDisponiveis.map((curso) => (
              <Card key={curso.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{curso.titulo}</h3>
                    <p className="text-sm text-gray-600 mb-3">{curso.descricao}</p>
                  </div>
                  <Badge className={getModalidadeColor(curso.modalidade)}>
                    <span className="flex items-center gap-1">
                      {getModalidadeIcon(curso.modalidade)}
                      {curso.modalidade}
                    </span>
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {curso.cargaHoraria} horas
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(curso.dataInicio).toLocaleDateString('pt-BR')} até {new Date(curso.dataFim).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {curso.vagasOcupadas}/{curso.vagas} vagas
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    {curso.instrutor}
                  </div>
                </div>

                {/* Barra de Vagas */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        curso.vagasOcupadas === curso.vagas 
                          ? 'bg-red-500' 
                          : curso.vagasOcupadas / curso.vagas > 0.8 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${(curso.vagasOcupadas / curso.vagas) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {curso.vagasOcupadas === curso.vagas 
                      ? 'Vagas esgotadas' 
                      : `${curso.vagas - curso.vagasOcupadas} vagas disponíveis`}
                  </p>
                </div>

                <Button 
                  className="w-full" 
                  disabled={curso.vagasOcupadas === curso.vagas}
                >
                  {curso.vagasOcupadas === curso.vagas ? 'Vagas Esgotadas' : 'Inscrever-se'}
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inscricoes">
          <div className="space-y-4">
            {minhasInscricoes.map((inscricao) => {
              const curso = cursos.find(c => c.id === inscricao.cursoId)
              if (!curso) return null

              return (
                <Card key={inscricao.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{curso.titulo}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getModalidadeColor(curso.modalidade)}>
                          {curso.modalidade}
                        </Badge>
                        <Badge className={getStatusColor(inscricao.status)}>
                          {inscricao.status === 'concluido' ? 'Concluído' : 'Em Andamento'}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{inscricao.progressoPorcentagem}%</div>
                      <div className="text-sm text-gray-500">Progresso</div>
                    </div>
                  </div>

                  {/* Barra de Progresso */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-blue-600"
                        style={{ width: `${inscricao.progressoPorcentagem}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>Inscrito em: {new Date(inscricao.dataInscricao).toLocaleDateString('pt-BR')}</span>
                    {inscricao.dataConclusao && (
                      <span>Concluído em: {new Date(inscricao.dataConclusao).toLocaleDateString('pt-BR')}</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Acessar Curso
                    </Button>
                    {inscricao.certificadoEmitido && (
                      <Button className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Ver Certificado
                      </Button>
                    )}
                  </div>
                </Card>
              )
            })}

            {minhasInscricoes.length === 0 && (
              <Card className="p-12 text-center">
                <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Nenhuma inscrição ainda</h3>
                <p className="text-gray-500 mb-4">Explore os cursos disponíveis e comece sua jornada de aprendizado</p>
                <Button>Explorar Cursos</Button>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="certificados">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {minhasInscricoes.filter(i => i.certificadoEmitido).map((inscricao) => {
              const curso = cursos.find(c => c.id === inscricao.cursoId)
              if (!curso) return null

              return (
                <Card key={inscricao.id} className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-center text-lg mb-2">{curso.titulo}</h3>
                  <p className="text-center text-sm text-gray-600 mb-4">
                    Concluído em {inscricao.dataConclusao && new Date(inscricao.dataConclusao).toLocaleDateString('pt-BR')}
                  </p>
                  <div className="text-center text-sm text-gray-600 mb-4">
                    <span className="font-semibold">{curso.cargaHoraria} horas</span> de formação
                  </div>
                  <Button className="w-full">
                    Baixar Certificado
                  </Button>
                </Card>
              )
            })}

            {minhasInscricoes.filter(i => i.certificadoEmitido).length === 0 && (
              <Card className="p-12 text-center col-span-2">
                <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Nenhum certificado ainda</h3>
                <p className="text-gray-500">Complete seus cursos para receber certificados</p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
