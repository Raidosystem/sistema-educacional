import { BarChart3, TrendingUp, Users, FileText, Download, Calendar, Filter } from 'lucide-react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import type { Avaliacao, ResultadoAvaliacao } from '../lib/types'
import { useState } from 'react'

export default function AvaliacoesAvancadasView() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-2')

  // Dados de exemplo
  const avaliacoes: Avaliacao[] = [
    {
      id: '1',
      titulo: 'Simulado SAEB - Matemática',
      tipo: 'simulado',
      disciplina: 'Matemática',
      anoEscolar: '5º ano',
      dataAplicacao: '2024-11-15',
      questoes: [],
      matrizSAEB: true
    },
    {
      id: '2',
      titulo: 'Simulado SAEB - Língua Portuguesa',
      tipo: 'simulado',
      disciplina: 'Língua Portuguesa',
      anoEscolar: '5º ano',
      dataAplicacao: '2024-11-20',
      questoes: [],
      matrizSAEB: true
    },
    {
      id: '3',
      titulo: 'Avaliação Diagnóstica - Alfabetização',
      tipo: 'diagnostica',
      disciplina: 'Língua Portuguesa',
      anoEscolar: '1º ano',
      dataAplicacao: '2024-02-10',
      questoes: [],
      matrizSAEB: false
    },
    {
      id: '4',
      titulo: 'Avaliação Diagnóstica Final - Alfabetização',
      tipo: 'diagnostica',
      disciplina: 'Língua Portuguesa',
      anoEscolar: '1º ano',
      dataAplicacao: '2024-12-05',
      questoes: [],
      matrizSAEB: false
    }
  ]

  const resultadosGerais = {
    totalAvaliacoesAplicadas: 12,
    totalParticipantes: 850,
    mediaGeralRede: 7.2,
    proficienciaTRIMedia: 245,
    taxaParticipacao: 94
  }

  const distribuicaoProficiencia = [
    { nivel: 'Abaixo do Básico', quantidade: 85, percentual: 10 },
    { nivel: 'Básico', quantidade: 255, percentual: 30 },
    { nivel: 'Adequado', quantidade: 340, percentual: 40 },
    { nivel: 'Avançado', quantidade: 170, percentual: 20 }
  ]

  const resultadosPorEscola = [
    { id: '1', nome: 'EMEF Francisco Gomes', media: 7.8, proficiencia: 265, participantes: 120 },
    { id: '2', nome: 'EMEF Padre Mário Lano', media: 7.5, proficiencia: 255, participantes: 95 },
    { id: '3', nome: 'EMEF Vera Lucia Vitali', media: 7.1, proficiencia: 240, participantes: 110 },
    { id: '4', nome: 'EMEF Vicencina Morsoleto', media: 6.9, proficiencia: 235, participantes: 88 }
  ]

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'simulado': return 'bg-purple-100 text-purple-700'
      case 'diagnostica': return 'bg-blue-100 text-blue-700'
      case 'formativa': return 'bg-green-100 text-green-700'
      case 'somativa': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Abaixo do Básico': return 'bg-red-500'
      case 'Básico': return 'bg-yellow-500'
      case 'Adequado': return 'bg-green-500'
      case 'Avançado': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Plataforma de Avaliações</h1>
        <p className="text-gray-600">Resultados, análises e relatórios de desempenho</p>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-500" />
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
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtros Avançados
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold">{resultadosGerais.totalAvaliacoesAplicadas}</div>
          <div className="text-sm text-gray-600">Avaliações Aplicadas</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold">{resultadosGerais.totalParticipantes}</div>
          <div className="text-sm text-gray-600">Participantes</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-2xl font-bold">{resultadosGerais.mediaGeralRede}</div>
          <div className="text-sm text-gray-600">Média Geral</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
          <div className="text-2xl font-bold">{resultadosGerais.proficienciaTRIMedia}</div>
          <div className="text-sm text-gray-600">Proficiência TRI</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-teal-600" />
          </div>
          <div className="text-2xl font-bold">{resultadosGerais.taxaParticipacao}%</div>
          <div className="text-sm text-gray-600">Taxa Participação</div>
        </Card>
      </div>

      {/* Tabs Horizontais */}
      <Tabs defaultValue="avaliacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          <TabsTrigger value="resultados">Resultados por Escola</TabsTrigger>
          <TabsTrigger value="distribuicao">Distribuição de Proficiência</TabsTrigger>
          <TabsTrigger value="comparativo">Análise Comparativa</TabsTrigger>
        </TabsList>

        <TabsContent value="avaliacoes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {avaliacoes.map((avaliacao) => (
              <Card key={avaliacao.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{avaliacao.titulo}</h3>
                    <p className="text-sm text-gray-600 mb-2">{avaliacao.disciplina} • {avaliacao.anoEscolar}</p>
                  </div>
                  <Badge className={getTipoColor(avaliacao.tipo)}>
                    {avaliacao.tipo}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(avaliacao.dataAplicacao).toLocaleDateString('pt-BR')}
                  </span>
                  {avaliacao.matrizSAEB && (
                    <Badge variant="outline" className="text-xs">Matriz SAEB</Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Ver Resultados
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resultados">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Desempenho por Escola</h3>
            <div className="space-y-4">
              {resultadosPorEscola.map((escola, index) => (
                <div key={escola.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{escola.nome}</h4>
                    <p className="text-sm text-gray-600">{escola.participantes} participantes</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{escola.media}</div>
                    <div className="text-sm text-gray-500">Média</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">{escola.proficiencia}</div>
                    <div className="text-sm text-gray-500">TRI</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="distribuicao">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Distribuição de Proficiência (SAEB)</h3>
            <div className="space-y-4">
              {distribuicaoProficiencia.map((nivel) => (
                <div key={nivel.nivel}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{nivel.nivel}</span>
                    <span className="text-sm text-gray-600">
                      {nivel.quantidade} alunos ({nivel.percentual}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${getNivelColor(nivel.nivel)}`}
                      style={{ width: `${nivel.percentual}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Interpretação dos Níveis</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li><strong>Abaixo do Básico:</strong> Alunos que precisam de intervenção imediata</li>
                <li><strong>Básico:</strong> Alunos com domínio parcial das habilidades</li>
                <li><strong>Adequado:</strong> Alunos que dominam as habilidades esperadas</li>
                <li><strong>Avançado:</strong> Alunos com desempenho além do esperado</li>
              </ul>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="comparativo">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Análise Comparativa</h3>
            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <h4 className="font-semibold mb-2">Comparativo com Meta IDEB</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">5.8</div>
                    <div className="text-sm text-gray-600">Meta IDEB 2024</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">6.1</div>
                    <div className="text-sm text-gray-600">Resultado Atual</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">+5.2%</div>
                    <div className="text-sm text-gray-600">Acima da Meta</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <h4 className="font-semibold mb-2">Evolução Temporal</h4>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold">5.4</div>
                    <div className="text-xs text-gray-600">2022</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">5.7</div>
                    <div className="text-xs text-gray-600">2023</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">6.1</div>
                    <div className="text-xs text-gray-600">2024</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">+12.9%</div>
                    <div className="text-xs text-gray-600">Crescimento</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <h4 className="font-semibold mb-2">Comparativo Regional</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Município de Guaíra</span>
                    <span className="font-bold text-green-600">6.1</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Média Estadual SP</span>
                    <span>5.8</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Média Nacional</span>
                    <span>5.5</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
