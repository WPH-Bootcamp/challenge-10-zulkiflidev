"use client";

import React, { useEffect, useState, Suspense } from 'react';
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

// Tipe data keranjang belanja
interface CartItem {
  menu: { id: number; foodName: string; price: number; image?: string; };
  quantity: number;
}

interface CartGroup {
  restaurant: { id: number; name: string; logo?: string; };
  items: CartItem[];
  subtotal: number;
}

// Tipe balikan dari API saat proses checkout
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
  const { data: cartResponse, isPending: cartIsPending, isError: cartIsError } = useCart(authToken);
  const { mutate: checkoutOrder, isPending: isCheckingOut } = useCheckoutOrder();

  // Pastikan render hanya di sisi client untuk menghindari hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Jika user belum login, lemparkan ke halaman login
  useEffect(() => {
    if (isMounted && !authToken) router.push('/login');
  }, [authToken, isMounted, router]);

  // Isi form otomatis dengan data profil jika tersedia
  useEffect(() => {
    if (profileResponse?.success) {
      setPhone(profileResponse.data.phone || '');
      setDeliveryAddress(profileResponse.data.address || '');
    }
  }, [profileResponse]);

  // Tampilkan loading saat awal mula atau saat ambil data keranjang
  if (!isMounted || cartIsPending) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-primary-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Ambil data keranjang dari API dan berikan tipe yang jelas
  const cartData: CartGroup[] = cartResponse?.data?.cart || [];

  // Ambil pesanan sesuai ID restoran, atau semua jika tidak ada ID
  const targetCartGroups = restoIdParam 
    ? cartData.filter(group => group.restaurant.id.toString() === restoIdParam) 
    : cartData;

  // Jika keranjang kosong atau terjadi error
  if (cartIsError || targetCartGroups.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 min-h-[50vh]">
        <p className="text-xl font-bold text-gray-500 mb-4">Keranjang Anda Kosong</p>
        <Button onClick={() => router.push('/')} className="rounded-full px-8">
          Kembali ke Beranda
        </Button>
      </div>
    );
  }

  // Hitung total harga (TypeScript bisa menebak tipe 'acc' dan 'group' secara otomatis)
  const subtotal = targetCartGroups.reduce((acc, group) => acc + group.subtotal, 0);
  const deliveryFee = 15000;
  const serviceFee = 2000;
  const totalPayment = subtotal + deliveryFee + serviceFee;

  // Fungsi untuk memproses pesanan
  const handleCheckout = () => {
    if (!deliveryAddress.trim()) {
      setErrorMessage("Alamat pengiriman harus diisi.");
      return;
    }
    
    setErrorMessage(null);

    // Siapkan data payload sesuai format yang diminta backend
    const payload = {
      restaurants: targetCartGroups.map(group => ({
        restaurantId: Number(group.restaurant.id),
        items: group.items.map(item => ({
          menuId: Number(item.menu.id),
          quantity: item.quantity,
        })),
      })),
      deliveryAddress,
      phone,
      paymentMethod,
      notes

    };

    // Panggil API checkout
    checkoutOrder(payload, {
      onSuccess: (res: unknown) => {
        const response = res as CheckoutResponse;
        if (response.success && response.data?.transaction?.transactionId) {
           router.push(`/checkout/success?txId=${response.data.transaction.transactionId}`);
        } else {
           setErrorMessage("Terjadi kesalahan dari server.");
        }
      },
      onError: (err: unknown) => {
        const error = err as CheckoutError;
        setErrorMessage(error.response?.data?.message || "Gagal memproses pesanan.");
      }
    });
  };

  return (
    <main className="flex-1 py-8 md:py-12 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-neutral-950 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form dan Daftar Pesanan */}
          <div className="flex-1 space-y-8">

            <CheckoutAddress 
              deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress}
              phone={phone} setPhone={setPhone}
              notes={notes} setNotes={setNotes}
            />

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

              <h2 className="text-xl font-bold text-neutral-950 mb-6">Order Items</h2>
              <div className="space-y-6">
              
                {targetCartGroups.map(group => (
                  <div key={group.restaurant.id} className="space-y-4">
                    <h3 className="font-bold text-lg border-b border-gray-100 pb-2">
                      {group.restaurant.name}
                    </h3>
                    <div className="space-y-4">
                      {group.items.map(item => (
                        <div key={item.menu.id} className="flex items-center gap-4">
                          <img
                            src={item.menu.image || "/app/main/featured-burger-image.png"}
                            alt={item.menu.foodName}
                            className="w-16 h-16 rounded-xl object-cover bg-gray-50 border border-gray-100"
                            onError={(e) => (e.currentTarget.src = "/app/main/featured-burger-image.png")}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-neutral-950">{item.menu.foodName}</h4>
                            <p className="font-bold text-primary-100 text-sm">
                              Rp {item.menu.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                          <div className="text-sm font-bold text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">
                            x{item.quantity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                
              </div>
            </div>
          </div>

          {/* Metode Pembayaran dan Ringkasan */}
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
          <div className="w-12 h-12 border-4 border-primary-300 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <CheckoutContent />
      </Suspense>
      <Footer />
    </div>
  );
}
