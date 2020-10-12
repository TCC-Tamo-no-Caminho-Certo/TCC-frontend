import api from './api'

const token = localStorage.getItem('@SLab_ac_token')

async function validateToken(): Promise<boolean> {
  try {
    const response = await api.get('validate-session', {
      headers: {
        authorization: `Bearer 003cc592-c13f-4cc2-8309-7c57bad1ebd8`,
      },
    })
    return response.data.success
  } catch (e) {
    return e.response.data.success
  }
}

export default validateToken
