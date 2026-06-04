import React, { useEffect, useState } from 'react'
import Logo from './logo'
import Profile from './profile'
import { useAuthStore } from '@/store/authStore'

function Navbar() {
  const token = useAuthStore((state) => state.token);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mencegah hydration mismatch karena Zustand persist (localStorage)
  const isLoggedIn = isMounted ? !!token : false;

  return (
    <div className="absolute top-0 left-0 w-full z-50 bg-transparent text-white">
      <div className="flex flex-row px-4 md:px-16 py-4 justify-between items-center w-full">
        <Logo />
        
            <Profile isLoggedIn={isLoggedIn} />
              
      </div>
    </div>
  )
}

export default Navbar