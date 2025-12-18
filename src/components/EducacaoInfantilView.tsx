import { Baby, Heart, Palette, Music, Users, BookOpen, Search } from 'lucide-react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import type { EducacaoInfantilSegment, CampoExperienciaBNCC } from '../lib/types'
import { useState } from 'react'

interface AtividadeInfantil {
  id: string
  titulo: string
  descricao: string
  campoExperiencia: CampoExperienciaBNCC
  segmento: EducacaoInfantilSegment
  duracao: string
  materiais: string[]
  objetivos: string[]
}

export default function EducacaoInfantilView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSegmento, setSelectedSegmento] = useState<EducacaoInfantilSegment | 'todos'>('todos')

  const atividades: AtividadeInfantil[] = [
    {
      id: '1',
      titulo: 'Roda de Conversa: Eu e Minha Família',
      descricao: 'Atividade de expressão oral sobre identidade e vínculos familiares',
      campoExperiencia: 'eu_outro_nos',
      segmento: 'jardim_1',
      duracao: '30 min',
      materiais: ['Fotos de família', 'Cartolina', 'Giz de cera'],
      objetivos: [
        'Comunicar suas ideias e sentimentos',
        'Reconhecer membros da família',
        'Desenvolver autonomia na fala'
      ]
    },
    {
      id: '2',
      titulo: 'Explorando Texturas e Formas',
      descricao: 'Experiência sensorial com diferentes materiais e texturas',
      campoExperiencia: 'tracos_sons_cores_formas',
      segmento: 'maternal_2',
      duracao: '45 min',
      materiais: ['Lixa', 'Algodão', 'Tecidos variados', 'Papéis diferentes', 'Esponjas'],
      objetivos: [
        'Explorar diferentes texturas',
        'Desenvolver percepção tátil',
        'Expressar preferências sensoriais'
      ]
    },
    {
      id: '3',
      titulo: 'Contação de História: Os Três Porquinhos',
      descricao: 'História narrada com fantoches e dramatização',
      campoExperiencia: 'escuta_fala_pensamento_imaginacao',
      segmento: 'jardim_2',
      duracao: '40 min',
      materiais: ['Fantoches', 'Livro ilustrado', 'Cenário'],
      objetivos: [
        'Desenvolver a escuta atenta',
        'Ampliar vocabulário',
        'Recontar histórias com próprias palavras'
      ]
    },
    {
      id: '4',
      titulo: 'Circuito Motor: Pular, Rolar e Equilibrar',
      descricao: 'Atividade física com obstáculos e desafios motores',
      campoExperiencia: 'corpo_gestos_movimentos',
      segmento: 'maternal_1',
      duracao: '35 min',
      materiais: ['Colchonetes', 'Cones', 'Bambolês', 'Cordas'],
      objetivos: [
        'Desenvolver coordenação motora ampla',
        'Trabalhar equilíbrio',
        'Ganhar consciência corporal'
      ]
    },
    {
      id: '5',
      titulo: 'Plantando Feijão: Do Grão à Planta',
      descricao: 'Projeto de plantio para observar crescimento vegetal',
      campoExperiencia: 'espaco_tempo_quantidades_relacoes_transformacoes',
      segmento: 'jardim_1',
      duracao: '50 min + acompanhamento diário',
      materiais: ['Grãos de feijão', 'Algodão', 'Potes transparentes', 'Água'],
      objetivos: [
        'Observar transformações naturais',
        'Compreender ciclo de vida das plantas',
        'Registrar mudanças ao longo do tempo'
      ]
    },
    {
      id: '6',
      titulo: 'Cantando e Dançando: Músicas de Roda',
      descricao: 'Brincadeiras cantadas tradicionais brasileiras',
      campoExperiencia: 'tracos_sons_cores_formas',
      segmento: 'maternal_2',
      duracao: '30 min',
      materiais: ['Instrumentos musicais simples', 'Lenços coloridos'],
      objetivos: [
        'Explorar ritmo e melodia',
        'Desenvolver coordenação motora',
        'Valorizar cultura popular brasileira'
      ]
    },
    {
      id: '7',
      titulo: 'Brincadeira com Água: Afunda ou Flutua?',
      descricao: 'Experimento com objetos de diferentes densidades',
      campoExperiencia: 'espaco_tempo_quantidades_relacoes_transformacoes',
      segmento: 'jardim_2',
      duracao: '40 min',
      materiais: ['Bacia com água', 'Objetos variados', 'Tabela de registro'],
      objetivos: [
        'Fazer hipóteses e testá-las',
        'Observar fenômenos físicos',
        'Classificar objetos por propriedades'
      ]
    },
    {
      id: '8',
      titulo: 'Massinha Caseira: Criar e Modelar',
      descricao: 'Preparação de massinha e atividade de modelagem livre',
      campoExperiencia: 'tracos_sons_cores_formas',
      segmento: 'berçario_2',
      duracao: '45 min',
      materiais: ['Farinha', 'Sal', 'Água', 'Corante alimentício', 'Cortadores'],
      objetivos: [
        'Explorar criatividade',
        'Desenvolver coordenação motora fina',
        'Experimentar transformação de materiais'
      ]
    }
  ]

  const segmentos = [
    { value: 'berçario_1' as const, label: 'Berçário I (0-1 ano)', icon: Baby },
    { value: 'berçario_2' as const, label: 'Berçário II (1-2 anos)', icon: Baby },
    { value: 'maternal_1' as const, label: 'Maternal I (2-3 anos)', icon: Heart },
    { value: 'maternal_2' as const, label: 'Maternal II (3-4 anos)', icon: Heart },
    { value: 'jardim_1' as const, label: 'Jardim I (4-5 anos)', icon: Users },
    { value: 'jardim_2' as const, label: 'Jardim II (5-6 anos)', icon: Users }
  ]

  const camposExperiencia = [
    {
      campo: 'eu_outro_nos' as const,
      nome: 'O Eu, o Outro e o Nós',
      icon: Users,
      cor: 'bg-blue-100 text-blue-700'
    },
    {
      campo: 'corpo_gestos_movimentos' as const,
      nome: 'Corpo, Gestos e Movimentos',
      icon: Heart,
      cor: 'bg-red-100 text-red-700'
    },
    {
      campo: 'tracos_sons_cores_formas' as const,
      nome: 'Traços, Sons, Cores e Formas',
      icon: Palette,
      cor: 'bg-purple-100 text-purple-700'
    },
    {
      campo: 'escuta_fala_pensamento_imaginacao' as const,
      nome: 'Escuta, Fala, Pensamento e Imaginação',
      icon: BookOpen,
      cor: 'bg-green-100 text-green-700'
    },
    {
      campo: 'espaco_tempo_quantidades_relacoes_transformacoes' as const,
      nome: 'Espaços, Tempos, Quantidades, Relações e Transformações',
      icon: Music,
      cor: 'bg-orange-100 text-orange-700'
    }
  ]

  const getCampoInfo = (campo: CampoExperienciaBNCC) => {
    return camposExperiencia.find(c => c.campo === campo) || camposExperiencia[0]
  }

  const atividadesFiltradas = atividades.filter(atividade => {
    const matchSearch = atividade.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       atividade.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchSegmento = selectedSegmento === 'todos' || atividade.segmento === selectedSegmento
    return matchSearch && matchSegmento
  })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Educação Infantil</h1>
        <p className="text-gray-600">Atividades baseadas nos Campos de Experiência da BNCC (0 a 6 anos)</p>
      </div>

      {/* Cards dos Segmentos */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        {segmentos.map((seg) => {
          const Icon = seg.icon
          const count = atividades.filter(a => a.segmento === seg.value).length
          return (
            <Card 
              key={seg.value} 
              className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                selectedSegmento === seg.value ? 'ring-2 ring-blue-600' : ''
              }`}
              onClick={() => setSelectedSegmento(seg.value)}
            >
              <Icon className="h-8 w-8 text-blue-600 mb-2" />
              <div className="text-sm font-semibold mb-1">{seg.label.split('(')[0]}</div>
              <div className="text-xs text-gray-500">{count} atividades</div>
            </Card>
          )
        })}
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Buscar atividades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button
          variant={selectedSegmento === 'todos' ? 'default' : 'outline'}
          onClick={() => setSelectedSegmento('todos')}
        >
          Todas as Faixas Etárias
        </Button>
      </div>

      {/* Tabs Horizontais dos Campos de Experiência */}
      <Tabs defaultValue="todas" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          {camposExperiencia.map((campo) => {
            const Icon = campo.icon
            return (
              <TabsTrigger key={campo.campo} value={campo.campo} className="text-xs">
                <Icon className="h-4 w-4 mr-1" />
                {campo.nome.split(',')[0]}
              </TabsTrigger>
            )
          })}
        </TabsList>

        <TabsContent value="todas">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {atividadesFiltradas.map((atividade) => {
              const campoInfo = getCampoInfo(atividade.campoExperiencia)
              const CampoIcon = campoInfo.icon
              const segmento = segmentos.find(s => s.value === atividade.segmento)

              return (
                <Card key={atividade.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={campoInfo.cor}>
                      <CampoIcon className="h-4 w-4 mr-1" />
                      {campoInfo.nome.split(',')[0]}
                    </Badge>
                    <Badge variant="outline">
                      {segmento?.label.split('(')[0]}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{atividade.titulo}</h3>
                  <p className="text-sm text-gray-600 mb-4">{atividade.descricao}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="font-medium mr-2">Duração:</span>
                    {atividade.duracao}
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Materiais Necessários:</h4>
                    <div className="flex flex-wrap gap-2">
                      {atividade.materiais.map((material, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Ver Plano Completo
                  </Button>
                </Card>
              )
            })}
          </div>

          {atividadesFiltradas.length === 0 && (
            <Card className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Nenhuma atividade encontrada</h3>
              <p className="text-gray-500">Tente ajustar os filtros de busca</p>
            </Card>
          )}
        </TabsContent>

        {camposExperiencia.map((campo) => {
          const atividadesCampo = atividadesFiltradas.filter(a => a.campoExperiencia === campo.campo)
          const CampoIcon = campo.icon

          return (
            <TabsContent key={campo.campo} value={campo.campo}>
              <Card className={`p-6 mb-6 ${campo.cor.replace('text-', 'border-l-4 border-')}`}>
                <div className="flex items-start gap-4">
                  <CampoIcon className="h-12 w-12 text-current" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{campo.nome}</h3>
                    <p className="text-sm">
                      {campo.campo === 'eu_outro_nos' && 'Desenvolver a identidade, autonomia e relações sociais das crianças'}
                      {campo.campo === 'corpo_gestos_movimentos' && 'Explorar movimentos, gestos e expressões corporais'}
                      {campo.campo === 'tracos_sons_cores_formas' && 'Vivenciar diferentes formas de expressão artística e cultural'}
                      {campo.campo === 'escuta_fala_pensamento_imaginacao' && 'Ampliar a comunicação oral, escrita e criatividade'}
                      {campo.campo === 'espaco_tempo_quantidades_relacoes_transformacoes' && 'Explorar e compreender o mundo físico e social'}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {atividadesCampo.map((atividade) => {
                  const segmento = segmentos.find(s => s.value === atividade.segmento)

                  return (
                    <Card key={atividade.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <Badge variant="outline">
                          {segmento?.label.split('(')[0]}
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-lg mb-2">{atividade.titulo}</h3>
                      <p className="text-sm text-gray-600 mb-4">{atividade.descricao}</p>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">Objetivos:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {atividade.objetivos.slice(0, 2).map((obj, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-2">•</span>
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button variant="outline" className="w-full">
                        Ver Plano Completo
                      </Button>
                    </Card>
                  )
                })}
              </div>

              {atividadesCampo.length === 0 && (
                <Card className="p-12 text-center">
                  <CampoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Nenhuma atividade neste campo</h3>
                  <p className="text-gray-500">Ajuste os filtros para ver mais atividades</p>
                </Card>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
