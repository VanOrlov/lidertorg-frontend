import axios from 'axios'
import type { AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        Authorization: 'Bearer 54f59b99f6ff99d1dc5e9038df994d76fc447101a2b62ab021550215ae63ad0d99690214ad0f7bf2f12ad560bc7d28ee6f17c045fbd1bcc19f3f86d495e952ebd2686c718c220d4b62d5eab00e196956a21b0e286e0c6a5a8a19de6aa7bfcb3d8b44e665bcaa82e2593d2e15880e3139899d0dc848ff55d3c2d30bf230454a35',
    }
})

export default axiosInstance