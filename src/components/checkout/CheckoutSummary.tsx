import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export interface CartGroupSummary {
  
  restaurant: {
    id: string | number;
    name: string;
  };

  subtotal: number;
}

interface CheckoutSummaryProps {
  cartGroups: CartGroupSummary[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  totalPayment: number;
  errorMessage: string | null;
  isCheckingOut: boolean;
  onCheckout: () => void;
}

export function CheckoutSummary({
  cartGroups, subtotal, deliveryFee, serviceFee, totalPayment, errorMessage, isCheckingOut, onCheckout
}: CheckoutSummaryProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-neutral-950 mb-6">Payment Summary</h2>
        
        {/* List Restoran yang di checkout */}
        <div className="space-y-4 mb-6">
          
          
          {cartGroups.map((group) => (
            <div key={group.restaurant.id} className="flex justify-between items-center text-sm">
              <span className="text-gray-500 max-w-[200px] truncate">{group.restaurant.name}</span>
              <span className="font-bold text-neutral-950">Rp {group.subtotal.toLocaleString('id-ID')}</span>
            </div>
          ))}


        </div>

        <div className="border-t border-dashed border-gray-200 mb-6" />

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-bold text-neutral-950">Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
        
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Delivery Fee</span>
            <span className="font-bold text-neutral-950">Rp {deliveryFee.toLocaleString('id-ID')}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Service Fee</span>
            <span className="font-bold text-neutral-950">Rp {serviceFee.toLocaleString('id-ID')}</span>
          </div>
        
        </div>

        <div className="border-t border-gray-100 mb-6" />

        <div className="flex justify-between items-end mb-8">
          <span className="text-gray-500 font-bold">Total Payment</span>
          <span className="text-2xl font-extrabold text-primary-100">Rp {totalPayment.toLocaleString('id-ID')}</span>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-xl text-center">
            {errorMessage}
          </div>
        )}

        <Button 
          onClick={onCheckout}
          disabled={isCheckingOut}
          className="w-full bg-primary-100 hover:bg-primary-100/90 text-white rounded-full py-6 h-auto text-lg 
                     font-bold shadow-lg shadow-primary-100/20"
        >

            {isCheckingOut ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                Processing...
              </div>
            ) : (
              "Buy"
            )}

        </Button>

      </div>
  );
}