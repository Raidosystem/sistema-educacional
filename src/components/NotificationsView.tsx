import { AnnouncementCard } from '@/components/AnnouncementCard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import type { Announcement } from '@/lib/types'

interface NotificationsViewProps {
  announcements: Announcement[]
  onMarkAsRead: (id: string) => void
  onDismiss: (id: string) => void
}

export function NotificationsView({ 
  announcements, 
  onMarkAsRead, 
  onDismiss 
}: NotificationsViewProps) {
  const unreadCount = announcements.filter(a => !a.read).length
  const highPriorityCount = announcements.filter(a => a.priority === 'high' && !a.read).length

  const unreadAnnouncements = announcements.filter(a => !a.read)
  const readAnnouncements = announcements.filter(a => a.read)
  const highPriorityAnnouncements = announcements.filter(a => a.priority === 'high')

  const handleMarkAllAsRead = () => {
    unreadAnnouncements.forEach(a => onMarkAsRead(a.id))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-['Space_Grotesk']">
            Notificações e Comunicados
          </h1>
          <p className="text-muted-foreground mt-2">
            Mantenha-se atualizado com as últimas novidades
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead}>
            Marcar todas como lidas
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-accent/10 border-2 border-accent p-6 rounded-lg">
          <p className="text-sm font-medium text-accent-foreground">Não Lidas</p>
          <p className="text-4xl font-bold mt-2 text-accent font-['Space_Grotesk']">
            {unreadCount}
          </p>
        </div>
        <div className="bg-destructive/10 border-2 border-destructive p-6 rounded-lg">
          <p className="text-sm font-medium text-destructive-foreground">Alta Prioridade</p>
          <p className="text-4xl font-bold mt-2 text-destructive font-['Space_Grotesk']">
            {highPriorityCount}
          </p>
        </div>
        <div className="bg-primary/10 border-2 border-primary p-6 rounded-lg">
          <p className="text-sm font-medium text-primary-foreground">Total</p>
          <p className="text-4xl font-bold mt-2 text-primary font-['Space_Grotesk']">
            {announcements.length}
          </p>
        </div>
      </div>

      <Tabs defaultValue="unread" className="space-y-6">
        <TabsList>
          <TabsTrigger value="unread">
            Não Lidas
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-accent text-accent-foreground">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="priority">
            Prioridade
            {highPriorityCount > 0 && (
              <Badge className="ml-2 bg-destructive text-destructive-foreground">
                {highPriorityCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="read">Lidas</TabsTrigger>
        </TabsList>

        <TabsContent value="unread" className="space-y-4">
          {unreadAnnouncements.length > 0 ? (
            unreadAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onMarkAsRead={onMarkAsRead}
                onDismiss={onDismiss}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                Você está em dia! Nenhuma notificação não lida.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onMarkAsRead={onMarkAsRead}
              onDismiss={onDismiss}
            />
          ))}
        </TabsContent>

        <TabsContent value="priority" className="space-y-4">
          {highPriorityAnnouncements.length > 0 ? (
            highPriorityAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onMarkAsRead={onMarkAsRead}
                onDismiss={onDismiss}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                Nenhuma notificação de alta prioridade no momento.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="read" className="space-y-4">
          {readAnnouncements.length > 0 ? (
            readAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onMarkAsRead={onMarkAsRead}
                onDismiss={onDismiss}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                Nenhuma notificação lida ainda.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
