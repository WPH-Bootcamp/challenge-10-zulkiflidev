import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Restaurant } from '@/types/resto';

interface RestoCardProps {
  resto: Restaurant;
}

function RestoCard({ resto }: RestoCardProps) {
  return (
    <div>
      
      <Link 
        href={`/resto/${resto.id}`}
        className="flex flex-row justify-center items-start gap-4 
                  border border-gray-100 rounded-2xl p-4 shadow-sm 
                  hover:shadow-md transition-shadow cursor-pointer"
      >

        <div className="relative w-1/3 h-auto mb-4 gap-4 rounded-xl overflow-hidden bg-gray-100">

            <img 
              src={resto.logo || "/app/main/featured-burger-image.png"} 
              alt={resto.name || "Restaurant"} 
              className="w-full h-full object-cover" 
              onError={(e) => {
                e.currentTarget.src = "/app/main/featured-burger-image.png";
              }}
            />
            
        </div>


        <div className="flex flex-col gap-2">

            <h3 className="font-bold text-lg">{resto.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Image src="/app/main/restaurant/Star.svg" alt="Star" width={16} height={16} />
              <p className="text-sm font-semibold">{resto.star || "0"}</p>
            </div>

            <p>{resto.place}</p>
            
        </div>


      </Link>
    </div>
  );
}

export default RestoCard;
