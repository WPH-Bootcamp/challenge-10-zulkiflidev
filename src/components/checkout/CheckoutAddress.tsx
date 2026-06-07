import React from 'react';
import { MapPin, Phone, StickyNote } from 'lucide-react';


interface CheckoutAddressProps {

  deliveryAddress: string;
  setDeliveryAddress: (val: string) => void;

  phone: string;
  setPhone: (val: string) => void;
  
  notes: string;
  setNotes: (val: string) => void;
}


export function CheckoutAddress({
  deliveryAddress, setDeliveryAddress,
  phone, setPhone,
  notes, setNotes
}: CheckoutAddressProps) {
  return (
    
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      
      <h2 className="text-xl font-bold text-neutral-950 mb-6 flex items-center gap-2">
        <MapPin size={24} className="text-primary-100" />
          Delivery Address
      </h2>
      <div className="space-y-4">
        
        <textarea 
          
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="Enter your complete shipping address..."
          className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 min-h-[120px]
                    outline-none  focus:border-primary-100 resize-none transition-colors"

        />

        <div className="flex flex-row gap-4 items-center bg-gray-50 border border-gray-200 
                        rounded-2xl p-4">
          
          <Phone className="text-gray-400" size={20} />

          <input 
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nomor Telepon"
            className="bg-transparent border-none outline-none w-full font-medium"
          />
        </div>
        
        <div className="flex flex-row gap-4 items-start bg-gray-50 border border-gray-200 rounded-2xl p-4">
          
          <StickyNote className="text-gray-400 mt-1" size={20} />
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes for drivers (optional)"
            className="bg-transparent border-none outline-none w-full font-medium min-h-[60px] 
                       resize-none"
          />
        </div>

        
      </div>
    </div>
  );
}