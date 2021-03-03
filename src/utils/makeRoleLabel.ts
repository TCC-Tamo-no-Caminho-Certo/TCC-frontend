import { Role } from 'store/user'

const role: any = {
  professor: 'Professor',
  customer: 'Proponente',
  student: 'Estudante',
  moderator: 'Moderador',
  evaluator: 'Revisor',
  admin: 'Administrador',
  guest: 'Convidado'
}

export default (roleKey: Role): Role => role[roleKey]
