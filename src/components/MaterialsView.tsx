import { useState } from 'react'
import { MaterialCard } from '@/components/MaterialCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MagnifyingGlass, Funnel } from '@phosphor-icons/react'
import type { Material } from '@/lib/types'
import { toast } from 'sonner'

interface MaterialsViewProps {
  materials: Material[]
}

export function MaterialsView({ materials }: MaterialsViewProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterGrade, setFilterGrade] = useState<string>('all')
  const [filterSubject, setFilterSubject] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = filterGrade === 'all' || material.grade === filterGrade
    const matchesSubject = filterSubject === 'all' || material.subject === filterSubject
    const matchesType = filterType === 'all' || material.type === filterType
    
    return matchesSearch && matchesGrade && matchesSubject && matchesType
  })

  const handleView = (materialId: string) => {
    toast.success('Abrindo material...')
  }

  const handleDownload = (materialId: string) => {
    toast.success('Download iniciado!')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-['Space_Grotesk']">
          Materiais Didáticos
        </h1>
        <p className="text-muted-foreground mt-2">
          Recursos educacionais organizados por etapa, ano e disciplina
        </p>
      </div>

      <div className="bg-card p-6 rounded-lg border border-border space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Funnel size={20} weight="bold" />
          <span className="font-medium">Filtros</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlass 
              size={20} 
              weight="bold" 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Buscar materiais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterGrade} onValueChange={setFilterGrade}>
            <SelectTrigger>
              <SelectValue placeholder="Ano/Série" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Anos</SelectItem>
              <SelectItem value="1º Ano">1º Ano</SelectItem>
              <SelectItem value="2º Ano">2º Ano</SelectItem>
              <SelectItem value="3º Ano">3º Ano</SelectItem>
              <SelectItem value="4º Ano">4º Ano</SelectItem>
              <SelectItem value="5º Ano">5º Ano</SelectItem>
              <SelectItem value="6º Ano">6º Ano</SelectItem>
              <SelectItem value="7º Ano">7º Ano</SelectItem>
              <SelectItem value="8º Ano">8º Ano</SelectItem>
              <SelectItem value="9º Ano">9º Ano</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Disciplina" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Disciplinas</SelectItem>
              <SelectItem value="Matemática">Matemática</SelectItem>
              <SelectItem value="Português">Português</SelectItem>
              <SelectItem value="Ciências">Ciências</SelectItem>
              <SelectItem value="História">História</SelectItem>
              <SelectItem value="Geografia">Geografia</SelectItem>
              <SelectItem value="Inglês">Inglês</SelectItem>
              <SelectItem value="Arte">Arte</SelectItem>
              <SelectItem value="Educação Física">Educação Física</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="document">Documentos</SelectItem>
              <SelectItem value="video">Vídeos</SelectItem>
              <SelectItem value="audio">Áudios</SelectItem>
              <SelectItem value="interactive">Interativos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(searchTerm || filterGrade !== 'all' || filterSubject !== 'all' || filterType !== 'all') && (
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-muted-foreground">
              {filteredMaterials.length} {filteredMaterials.length === 1 ? 'material encontrado' : 'materiais encontrados'}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('')
                setFilterGrade('all')
                setFilterSubject('all')
                setFilterType('all')
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <MaterialCard
            key={material.id}
            material={material}
            onView={handleView}
            onDownload={handleDownload}
          />
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nenhum material encontrado com os filtros selecionados.
          </p>
        </div>
      )}
    </div>
  )
}
