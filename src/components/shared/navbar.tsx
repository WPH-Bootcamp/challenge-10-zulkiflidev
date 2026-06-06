import React, { useEffect, useState } from 'react'
import Logo from '@/components/shared/logo'
import Profile from './profile'

import { useAuthStore } from '@/store/authStore'
import { useProfile } from '@/lib/query/useAuth'
import { cn } from '@/lib/utils'

interface NavbarProps {
  variant?: 'transparent' | 'solid';
}

function Navbar({ variant = 'transparent' }: NavbarProps) {
  // === State & Store ===
  const authToken = useAuthStore((state) => state.token);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // === Hooks & Data Fetching ===
  const { 
    data: profileData,
    // isLoading: profileIsLoading,
    // isError: profileIsError 
  } = useProfile(authToken);

  // === Lifecycle & Event Listeners ===
  useEffect(() => {

    // Mencegah hydration mismatch karena Zustand persist (localStorage)
    setIsMounted(true);
    
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // === Logika Render ===
  const isLoggedIn = isMounted ? !!authToken : false;
  
  
  // Jika variant solid, maka background selalu putih. 
  // Jika transparent, background putih hanya jika discroll.
  const isTransparent = variant === 'transparent' && !isScrolled;

  // === UI Render ===
  return (
    <div className={cn(
      "w-full z-50 transition-all duration-300",
      isTransparent 
        ? "absolute top-0 left-0 bg-transparent text-white" 
        : "sticky top-0 bg-white text-black shadow-sm"
    )}>
      <div className="flex flex-row px-4 md:px-24 lg:px-32 py-4 justify-between 
                      items-center w-full">
        
        <Logo />        
        <Profile 
          isLoggedIn={isLoggedIn} 
          variant={isTransparent ? 'transparent' : 'solid'} 
          userName={profileData?.data?.name}
          profileImage={profileData?.data?.avatar}
        />
              
      </div>
    </div>
  )
}

export default Navbar