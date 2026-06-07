"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Receipt, Calendar, CreditCard, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const txId = searchParams.get('txId');
  const authToken = useAuthStore((state) => state.token);
  const [isMounted, setIsMounted] = useState(false);
  const [checkoutData, setCheckoutData] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    if (isMounted && !authToken) {
      router.push('/login');
    }
  }, [authToken, isMounted, router]);

  useEffect(() => {
    // Coba mengambil response checkout dari sessionStorage atau localStorage
    const savedData = sessionStorage.getItem('checkoutResponse') || localStorage.getItem('checkoutResponse');
    if (savedData) {
      try {
        setCheckoutData(JSON.parse(savedData));
      } catch (error) {
        console.error("Failed to parse checkout data", error);
      }
    }
  }, []);

  if (!isMounted) return null;

  const transaction = checkoutData?.data?.transaction;

  const formatCurrency = (value?: number) => {
    if (value === undefined) return "-";
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);

  };

  const formatDate = (dateString?: string) => {

    if (!dateString) return '-';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
    
  };

  const calculateTotalItems = () => {
    if (!transaction?.restaurants) return 0;
    return transaction.restaurants.reduce((total: number, r: any) => {
      return total + r.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    }, 0);
  };

  return (
    <main className="flex-1 py-12 md:py-24 px-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 max-w-lg
                      w-full text-center flex flex-col items-center">
        
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center 
                       justify-center mb-6">
          <CheckCircle2 size={48} />
        </div>

        <h1 className="text-3xl font-extrabold text-neutral-950 mb-2">Order Successful!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for your order. We've received your request and will begin processing it shortly.
        </p>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl w-full p-6 mb-8 
                        flex flex-col gap-4 text-left">
          
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            
            <div className="flex items-center gap-3">
            
              <Receipt className="text-gray-400" size={24} />
              <div>
                <p className="text-sm text-gray-500 font-medium">Transaction ID</p>
                <p className="font-bold text-neutral-950">{txId || transaction?.transactionId || "UNKNOWN"}</p>
              </div>
            
            </div>

          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 flex items-center gap-2"><Calendar size={16}/> Date</span>
            <span className="font-semibold text-neutral-950">{formatDate(transaction?.createdAt)}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 flex items-center gap-2"><CreditCard size={16}/> Payment Method</span>
            <span className="font-semibold text-neutral-950 uppercase">{transaction?.paymentMethod || "-"}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 flex items-center gap-2">
              <ShoppingBag size={16}/> Price ({calculateTotalItems()} items)
            </span>
            <span className="font-semibold text-neutral-950">{formatCurrency(transaction?.pricing?.subtotal)}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Delivery Fee</span>
            <span className="font-semibold text-neutral-950">{formatCurrency(transaction?.pricing?.deliveryFee)}</span>
          </div>

          <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-4">
            <span className="text-gray-500">Service Fee</span>
            <span className="font-semibold text-neutral-950">{formatCurrency(transaction?.pricing?.serviceFee)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold text-neutral-950">Total</span>
            <span className="font-bold text-lg text-primary-100">{formatCurrency(transaction?.pricing?.totalPrice)}</span>
          </div>

        </div>

        <div className="flex flex-col gap-4 w-full">

          <Link href="/orders" className="w-full">

            <Button className="w-full bg-primary-100 hover:bg-primary-100/90 text-white rounded-full 
                    py-6 h-auto text-lg font-bold shadow-md shadow-primary-100/20">
              See My Orders
            </Button>

          </Link>

          <Link href="/" className="w-full">

            <Button variant="outline" className="w-full bg-white border-gray-200 text-neutral-950 
                                                 hover:bg-gray-50 rounded-full py-6 h-auto text-lg
                                               font-bold">
              Back to Home
            </Button>

          </Link>

        </div>

      </div>
    </main>


  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <Navbar variant="solid" />

      <Suspense fallback=
        {
          <div className="flex-1 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-300 border-t-transparent rounded-full 
                            animate-spin"></div>
          </div>
        }>
        <CheckoutSuccessContent />
      </Suspense>    
      
      <Footer />
    
    </div>
  );
}
