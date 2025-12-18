import { BarChart3, Download, FileText, TrendingUp, Users, School, Filter } from 'lucide-react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import type { RelatorioTurma, RelatorioEscola } from '../lib/types'
import { useState } from 'react'

export default function RelatoriosView() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-2')

  // Dados de exemplo
  const relatorioRede = {
    periodo: '2º Semestre 2024',
    totalEstudantes: 3340,
    escolasParticipantes: 6,
    mediaGeralRede: 7.2,
    proficienciaTRIMedia: 245,
    taxaFrequencia: 94,
    evolucaoAnual: '+8.5%'
  }

  const relatoriosEscola: RelatorioEscola[] = [
    {
      id: '1',
      escolaId: 'escola-1',
      escolaNome: 'EMEF Francisco Gomes',
      periodo: '2024-2',
      totalAlunos: 420,
      totalTurmas: 12,
      mediaGeral: 7.8,
      proficienciaTRIMedia: 265,
      taxaFrequencia: 96,
      distribuicaoProficiencia: {
        abaixo_basico: 8,
        basico: 28,
        adequado: 42,
        avancado: 22
      },
      disciplinas: {
        'Língua Portuguesa': 7.6,
        'Matemática': 7.9,
        'Ciências': 7.7,
        'História': 8.0
      }
    },
    {
      id: '2',
      escolaId: 'escola-2',
      escolaNome: 'EMEF Padre Mário Lano',
      periodo: '2024-2',
      totalAlunos: 350,
      totalTurmas: 10,
      mediaGeral: 7.5,
      proficienciaTRIMedia: 255,
      taxaFrequencia: 95,
      distribuicaoProficiencia: {
        abaixo_basico: 10,
        basico: 30,
        adequado: 40,
        avancado: 20
      },
      disciplinas: {
        'Língua Portuguesa': 7.3,
        'Matemática': 7.6,
        'Ciências': 7.5,
        'História': 7.6
      }
    },
    {
      id: '3',
      escolaId: 'escola-3',
      escolaNome: 'EMEF Vera Lucia Vitali',
      periodo: '2024-2',
      totalAlunos: 380,
      totalTurmas: 11,
      mediaGeral: 7.1,
      proficienciaTRIMedia: 240,
      taxaFrequencia: 93,
      distribuicaoProficiencia: {
        abaixo_basico: 12,
        basico: 32,
        adequado: 38,
        avancado: 18
      },
      disciplinas: {
        'Língua Portuguesa': 6.9,
        'Matemática': 7.2,
        'Ciências': 7.0,
        'História': 7.3
      }
    },
    {
      id: '4',
      escolaId: 'escola-4',
      escolaNome: 'EMEF Vicencina Morsoleto',
      periodo: '2024-2',
      totalAlunos: 310,
      totalTurmas: 9,
      mediaGeral: 6.9,
      proficienciaTRIMedia: 235,
      taxaFrequencia: 92,
      distribuicaoProficiencia: {
        abaixo_basico: 15,
        basico: 35,
        adequado: 35,
        avancado: 15
      },
      disciplinas: {
        'Língua Portuguesa': 6.7,
        'Matemática': 7.0,
        'Ciências': 6.8,
        'História': 7.1
      }
    }
  ]

  const relatoriosTurma: RelatorioTurma[] = [
    {
      id: '1',
      turmaId: 'turma-1',
      turmaNome: '5º ano A',
      turmaIdentificacao: '5º ano A - EMEF Francisco Gomes',
      professorResponsavel: 'Maria Silva',
      totalAlunos: 32,
      mediaGeral: 8.1,
      proficienciaTRIMedia: 275,
      taxaFrequencia: 97,
      distribuicaoProficiencia: {
        abaixo_basico: 6,
        basico: 25,
        adequado: 44,
        avancado: 25
      },
      disciplinas: {
        'Língua Portuguesa': 7.9,
        'Matemática': 8.2,
        'Ciências': 8.0,
        'História': 8.3
      }
    },
    {
      id: '2',
      turmaId: 'turma-2',
      turmaNome: '4º ano B',
      turmaIdentificacao: '4º ano B - EMEF Padre Mário Lano',
      professorResponsavel: 'João Santos',
      totalAlunos: 28,
      mediaGeral: 7.4,
      proficienciaTRIMedia: 252,
      taxaFrequencia: 94,
      distribuicaoProficiencia: {
        abaixo_basico: 11,
        basico: 32,
        adequado: 39,
        avancado: 18
      },
      disciplinas: {
        'Língua Portuguesa': 7.2,
        'Matemática': 7.5,
        'Ciências': 7.3,
        'História': 7.6
      }
    }
  ]

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'abaixo_basico': return 'bg-red-500'
      case 'basico': return 'bg-yellow-500'
      case 'adequado': return 'bg-green-500'
      case 'avancado': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getMediaColor = (media: number) => {
    if (media >= 8) return 'text-green-600'
    if (media >= 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Relatórios Gerenciais</h1>
        <p className="text-gray-600">Análise de desempenho da rede, escolas e turmas</p>
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
          <option value="2024-anual">Anual 2024</option>
          <option value="2025-1">1º Semestre 2025</option>
        </select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtros Avançados
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar PDF
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Excel
        </Button>
      </div>

      {/* Tabs Horizontais */}
      <Tabs defaultValue="rede" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="rede">Relatório da Rede</TabsTrigger>
          <TabsTrigger value="escolas">Relatórios por Escola</TabsTrigger>
          <TabsTrigger value="turmas">Relatórios por Turma</TabsTrigger>
        </TabsList>

        <TabsContent value="rede">
          {/* Cards Resumo Rede */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold">{relatorioRede.totalEstudantes}</div>
              <div className="text-sm text-gray-600">Estudantes</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <School className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold">{relatorioRede.escolasParticipantes}</div>
              <div className="text-sm text-gray-600">Escolas</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold">{relatorioRede.mediaGeralRede}</div>
              <div className="text-sm text-gray-600">Média Geral</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold">{relatorioRede.proficienciaTRIMedia}</div>
              <div className="text-sm text-gray-600">Proficiência TRI</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
              <div className="text-2xl font-bold">{relatorioRede.taxaFrequencia}%</div>
              <div className="text-sm text-gray-600">Frequência</div>
            </Card>

            <Card className="p-4 bg-linear-to-br from-green-50 to-green-100">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">{relatorioRede.evolucaoAnual}</div>
              <div className="text-sm text-gray-600">Evolução Anual</div>
            </Card>
          </div>

          {/* Ranking de Escolas */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Ranking de Escolas por Desempenho</h3>
            <div className="space-y-4">
              {relatoriosEscola
                .sort((a, b) => b.mediaGeral - a.mediaGeral)
                .map((escola, index) => (
                  <div key={escola.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}º
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{escola.escolaNome}</h4>
                      <p className="text-sm text-gray-600">{escola.totalAlunos} alunos</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getMediaColor(escola.mediaGeral)}`}>
                        {escola.mediaGeral}
                      </div>
                      <div className="text-sm text-gray-500">Média</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-600">{escola.proficienciaTRIMedia}</div>
                      <div className="text-sm text-gray-500">TRI</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">{escola.taxaFrequencia}%</div>
                      <div className="text-sm text-gray-500">Freq.</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                ))}
            </div>
          </Card>

          {/* Distribuição Geral de Proficiência */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Distribuição de Proficiência da Rede</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Abaixo do Básico</span>
                  <span className="text-sm text-gray-600">11% (367 alunos)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-red-500 h-3 rounded-full" style={{ width: '11%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Básico</span>
                  <span className="text-sm text-gray-600">31% (1035 alunos)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '31%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Adequado</span>
                  <span className="text-sm text-gray-600">39% (1303 alunos)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '39%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Avançado</span>
                  <span className="text-sm text-gray-600">19% (635 alunos)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: '19%' }} />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="escolas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatoriosEscola.map((escola) => (
              <Card key={escola.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{escola.escolaNome}</h3>
                    <p className="text-sm text-gray-600">{escola.totalAlunos} alunos • {escola.periodo}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getMediaColor(escola.mediaGeral)}`}>
                      {escola.mediaGeral}
                    </div>
                    <div className="text-sm text-gray-500">Média</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-sm text-gray-600">Proficiência TRI</div>
                    <div className="text-2xl font-bold text-purple-600">{escola.proficienciaTRIMedia}</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">Frequência</div>
                    <div className="text-2xl font-bold text-green-600">{escola.taxaFrequencia}%</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-3">Desempenho por Disciplina</h4>
                  <div className="space-y-2">
                    {Object.entries(escola.disciplinas).map(([disciplina, nota]) => (
                      <div key={disciplina} className="flex items-center justify-between text-sm">
                        <span>{disciplina}</span>
                        <span className={`font-bold ${getMediaColor(nota)}`}>{nota}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-3">Distribuição de Proficiência</h4>
                  <div className="flex gap-2">
                    {Object.entries(escola.distribuicaoProficiencia).map(([nivel, percentual]) => (
                      <div key={nivel} className="flex-1">
                        <div className={`h-20 rounded-t ${getNivelColor(nivel)}`} style={{ height: `${percentual * 2}px` }} />
                        <div className="text-center text-xs mt-1 font-semibold">{percentual}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Relatório Completo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="turmas">
          <div className="space-y-6">
            {relatoriosTurma.map((turma) => (
              <Card key={turma.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{turma.turmaIdentificacao}</h3>
                    <p className="text-sm text-gray-600">
                      {turma.totalAlunos} alunos • Prof. {turma.professorResponsavel}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getMediaColor(turma.mediaGeral)}`}>
                      {turma.mediaGeral}
                    </div>
                    <div className="text-sm text-gray-500">Média Geral</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Proficiência TRI</div>
                    <div className="text-2xl font-bold text-purple-600">{turma.proficienciaTRIMedia}</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Frequência</div>
                    <div className="text-2xl font-bold text-green-600">{turma.taxaFrequencia}%</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Alunos</div>
                    <div className="text-2xl font-bold text-blue-600">{turma.totalAlunos}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Desempenho por Disciplina</h4>
                    <div className="space-y-3">
                      {Object.entries(turma.disciplinas).map(([disciplina, nota]) => (
                        <div key={disciplina}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{disciplina}</span>
                            <span className={`font-bold ${getMediaColor(nota)}`}>{nota}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${nota >= 8 ? 'bg-green-500' : nota >= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${(nota / 10) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-3">Distribuição de Proficiência</h4>
                    <div className="space-y-2">
                      {Object.entries(turma.distribuicaoProficiencia).map(([nivel, percentual]) => (
                        <div key={nivel}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="capitalize">{nivel.replace('_', ' ')}</span>
                            <span className="font-semibold">{percentual}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getNivelColor(nivel)}`}
                              style={{ width: `${percentual}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button variant="outline" className="flex-1" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Relatório Completo
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Ver Lista de Alunos
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
