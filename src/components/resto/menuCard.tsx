import React from 'react'

import { Button } from '../ui/button';
import { Plus, Minus, Loader2 } from 'lucide-react';

import type { Menu, CartItem } from '@/types';

type MenuCardProps = {
  menu: Menu;
  cartItem: CartItem | null | undefined;
  addingId: number | null;
  
  updatingId: number | null;
  onAdd: (menuId: number) => void;
  onUpdate: (cartItemId: number, menuId: number, currentQty: number, delta: number) => void;

};


function MenuCard({ menu, cartItem, addingId, updatingId, onAdd, onUpdate }: MenuCardProps) {
  return (

    <div className="flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden 
                    shadow-sm hover:shadow-xl  transition-all  duration-300 group">

      <div className="relative w-full h-56 bg-gray-100 shrink-0 overflow-hidden">

        <img
          src={menu.image || "/app/main/featured-burger-image.png"}
          alt={menu.name || menu.foodName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col p-6 flex-grow">
        <h4 className="font-bold text-xl text-neutral-950 mb-2">{menu.name || menu.foodName}</h4>
        {menu.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2 mb-4">{menu.description}</p>
        )}

        <div className="mt-auto flex flex-row items-center justify-between pt-4 border-t border-gray-50">
          <p className="text-xl font-extrabold text-primary-100">Rp {menu.price?.toLocaleString('id-ID')}</p>
          
          {cartItem ? (
            
            <div className="flex items-center gap-3">
              
              <Button
                size="icon-sm"
                variant="outline"
                disabled={updatingId === menu.id}
                onClick={() => onUpdate(cartItem.id, menu.id, cartItem.quantity, -1)}
                className="rounded-full w-10 h-10 bg-white border-gray-200 text-gray-400 hover:border-primary-100 
                           hover:text-primary-100"
              >
                {updatingId === menu.id ? <Loader2 className="animate-spin" size={16} /> : <Minus size={18} />}
              </Button>
              
              <span className="font-bold text-neutral-950 text-lg w-4 text-center">{cartItem.quantity}</span>
              
              <Button
                size="icon-sm"
                disabled={updatingId === menu.id}
                onClick={() => onUpdate(cartItem.id, menu.id, cartItem.quantity, 1)}
                className="rounded-full w-10 h-10 bg-primary-100 text-white hover:bg-primary-100/90"
              >
                {updatingId === menu.id ? <Loader2 className="animate-spin" size={16} /> : <Plus size={18} />}
              </Button>
            
            </div>
          ) 
          
          : 
          
          (
            <Button
              variant="default"
              size="sm"
              disabled={addingId === menu.id}
              onClick={() => onAdd(menu.id)}
              className="rounded-full px-8 py-5 h-auto font-bold flex items-center gap-2 bg-primary-100 
                         hover:bg-primary-100/90 shadow-md shadow-primary-100/10"
            >
              {addingId === menu.id ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
              {addingId === menu.id ? "Adding..." : "Add"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}


export default MenuCard