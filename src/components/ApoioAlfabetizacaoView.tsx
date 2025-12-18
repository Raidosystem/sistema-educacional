import { BookOpen, Users, TrendingUp, FileText, Star, Target } from 'lucide-react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { useState } from 'react'

interface NivelProficiencia {
  nivel: string
  descricao: string
  habilidades: string[]
  cor: string
}

interface Aluno {
  id: string
  nome: string
  nivelAtual: string
  pontuacao: number
  evolucao: string
}

interface AtividadeAlfabetizacao {
  id: string
  titulo: string
  nivel: string
  descricao: string
  habilidades: string[]
  duracao: string
}

export default function ApoioAlfabetizacaoView() {
  const [selectedNivel, setSelectedNivel] = useState<string>('todos')

  const niveisProficiencia: NivelProficiencia[] = [
    {
      nivel: 'Pré-Silábico',
      descricao: 'Não compreende que a escrita representa os sons da fala',
      habilidades: [
        'Distinguir letras de números e outros símbolos',
        'Reconhecer o próprio nome escrito',
        'Identificar letras do alfabeto'
      ],
      cor: 'bg-red-100 text-red-700'
    },
    {
      nivel: 'Silábico',
      descricao: 'Compreende que cada sílaba corresponde a uma letra',
      habilidades: [
        'Escrever uma letra para cada sílaba',
        'Identificar sílabas iniciais de palavras',
        'Reconhecer palavras com mesma sílaba inicial'
      ],
      cor: 'bg-yellow-100 text-yellow-700'
    },
    {
      nivel: 'Silábico-Alfabético',
      descricao: 'Transição entre hipótese silábica e alfabética',
      habilidades: [
        'Representar algumas sílabas com mais de uma letra',
        'Começar a compreender o princípio alfabético',
        'Ler palavras simples com apoio'
      ],
      cor: 'bg-blue-100 text-blue-700'
    },
    {
      nivel: 'Alfabético',
      descricao: 'Compreende que cada letra representa um som (fonema)',
      habilidades: [
        'Escrever alfabeticamente',
        'Ler palavras e frases curtas',
        'Produzir textos simples com ortografia em desenvolvimento'
      ],
      cor: 'bg-green-100 text-green-700'
    }
  ]

  const alunos: Aluno[] = [
    { id: '1', nome: 'Ana Silva', nivelAtual: 'Alfabético', pontuacao: 92, evolucao: '+2 níveis' },
    { id: '2', nome: 'João Santos', nivelAtual: 'Silábico-Alfabético', pontuacao: 78, evolucao: '+1 nível' },
    { id: '3', nome: 'Maria Costa', nivelAtual: 'Silábico', pontuacao: 65, evolucao: '+1 nível' },
    { id: '4', nome: 'Pedro Oliveira', nivelAtual: 'Pré-Silábico', pontuacao: 45, evolucao: 'Sem evolução' },
    { id: '5', nome: 'Juliana Souza', nivelAtual: 'Alfabético', pontuacao: 88, evolucao: '+1 nível' },
    { id: '6', nome: 'Lucas Ferreira', nivelAtual: 'Silábico', pontuacao: 58, evolucao: '+1 nível' }
  ]

  const atividades: AtividadeAlfabetizacao[] = [
    {
      id: '1',
      titulo: 'Reconhecendo Letras e Sons',
      nivel: 'Pré-Silábico',
      descricao: 'Atividades para associar letras aos seus sons iniciais',
      habilidades: ['Consciência fonológica', 'Reconhecimento de letras'],
      duracao: '30 min'
    },
    {
      id: '2',
      titulo: 'Brincando com Sílabas',
      nivel: 'Silábico',
      descricao: 'Jogos e atividades para trabalhar a segmentação silábica',
      habilidades: ['Consciência silábica', 'Escrita de palavras'],
      duracao: '40 min'
    },
    {
      id: '3',
      titulo: 'Formando Palavras Completas',
      nivel: 'Silábico-Alfabético',
      descricao: 'Atividades de transição para escrita alfabética',
      habilidades: ['Princípio alfabético', 'Leitura de palavras'],
      duracao: '45 min'
    },
    {
      id: '4',
      titulo: 'Lendo e Escrevendo Frases',
      nivel: 'Alfabético',
      descricao: 'Produção de frases e pequenos textos',
      habilidades: ['Produção textual', 'Ortografia'],
      duracao: '50 min'
    },
    {
      id: '5',
      titulo: 'Rimas e Aliterações',
      nivel: 'Pré-Silábico',
      descricao: 'Explorando sons iniciais e finais de palavras',
      habilidades: ['Consciência fonológica', 'Percepção auditiva'],
      duracao: '30 min'
    },
    {
      id: '6',
      titulo: 'Ditado de Palavras',
      nivel: 'Silábico-Alfabético',
      descricao: 'Ditado interativo com feedback imediato',
      habilidades: ['Escrita', 'Correspondência grafema-fonema'],
      duracao: '35 min'
    }
  ]

  const estatisticas = {
    totalAlunos: 180,
    avaliadosDiagnostico: 180,
    presilabico: 22,
    silabico: 54,
    silabicoAlfabetico: 58,
    alfabetico: 46,
    taxaEvolucao: 78
  }

  const getNivelInfo = (nivel: string) => {
    return niveisProficiencia.find(n => n.nivel === nivel) || niveisProficiencia[0]
  }

  const atividadesFiltradas = atividades.filter(a =>
    selectedNivel === 'todos' || a.nivel === selectedNivel
  )

  const getDistribuicaoPercentual = () => {
    const total = estatisticas.totalAlunos
    return [
      { nivel: 'Pré-Silábico', quantidade: estatisticas.presilabico, percentual: (estatisticas.presilabico / total) * 100 },
      { nivel: 'Silábico', quantidade: estatisticas.silabico, percentual: (estatisticas.silabico / total) * 100 },
      { nivel: 'Silábico-Alfabético', quantidade: estatisticas.silabicoAlfabetico, percentual: (estatisticas.silabicoAlfabetico / total) * 100 },
      { nivel: 'Alfabético', quantidade: estatisticas.alfabetico, percentual: (estatisticas.alfabetico / total) * 100 }
    ]
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Apoio à Alfabetização</h1>
        <p className="text-gray-600">Diagnóstico, agrupamento flexível e atividades por nível</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold">{estatisticas.totalAlunos}</div>
          <div className="text-sm text-gray-600">Total Alunos</div>
        </Card>

        <Card className="p-4 bg-red-50">
          <div className="text-sm text-gray-600 mb-1">Pré-Silábico</div>
          <div className="text-2xl font-bold text-red-600">{estatisticas.presilabico}</div>
          <div className="text-xs text-gray-500">{Math.round((estatisticas.presilabico / estatisticas.totalAlunos) * 100)}%</div>
        </Card>

        <Card className="p-4 bg-yellow-50">
          <div className="text-sm text-gray-600 mb-1">Silábico</div>
          <div className="text-2xl font-bold text-yellow-600">{estatisticas.silabico}</div>
          <div className="text-xs text-gray-500">{Math.round((estatisticas.silabico / estatisticas.totalAlunos) * 100)}%</div>
        </Card>

        <Card className="p-4 bg-blue-50">
          <div className="text-sm text-gray-600 mb-1">Sil.-Alfabético</div>
          <div className="text-2xl font-bold text-blue-600">{estatisticas.silabicoAlfabetico}</div>
          <div className="text-xs text-gray-500">{Math.round((estatisticas.silabicoAlfabetico / estatisticas.totalAlunos) * 100)}%</div>
        </Card>

        <Card className="p-4 bg-green-50">
          <div className="text-sm text-gray-600 mb-1">Alfabético</div>
          <div className="text-2xl font-bold text-green-600">{estatisticas.alfabetico}</div>
          <div className="text-xs text-gray-500">{Math.round((estatisticas.alfabetico / estatisticas.totalAlunos) * 100)}%</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600">{estatisticas.taxaEvolucao}%</div>
          <div className="text-sm text-gray-600">Taxa Evolução</div>
        </Card>
      </div>

      {/* Tabs Horizontais */}
      <Tabs defaultValue="niveis" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="niveis">Níveis de Proficiência</TabsTrigger>
          <TabsTrigger value="diagnostico">Diagnóstico</TabsTrigger>
          <TabsTrigger value="atividades">Atividades por Nível</TabsTrigger>
          <TabsTrigger value="agrupamentos">Agrupamentos Flexíveis</TabsTrigger>
        </TabsList>

        <TabsContent value="niveis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {niveisProficiencia.map((nivel) => (
              <Card key={nivel.nivel} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge className={nivel.cor + ' text-base px-3 py-1'}>{nivel.nivel}</Badge>
                    <p className="text-sm text-gray-600 mt-2">{nivel.descricao}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">
                      {nivel.nivel === 'Pré-Silábico' && estatisticas.presilabico}
                      {nivel.nivel === 'Silábico' && estatisticas.silabico}
                      {nivel.nivel === 'Silábico-Alfabético' && estatisticas.silabicoAlfabetico}
                      {nivel.nivel === 'Alfabético' && estatisticas.alfabetico}
                    </div>
                    <div className="text-sm text-gray-500">alunos</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Habilidades Características:</h4>
                  <ul className="space-y-1">
                    {nivel.habilidades.map((hab, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{hab}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Atividades Específicas
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="diagnostico">
          <div className="space-y-6">
            {/* Distribuição Visual */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Distribuição por Nível de Proficiência</h3>
              <div className="space-y-4">
                {getDistribuicaoPercentual().map((item) => {
                  const nivelInfo = getNivelInfo(item.nivel)
                  return (
                    <div key={item.nivel}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.nivel}</span>
                        <span className="text-sm text-gray-600">
                          {item.quantidade} alunos ({Math.round(item.percentual)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className={`h-4 rounded-full ${nivelInfo.cor.replace('text-', 'bg-').replace('100', '500')}`}
                          style={{ width: `${item.percentual}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Lista de Alunos por Nível */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Alunos Avaliados (Amostra)</h3>
              <div className="space-y-3">
                {alunos.map((aluno) => {
                  const nivelInfo = getNivelInfo(aluno.nivelAtual)
                  return (
                    <div key={aluno.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {aluno.nome.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{aluno.nome}</h4>
                          <Badge className={nivelInfo.cor} variant="secondary">
                            {aluno.nivelAtual}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-2xl font-bold">{aluno.pontuacao}</div>
                          <div className="text-xs text-gray-500">Pontuação</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-semibold ${aluno.evolucao.includes('+') ? 'text-green-600' : 'text-gray-500'}`}>
                            {aluno.evolucao}
                          </div>
                          <div className="text-xs text-gray-500">Evolução</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Ver Perfil
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Período de Avaliação */}
            <Card className="p-6 bg-blue-50">
              <h3 className="text-lg font-semibold mb-3">Cronograma de Avaliações</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Avaliação Diagnóstica Inicial:</span>
                  <span className="font-semibold">Fevereiro/2024 ✓</span>
                </div>
                <div className="flex justify-between">
                  <span>Avaliação Processual 1:</span>
                  <span className="font-semibold">Maio/2024 ✓</span>
                </div>
                <div className="flex justify-between">
                  <span>Avaliação Processual 2:</span>
                  <span className="font-semibold">Agosto/2024 ✓</span>
                </div>
                <div className="flex justify-between bg-yellow-100 p-2 rounded">
                  <span>Avaliação Final:</span>
                  <span className="font-semibold">Dezembro/2024 (Próxima)</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="atividades">
          {/* Filtro de Nível */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <Button
              variant={selectedNivel === 'todos' ? 'default' : 'outline'}
              onClick={() => setSelectedNivel('todos')}
              size="sm"
            >
              Todas
            </Button>
            {niveisProficiencia.map((nivel) => (
              <Button
                key={nivel.nivel}
                variant={selectedNivel === nivel.nivel ? 'default' : 'outline'}
                onClick={() => setSelectedNivel(nivel.nivel)}
                size="sm"
              >
                {nivel.nivel}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {atividadesFiltradas.map((atividade) => {
              const nivelInfo = getNivelInfo(atividade.nivel)
              return (
                <Card key={atividade.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={nivelInfo.cor}>{atividade.nivel}</Badge>
                    <span className="text-sm text-gray-500">{atividade.duracao}</span>
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{atividade.titulo}</h3>
                  <p className="text-sm text-gray-600 mb-4">{atividade.descricao}</p>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-700 mb-2">Habilidades:</h4>
                    <div className="flex flex-wrap gap-2">
                      {atividade.habilidades.map((hab, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {hab}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Plano de Aula
                  </Button>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="agrupamentos">
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
              <h3 className="text-lg font-semibold mb-3">Sobre Agrupamentos Flexíveis</h3>
              <p className="text-sm text-gray-700 mb-4">
                Os agrupamentos flexíveis permitem organizar os alunos em grupos de trabalho de acordo com 
                seu nível de proficiência, facilitando a personalização do ensino e atendimento às necessidades 
                específicas de cada grupo.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">4-6</div>
                  <div className="text-xs text-gray-600">Alunos por Grupo</div>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">3x</div>
                  <div className="text-xs text-gray-600">por Semana</div>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-green-600">45min</div>
                  <div className="text-xs text-gray-600">cada Sessão</div>
                </div>
              </div>
            </Card>

            {/* Grupos Sugeridos */}
            {niveisProficiencia.map((nivel) => {
              const quantidade = 
                nivel.nivel === 'Pré-Silábico' ? estatisticas.presilabico :
                nivel.nivel === 'Silábico' ? estatisticas.silabico :
                nivel.nivel === 'Silábico-Alfabético' ? estatisticas.silabicoAlfabetico :
                estatisticas.alfabetico
              
              const numGrupos = Math.ceil(quantidade / 5)

              return (
                <Card key={nivel.nivel} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge className={nivel.cor + ' text-base px-3 py-1 mb-2'}>{nivel.nivel}</Badge>
                      <p className="text-sm text-gray-600">{quantidade} alunos • {numGrupos} grupos sugeridos</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Formar Grupos
                    </Button>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {Array.from({ length: numGrupos }).map((_, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="text-lg font-bold text-gray-700">Grupo {idx + 1}</div>
                        <div className="text-xs text-gray-500">
                          {Math.min(5, quantidade - (idx * 5))} alunos
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            })}

            <Card className="p-6 bg-yellow-50 border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold mb-3 text-yellow-900">Dicas para Agrupamentos</h3>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Reavalie os grupos a cada 4-6 semanas conforme evolução dos alunos</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Mantenha grupos pequenos (4-6 alunos) para intervenções mais efetivas</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Alterne entre atividades de grupo homogêneo e heterogêneo</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Documente o progresso individual para ajustar estratégias</span>
                </li>
              </ul>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
