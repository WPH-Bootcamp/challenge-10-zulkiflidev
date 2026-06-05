import React from 'react'
import Image from "next/image";
import Link from "next/link";


function Logo() {
  return (
    <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
        <div className="flex flex-col gap-4 justify-center items-center">              
            <div className="flex flex-row gap-4 justify-start items-center">
            <Image src="/app/navbar/logo.svg" width={32} height={32} alt="Logo" />
            <p className="text-xl font-extrabold">Foody</p>
            </div>
        </div>
    </Link>
  )
}

export default Logo