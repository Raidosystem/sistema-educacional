import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, CheckCircle, XCircle } from '@phosphor-icons/react'
import type { Assessment } from '@/lib/types'
import { motion } from 'framer-motion'

interface AssessmentCardProps {
  assessment: Assessment
  onClick?: (assessmentId: string) => void
}

export function AssessmentCard({ assessment, onClick }: AssessmentCardProps) {
  const performanceColor = 
    assessment.averageScore >= 70 ? 'text-success' : 
    assessment.averageScore >= 50 ? 'text-accent' : 
    'text-destructive'

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="h-full hover:shadow-xl transition-all cursor-pointer border-l-4 border-l-success"
        onClick={() => onClick?.(assessment.id)}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-tight">{assessment.title}</CardTitle>
            <Badge variant="outline">{assessment.subject}</Badge>
          </div>
          <CardDescription className="flex items-center gap-2 mt-2">
            <Calendar size={14} weight="bold" />
            {new Date(assessment.date).toLocaleDateString('pt-BR')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle size={16} weight="bold" />
              <span>{assessment.totalQuestions} questões</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users size={16} weight="bold" />
              <span>{assessment.appliedTo} alunos</span>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Média Geral</span>
              <span className={`text-2xl font-bold font-['Space_Grotesk'] ${performanceColor}`}>
                {assessment.averageScore}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
