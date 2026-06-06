import React from 'react'
import PhotoGrid from '@/components/ui/photoGrid'


interface FeaturedRestoProps {
  restoDetail: {
    name?: string;
    images?: string[];
  };
}

function FeaturedResto({ restoDetail }: FeaturedRestoProps) {
  return (
    <div className="p-4 md:px-24 lg:px-32 md:py-16">
            
            <PhotoGrid
              photos={Array.from({ length: 4 }).map((_, idx) => ({
                id: idx + 1,
                src: restoDetail?.images?.[idx] || "/app/main/featured-burger-image.png",
                alt: `${restoDetail?.name || "Restaurant"} Image ${idx + 1}`
              }))}
    
            />
    </div>
  )
}

export default FeaturedResto