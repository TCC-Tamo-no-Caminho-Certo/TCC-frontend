import axios, { AxiosRequestConfig } from 'axios'

interface Data {
  [k: string]: any
}

const request = axios.create({
  baseURL: 'https://dev.steamslab.com/api/',
})

const api = {
  post: async (path: string, data?: Data, config?: AxiosRequestConfig): Promise<any> => {
    const token = localStorage.getItem('@SLab_ac_token')

    const axiosConfig = token
      ? {
          headers: {
            authorization: `Bearer ${token}`,
          },
          ...config,
        }
      : config

    try {
      const res = await request.post(path, data, axiosConfig)
      return res.data
    } catch (error) {
      return error.response.data
    }
  },

  get: async (path: string, config?: AxiosRequestConfig): Promise<any> => {
    const token = localStorage.getItem('@SLab_ac_token')

    const axiosConfig = token
      ? {
          headers: {
            authorization: `Bearer ${token}`,
          },
          ...config,
        }
      : config

    try {
      const res = await request.get(path, axiosConfig)
      return res.data
    } catch (error) {
      return error.response.data
    }
  },
}

export default api
