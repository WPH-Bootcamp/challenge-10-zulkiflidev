import React from 'react'

import Image from "next/image";


function Socialmedia() {
  return (
    <div>
        <div className="flex flex-row gap-4 justify-start items-center">
        
            <Image src="app/footer/SocialMediaIcons.svg" width={196} height={40}   alt="Social Media Icons"/>
        
        </div>
    </div>
  )
}

export default Socialmedia