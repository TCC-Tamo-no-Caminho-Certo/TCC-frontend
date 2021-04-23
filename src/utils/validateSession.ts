import api from '../services/api'

async function validateSession(): Promise<boolean> {
  const token = localStorage.getItem('@SLab_ac_token')
  if (!token) return false

  const { success } = await api.get('validate-session', {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  return success
}

export default validateSession
