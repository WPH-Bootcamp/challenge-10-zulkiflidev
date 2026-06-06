import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface AuthState {
  
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;

}

export const useAuthStore = create<AuthState>()(
  persist(

    (set) => ({
      
      //simpan token supaya bisa digunakan di halaman-halaman lain....
      token: null,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null }),
    
    }),
    
    {
      name: 'auth-storage',
    }
  )
);
