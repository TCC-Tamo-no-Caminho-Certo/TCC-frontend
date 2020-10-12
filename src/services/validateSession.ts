import api from './api'

const token = localStorage.getItem('@SLab_ac_token')

async function validateToken(): Promise<boolean> {
  const response = await api.get('validate-session', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export default validateToken
