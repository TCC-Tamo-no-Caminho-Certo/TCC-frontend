import api from '../services/api'

const token = localStorage.getItem('@SLab_ac_token')

async function validateToken(): Promise<boolean> {
  const response = await api.get('validate-session', {
    headers: {
      authorization: `Bearer 003cc592-c13f-4cc2-8309-7c57bad1ebd8`,
    },
  })

  return response.success
}

export default validateToken
