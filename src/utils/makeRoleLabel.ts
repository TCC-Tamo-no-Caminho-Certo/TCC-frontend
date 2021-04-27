import { Role } from 'store/Async/roles'

type RoleLabels = {
  [_key in Role]: string
}

const roles: RoleLabels = {
  professor: 'Professor',
  customer: 'Proponente',
  student: 'Estudante',
  moderator: 'Moderador',
  evaluator: 'Revisor',
  admin: 'Administrador',
  guest: 'Convidado'
}

export default (roleKey: Role): string => roles[roleKey]
