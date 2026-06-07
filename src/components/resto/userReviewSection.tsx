import React from 'react'
import type { Review } from '@/types';

interface UserReviewSectionProps {
  reviews?: Review[];
}

function UserReviewSection({ reviews }: UserReviewSectionProps) {
  return (
    <div>
        <div className="px-4 md:px-24 lg:px-32 pb-32 w-full max-w-[1600px]">
            <h2 className="text-3xl font-extrabold mb-10 text-neutral-950">Reviews</h2>

            {reviews && reviews.length > 0 ? (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review: Review, index: number) => (
                
                <div key={review.id || index} 
                     className="p-8 bg-white border border-gray-100   rounded-3xl shadow-sm hover:shadow-md
                                transition-all">
                    <div className="flex justify-between items-start mb-4">
                    
                        <div>
                            <h4 className="font-bold text-neutral-950 text-lg">
                            {review.user?.name || review.name || 'Anonymous'}
                            </h4>
                            <p className="text-gray-400 text-xs mt-1">Verified Customer</p>
                        </div>

                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full border 
                                        border-yellow-100">
                            <span className="text-yellow-500 text-sm">★</span>
                            <span className="font-extrabold text-yellow-700 text-sm">{review.star || review.rating || 0}</span>
                        </div>

                    </div>

                    {review.comment && (
                    <p className="text-gray-600 text-sm leading-relaxed italic">"{review.comment}"</p>
                    )}

                </div>
                ))}
            </div>

            ) 
            
            : 
            
            (
            <div className="bg-gray-50/50 p-12 rounded-3xl text-center border border-dashed 
                            border-gray-200">

                <p className="text-gray-400 font-medium italic text-lg">No reviews for this restaurant yet.</p>

            </div>

            )}

        </div>

    </div>
  )
}

export default UserReviewSection