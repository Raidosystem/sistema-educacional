import { useState } from 'react'
import { ParentNotificationCard } from '@/components/ParentNotificationCard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Bell, CalendarX, ChartBar, CheckCircle } from '@phosphor-icons/react'
import type { ParentNotification } from '@/lib/types'
import { groupNotificationsByDate, sortNotificationsByPriority } from '@/lib/notificationService'

interface ParentNotificationsViewProps {
  notifications: ParentNotification[]
  onMarkAsRead: (id: string) => void
  onDismiss: (id: string) => void
}

export function ParentNotificationsView({
  notifications,
  onMarkAsRead,
  onDismiss
}: ParentNotificationsViewProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'attendance' | 'grades'>('all')

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read
    if (filter === 'attendance') return n.type === 'attendance-absence' || n.type === 'attendance-late'
    if (filter === 'grades') return n.type === 'grade-posted' || n.type === 'grade-low' || n.type === 'grade-high'
    return true
  })

  const sortedNotifications = sortNotificationsByPriority(filteredNotifications)
  const groupedNotifications = groupNotificationsByDate(sortedNotifications)

  const unreadCount = notifications.filter(n => !n.read).length
  const attendanceCount = notifications.filter(n => 
    (n.type === 'attendance-absence' || n.type === 'attendance-late') && !n.read
  ).length
  const gradesCount = notifications.filter(n => 
    (n.type === 'grade-posted' || n.type === 'grade-low' || n.type === 'grade-high') && !n.read
  ).length
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length

  const handleMarkAllAsRead = () => {
    filteredNotifications.filter(n => !n.read).forEach(n => onMarkAsRead(n.id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-['Space_Grotesk']">
            Central de Notificações
          </h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe atualizações sobre frequência e desempenho
          </p>
        </div>

        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead}>
            <CheckCircle className="h-4 w-4 mr-2" weight="fill" />
            Marcar todas como lidas
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={`border-2 ${unreadCount > 0 ? 'border-primary' : 'border-border'}`}>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Bell className="h-5 w-5 text-primary" weight="fill" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Não Lidas</p>
                <p className="text-2xl font-bold text-primary font-['Space_Grotesk']">
                  {unreadCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 ${highPriorityCount > 0 ? 'border-destructive' : 'border-border'}`}>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-destructive/10">
                <Bell className="h-5 w-5 text-destructive" weight="fill" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Alta Prioridade</p>
                <p className="text-2xl font-bold text-destructive font-['Space_Grotesk']">
                  {highPriorityCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 ${attendanceCount > 0 ? 'border-accent' : 'border-border'}`}>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-accent/10">
                <CalendarX className="h-5 w-5 text-accent" weight="fill" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Frequência</p>
                <p className="text-2xl font-bold text-accent font-['Space_Grotesk']">
                  {attendanceCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 ${gradesCount > 0 ? 'border-success' : 'border-border'}`}>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-success/10">
                <ChartBar className="h-5 w-5 text-success" weight="fill" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Notas</p>
                <p className="text-2xl font-bold text-success font-['Space_Grotesk']">
                  {gradesCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            Todas
            {notifications.length > 0 && (
              <Badge className="ml-2 bg-primary/20 text-primary">
                {notifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Não Lidas
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-primary text-primary-foreground">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="attendance">
            Frequência
            {attendanceCount > 0 && (
              <Badge className="ml-2 bg-accent/20 text-accent-foreground">
                {attendanceCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="grades">
            Notas
            {gradesCount > 0 && (
              <Badge className="ml-2 bg-success/20 text-success-foreground">
                {gradesCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-6">
          {sortedNotifications.length > 0 ? (
            <>
              {Object.entries(groupedNotifications).map(([dateLabel, dateNotifications]) => (
                <div key={dateLabel} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      {dateLabel}
                    </h3>
                    <Separator className="flex-1" />
                  </div>
                  <div className="space-y-3">
                    {dateNotifications.map((notification) => (
                      <ParentNotificationCard
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={onMarkAsRead}
                        onDismiss={onDismiss}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 rounded-full bg-muted">
                    <Bell className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Nenhuma notificação</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {filter === 'unread' && 'Você está em dia! Nenhuma notificação não lida.'}
                      {filter === 'attendance' && 'Nenhuma notificação de frequência no momento.'}
                      {filter === 'grades' && 'Nenhuma notificação de notas no momento.'}
                      {filter === 'all' && 'Você ainda não tem notificações.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
