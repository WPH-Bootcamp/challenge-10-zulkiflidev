import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProfileProps {
  isLoggedIn: boolean;
  userName?: string;
  profileImage?: string;
  variant?: 'transparent' | 'solid';
}

function Profile({ isLoggedIn, userName, profileImage, variant = 'transparent' }: ProfileProps) {
  const isTransparent = variant === 'transparent';

  if (!isLoggedIn) {
    return (
      
      <div className="flex flex-row gap-2 md:gap-8 justify-start items-center">
        
        <Link href="/login">
          <Button variant={isTransparent ? "outline-white" : "outline"}>Sign In</Button>
        </Link>
        
        <Link href="/login?tab=signup">
          <Button variant={isTransparent ? "solid-white" : "default"}>Sign Up</Button>
        </Link>

      </div>
    );
  }

  return (
    <div>
        <div className="flex flex-row gap-2 md:gap-4 justify-start items-center">

          <Link href="/cart">
            <Image 
              src="/app/main/cart-icon.svg" width={24} height={20} alt="Cart Icon" 
              className={!isTransparent ? 'invert' : ''}
            />            
          </Link>

          <Link href="/profile" className="flex flex-row gap-2 md:gap-4 justify-start items-
                                           center hover:opacity-80 transition-opacity">
            
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
              <Image 
                src={profileImage || "/app/main/profile-image.png"} 
                alt="Profile Image"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-base md:text-xl font-extrabold hidden 
                          sm:block">{userName || "User"}</p>
          
          </Link>

        </div>
    </div>  
    )
}

export default Profile