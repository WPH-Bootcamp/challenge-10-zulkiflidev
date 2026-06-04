import React from 'react';

import type { Restaurant } from '@/types/resto';
import RestoCard from '@/components/ui/restoCard';


interface RestoListProps {
  title?: string;
  data: any[];
  isPending: boolean;
  isError: boolean;

  isMounted: boolean;
  requireAuth?: boolean;
  token?: string | null;
  
}

function RestoList({ title, data, isPending, isError, isMounted, requireAuth, token }: RestoListProps) {

  const renderContent = () => {
    
    if (!isMounted) return null;    
    if (requireAuth && !token) {
      return <p className="text-gray-500 col-span-full">
                           Silakan login untuk melihat {title ? title.toLowerCase() : 'data'}.</p>;
    }    
    if (isPending) return <p className="text-gray-500 col-span-full">
                          Memuat {title ? title.toLowerCase() : 'data'}...</p>;    

    if (isError) return <p className="text-red-500 col-span-full">Gagal memuat {title ? title.toLowerCase() : 'data'}.</p>;    
    if (data.length > 0) {

      return data.map((resto: Restaurant) => (
        <RestoCard key={resto.id} resto={resto} />

      ));
    }

    return <p className="text-gray-500 col-span-full">Tidak ada {title ? title.toLowerCase() : 'data'} saat ini.</p>;
  };

  return (
    <div className="flex flex-col gap-4 bg-white text-neutral-950">               
      <div className="px-4 md:px-16 py-8">


        {/* Render Judul jika dikirim via props */}
        {title && <h2 className="text-xl md:text-2xl font-bold mb-6">{title}</h2>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderContent()}
        </div>
      </div>


    </div> 
  );
}

export default RestoList;