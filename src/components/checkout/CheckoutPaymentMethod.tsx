import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const BANKS = [
  { id: 'BCA', name: 'BCA', icon: 'BCA.svg' },
  { id: 'Mandiri', name: 'Mandiri', icon: 'Mandiri.svg' },
  { id: 'BNI', name: 'BNI', icon: 'BNI.svg' },
  { id: 'BRI', name: 'BRI', icon: 'BRI.svg' },
];

interface CheckoutPaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (val: string) => void;
}

export function CheckoutPaymentMethod({ paymentMethod, setPaymentMethod }: CheckoutPaymentMethodProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-xl font-bold text-neutral-950 mb-6">Payment Method</h2>
      <div className="grid grid-cols-1 gap-4">
        {BANKS.map((bank) => (
          <button
            key={bank.id}
            onClick={() => setPaymentMethod(bank.id)}
            className={cn(
              "relative flex items-center justify-center p-4 rounded-2xl border-2 transition-all h-20",
              paymentMethod === bank.id 
                ? "border-primary-100 bg-red-50/30" 
                : "border-gray-100 hover:border-gray-200 bg-white"
            )}
          >
            <div className="relative w-16 h-10">
              <Image 
                src={`/app/bank/${bank.icon}`} 
                alt={bank.name}
                fill
                className="object-contain"
              />
            </div>

            {paymentMethod === bank.id && (
              <div className="absolute -top-2 -right-2 bg-primary-100 rounded-full p-1 border-2 border-white">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" 
                    strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            )}


          </button>
        ))}
      </div>
    </div>
  );
}