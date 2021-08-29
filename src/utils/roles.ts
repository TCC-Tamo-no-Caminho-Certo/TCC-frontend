import { RoleType } from 'types/Responses/user/roles'

type RolesLabel = { [_key in RoleType]: string }

const roles: RolesLabel = {
  guest: 'Convidado',
  evaluator: 'Revisor',
  student: 'Estudante',
  professor: 'Professor',
  customer: 'Proponente',
  moderator: 'Moderador',
  developer: 'Desenvolvedor',
  administrator: 'Administrador'
}

export const getRoleLabel = (roleKey?: RoleType) =>
  roleKey ? roles[roleKey] : ''
