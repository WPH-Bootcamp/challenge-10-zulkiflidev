"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import FeaturedSection from '@/components/section/featured';

import { useAuthStore } from '@/store/authStore';
import { useRestaurants, useRecommendedRestaurant } from '@/lib/query/useResto';
import { Restaurant } from '@/types/resto';

import RestoCategoriesMenu from '@/components/section/restoCategoriesMenu';
import RestoList from '@/components/section/restoList';


function MainPage() {
  
  const token = useAuthStore((state) => state.token);
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allData, isPending: isAllPending, isError: isAllError } = useRestaurants({});
  const { data: recData, isPending: isRecPending, isError: isRecError } = useRecommendedRestaurant(token);

  const isPending = token ? isRecPending : isAllPending;
  const isError = token ? isRecError : isAllError;

  const rawData = token 
    ? (recData?.data?.recommendations as Restaurant[]) || []
    : (allData?.data?.restaurants as Restaurant[]) || [];

  const filteredData = rawData.filter((resto) => {
    const matchResto = resto.name?.toLowerCase().includes(searchQuery.toLowerCase());
    if (token && resto.sampleMenus) {
      const matchMenu = resto.sampleMenus.some((menu) => 
        menu.foodName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return matchResto || matchMenu;
    }
    return matchResto;
  });

  useEffect(() => {
    setIsMounted(true);

  }, []);

  return (
    <div className="bg-white text-neutral-950">
        <Navbar />
        <FeaturedSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <RestoCategoriesMenu />
        <RestoList 
          title={token ? "Recommended Restaurants" : "All Restaurants"}
          data={filteredData}
          
          isPending={isPending}
          isError={isError}
          
          isMounted={isMounted}
          requireAuth={false}
        
        />

        <Footer />
    </div>  
  )
}

export default MainPage