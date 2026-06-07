"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useCart } from '@/lib/query/useCart';
import { useProfile } from '@/lib/query/useAuth';
import { useCheckoutOrder } from '@/lib/query/useOrder';

import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';

import { Button } from '@/components/ui/button';
import { CheckoutAddress } from '@/components/checkout/CheckoutAddress';
import { CheckoutPaymentMethod } from '@/components/checkout/CheckoutPaymentMethod';
import { CheckoutSummary } from '@/components/checkout/CheckoutSummary';
import { CheckoutOrderList } from '@/components/checkout/CheckoutOrderList';

interface CartGroup {
  restaurant: { id: number; name: string; logo?: string; };
  items: {
    menu: { id: number; foodName: string; price: number; image?: string; };
    quantity: number;
  }[];
  subtotal: number;
}

interface CheckoutResponse {
  success: boolean;
  data?: { transaction?: { transactionId: string | number; }; };
}

interface CheckoutError {
  response?: { data?: { message?: string; }; };
}

function CheckoutContent() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const restoIdParam = searchParams.get('restoId');
  
  const authToken = useAuthStore((state) => state.token);
  
  const [isMounted, setIsMounted] = useState(false);
  
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('BCA');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: profileResponse } = useProfile(authToken);
  const { data: cartResponse, isPending: isCartLoading, isError: isCartError } = useCart(authToken);
  const { mutate: checkoutOrder, isPending: isCheckingOut } = useCheckoutOrder();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !authToken) router.push('/login'); // Redirect jika tidak ada token
  }, [authToken, isMounted, router]);

  useEffect(() => {
    if (profileResponse?.data) { // Isi otomatis dari data profil user
      setPhone(profileResponse.data.phone ?? '');
      setDeliveryAddress(profileResponse.data.address ?? '');
    }
  }, [profileResponse]);

  //loading & error...
  if (!isMounted || isCartLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-primary-300 
                        border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  //Cart...
  const cartData: CartGroup[] = cartResponse?.data?.cart || [];

  const targetCartGroups = restoIdParam 
    ? cartData.filter((group) => group.restaurant.id.toString() === restoIdParam) 
    : cartData;

  if (isCartError || targetCartGroups.length === 0) {
    return (

      <div className="flex-1 flex flex-col items-center justify-center px-4 min-h-[50vh]">
        
        <p className="text-xl font-bold text-gray-500 mb-4">Your Cart is Empty</p>
        <Button onClick={() => router.push('/')} className="rounded-full px-8">
          Back to Home
        </Button>

      </div>
    
    );
  }

  const subtotal = targetCartGroups.reduce((acc, group) => acc + group.subtotal, 0);
  const deliveryFee = 15000;
  const serviceFee = 2000;
  const totalPayment = subtotal + deliveryFee + serviceFee;

  // Checkout pesanan...
  const handleCheckout = () => {

    // Pengecekan awal
    if (!deliveryAddress.trim()) return setErrorMessage("Shipping address is required.");
    
    setErrorMessage(null);

    // Siapkan data untuk API
    const payload = {
      
      restaurants: targetCartGroups.map((group) => ({

        restaurantId: Number(group.restaurant.id),
        items: group.items.map((item) => ({
          menuId: Number(item.menu.id),
          quantity: item.quantity,
        })),
      
      })),

      deliveryAddress,
      phone,
      paymentMethod,
      notes
    };

    // Jalankan perintah checkout
    checkoutOrder(payload, {
      
      onSuccess: (res: unknown) => {
        const response = res as CheckoutResponse;
        const txId = response.data?.transaction?.transactionId;
        
        if (response.success && txId) {
          router.push(`/checkout/success?txId=${txId}`);
        } 
        else {
          setErrorMessage("Terjadi kesalahan dari server.");
        }
        
      },

      onError: (err: unknown) => {
        const errorMsg = (err as CheckoutError)?.response?.data?.message;
        setErrorMessage(errorMsg || "Gagal memproses pesanan");
      }
    });
  };

  return (
    <main className="flex-1 py-8 md:py-12 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-neutral-950 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">

            <CheckoutAddress 
              deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress}
              phone={phone} setPhone={setPhone}
              notes={notes} setNotes={setNotes}
            />

            {/* Daftar Pesanan   */}
            <CheckoutOrderList cartGroups={targetCartGroups} />

          </div>

          <div className="w-full lg:w-[400px] flex flex-col gap-8 h-fit sticky top-24">
            
            <CheckoutPaymentMethod 
              paymentMethod={paymentMethod} 
              setPaymentMethod={setPaymentMethod} 
            />

            <CheckoutSummary 
              cartGroups={targetCartGroups}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              serviceFee={serviceFee}
              totalPayment={totalPayment}
              errorMessage={errorMessage}
              isCheckingOut={isCheckingOut}
              onCheckout={handleCheckout}
            />

          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar variant="solid" />

      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center min-h-[50vh]">
          <div className="w-12 h-12 border-4 border-primary-300 border-t-transparent 
                          rounded-full animate-spin" />
        </div>
      
      }>
        <CheckoutContent />
      
      </Suspense>
      <Footer />
    </div>
  );
}
