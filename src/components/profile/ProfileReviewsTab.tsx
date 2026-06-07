import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Loader2, Edit, Trash2 } from 'lucide-react';
import { ReviewData } from '@/types/review';
import { useMyReviews, useDeleteReview } from '@/lib/query/useReview';
import { EditReviewModal } from './EditReviewModal';

interface ProfileReviewsTabProps {
  authToken: string | null;
}

export function ProfileReviewsTab({ authToken }: ProfileReviewsTabProps) {
  const { data: reviewsResponse, isPending: reviewsIsLoading } = useMyReviews({ page: 1, limit: 10 }, authToken);
  const { mutate: deleteReview } = useDeleteReview();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleOpenEditModal = (review: ReviewData) => {
    setSelectedReview(review);
    setEditModalOpen(true);
  };

  const handleDeleteReview = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    
    setDeletingId(id);
    deleteReview(id, {
      onSettled: () => setDeletingId(null),
      onSuccess: () => alert("Review berhasil dihapus!"),
      onError: () => alert("Gagal menghapus review.")
    });
  };

  // Ekstrak data review secara defensif
  const rawData = reviewsResponse?.data;
  const reviewsArray = Array.isArray(rawData) ? rawData : (rawData?.reviews || rawData?.data || []);

  // Tentukan konten apa yang akan ditampilkan (Loading, Kosong, atau Daftar Review)
  let content;
  if (reviewsIsLoading) {
    content = (
      <div className="flex justify-center py-12">
        <Loader2 className="animate-spin text-primary-100" size={32} />
      </div>
    );
  } 
  
  else if (!reviewsArray || reviewsArray.length === 0) {
    content = (
      
      <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 
                      rounded-3xl border-2 border-dashed border-gray-200">
        <Star size={64} className="text-gray-300 mb-6" />
        <p className="text-xl text-gray-500 font-bold mb-6">You haven't written any reviews yet</p>
      
      </div>

    );
  } 
  
  else {
    content = (
      <div className="space-y-6">
        
        {reviewsArray.map((review: ReviewData, index: number) => (
          
          <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            
            <div className="flex justify-between items-start mb-4">
              
              <div>
                <h3 className="font-bold text-lg text-neutral-950">{review.restaurant?.name || "Restaurant"}</h3>
                <p className="text-xs text-gray-500 mt-1">Transaction ID: {review.transactionId}</p>
              </div>

              <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border 
                              border-gray-100">
                <Star className="fill-yellow-400 text-yellow-400" size={16} />
                <span className="font-bold text-sm text-neutral-950">{review.star}</span>
              </div>
            
            </div>
            
            {review.comment && (
              <p className="text-gray-600 text-sm mt-4 bg-white p-4 rounded-xl border border-gray-100">
                &quot;{review.comment}&quot;
              </p>
            )}
            
            <div className="flex gap-2 mt-4 justify-end">
              
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleOpenEditModal(review)}
                className="text-gray-500 hover:text-primary-100"
              >
                <Edit size={16} className="mr-2" /> Edit
              </Button>

              <Button 
                size="sm" 
                variant="destructive" 
                onClick={() => handleDeleteReview(review.id)} 
                disabled={deletingId === review.id}
                className="bg-red-50 text-red-500 hover:bg-red-100 border-none"
              >
                {deletingId === review.id ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} className="mr-2" />}
                Delete
              </Button>

            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
      <h2 className="text-3xl font-extrabold text-neutral-950 mb-8">My Reviews</h2>
      
      {content}

      <EditReviewModal 
        isOpen={editModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        review={selectedReview} 
      />
    </div>
  );
}
