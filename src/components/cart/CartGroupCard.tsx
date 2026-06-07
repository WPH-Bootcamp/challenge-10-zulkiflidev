import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Loader2, Minus, Plus } from 'lucide-react';

export interface CartItem {
  id: number;
  menu: {
    foodName: string;
    price: number;
    image?: string;
  };
  quantity: number;
}

export interface CartGroup {
  restaurant: {
    id: number | string;
    name: string;
    logo?: string;
  };
  items: CartItem[];
  subtotal: number;
}

interface CartGroupCardProps {
  group: CartGroup;
  updatingItemId: number | null;
  onUpdateQuantity: (id: number, currentQty: number, delta: number) => void;
}

const DEFAULT_IMAGE = "/app/main/featured-burger-image.png";

export default function CartGroupCard({ group, updatingItemId, onUpdateQuantity }: CartGroupCardProps) {

  const { restaurant, items, subtotal } = group;

  return (

    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      
      {/* Info Restoran */}
      <div className="p-4 border-b border-gray-50 flex items-center justify-between">
        
        <Link href={`/resto/${restaurant.id}`} className="flex items-center gap-3 group">
          
          <img 
            src={restaurant.logo || DEFAULT_IMAGE} 
            alt={restaurant.name}
            className="w-10 h-10 rounded-lg object-cover border border-gray-100"
            onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE)}
          />

          <h3 className="font-bold text-lg group-hover:text-primary-100 transition-colors">
            {restaurant.name}
          </h3>
          <ChevronRight size={18} className="text-gray-400 group-hover:text-primary-100" />

        </Link>
      </div>

      {/* Daftar Menu yang Dipesan */}
      <div className="p-4 space-y-4">
        {items.map((item) => {
          // Destructuring properti di dalam item dan menyederhanakan status loading
          const { id, menu, quantity } = item;
          const isUpdating = updatingItemId === id;

          return (
            <div key={id} className="flex items-center gap-4">
              <img 
                src={menu.image || DEFAULT_IMAGE} 
                alt={menu.foodName}
                className="w-16 h-16 rounded-xl object-cover bg-gray-50"
                onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE)}
              />
              
              <div className="flex-1">
                <h4 className="text-sm text-gray-500 font-medium">{menu.foodName}</h4>
                <p className="font-bold text-neutral-950">
                  Rp {menu.price.toLocaleString('id-ID')}
                </p>
              </div>

              {/*Tambah/Kurang Jumlah Pesanan */}
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  disabled={isUpdating || quantity <= 1}
                  onClick={() => onUpdateQuantity(id, quantity, -1)}
                  className="w-8 h-8 p-0 rounded-full text-gray-500 hover:text-primary-100 
                             hover:border-primary-100"
                >
                  {isUpdating ? <Loader2 className="animate-spin" size={14} /> : <Minus size={14} />}
                </Button>
                
                <span className="font-bold w-4 text-center">{quantity}</span>
                
                <Button 
                  disabled={isUpdating}
                  onClick={() => onUpdateQuantity(id, quantity, 1)}
                  className="w-8 h-8 p-0 rounded-full bg-primary-100 text-white hover:bg-primary-100/90"
                >
                  {isUpdating ? <Loader2 className="animate-spin" size={14} /> : <Plus size={14} />}
                </Button>

                
              </div>

            </div>
          );

        })}

      </div>

      {/*harga dan checkout */}
      <div className="p-4 bg-gray-50 flex justify-between items-center border-t border-dashed border-gray-200">
        
        <div>
          <p className="text-xs text-gray-500">Total</p>
          <p className="font-extrabold text-xl text-neutral-950">
            Rp {subtotal.toLocaleString('id-ID')}
          </p>
        </div>

        <Link href={`/checkout?restoId=${restaurant.id}`}>
          <Button className="rounded-full px-8 py-2 h-auto text-base font-bold shadow-md bg-primary-100
                              text-white hover:bg-primary-100/90">
            Checkout
          </Button>
        </Link>
      
      </div>

    </div>
  );
}
