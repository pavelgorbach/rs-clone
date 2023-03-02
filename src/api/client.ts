import axios from 'axios'

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const client = axios.create({
  baseURL: API_URL
})

client.defaults.headers.common['Content-Type'] = 'application/json'

export default client
