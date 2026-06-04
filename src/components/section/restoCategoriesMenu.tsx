import React from 'react'

import Image from 'next/image';
import { Button } from '@/components/ui/button';


// Sesuaikan nama file gambar (icon) di bawah ini dengan yang ada di folder public/app/main/top-menu/ Anda
const RESTO_CATEGORIES_MENU = [
  { label: "All Restaurant", icon: "all-restaurant.png" },
  { label: "Salad", icon: "nearby.png" },
  { label: "best-seller", icon: "best-seller.png" },
  { label: "Pasta", icon: "launch.png" },
];


function RestoCategoriesMenu() {
  return (
    <div className="bg-white text-neutral-950 py-8 w-full">
      
      <div className="flex flex-row justify-start md:justify-between overflow-x-auto gap-4
                      px-4 md:px-16 pb-8 pt-2 scrollbar-hide">

        {RESTO_CATEGORIES_MENU.map((menu, index) => (

            <Button 
              key={index} 
              variant="outline" 
              className="flex flex-col gap-3 h-auto py-4 px-6 rounded-2xl border-gray-200 
                        shadow-sm hover:border-primary hover:text-primary transition-colors"
            >

            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image 
                src={`/app/main/top-menu/${menu.icon}`} 
                alt={menu.label} 
                fill 
                className="object-contain" 
              />

            </div>

            <span className="font-semibold text-sm md:text-base">{menu.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default RestoCategoriesMenu