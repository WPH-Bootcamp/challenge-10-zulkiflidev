import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export function ProfileAddressTab() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12">
      
      <h2 className="text-3xl font-extrabold text-neutral-950 mb-8">Delivery Address</h2>
      
      <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-3xl 
                       border-2 border-dashed border-gray-200">
        
        <MapPin size={64} className="text-gray-300 mb-6" />
        
        <p className="text-xl text-gray-500 font-bold mb-6">No address saved yet</p>
        
        <Button className="rounded-full px-12 py-6 h-auto text-lg font-bold bg-primary-100">
          
            Add New Address

        </Button>
      
      </div>
    
    </div>
  );
}
