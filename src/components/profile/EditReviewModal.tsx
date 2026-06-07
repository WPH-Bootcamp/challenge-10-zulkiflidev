import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Star, Loader2 } from 'lucide-react';
import { ReviewData } from '@/types/review';
import { useUpdateReview } from '@/lib/query/useReview';

interface EditReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: ReviewData | null;
}

export function EditReviewModal({ isOpen, onClose, review }: EditReviewModalProps) {
  const [editRating, setEditRating] = useState(0);
  const [editHoverRating, setEditHoverRating] = useState(0);
  const [editComment, setEditComment] = useState('');

  const { mutate: updateReview, isPending: isUpdatingReview } = useUpdateReview();

  useEffect(() => {
    
    if (review && isOpen) {
      setEditRating(review.star);
      setEditComment(review.comment || '');
    }

  }, [review, isOpen]);

  const handleUpdateReviewSubmit = () => {
    if (!review || editRating === 0) return;
    
    updateReview(
      { id: review.id, data: { star: editRating, comment: editComment } },
      {
        onSuccess: () => {
          onClose();
          alert("Review berhasil diupdate!");
        },
        onError: () => {
          alert("Gagal mengupdate review.");
        }
      }
    );

  };

  if (!isOpen || !review) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl flex flex-col 
                      pointer-events-auto">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-neutral-950 transition-colors"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-neutral-950 mb-2">Edit Review</h2>
        <p className="text-gray-500 mb-6">Perbarui pengalaman Anda di {review.restaurant?.name || 'Restaurant'}</p>
        
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setEditHoverRating(star)}
              onMouseLeave={() => setEditHoverRating(0)}
              onClick={() => setEditRating(star)}
              className="transition-transform hover:scale-110"
            >
              <Star 
                size={40} 
                className={(editHoverRating || editRating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
              />
            </button>
          ))}
        </div>

        <textarea
          value={editComment}
          onChange={(e) => setEditComment(e.target.value)}
          placeholder="Ceritakan pengalaman Anda di sini (opsional)..."
          className="w-full border border-gray-200 rounded-2xl p-4 min-h-[120px] outline-none 
                    focus:border-primary-100 resize-none mb-6"
        />

        <Button 
          onClick={handleUpdateReviewSubmit}
          disabled={isUpdatingReview || editRating === 0}
          className="w-full bg-primary-100 hover:bg-primary-100/90 text-white rounded-full py-6 
                     text-lg font-bold"
        >
          {isUpdatingReview ? <Loader2 className="animate-spin" size={20} /> : "Update Review"}
        </Button>

      </div>

    </div>
    
  );
}
