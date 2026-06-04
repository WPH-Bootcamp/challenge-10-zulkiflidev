import React from 'react'
import Image from "next/image";


function Logo() {
  return (
    <div>

        <div className="flex flex-col gap-4 justify-center items-center">              
            <div className="flex flex-row gap-4 justify-start items-center">
            <Image src="app/login/logo.svg" width={32} height={32} alt="Logo" />
            <p className="text-xl font-extrabold">Foody</p>
            </div>
        </div>
    </div>
  )
}

export default Logo