import axios from "axios";
import { useAuthStore } from "@/store/authStore";


const apiClient = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },

  timeout: 10000, // optional, 10 detik


});



// Request Interceptor: Menyisipkan token secara otomatis jika user sudah login
apiClient.interceptors.request.use((config) => {

    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;


});

export default apiClient;
