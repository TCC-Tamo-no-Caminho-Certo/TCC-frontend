import api from '../services/api'

const token = localStorage.getItem('@SLab_ac_token')

async function validateToken(): Promise<boolean> {
  const response = await api.get('validate-session', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  return response.success
}

export default validateToken
