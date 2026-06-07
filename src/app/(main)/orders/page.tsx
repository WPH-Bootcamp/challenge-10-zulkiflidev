"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

import { useMyOrders } from '@/lib/query/useOrder';
import { useCreateReview } from '@/lib/query/useReview';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import { Button } from '@/components/ui/button';

import { Loader2 } from 'lucide-react';
import { OrderData } from '@/types/order';
import { OrderTabs } from '@/components/orders/OrderTabs';
import { OrderEmptyState } from '@/components/orders/OrderEmptyState';
import { OrderCard } from '@/components/orders/OrderCard';
import { OrderReviewModal } from '@/components/orders/OrderReviewModal';

export default function OrdersPage() {
  const router = useRouter();
  const authToken = useAuthStore((state) => state.token);

  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('done');

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  const { 
    data: ordersResponse, 
    isPending: ordersIsPending, 
    isError: ordersIsError 
  } = useMyOrders({ status: activeTab, page: 1, limit: 10 }, authToken);

  const { mutate: createReview, isPending: isSubmittingReview } = useCreateReview();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !authToken) {
      router.push('/login');
    }
  }, [authToken, isMounted, router]);

  if (!isMounted) return null;

  const handleSubmitReview = (rating: number, comment: string) => {
    const restaurant = selectedOrder?.restaurants?.[0];
    const restaurantId = restaurant?.restaurant?.id;

    if (!selectedOrder || !restaurantId || rating === 0) return;

    createReview(
      {
        transactionId: selectedOrder.transactionId,
        restaurantId,
        star: rating,
        comment,
        menuIds: restaurant?.items?.map((item) => item.menuId) || [],
      },
      {
        onSuccess: () => {
          setReviewModalOpen(false);
          alert("Review submitted successfully!");
        },
        onError: () => alert("Gagal mengirim review.")
      }
    );
  };

  // Ambil daftar pesanan dari manapun letaknya...
  const rawOrders = ordersResponse?.data?.data || 
                    ordersResponse?.data?.orders || 
                    ordersResponse?.data;
                    
  const ordersArray: OrderData[] = Array.isArray(rawOrders) ? rawOrders : [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar variant="solid" />
      
      <main className="flex-1 py-8 md:py-12 px-4 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-neutral-950 mb-8">My Orders</h1>

          <OrderTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          {ordersIsPending && (
            
            <div className="flex flex-col items-center justify-center py-24 bg-white
                            rounded-3xl border border-gray-100 shadow-sm">
              <Loader2 className="w-12 h-12 text-primary-100 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading order history...</p>
            </div>

          )}

          {!ordersIsPending && ordersIsError && (
            
            <div className="flex flex-col items-center justify-center py-24 bg-white 
                            rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-red-500 font-bold text-xl mb-4">Failed to load order</p>
              <Button onClick={() => window.location.reload()} 
                      className="rounded-full bg-primary-100">Try again</Button>
            
            </div>
          )}

          {!ordersIsPending && !ordersIsError && (
            
            <div className="space-y-6">
              {ordersArray.length === 0 ? (
                <OrderEmptyState />
              ) 
              : (
                ordersArray.map((order: OrderData) => (
                  
                  <OrderCard 
                    key={order.transactionId} 
                    order={order} 
                    onReviewClick={(selected) => {
                      setSelectedOrder(selected);
                      setReviewModalOpen(true);
                    }} 

                  />
                ))
              )}
            </div>
          )}

          <OrderReviewModal

            isOpen={reviewModalOpen}
            onClose={() => setReviewModalOpen(false)}
          
            onSubmit={handleSubmitReview}
            isSubmitting={isSubmittingReview}
            restaurantName={selectedOrder?.restaurants?.[0]?.restaurant?.name}
          
          />

        </div>
      </main>

      <Footer />
    </div>
  );
}
