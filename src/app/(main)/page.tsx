"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import FeaturedSection from '@/components/section/featured';

import { useAuthStore } from '@/store/authStore';
import { useRecommendedRestaurant } from '@/lib/query/useResto';

import RestoCategoriesMenu from '@/components/section/restoCategoriesMenu';
import RestoList from '@/components/section/restoList';


function MainPage() {
  
  const token = useAuthStore((state) => state.token);
  const [isMounted, setIsMounted] = useState(false);
  const { data, isPending, isError } = useRecommendedRestaurant(token);

  useEffect(() => {
    setIsMounted(true);

  }, []);

  return (
    <div className="bg-white text-neutral-950">
        <Navbar />
        <FeaturedSection />

        <RestoCategoriesMenu />
        <RestoList 
          title="Recommended Restaurants"
          data={data?.data?.recommendations || []}
          
          isPending={isPending}
          isError={isError}
          
          isMounted={isMounted}
          requireAuth={true}
          token={token}
        
        />

        <Footer />
    </div>  
  )
}

export default MainPage