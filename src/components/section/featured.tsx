import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';


function FeaturedSection() {
  return (
    <div className="relative w-full h-screen">
      <Image 
        src="/app/main/featured-burger-image.png" 
        alt="Featured Burger" 
        fill
        priority
        className="object-cover object-center"
      />
      
      {/* Overlay gradasi gelap ala Netflix agar teks/konten nantinya bisa terbaca jelas */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 
                       via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent 
                      to-transparent pointer-events-none" />

      {/* Konten Teks di Tengah */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 
                      pointer-events-none">
        
        <h1 className="text-white text-2xl md:text-3xl lg:text-5xl font-extrabold 
                      text-center drop-shadow-md">
          Explore Culinary Experiences
        </h1>
        <p className="text-sm md:text-xl mt-2 md:mt-4 text-center text-gray-200 max-w-lg">
          Search and refine your choice to discover the most perfect restaurant.
        </p>
        
        {/* Input Search Bar */}
        <div className="w-full max-w-2xl mt-6 md:mt-8 relative pointer-events-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" 
                  size={20} />
          <Input 
            placeholder="Search restaurants, food and drink" 
            className="w-full !bg-white dark:!bg-white border-0 text-black pl-12 py-4 md:py-6
                      rounded-full text-sm md:text-base shadow-lg focus-visible:ring-primary 
                      focus-visible:ring-offset-0"
          />
        </div>
      </div>
    </div>
  )
}

export default FeaturedSection