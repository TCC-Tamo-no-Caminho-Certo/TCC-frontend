import axios from 'axios'

const api = axios.create({
  baseURL: 'http://dev.steamslab.com/api/',
})

export default api
