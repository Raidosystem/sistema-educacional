import { Target, BookOpen, Calculator, FileText, TrendingUp, Clock, Award } from 'lucide-react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { useState } from 'react'

interface MaterialSAEB {
  id: string
  titulo: string
  disciplina: 'Língua Portuguesa' | 'Matemática'
  tipo: 'simulado' | 'descritores' | 'exercicios' | 'estrategias'
  anoEscolar: '4º ano' | '5º ano'
  descricao: string
  questoes?: number
  formato: 'pdf' | 'online'
}

export default function PreparacaoSAEBView() {
  const [selectedAno, setSelectedAno] = useState<'4º ano' | '5º ano' | 'todos'>('todos')

  const materiais: MaterialSAEB[] = [
    {
      id: '1',
      titulo: 'Simulado SAEB 2024 - Língua Portuguesa',
      disciplina: 'Língua Portuguesa',
      tipo: 'simulado',
      anoEscolar: '5º ano',
      descricao: 'Simulado completo com 20 questões baseadas na Matriz de Referência SAEB',
      questoes: 20,
      formato: 'pdf'
    },
    {
      id: '2',
      titulo: 'Simulado SAEB 2024 - Matemática',
      disciplina: 'Matemática',
      tipo: 'simulado',
      anoEscolar: '5º ano',
      descricao: 'Simulado completo com 20 questões baseadas na Matriz de Referência SAEB',
      questoes: 20,
      formato: 'pdf'
    },
    {
      id: '3',
      titulo: 'Descritores de Leitura - D1 a D12',
      disciplina: 'Língua Portuguesa',
      tipo: 'descritores',
      anoEscolar: '5º ano',
      descricao: 'Atividades práticas para trabalhar todos os descritores de leitura',
      formato: 'pdf'
    },
    {
      id: '4',
      titulo: 'Descritores de Matemática - D13 a D28',
      disciplina: 'Matemática',
      tipo: 'descritores',
      anoEscolar: '5º ano',
      descricao: 'Exercícios organizados por descritores da Matriz SAEB',
      formato: 'pdf'
    },
    {
      id: '5',
      titulo: 'Estratégias de Resolução de Problemas',
      disciplina: 'Matemática',
      tipo: 'estrategias',
      anoEscolar: '4º ano',
      descricao: 'Guia com estratégias para resolver diferentes tipos de problemas matemáticos',
      formato: 'pdf'
    },
    {
      id: '6',
      titulo: 'Técnicas de Interpretação de Texto',
      disciplina: 'Língua Portuguesa',
      tipo: 'estrategias',
      anoEscolar: '4º ano',
      descricao: 'Metodologias para melhorar a compreensão leitora dos estudantes',
      formato: 'pdf'
    }
  ]

  const estatisticas = {
    simuladosDisponiveis: 8,
    totalDescritores: 28,
    alunosPreparados: 340,
    mediaSimulados: 6.8,
    metaIDEB: 5.8,
    projecaoAtual: 6.1
  }

  const descritoresPortugues = [
    { codigo: 'D1', descricao: 'Localizar informações explícitas em um texto', trabalhado: true },
    { codigo: 'D3', descricao: 'Inferir o sentido de uma palavra ou expressão', trabalhado: true },
    { codigo: 'D4', descricao: 'Inferir uma informação implícita em um texto', trabalhado: true },
    { codigo: 'D6', descricao: 'Identificar o tema de um texto', trabalhado: true },
    { codigo: 'D11', descricao: 'Distinguir um fato da opinião relativa a esse fato', trabalhado: false }
  ]

  const descritoresMatematica = [
    { codigo: 'D13', descricao: 'Reconhecer e utilizar características do sistema de numeração decimal', trabalhado: true },
    { codigo: 'D17', descricao: 'Calcular o resultado de uma adição ou subtração de números naturais', trabalhado: true },
    { codigo: 'D19', descricao: 'Resolver problema com números naturais, envolvendo diferentes significados da multiplicação ou divisão', trabalhado: true },
    { codigo: 'D28', descricao: 'Reconhecer a composição e a decomposição de números naturais', trabalhado: false }
  ]

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'simulado': return 'bg-purple-100 text-purple-700'
      case 'descritores': return 'bg-blue-100 text-blue-700'
      case 'exercicios': return 'bg-green-100 text-green-700'
      case 'estrategias': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const materiaisFiltrados = materiais.filter(m => 
    selectedAno === 'todos' || m.anoEscolar === selectedAno
  )

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Preparação SAEB</h1>
        <p className="text-gray-600">Materiais e simulados para 4º e 5º ano</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.simuladosDisponiveis}</div>
          <div className="text-sm text-gray-600">Simulados</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.totalDescritores}</div>
          <div className="text-sm text-gray-600">Descritores</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.alunosPreparados}</div>
          <div className="text-sm text-gray-600">Alunos</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.mediaSimulados}</div>
          <div className="text-sm text-gray-600">Média Simulados</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Award className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.metaIDEB}</div>
          <div className="text-sm text-gray-600">Meta IDEB</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">{estatisticas.projecaoAtual}</div>
          <div className="text-sm text-gray-600">Projeção Atual</div>
        </Card>
      </div>

      {/* Filtro de Ano */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={selectedAno === 'todos' ? 'default' : 'outline'}
          onClick={() => setSelectedAno('todos')}
          size="sm"
        >
          Todos os Anos
        </Button>
        <Button
          variant={selectedAno === '4º ano' ? 'default' : 'outline'}
          onClick={() => setSelectedAno('4º ano')}
          size="sm"
        >
          4º Ano
        </Button>
        <Button
          variant={selectedAno === '5º ano' ? 'default' : 'outline'}
          onClick={() => setSelectedAno('5º ano')}
          size="sm"
        >
          5º Ano
        </Button>
      </div>

      {/* Tabs Horizontais */}
      <Tabs defaultValue="materiais" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="materiais">Materiais e Simulados</TabsTrigger>
          <TabsTrigger value="descritores">Matriz de Descritores</TabsTrigger>
          <TabsTrigger value="desempenho">Acompanhamento de Desempenho</TabsTrigger>
        </TabsList>

        <TabsContent value="materiais">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {materiaisFiltrados.map((material) => (
              <Card key={material.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{material.titulo}</h3>
                    <p className="text-sm text-gray-600 mb-3">{material.descricao}</p>
                  </div>
                  <Badge className={getTipoColor(material.tipo)}>
                    {material.tipo}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    {material.disciplina === 'Língua Portuguesa' ? (
                      <BookOpen className="h-4 w-4 mr-2" />
                    ) : (
                      <Calculator className="h-4 w-4 mr-2" />
                    )}
                    {material.disciplina}
                  </div>
                  <Badge variant="outline">{material.anoEscolar}</Badge>
                  {material.questoes && (
                    <span>{material.questoes} questões</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button className="flex-1">
                    Baixar PDF
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="descritores">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Língua Portuguesa */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold">Língua Portuguesa</h3>
                  <p className="text-sm text-gray-600">Descritores trabalhados</p>
                </div>
              </div>

              <div className="space-y-3">
                {descritoresPortugues.map((descritor) => (
                  <div key={descritor.codigo} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      descritor.trabalhado ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {descritor.trabalhado && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-1">{descritor.codigo}</div>
                      <div className="text-xs text-gray-600">{descritor.descricao}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-semibold text-green-800">
                  Progresso: {descritoresPortugues.filter(d => d.trabalhado).length}/{descritoresPortugues.length} descritores
                </div>
                <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(descritoresPortugues.filter(d => d.trabalhado).length / descritoresPortugues.length) * 100}%` }}
                  />
                </div>
              </div>

              <Button className="w-full mt-4">
                <FileText className="h-4 w-4 mr-2" />
                Ver Matriz Completa
              </Button>
            </Card>

            {/* Matemática */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold">Matemática</h3>
                  <p className="text-sm text-gray-600">Descritores trabalhados</p>
                </div>
              </div>

              <div className="space-y-3">
                {descritoresMatematica.map((descritor) => (
                  <div key={descritor.codigo} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      descritor.trabalhado ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      {descritor.trabalhado && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-1">{descritor.codigo}</div>
                      <div className="text-xs text-gray-600">{descritor.descricao}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-semibold text-blue-800">
                  Progresso: {descritoresMatematica.filter(d => d.trabalhado).length}/{descritoresMatematica.length} descritores
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(descritoresMatematica.filter(d => d.trabalhado).length / descritoresMatematica.length) * 100}%` }}
                  />
                </div>
              </div>

              <Button className="w-full mt-4">
                <FileText className="h-4 w-4 mr-2" />
                Ver Matriz Completa
              </Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="desempenho">
          <div className="space-y-6">
            {/* Meta IDEB */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
              <h3 className="text-lg font-semibold mb-4">Meta IDEB 2024</h3>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">5.8</div>
                  <div className="text-sm text-gray-600">Meta Estabelecida</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">6.1</div>
                  <div className="text-sm text-gray-600">Projeção Atual</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">+5.2%</div>
                  <div className="text-sm text-gray-600">Acima da Meta</div>
                </div>
              </div>
            </Card>

            {/* Evolução dos Simulados */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Evolução nos Simulados 2024</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700">Língua Portuguesa</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">1º Simulado (Fev)</span>
                      <span className="font-bold">6.2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">2º Simulado (Mai)</span>
                      <span className="font-bold">6.5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">3º Simulado (Ago)</span>
                      <span className="font-bold">6.8</span>
                    </div>
                    <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                      <span className="text-sm font-semibold">4º Simulado (Nov)</span>
                      <span className="font-bold text-green-600">7.1</span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-green-100 rounded text-center">
                    <span className="text-sm font-semibold text-green-800">Evolução: +14.5%</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-blue-700">Matemática</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">1º Simulado (Fev)</span>
                      <span className="font-bold">6.0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">2º Simulado (Mai)</span>
                      <span className="font-bold">6.3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">3º Simulado (Ago)</span>
                      <span className="font-bold">6.6</span>
                    </div>
                    <div className="flex justify-between items-center bg-blue-50 p-2 rounded">
                      <span className="text-sm font-semibold">4º Simulado (Nov)</span>
                      <span className="font-bold text-blue-600">6.9</span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-blue-100 rounded text-center">
                    <span className="text-sm font-semibold text-blue-800">Evolução: +15.0%</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recomendações */}
            <Card className="p-6 bg-yellow-50 border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold mb-3 text-yellow-900">Recomendações</h3>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Reforçar descritores D11 (Língua Portuguesa) e D28 (Matemática) ainda não trabalhados</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Aplicar mais simulados para familiarizar os alunos com o formato da prova</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Realizar intervenções específicas com alunos abaixo da proficiência básica</span>
                </li>
              </ul>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
