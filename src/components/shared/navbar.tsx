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
  const token = useAuthStore((state) => state.token);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: profileData } = useProfile(token);

  // Mencegah hydration mismatch karena Zustand persist (localStorage)
  const isLoggedIn = isMounted ? !!token : false;
  const isTransparent = variant === 'transparent';

  return (
    <div className={cn(
      "w-full z-50",
      isTransparent ? "absolute top-0 left-0 bg-transparent text-white" : "relative bg-white text-black shadow-sm"
    )}>
      <div className="flex flex-row px-4 md:px-16 py-4 justify-between 
                      items-center w-full">
        
        <Logo />        
        <Profile 
          isLoggedIn={isLoggedIn} 
          variant={variant} 
          userName={profileData?.data?.name}
          profileImage={profileData?.data?.avatar}
        />
              
      </div>
    </div>
  )
}

export default Navbar