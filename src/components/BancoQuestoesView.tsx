import { BookOpen, Filter, Plus, Search, Star, TrendingUp, FileText } from 'lucide-react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import type { Questao } from '../lib/types'
import { useState } from 'react'

export default function BancoQuestoesView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDisciplina, setSelectedDisciplina] = useState<string>('todas')
  const [selectedDificuldade, setSelectedDificuldade] = useState<string>('todas')

  // Dados de exemplo
  const questoes: Questao[] = [
    {
      id: '1',
      enunciado: 'Leia o texto abaixo e responda: "A água é fundamental para a vida no planeta..." Qual é a ideia principal do texto?',
      disciplina: 'Língua Portuguesa',
      anoEscolar: '5º ano',
      habilidadeBNCC: 'EF05LP08',
      dificuldade: 'medio',
      tipo: 'multipla_escolha',
      alternativas: [
        'A água é importante',
        'O planeta precisa de água',
        'A água é fundamental para a vida',
        'Todos precisam beber água'
      ],
      gabarito: 'C',
      estatisticas: {
        vezesAplicada: 45,
        taxaAcerto: 71,
        discriminacao: 0.45
      },
      tags: ['leitura', 'interpretação', 'texto informativo']
    },
    {
      id: '2',
      enunciado: 'Resolva: 345 + 678 =',
      disciplina: 'Matemática',
      anoEscolar: '3º ano',
      habilidadeBNCC: 'EF03MA06',
      dificuldade: 'facil',
      tipo: 'multipla_escolha',
      alternativas: ['923', '1.023', '1.123', '1.013'],
      gabarito: 'B',
      estatisticas: {
        vezesAplicada: 60,
        taxaAcerto: 85,
        discriminacao: 0.60
      },
      tags: ['adição', 'operações básicas']
    },
    {
      id: '3',
      enunciado: 'Uma loja vendeu 5 caixas com 12 lápis cada. Quantos lápis foram vendidos ao todo?',
      disciplina: 'Matemática',
      anoEscolar: '4º ano',
      habilidadeBNCC: 'EF04MA07',
      dificuldade: 'medio',
      tipo: 'multipla_escolha',
      alternativas: ['50', '60', '70', '17'],
      gabarito: 'B',
      estatisticas: {
        vezesAplicada: 38,
        taxaAcerto: 58,
        discriminacao: 0.38
      },
      tags: ['multiplicação', 'problema']
    },
    {
      id: '4',
      enunciado: 'Complete a palavra: O ___ato estava dormindo. (use G ou J)',
      disciplina: 'Língua Portuguesa',
      anoEscolar: '2º ano',
      habilidadeBNCC: 'EF02LP02',
      dificuldade: 'facil',
      tipo: 'dissertativa',
      gabarito: 'G',
      estatisticas: {
        vezesAplicada: 52,
        taxaAcerto: 85,
        discriminacao: 0.52
      },
      tags: ['ortografia', 'g/j']
    },
    {
      id: '5',
      enunciado: 'Analise a frase: "Os meninos correu para escola." O que está errado?',
      disciplina: 'Língua Portuguesa',
      anoEscolar: '5º ano',
      habilidadeBNCC: 'EF05LP07',
      dificuldade: 'dificil',
      tipo: 'multipla_escolha',
      alternativas: [
        'A concordância nominal',
        'A concordância verbal',
        'A pontuação',
        'Nada está errado'
      ],
      gabarito: 'B',
      estatisticas: {
        vezesAplicada: 28,
        taxaAcerto: 50,
        discriminacao: 0.28
      },
      tags: ['gramática', 'concordância verbal']
    },
    {
      id: '6',
      enunciado: 'Qual fração representa a parte pintada? [Imagem: 3 de 4 partes pintadas]',
      disciplina: 'Matemática',
      anoEscolar: '5º ano',
      habilidadeBNCC: 'EF05MA03',
      dificuldade: 'medio',
      tipo: 'multipla_escolha',
      alternativas: ['1/4', '2/4', '3/4', '4/3'],
      gabarito: 'C',
      estatisticas: {
        vezesAplicada: 42,
        taxaAcerto: 71,
        discriminacao: 0.42
      },
      tags: ['frações', 'representação']
    }
  ]

  const estatisticas = {
    totalQuestoes: 284,
    questoesPortugues: 142,
    questoesMatematica: 142,
    avaliacoesGeradas: 18,
    questoesMaisUsadas: 45
  }

  const getDificuldadeColor = (dificuldade: string) => {
    switch (dificuldade) {
      case 'facil': return 'bg-green-100 text-green-700'
      case 'media': return 'bg-yellow-100 text-yellow-700'
      case 'dificil': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTaxaColor = (taxa: number) => {
    if (taxa >= 75) return 'text-green-600'
    if (taxa >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const questoesFiltradas = questoes.filter(questao => {
    const matchSearch = questao.enunciado.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       questao.habilidadeBNCC.toLowerCase().includes(searchTerm.toLowerCase())
    const matchDisciplina = selectedDisciplina === 'todas' || questao.disciplina === selectedDisciplina
    const matchDificuldade = selectedDificuldade === 'todas' || questao.dificuldade === selectedDificuldade
    return matchSearch && matchDisciplina && matchDificuldade
  })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Banco de Questões</h1>
        <p className="text-gray-600">Repositório de questões alinhadas à BNCC</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.totalQuestoes}</div>
          <div className="text-sm text-gray-600">Total de Questões</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <FileText className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.questoesPortugues}</div>
          <div className="text-sm text-gray-600">Língua Portuguesa</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.questoesMatematica}</div>
          <div className="text-sm text-gray-600">Matemática</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <FileText className="h-8 w-8 text-orange-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.avaliacoesGeradas}</div>
          <div className="text-sm text-gray-600">Avaliações Geradas</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.questoesMaisUsadas}</div>
          <div className="text-sm text-gray-600">Mais Aplicadas</div>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Buscar por enunciado ou código BNCC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select
          value={selectedDisciplina}
          onChange={(e) => setSelectedDisciplina(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white"
        >
          <option value="todas">Todas as Disciplinas</option>
          <option value="Língua Portuguesa">Língua Portuguesa</option>
          <option value="Matemática">Matemática</option>
        </select>
        <select
          value={selectedDificuldade}
          onChange={(e) => setSelectedDificuldade(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white"
        >
          <option value="todas">Todas as Dificuldades</option>
          <option value="facil">Fácil</option>
          <option value="media">Média</option>
          <option value="dificil">Difícil</option>
        </select>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Questão
        </Button>
      </div>

      {/* Tabs Horizontais */}
      <Tabs defaultValue="todas" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="todas">Todas as Questões</TabsTrigger>
          <TabsTrigger value="portugues">Língua Portuguesa</TabsTrigger>
          <TabsTrigger value="matematica">Matemática</TabsTrigger>
          <TabsTrigger value="gerador">Gerador de Avaliações</TabsTrigger>
        </TabsList>

        <TabsContent value="todas">
          <div className="space-y-4">
            {questoesFiltradas.map((questao, index) => (
              <Card key={questao.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <Badge variant="outline">{questao.anoEscolar}</Badge>
                      <Badge className={getDificuldadeColor(questao.dificuldade)} variant="secondary">
                        {questao.dificuldade}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Taxa de Acerto</div>
                    <div className={`text-2xl font-bold ${getTaxaColor(questao.estatisticas.taxaAcerto)}`}>
                      {questao.estatisticas.taxaAcerto}%
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{questao.disciplina}</h3>
                  <p className="text-gray-700 mb-3">{questao.enunciado}</p>
                  
                  {questao.alternativas && (
                    <div className="space-y-2 mb-3">
                      {questao.alternativas.map((alt, idx) => (
                        <div 
                          key={idx} 
                          className={`p-2 rounded ${
                            String.fromCharCode(65 + idx) === questao.gabarito 
                              ? 'bg-green-50 border border-green-200' 
                              : 'bg-gray-50'
                          }`}
                        >
                          <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)})</span>
                          {alt}
                          {String.fromCharCode(65 + idx) === questao.gabarito && (
                            <Badge className="ml-2 bg-green-600">Gabarito</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-4">
                    <span><strong>BNCC:</strong> {questao.habilidadeBNCC}</span>
                    <span><strong>Tipo:</strong> {questao.tipo.replace('_', ' ')}</span>
                  </div>
                  <span className="text-xs">
                    Aplicada {questao.estatisticas.vezesAplicada}x • Taxa: {questao.estatisticas.taxaAcerto}%
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {questao.tags?.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Editar</Button>
                  <Button variant="outline" size="sm">Duplicar</Button>
                  <Button variant="outline" size="sm">Adicionar à Avaliação</Button>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Ver Estatísticas
                  </Button>
                </div>
              </Card>
            ))}

            {questoesFiltradas.length === 0 && (
              <Card className="p-12 text-center">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Nenhuma questão encontrada</h3>
                <p className="text-gray-500">Tente ajustar os filtros de busca</p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="portugues">
          <div className="space-y-4">
            {questoesFiltradas.filter(q => q.disciplina === 'Língua Portuguesa').map((questao, index) => (
              <Card key={questao.id} className="p-6 bg-green-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <Badge variant="outline">{questao.anoEscolar}</Badge>
                    <Badge className={getDificuldadeColor(questao.dificuldade)}>
                      {questao.dificuldade}
                    </Badge>
                  </div>
                  <div className={`text-xl font-bold ${getTaxaColor(questao.estatisticas.taxaAcerto)}`}>
                    {questao.estatisticas.taxaAcerto}%
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{questao.enunciado}</p>
                <div className="text-sm text-gray-600">
                  <strong>BNCC:</strong> {questao.habilidadeBNCC} • 
                  <strong className="ml-2">Tags:</strong> {questao.tags?.join(', ') || 'Sem tags'}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matematica">
          <div className="space-y-4">
            {questoesFiltradas.filter(q => q.disciplina === 'Matemática').map((questao, index) => (
              <Card key={questao.id} className="p-6 bg-blue-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <Badge variant="outline">{questao.anoEscolar}</Badge>
                    <Badge className={getDificuldadeColor(questao.dificuldade)}>
                      {questao.dificuldade}
                    </Badge>
                  </div>
                  <div className={`text-xl font-bold ${getTaxaColor(questao.estatisticas.taxaAcerto)}`}>
                    {questao.estatisticas.taxaAcerto}%
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{questao.enunciado}</p>
                <div className="text-sm text-gray-600">
                  <strong>BNCC:</strong> {questao.habilidadeBNCC} • 
                  <strong className="ml-2">Tags:</strong> {questao.tags?.join(', ') || 'Sem tags'}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gerador">
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-4">Gerador de Avaliações</h3>
            <p className="text-gray-600 mb-6">
              Crie avaliações personalizadas selecionando questões do banco ou gerando automaticamente com base em critérios.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Nome da Avaliação</label>
                <Input placeholder="Ex: Simulado SAEB 2024 - 5º ano" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Disciplina</label>
                  <select className="w-full px-4 py-2 border rounded-md">
                    <option>Língua Portuguesa</option>
                    <option>Matemática</option>
                    <option>Multidisciplinar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Ano Escolar</label>
                  <select className="w-full px-4 py-2 border rounded-md">
                    <option>1º ano</option>
                    <option>2º ano</option>
                    <option>3º ano</option>
                    <option>4º ano</option>
                    <option>5º ano</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Questões Fáceis</label>
                  <Input type="number" defaultValue="5" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Questões Médias</label>
                  <Input type="number" defaultValue="10" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Questões Difíceis</label>
                  <Input type="number" defaultValue="5" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="saeb" className="w-4 h-4" />
                <label htmlFor="saeb" className="text-sm">Usar apenas questões alinhadas à Matriz SAEB</label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Gerar Avaliação Automaticamente
              </Button>
              <Button variant="outline" className="flex-1">
                <Filter className="h-4 w-4 mr-2" />
                Selecionar Questões Manualmente
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
