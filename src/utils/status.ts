import { Themes } from 'styles/themes'

export type StatusTypes = 'accepted' | 'rejected' | 'awaiting'

export const getStatusColor = (theme: Themes, status?: StatusTypes) => {
  const colors = {
    accepted: theme.colors.green,
    awaiting: theme.colors.yellow,
    rejected: theme.colors.red
  }

  return status ? colors[status] : theme.colors.yellow
}

export const getStatusLabel = (status: StatusTypes) => {
  const labels = {
    accepted: 'Aceito',
    awaiting: 'Aguardando',
    rejected: 'Recusado'
  }

  return labels[status]
}
