import axios from 'axios'

export const BASE_URL = 'http://localhost:3000'

const client = axios.create({
  baseURL: BASE_URL
})

client.defaults.headers.common['Content-Type'] = 'application/json'

export default client
