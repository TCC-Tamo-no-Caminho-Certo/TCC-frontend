import { Role, RoleType } from 'store/Async/roles'

type RolesLabel = {
  [_key in Role]: string
}

const roles: RolesLabel = {
  guest: 'Convidado',
  evaluator: 'Revisor',
  student: 'Estudante',
  professor: 'Professor',
  admin: 'Administrador',
  customer: 'Proponente',
  moderator: 'Moderador'
}

export const getRoleLabel = (
  roleKey: Role | number,
  storeRoles?: RoleType[]
): string => {
  if (typeof roleKey === 'number') {
    const roleTitle = storeRoles?.find(
      ({ role_id }) => role_id === roleKey
    )?.title

    return roleTitle ? roles[roleTitle] : 'undefined'
  }

  return roles[roleKey] || 'undefined'
}

export const getRoleName = (roleKey: number, storeRoles: RoleType[]): Role => {
  if (storeRoles) {
    const roleTitle = storeRoles.find(
      ({ role_id }) => role_id === roleKey
    )?.title

    return roleTitle || 'guest'
  }

  return 'guest'
}
