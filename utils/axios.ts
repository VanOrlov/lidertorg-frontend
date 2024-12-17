import axios from 'axios'
import type { AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        Authorization: 'Bearer 54f59b99f6ff99d1dc5e9038df994d76fc447101a2b62ab021550215ae63ad0d99690214ad0f7bf2f12ad560bc7d28ee6f17c045fbd1bcc19f3f86d495e952ebd2686c718c220d4b62d5eab00e196956a21b0e286e0c6a5a8a19de6aa7bfcb3d8b44e665bcaa82e2593d2e15880e3139899d0dc848ff55d3c2d30bf230454a35',
    }//54f59b99f6ff99d1dc5e9038df994d76fc447101a2b62ab021550215ae63ad0d99690214ad0f7bf2f12ad560bc7d28ee6f17c045fbd1bcc19f3f86d495e952ebd2686c718c220d4b62d5eab00e196956a21b0e286e0c6a5a8a19de6aa7bfcb3d8b44e665bcaa82e2593d2e15880e3139899d0dc848ff55d3c2d30bf230454a35
    //8399b2d411cd43a1d553dd8cbbc3a783f304bef732266238bca9c2b8ff726da7fafaa9e5c4391c112297fac5edad9ff34f0631eb1b07670128170c49306a18cd98170e38a4b0af2fbf5d14071f863604df92090570828e5890e96fbb943b49f060dcef8000d05e23537b2ddd24026d2a3196486b80f0cdbf8fe8980a83e058ab
})

export default axiosInstance