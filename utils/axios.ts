import axios from 'axios'
import type { AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        Authorization: 'Bearer bb0c1dd496efd189e069c52e6c7eb33440b33265ce880d1245bc7b661701cbfc0a3f0e2489770b53677fa0cd16c88ef75f4af487632939ab8e34c349077494cdfe01def82cee298e01521d5e61c19984e4a1934bcfb96470dedf99112be5f038d155d030dc55284997ad80537c4795755a12724eb215f7effbfcd195f16f9b0d',
    }
})

export default axiosInstance