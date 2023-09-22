/**
 * Author: Kien Quoc Mai
 * Created date: 15/09/2023
 * Last modified Date: 19/09/2023
 */
import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } finally {
      return config
    }
  },
  (error) => Promise.reject(error)
)

export default instance
