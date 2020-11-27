import { RoleTypes } from 'store/user'

const role: any = {
  professor: 'Professor',
  customer: 'Proponente',
  student: 'Estudante',
  moderator: 'Moderador',
  evaluator: 'Revisor',
  admin: 'Administrador',
  'base user': 'Convidado',
  'aris user': 'Aris',
}

export default (roleKey: RoleTypes): RoleTypes => role[roleKey]
