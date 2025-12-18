import { useState } from 'react'
import { CourseCard } from '@/components/CourseCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Course } from '@/lib/types'
import { toast } from 'sonner'

interface CoursesViewProps {
  courses: Course[]
}

export function CoursesView({ courses }: CoursesViewProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const activeCourses = courses.filter(c => c.status === 'active')
  const upcomingCourses = courses.filter(c => c.status === 'upcoming')
  const completedCourses = courses.filter(c => c.status === 'completed')

  const filterByCategory = (courseList: Course[]) => {
    if (filterCategory === 'all') return courseList
    return courseList.filter(c => c.category === filterCategory)
  }

  const handleEnroll = (courseId: string) => {
    toast.success('Inscrição realizada com sucesso!')
  }

  const categories = Array.from(new Set(courses.map(c => c.category)))

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-['Space_Grotesk']">
            Cursos e Formações
          </h1>
          <p className="text-muted-foreground mt-2">
            Desenvolvimento profissional contínuo para educadores
          </p>
        </div>
        
        <div className="flex gap-3">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Categorias</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 rounded-lg">
          <p className="text-sm font-medium opacity-90">Cursos Disponíveis</p>
          <p className="text-4xl font-bold mt-2 font-['Space_Grotesk']">
            {activeCourses.length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground p-6 rounded-lg">
          <p className="text-sm font-medium opacity-90">Em Breve</p>
          <p className="text-4xl font-bold mt-2 font-['Space_Grotesk']">
            {upcomingCourses.length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-success to-success/80 text-success-foreground p-6 rounded-lg">
          <p className="text-sm font-medium opacity-90">Concluídos</p>
          <p className="text-4xl font-bold mt-2 font-['Space_Grotesk']">
            {completedCourses.length}
          </p>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">
            Ativos
            <Badge className="ml-2 bg-primary text-primary-foreground">
              {activeCourses.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            Em Breve
            <Badge className="ml-2 bg-accent text-accent-foreground">
              {upcomingCourses.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completed">
            Concluídos
            <Badge className="ml-2 bg-muted text-muted-foreground">
              {completedCourses.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterByCategory(activeCourses).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
          {filterByCategory(activeCourses).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum curso ativo disponível no momento.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterByCategory(upcomingCourses).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>
          {filterByCategory(upcomingCourses).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum curso programado para breve.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterByCategory(completedCourses).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>
          {filterByCategory(completedCourses).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Você ainda não concluiu nenhum curso.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
