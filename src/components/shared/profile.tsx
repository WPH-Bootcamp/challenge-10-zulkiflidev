import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProfileProps {
  isLoggedIn: boolean;
  userName?: string;
  profileImage?: string;
}

function Profile({ isLoggedIn, userName, profileImage }: ProfileProps) {
  if (!isLoggedIn) {
    return (
      <div className="flex flex-row gap-2 md:gap-8 justify-start items-center">
        <Link href="/login">
          <Button variant="outline-white">Sign In</Button>
        </Link>
        <Link href="/register">
          <Button variant="solid-white">Sign Up</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
        <div className="flex flex-row gap-2 md:gap-4 justify-start items-center">

          <Link href="/cart">
            <Image src="/app/main/cart-icon.svg" width={24} height={20} alt="Cart Icon" />            
          </Link>
          <Button variant="hidden">  
            <Image className="rounded-full" 
                    src={profileImage || "/app/main/profile-image.png"} width={32} 
                        height={32} alt="Profile Image" />
          </Button>
          <p className="text-base md:text-xl font-extrabold hidden 
                        sm:block">{userName || "User"}</p>

        </div>
    </div>  
    )
}

export default Profile