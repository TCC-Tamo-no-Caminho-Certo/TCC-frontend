import axios, { AxiosRequestConfig } from 'axios'

interface Data {
  [k: string]: any
}

const request = axios.create({
  baseURL: 'https://dev.steamslab.com/api/'
})

const api = {
  post: async (
    path: string,
    data?: Data,
    config?: AxiosRequestConfig
  ): Promise<any> => {
    const token = localStorage.getItem('@SLab_ac_token')

    const axiosConfig = token
      ? {
          headers: {
            authorization: `Bearer ${token}`
          },
          ...config
        }
      : config

    try {
      const res = await request.post(path, data, axiosConfig)
      return res.data
    } catch (error) {
      return error
    }
  },

  get: async (path: string, config?: AxiosRequestConfig): Promise<any> => {
    const token = localStorage.getItem('@SLab_ac_token')

    const axiosConfig = token
      ? {
          headers: {
            authorization: `Bearer ${token}`
          },
          ...config
        }
      : config

    try {
      const res = await request.get(path, axiosConfig)
      return res.data
    } catch (error) {
      return error
    }
  },

  put: async (
    path: string,
    data?: Data,
    config?: AxiosRequestConfig
  ): Promise<any> => {
    const token = localStorage.getItem('@SLab_ac_token')

    const axiosConfig = token
      ? {
          headers: {
            authorization: `Bearer ${token}`
          },
          ...config
        }
      : config

    try {
      const res = await request.put(path, data, axiosConfig)
      return res.data
    } catch (error) {
      return error
    }
  },

  delete: async (
    path: string,
    data?: Data,
    config?: AxiosRequestConfig
  ): Promise<any> => {
    const token = localStorage.getItem('@SLab_ac_token')

    const axiosConfig = token
      ? {
          headers: {
            authorization: `Bearer ${token}`
          },
          ...config
        }
      : config

    try {
      const res = await request.delete(path, axiosConfig)
      return res.data
    } catch (error) {
      return error
    }
  },

  patch: async (
    path: string,
    data?: Data,
    config?: AxiosRequestConfig
  ): Promise<any> => {
    const token = localStorage.getItem('@SLab_ac_token')

    const axiosConfig = token
      ? {
          headers: {
            authorization: `Bearer ${token}`
          },
          ...config
        }
      : config

    try {
      const res = await request.patch(path, data, axiosConfig)
      return res.data
    } catch (error) {
      return error
    }
  }
}

export default api
