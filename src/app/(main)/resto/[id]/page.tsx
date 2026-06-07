"use client";

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useDetailRestaurant } from '@/lib/query/useResto';
import { useAddToCart, useCart, useUpdateCartItem, useDeleteCartItem } from '@/lib/query/useCart';
import { cn } from '@/lib/utils';

import PhotoGrid from '@/components/ui/photoGrid'
import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import RestoCard from '@/components/ui/restoCard';

import { Button } from '@/components/ui/button';
//import { Plus, Minus, Loader2 } from 'lucide-react';

import MenuDetailSection from '@/components/resto/menuDetailSection';

import type { Menu, CartItem, Review } from '@/types';
import FeaturedResto from '@/components/resto/featuredResto';
import MenuSection from '@/components/resto/menuSection';
import UserReviewSection from '@/components/resto/userReviewSection';

interface CartGroup {
  restaurant: { id: number };
  items: CartItem[];
}

//Main...
function RestoDetailPage({ params }: { params: Promise<{ id: string }> }) {

  const resolvedParams = React.use(params);
  const id = Number(resolvedParams.id);

  //state & stores...
  const authToken = useAuthStore((state) => state.token);
  const [isMounted, setIsMounted] = useState(false);
  const [addingId, setAddingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  //ini untuk API
  const { data: restoResponse, isPending: detailIsPending, isError: detailIsError } = useDetailRestaurant(id, authToken);
  const { data: cartResponse } = useCart(authToken);

  const { mutate: addToCart } = useAddToCart();
  const { mutate: updateQuantity } = useUpdateCartItem();
  const { mutate: deleteCartItem } = useDeleteCartItem();

  useEffect(() => {
    setIsMounted(true); // Hindari hydration error
  }, []);


  // Cek apakah sebuah menu sudah ada di keranjang
  const getCartItem = (menuId: number) => {
    const cartGroups: CartGroup[] = cartResponse?.data?.cart || [];
    const currentRestoGroup = cartGroups.find(group => group.restaurant.id === id);
    
    return currentRestoGroup?.items.find((item: CartItem) => item.menu.id === menuId) || null;
  };

  // Mengubah jumlah pesanan (tambah/kurang/hapus)
  const handleUpdateQuantity = (cartItemId: number, menuId: number, currentQty: number, 
                               delta: number) => {
    const newQty = currentQty + delta;
    setUpdatingId(menuId);

      const onSettled = () => setUpdatingId(null); // Reset state loading setelah selesai

      if (newQty < 1) {
        deleteCartItem(cartItemId, { onSettled });
      } else {
        updateQuantity({ id: cartItemId, quantity: newQty }, { onSettled });
      }
  };

  // Menambahkan menu baru ke keranjang
  const handleAddToCart = (menuId: number) => {

    setAddingId(menuId);
    addToCart(
      { restaurantId: id, menuId, quantity: 1 },
      {
        onSettled: () => setAddingId(null),
      }
    );

  };

  if (!isMounted) return null;

  if (detailIsPending) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        
        <Navbar variant="solid" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg font-medium text-gray-500">Loading restaurant details...</p>
        </div>
        <Footer />
      
      </div>
    );
  }

  const restoDetail = restoResponse?.data;

  if (detailIsError || !restoDetail) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar variant="solid" />
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-lg text-red-500 mb-4">Failed to load restaurant details.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
        <Footer />
        
      </div>
    );
  }

  const foods = restoDetail?.menus?.filter((m: Menu) => m.type === 'food') || [];
  const drinks = restoDetail?.menus?.filter((m: Menu) => m.type === 'drink') || [];
  const menuSectionProps = { getCartItem, addingId, updatingId, onAdd: handleAddToCart, 
                             onUpdate: handleUpdateQuantity };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      <Navbar variant="solid" />      
      <FeaturedResto restoDetail={restoDetail} />
      
      <div className="px-4 md:px-24 lg:px-32 pb-16 max-w-2xl">
        <RestoCard resto={restoDetail} />
      </div>

      <MenuSection foods={foods} drinks={drinks} menuSectionProps={menuSectionProps} />
      <UserReviewSection reviews={restoDetail?.reviews} />
      <Footer />

    </div>
  );
}

export default RestoDetailPage;