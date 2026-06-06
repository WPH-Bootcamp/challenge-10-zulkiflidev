import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Star, Loader2 } from 'lucide-react';

interface OrderReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  isSubmitting: boolean;
  restaurantName?: string;
}

export function OrderReviewModal({ isOpen, onClose, onSubmit, isSubmitting, restaurantName }: OrderReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  // Reset form ketika modal terbuka
  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setComment('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl flex flex-col pointer-events-auto">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-neutral-950 transition-colors"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-neutral-950 mb-2">Beri Review</h2>
        <p className="text-gray-500 mb-6">Bagaimana pengalaman Anda dengan {restaurantName || 'Restoran'}?</p>
        
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <Star 
                size={40} 
                className={(hoverRating || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
              />
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Ceritakan pengalaman Anda di sini (opsional)..."
          className="w-full border border-gray-200 rounded-2xl p-4 min-h-[120px] outline-none focus:border-primary-100 resize-none mb-6"
        />

        <Button 
          onClick={() => onSubmit(rating, comment)}
          disabled={isSubmitting || rating === 0}
          className="w-full bg-primary-100 hover:bg-primary-100/90 text-white rounded-full py-6 text-lg font-bold"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Kirim Review"}
        </Button>
      </div>
    </div>
  );
}
