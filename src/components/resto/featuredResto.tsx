import React from 'react'
import PhotoGrid from '@/components/ui/photoGrid'


interface FeaturedRestoProps {
  restoDetail: {
    name?: string;
    images?: string[];
  };
}

function FeaturedResto({ restoDetail }: FeaturedRestoProps) {
  const photos = Array.from({ length: 4 }).map((_, idx) => ({
    id: idx + 1,
    src: restoDetail?.images?.[idx] || "/app/main/featured-burger-image.png",
    alt: `${restoDetail?.name || "Restaurant"} Image ${idx + 1}`
  }));

  return (
    <div className="p-0 md:p-4 md:px-24 lg:px-32 md:py-16 w-full">
            
            {/* Mobile View: Scrollable Carousel */}
            <div className="flex md:hidden flex-row overflow-x-auto snap-x snap-mandatory w-full scrollbar-hide">
              {photos.map((photo) => (
                <div key={photo.id} className="relative w-full h-[300px] shrink-0 snap-center">
                  <img 
                    src={photo.src} 
                    alt={photo.alt} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>

            {/* Desktop View: Photo Grid */}
            <div className="hidden md:block">
              <PhotoGrid photos={photos} />
            </div>
    </div>
  )
}

export default FeaturedResto