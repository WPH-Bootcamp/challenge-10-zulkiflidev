"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Receipt } from 'lucide-react';
import Link from 'next/link';

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const txId = searchParams.get('txId');
  const authToken = useAuthStore((state) => state.token);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isMounted && !authToken) {
      router.push('/login');
    }
  }, [authToken, isMounted, router]);

  if (!isMounted) return null;

  return (
    <main className="flex-1 py-12 md:py-24 px-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-16 max-w-lg
                      w-full text-center flex flex-col items-center">
        
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center 
                       justify-center mb-6">
          <CheckCircle2 size={48} />
        </div>

        <h1 className="text-3xl font-extrabold text-neutral-950 mb-2">Order Successful!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for your order. We've received your request and will begin processing it shortly.
        </p>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl w-full p-6 mb-8 flex flex-col 
                        items-center">
          
          <Receipt className="text-gray-400 mb-3" size={24} />
          <p className="text-sm text-gray-500 font-medium mb-1">Transaction ID</p>
          <p className="text-lg font-bold text-neutral-950 tracking-wide">{txId || "UNKNOWN"}</p>

        </div>

        <div className="flex flex-col gap-4 w-full">
          <Link href="/orders" className="w-full">

            <Button className="w-full bg-primary-100 hover:bg-primary-100/90 text-white rounded-full 
                    py-6 h-auto text-lg font-bold shadow-md shadow-primary-100/20">
              View My Orders
            </Button>

          </Link>
          <Link href="/" className="w-full">

            <Button variant="outline" className="w-full bg-white border-gray-200 text-neutral-950 
                                                 hover:bg-gray-50 rounded-full py-6 h-auto text-lg font-bold">
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
