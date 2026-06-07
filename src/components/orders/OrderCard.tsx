import React from 'react';
import { Receipt, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrderData, OrderRestaurantDetail, OrderItemDetail } from '@/types/order';

interface OrderCardProps {
  order: OrderData;
  onReviewClick: (order: OrderData) => void;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

export function OrderCard({ order, onReviewClick }: OrderCardProps) {
  // Simpan status ke dalam variabel agar lebih semantik & mudah dibaca di JSX
  const isCompleted = order.status === 'done';

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden
                    hover:shadow-md transition-shadow">
      
      {/* Order Header */}
      <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
            <Receipt size={24} />
          </div>

          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Transaction ID</p>
            <p className="font-extrabold text-neutral-950">{order.transactionId}</p>
          </div>
        
        </div>
        
        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-xl font-medium">
            <Clock size={16} />
            {formatDate(order.createdAt)}
          </div>
          
          <div
            className={`px-4 py-2 rounded-xl text-sm font-bold ${
              isCompleted ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
            }`}
          >
            {isCompleted ? 'Completed' : 'Processing'}
          </div>

        </div>

      </div>

      {/* Order Items (Restaurants) */}
      <div className="p-6 space-y-6">

        {order.restaurants?.map((restoGroup: OrderRestaurantDetail, idx: number) => (
        
        <div key={idx} className="flex gap-6">
            
            {/* Resto Logo */}
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border border-gray-50 shrink-0">
              
              <img
                src={restoGroup.restaurant?.logo || "/app/main/featured-burger-image.png"}
                alt={restoGroup.restaurant?.name || 'Restaurant'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/app/main/featured-burger-image.png";
                }}
              
              />

            </div>
            
            {/* Items Detail */}
            <div className="flex-1">
              <h3 className="font-bold text-lg text-neutral-950 mb-3">
                {restoGroup.restaurant?.name}
              </h3>
              
              <div className="space-y-2">

                {restoGroup.items?.map((item: OrderItemDetail, itemIdx: number) => (
                
                <div key={itemIdx} className="flex justify-between items-start">
                
                    <p className="text-gray-500 text-sm">
                      <span className="font-bold text-neutral-950 mr-2">{item.quantity}x</span> 
                      {item.menuName}
                    </p>

                    <p className="text-sm font-semibold text-neutral-950">
                      Rp {item.itemTotal?.toLocaleString('id-ID') || 0}
                    </p>
                
                  </div>
                ))}

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Order Footer & Total */}
      <div className="p-6 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 text-sm text-gray-500 max-w-sm">
        
          <MapPin size={18} className="shrink-0" />
          <span className="truncate">{order.deliveryAddress}</span>
        
        </div>
        
        <div className="flex items-center gap-6">
        
          <div className="text-right">
        
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Total Payment</p>
            <p className="text-xl font-extrabold text-primary-100">
              Rp {order.pricing?.totalPrice?.toLocaleString('id-ID') || 0}
            </p>
        
          </div>
          
          {isCompleted && (
            <Button 
              onClick={() => onReviewClick(order)}
              className="rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold px-6"
            >
              Beri Review
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
