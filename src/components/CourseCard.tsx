import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Clock } from '@phosphor-icons/react'
import type { Course } from '@/lib/types'
import { motion } from 'framer-motion'

interface CourseCardProps {
  course: Course
  onEnroll?: (courseId: string) => void
}

export function CourseCard({ course, onEnroll }: CourseCardProps) {
  const statusColors = {
    active: 'bg-success text-success-foreground',
    upcoming: 'bg-accent text-accent-foreground',
    completed: 'bg-muted text-muted-foreground'
  }

  const statusLabels = {
    active: 'Ativo',
    upcoming: 'Em Breve',
    completed: 'Concluído'
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full flex flex-col hover:shadow-xl transition-all border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
            <Badge className={statusColors[course.status]}>
              {statusLabels[course.status]}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2 mt-2">
            {course.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users size={16} weight="bold" />
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} weight="bold" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} weight="bold" />
              <span>{course.enrolled} / {course.maxEnrollment} inscritos</span>
            </div>
          </div>
          
          <div className="mt-auto pt-4">
            {course.status === 'active' && onEnroll && (
              <Button 
                onClick={() => onEnroll(course.id)} 
                className="w-full"
                disabled={course.enrolled >= course.maxEnrollment}
              >
                {course.enrolled >= course.maxEnrollment ? 'Lotado' : 'Inscrever-se'}
              </Button>
            )}
            {course.status === 'upcoming' && (
              <Button variant="outline" className="w-full" disabled>
                Em Breve
              </Button>
            )}
            {course.status === 'completed' && (
              <Button variant="secondary" className="w-full">
                Ver Conteúdo
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
