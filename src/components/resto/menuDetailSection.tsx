import React from 'react'

import MenuCard from './menuCard';
import type { Menu, CartItem } from '@/types';

type MenuDetailSectionProps = {

  title: string;
  menus: Menu[];
  getCartItem: (menuId: number) => CartItem | null | undefined;
  addingId: number | null;

  updatingId: number | null;
  onAdd: (menuId: number) => void;
  onUpdate: (cartItemId: number, menuId: number, currentQty: number, delta: number) => void;

};

function MenuDetailSection({ title, menus, getCartItem, addingId, updatingId, onAdd, onUpdate }: MenuDetailSectionProps) {
  return (

    <div>
      
      <h3 className="text-2xl font-bold mb-8 text-neutral-950 flex items-center gap-3">
        <div className="w-2 h-8 bg-primary-100 rounded-full" />
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menus.map((menu) => (

            <MenuCard
            
                key={menu.id}
                menu={menu}
                cartItem={getCartItem(menu.id)}
                addingId={addingId}

                updatingId={updatingId}
                onAdd={onAdd}
                onUpdate={onUpdate}
            />

        ))}

      </div>
    </div>
  );
}
export default MenuDetailSection