import { RoleType } from 'types/Responses/user/roles'

type RolesLabel = { [_key in RoleType]: string }

const roles: RolesLabel = {
  guest: 'Convidado',
  evaluator: 'Revisor',
  student: 'Estudante',
  professor: 'Professor',
  administrator: 'Administrador',
  customer: 'Proponente',
  moderator: 'Moderador',
  developer: 'Desenvolvedor'
}

export const getRoleLabel = (roleKey?: RoleType) =>
  roleKey ? roles[roleKey] : ''
