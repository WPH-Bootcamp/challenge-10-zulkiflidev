import React, { useState } from 'react'

import MenuDetailSection from '@/components/resto/menuDetailSection';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Menu, CartItem } from '@/types';

interface MenuSectionProps {
  foods: Menu[];
  drinks: Menu[];
  menuSectionProps: {
    getCartItem: (menuId: number) => CartItem | null | undefined;
    addingId: number | null;
    updatingId: number | null;
    onAdd: (menuId: number) => void;
    onUpdate: (cartItemId: number, menuId: number, currentQty: number, delta: number) => void;
  };
}

const FoodCategories = [
  { id: 'All', label: 'All Categories' },
  { id: 'Food', label: 'Foods' },
  { id: 'Drink', label: 'Drinks' },
];

function MenuSection({ foods, drinks, menuSectionProps }: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState<'All' | 'Food' | 'Drink'>('All');

  return (
    <div>

<div className="px-4 md:px-24 lg:px-32 pb-16 w-full">
        <h2 className="text-3xl font-extrabold mb-8 text-neutral-950">Menu</h2>

        {/* Filter Menu Makanan & Minuman: */}
        <div className="flex flex-row gap-3 mb-10 overflow-x-auto scrollbar-hide">
          
          {FoodCategories.map((tab) => (

            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id as 'All' | 'Food' | 'Drink')}

              className={cn(
                "rounded-full px-8 py-6 h-auto text-base font-bold transition-all",
                activeTab === tab.id
                  ? "bg-primary-100 text-white shadow-lg shadow-primary-100/20"
                  : "border-gray-200 text-gray-500 hover:border-primary-100 hover:text-primary-100"
              )}
            >{tab.label}
            </Button>

          ))}
          
        </div>


        {/* Menu Makanan & Minuman */}
        <div className="space-y-16">
          

          {(activeTab === 'All' || activeTab === 'Food') && foods.length > 0 && (
            <MenuDetailSection title="Foods" menus={foods} {...menuSectionProps} />
          )}


          {(activeTab === 'All' || activeTab === 'Drink') && drinks.length > 0 && (
            <MenuDetailSection title="Drinks" menus={drinks} {...menuSectionProps} />
          )}

        </div>
        
      </div>


    </div>
  )
}

export default MenuSection