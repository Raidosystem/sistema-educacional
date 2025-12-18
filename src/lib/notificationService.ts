import type { ParentNotification, Attendance, Grade, Student, CustomMessage } from './types'

export const generateAttendanceNotification = (
  attendance: Attendance,
  student: Student,
  parentId: string
): ParentNotification | null => {
  if (attendance.status === 'present') return null

  const notificationId = `notif-${attendance.id}-${Date.now()}`
  const timestamp = new Date().toISOString()

  if (attendance.status === 'absent') {
    return {
      id: notificationId,
      parentId,
      studentId: student.id,
      studentName: student.name,
      type: 'attendance-absence',
      title: 'Falta Registrada',
      message: `${student.name} teve falta registrada em ${new Date(attendance.date).toLocaleDateString('pt-BR')}.`,
      timestamp,
      read: false,
      priority: 'high',
      relatedData: {
        attendanceId: attendance.id,
        date: attendance.date,
        status: attendance.status
      }
    }
  }

  if (attendance.status === 'late') {
    return {
      id: notificationId,
      parentId,
      studentId: student.id,
      studentName: student.name,
      type: 'attendance-late',
      title: 'Atraso Registrado',
      message: `${student.name} chegou atrasado(a) em ${new Date(attendance.date).toLocaleDateString('pt-BR')}.`,
      timestamp,
      read: false,
      priority: 'medium',
      relatedData: {
        attendanceId: attendance.id,
        date: attendance.date,
        status: attendance.status
      }
    }
  }

  return null
}

export const generateGradeNotification = (
  grade: Grade,
  student: Student,
  parentId: string,
  subject: string
): ParentNotification => {
  const notificationId = `notif-${grade.id}-${Date.now()}`
  const timestamp = new Date().toISOString()
  const percentage = (grade.score / grade.maxScore) * 100
  
  let type: ParentNotification['type'] = 'grade-posted'
  let title = 'Nova Nota Lançada'
  let priority: ParentNotification['priority'] = 'medium'

  if (percentage >= 90) {
    type = 'grade-high'
    title = 'Excelente Desempenho!'
    priority = 'low'
  } else if (percentage < 60) {
    type = 'grade-low'
    title = 'Atenção: Nota Abaixo da Média'
    priority = 'high'
  }

  return {
    id: notificationId,
    parentId,
    studentId: student.id,
    studentName: student.name,
    type,
    title,
    message: `Nova nota lançada para ${student.name} em ${subject}: ${grade.score.toFixed(1)}/${grade.maxScore.toFixed(1)} (${percentage.toFixed(0)}%)`,
    timestamp,
    read: false,
    priority,
    relatedData: {
      gradeId: grade.id,
      subject,
      score: grade.score,
      maxScore: grade.maxScore,
      date: grade.date
    }
  }
}

export const sortNotificationsByPriority = (notifications: ParentNotification[]): ParentNotification[] => {
  const priorityOrder = { high: 0, medium: 1, low: 2 }
  
  return [...notifications].sort((a, b) => {
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })
}

export const groupNotificationsByDate = (notifications: ParentNotification[]): Record<string, ParentNotification[]> => {
  const groups: Record<string, ParentNotification[]> = {}
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  notifications.forEach(notif => {
    const notifDate = new Date(notif.timestamp)
    notifDate.setHours(0, 0, 0, 0)
    
    let key: string
    if (notifDate.getTime() === today.getTime()) {
      key = 'Hoje'
    } else if (notifDate.getTime() === yesterday.getTime()) {
      key = 'Ontem'
    } else {
      key = new Date(notif.timestamp).toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'long',
        year: 'numeric'
      })
    }
    
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(notif)
  })

  return groups
}

export const generateCustomMessageNotification = (
  customMessage: CustomMessage,
  parentId: string
): ParentNotification => {
  const notificationId = `notif-custom-${customMessage.id}-${parentId}-${Date.now()}`

  return {
    id: notificationId,
    parentId,
    studentId: customMessage.studentId,
    studentName: customMessage.studentName,
    type: 'custom-message',
    title: customMessage.subject,
    message: customMessage.message,
    timestamp: customMessage.timestamp,
    read: false,
    priority: customMessage.priority,
    relatedData: {
      senderId: customMessage.senderId,
      senderName: customMessage.senderName,
      category: customMessage.category
    }
  }
}

