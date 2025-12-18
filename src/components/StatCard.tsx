import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUp, ArrowDown, Minus } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface StatCardProps {
  title: string
  value: string | number
  trend?: {
    direction: 'up' | 'down' | 'neutral'
    value: string
  }
  icon: React.ReactNode
  accentColor?: 'primary' | 'accent' | 'success' | 'secondary'
}

export function StatCard({ title, value, trend, icon, accentColor = 'primary' }: StatCardProps) {
  const accentColors = {
    primary: 'border-l-primary',
    accent: 'border-l-accent',
    success: 'border-l-success',
    secondary: 'border-l-secondary'
  }

  const trendColors = {
    up: 'text-success',
    down: 'text-destructive',
    neutral: 'text-muted-foreground'
  }

  const TrendIcon = trend?.direction === 'up' ? ArrowUp : trend?.direction === 'down' ? ArrowDown : Minus

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`border-l-4 ${accentColors[accentColor]} hover:shadow-lg transition-shadow`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="text-muted-foreground">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold font-['Space_Grotesk']">{value}</div>
          {trend && (
            <div className={`flex items-center gap-1 text-xs mt-2 ${trendColors[trend.direction]}`}>
              <TrendIcon size={14} weight="bold" />
              <span className="font-medium">{trend.value}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
