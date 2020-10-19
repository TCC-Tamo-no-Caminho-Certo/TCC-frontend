/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({
  baseURL: 'http://dev.steamslab.com/api/',
})

interface Data {
  [k: string]: any
}

const api = {
  /**
   * Returns the data of an API request.
   */
  post: async (path: string, data?: Data, header?: AxiosRequestConfig) => {
    try {
      const res = await request.post(path, data, header)
      return res.data
    } catch (error) {
      return error.response.data
    }
  },

  /**
   * Returns the data of an API request.
   */
  get: async (path: string, header?: AxiosRequestConfig) => {
    try {
      const res = await request.get(path, header)
      return res.data
    } catch (error) {
      return error.response.data
    }
  },
}

export default api
