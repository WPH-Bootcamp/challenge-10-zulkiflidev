"use client";

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useCart, useDeleteAllCart, useUpdateCartItem } from '@/lib/query/useCart';

import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { ShoppingCart, Trash2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CartGroupCard from '@/components/cart/CartGroupCard';

// Tipe data keranjang belanja
interface CartItem {
  id: number;
  menu: { id: number; foodName: string; price: number; image?: string; };
  quantity: number;
}

interface CartGroup {
  restaurant: { id: number; name: string; logo?: string; };
  items: CartItem[];
  subtotal: number;
}

function CartPage() {

  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const [updatingItemId, setUpdatingItemId] = useState<number | null>(null);

  const { data, isPending, isError } = useCart(token);
  const { mutate: clearCart, isPending: isClearing } = useDeleteAllCart();
  const { mutate: updateQuantity } = useUpdateCartItem();

  // Pastikan komponen dimuat di client-side dan user sudah login  
  useEffect(() => {

    setIsMounted(true);
    if (!token) router.push('/login');

  }, [token, router]);

  const handleUpdateQuantity = (id: number, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;

    setUpdatingItemId(id);
    updateQuantity(
      { id, quantity: newQty },
      { onSettled: () => setUpdatingItemId(null) } // onSettled dipanggil saat sukses maupun gagal
    );
    
  };

  const handleClearCart = () => {
    if (confirm("Apakah Anda yakin ingin mengosongkan keranjang?")) {
      clearCart();
    }
  };

  // Jangan render apa-apa jika belum di-mount untuk menghindari error hydration mismatch
  if (!isMounted) return null;

  // Berikan tipe data yang jelas dari API
  const cartGroups: CartGroup[] = data?.data?.cart || [];
  const hasItems = cartGroups.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar variant="solid" />
      
      <main className="flex-1 py-8 px-4 md:px-8 max-w-3xl mx-auto w-full">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-neutral-950">Keranjang Saya</h1>
          
          {hasItems && (
            
            <Button 
              variant="ghost" 
              onClick={handleClearCart}
              disabled={isClearing}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 
                          flex items-center gap-2"
            >
              <Trash2 size={18} />

              {isClearing ? "Menghapus..." : "Kosongkan Keranjang"}

            </Button>

          )}
        </div>

        {/* State Loading */}
        {isPending && (
          
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>

        )}

        {/* State Error */}
        {isError && !isPending && (

          <div className="text-center py-20">
            <ShoppingCart size={64} className="text-gray-300 mx-auto mb-4" />
            <p className="text-red-500 mb-4">Gagal memuat keranjang.</p>
            <Button onClick={() => window.location.reload()} variant="outline">Coba Lagi</Button>
          </div>
        
        )}

        {/* State Kosong */}
        {!isPending && !isError && !hasItems && (
          
          <div className="bg-white rounded-3xl p-12 text-center flex 
                           flex-col items-center shadow-sm">
            
            <ShoppingCart size={64} className="text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold mb-2">Keranjang Anda Kosong</h2>
            <p className="text-gray-500 mb-8">
              Sepertinya Anda belum menambahkan apa pun. Ayo mulai pesan makanan!
            </p>
            
            <Link href="/">
              <Button className="rounded-full px-8 py-6 text-base font-bold">Mulai Pesan</Button>
            </Link>

          </div>
        
        )}

        {/* Daftar Item di Keranjang */}
        {!isPending && !isError && hasItems && (
          
          <div className="space-y-6">
          
            {cartGroups.map(group => (
              
              <CartGroupCard 
                key={group.restaurant.id}
                group={group}
                updatingItemId={updatingItemId}
                onUpdateQuantity={handleUpdateQuantity}
              />
            
            ))}
          </div>

        )}
      </main>

      <Footer />
    </div>
  );
}

export default CartPage;
