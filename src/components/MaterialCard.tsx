import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Download, Eye } from '@phosphor-icons/react'
import type { Material } from '@/lib/types'
import { motion } from 'framer-motion'

interface MaterialCardProps {
  material: Material
  onView?: (materialId: string) => void
  onDownload?: (materialId: string) => void
}

export function MaterialCard({ material, onView, onDownload }: MaterialCardProps) {
  const typeIcons = {
    document: FileText,
    video: FileText,
    audio: FileText,
    interactive: FileText
  }

  const typeLabels = {
    document: 'Documento',
    video: 'Vídeo',
    audio: 'Áudio',
    interactive: 'Interativo'
  }

  const typeColors = {
    document: 'bg-primary text-primary-foreground',
    video: 'bg-accent text-accent-foreground',
    audio: 'bg-success text-success-foreground',
    interactive: 'bg-secondary text-secondary-foreground'
  }

  const Icon = typeIcons[material.type]

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full flex flex-col hover:shadow-xl transition-all border-l-4 border-l-accent">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${typeColors[material.type]}`}>
              <Icon size={24} weight="bold" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base leading-tight line-clamp-2">
                {material.title}
              </CardTitle>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {material.grade}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {material.subject}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-3">
          <CardDescription className="line-clamp-2 text-xs">
            {material.description}
          </CardDescription>
          
          <div className="flex gap-2 mt-auto">
            {onView && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onView(material.id)}
                className="flex-1"
              >
                <Eye size={16} weight="bold" />
                Visualizar
              </Button>
            )}
            {material.downloadable && onDownload && (
              <Button 
                size="sm" 
                onClick={() => onDownload(material.id)}
                className="flex-1"
              >
                <Download size={16} weight="bold" />
                Baixar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
