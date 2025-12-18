import { Book, Video, FileText, Headphones, Download, Search, Filter } from 'lucide-react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import type { MaterialDigital, LivroLiteratura } from '../lib/types'
import { useState } from 'react'

export default function BibliotecaView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGrade, setSelectedGrade] = useState<string>('todos')

  // Dados de exemplo
  const materiaisDigitais: MaterialDigital[] = [
    {
      id: '1',
      titulo: 'Caderno Multidisciplinar - 1º Ano',
      tipo: 'multidisciplinar',
      anoEscolar: '1º ano',
      segmento: 'fundamental',
      url: '/materiais/mult-1ano.pdf',
      formato: 'pdf',
      descricao: 'Material completo com atividades de todas as disciplinas',
      thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400'
    },
    {
      id: '2',
      titulo: 'Vídeo: Alfabetização Divertida',
      tipo: 'alfabetizacao',
      anoEscolar: '1º ano',
      segmento: 'fundamental',
      url: '/videos/alfabetizacao.mp4',
      formato: 'video',
      descricao: 'Série de vídeos para apoio à alfabetização',
      thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400'
    },
    {
      id: '3',
      titulo: 'Caderno de Arte - Jardim II',
      tipo: 'arte',
      anoEscolar: 'Jardim II',
      segmento: 'infantil',
      url: '/materiais/arte-jardim2.pdf',
      formato: 'pdf',
      descricao: 'Atividades artísticas para desenvolvimento criativo',
      thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400'
    },
    {
      id: '4',
      titulo: 'Áudio: Contação de Histórias',
      tipo: 'literatura',
      anoEscolar: 'Maternal I',
      segmento: 'infantil',
      url: '/audios/historias.mp3',
      formato: 'audio',
      descricao: 'Coletânea de histórias narradas',
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'
    },
    {
      id: '5',
      titulo: 'Preparação SAEB - Matemática',
      tipo: 'saeb',
      anoEscolar: '5º ano',
      segmento: 'fundamental',
      url: '/materiais/saeb-mat-5ano.pdf',
      formato: 'pdf',
      descricao: 'Simulados e exercícios preparatórios para SAEB',
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400'
    },
    {
      id: '6',
      titulo: 'Inglês Interativo - 4º Ano',
      tipo: 'ingles',
      anoEscolar: '4º ano',
      segmento: 'fundamental',
      url: '/materiais/ingles-4ano-interativo',
      formato: 'interativo',
      descricao: 'Atividades interativas de língua inglesa',
      thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400'
    }
  ]

  const livrosLiteratura: LivroLiteratura[] = [
    {
      id: '1',
      titulo: 'O Pequeno Príncipe',
      autor: 'Antoine de Saint-Exupéry',
      anoEscolar: '4º ano',
      capa: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
      urlLeitura: '/livros/pequeno-principe',
      genero: 'Fábula',
      paginas: 96
    },
    {
      id: '2',
      titulo: 'A Menina do Narizinho Arrebitado',
      autor: 'Monteiro Lobato',
      anoEscolar: '3º ano',
      capa: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
      urlLeitura: '/livros/narizinho',
      genero: 'Infantil',
      paginas: 64
    },
    {
      id: '3',
      titulo: 'Chapeuzinho Vermelho',
      autor: 'Irmãos Grimm',
      anoEscolar: '1º ano',
      capa: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      urlLeitura: '/livros/chapeuzinho',
      genero: 'Conto de Fadas',
      paginas: 32
    },
    {
      id: '4',
      titulo: 'A Lagarta Comilona',
      autor: 'Eric Carle',
      anoEscolar: 'Jardim I',
      capa: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
      urlLeitura: '/livros/lagarta',
      genero: 'Educativo',
      paginas: 24
    }
  ]

  const getFormatoIcon = (formato: string) => {
    switch (formato) {
      case 'pdf': return <FileText className="h-5 w-5" />
      case 'video': return <Video className="h-5 w-5" />
      case 'audio': return <Headphones className="h-5 w-5" />
      case 'interativo': return <Book className="h-5 w-5" />
      default: return <FileText className="h-5 w-5" />
    }
  }

  const getFormatoColor = (formato: string) => {
    switch (formato) {
      case 'pdf': return 'bg-red-100 text-red-700'
      case 'video': return 'bg-purple-100 text-purple-700'
      case 'audio': return 'bg-green-100 text-green-700'
      case 'interativo': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredMateriais = materiaisDigitais.filter(material => {
    const matchesSearch = material.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = selectedGrade === 'todos' || material.anoEscolar === selectedGrade
    return matchesSearch && matchesGrade
  })

  const filteredLivros = livrosLiteratura.filter(livro => {
    const matchesSearch = livro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         livro.autor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = selectedGrade === 'todos' || livro.anoEscolar === selectedGrade
    return matchesSearch && matchesGrade
  })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Biblioteca Digital</h1>
        <p className="text-gray-600">Acesse materiais didáticos, livros e recursos multimídia</p>
      </div>

      {/* Barra de Pesquisa e Filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar materiais ou livros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white"
          >
            <option value="todos">Todos os anos</option>
            <option value="Berçário I">Berçário I</option>
            <option value="Berçário II">Berçário II</option>
            <option value="Maternal I">Maternal I</option>
            <option value="Maternal II">Maternal II</option>
            <option value="Jardim I">Jardim I</option>
            <option value="Jardim II">Jardim II</option>
            <option value="1º ano">1º ano</option>
            <option value="2º ano">2º ano</option>
            <option value="3º ano">3º ano</option>
            <option value="4º ano">4º ano</option>
            <option value="5º ano">5º ano</option>
          </select>
        </div>
      </div>

      {/* Tabs Horizontais */}
      <Tabs defaultValue="materiais" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="materiais">
            <FileText className="h-4 w-4 mr-2" />
            Materiais Didáticos ({filteredMateriais.length})
          </TabsTrigger>
          <TabsTrigger value="livros">
            <Book className="h-4 w-4 mr-2" />
            Livros de Literatura ({filteredLivros.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="materiais">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMateriais.map((material) => (
              <Card key={material.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${material.thumbnail})` }}>
                  <div className="h-full bg-black bg-opacity-30 p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <Badge className={getFormatoColor(material.formato)}>
                        <span className="flex items-center gap-1">
                          {getFormatoIcon(material.formato)}
                          {material.formato.toUpperCase()}
                        </span>
                      </Badge>
                      <Badge variant="secondary">{material.segmento}</Badge>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{material.titulo}</h3>
                  <p className="text-sm text-gray-600 mb-2">{material.descricao}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Book className="h-4 w-4" />
                      {material.anoEscolar}
                    </span>
                    <Badge variant="outline">{material.tipo}</Badge>
                  </div>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Acessar Material
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="livros">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredLivros.map((livro) => (
              <Card key={livro.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${livro.capa})` }} />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{livro.titulo}</h3>
                  <p className="text-sm text-gray-600 mb-3">{livro.autor}</p>
                  <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center justify-between">
                      <span>Gênero:</span>
                      <Badge variant="secondary">{livro.genero}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ano:</span>
                      <span className="font-medium">{livro.anoEscolar}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Páginas:</span>
                      <span className="font-medium">{livro.paginas}</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Book className="h-4 w-4 mr-2" />
                    Ler Livro
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
