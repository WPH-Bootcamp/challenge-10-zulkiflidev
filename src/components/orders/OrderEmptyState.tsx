import React from 'react';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function OrderEmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16
                    text-center flex flex-col items-center">
      
      <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag size={48} className="text-gray-300" />
      </div>
      
      <h2 className="text-2xl font-bold text-neutral-950 mb-2">No orders yet</h2>
      
      <p className="text-gray-500 mb-8 max-w-md">
        You don't have any orders in this status yet. Let's start ordering your favorite food!
      </p>
      
      <Link href="/">
        <Button className="bg-primary-100 hover:bg-primary-100/90 text-white rounded-full px-8 py-6 h-auto font-bold">
          Cari Restoran
        </Button>
      </Link>
    
    </div>
  );
}
