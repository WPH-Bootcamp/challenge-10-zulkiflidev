import React from 'react';

interface CartGroup {
  restaurant: { id: number; name: string; logo?: string; };
  items: {
    menu: { id: number; foodName: string; price: number; image?: string; };
    quantity: number;
  }[];
  subtotal: number;
}

interface CheckoutOrderListProps {
  cartGroups: CartGroup[];
}

export function CheckoutOrderList({ cartGroups }: CheckoutOrderListProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-xl font-bold text-neutral-950 mb-6">Order List</h2>
      
      <div className="space-y-6">
        
        {cartGroups.map((group) => (

          <div key={group.restaurant.id} className="space-y-4">
            
            <h3 className="font-bold text-lg border-b border-gray-100 pb-2">
              {group.restaurant.name}
            </h3>
            
            <div className="space-y-4">
                {group.items.map((item) => (
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
  );
}
