"use client";

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useDetailRestaurant } from '@/lib/query/useResto';

import PhotoGrid from '@/components/ui/photoGrid'
import Footer from '@/components/shared/footer';

import Navbar from '@/components/shared/navbar';
import RestoCard from '@/components/ui/restoCard';
import { Button } from '@/components/ui/button';

//param automatis dari next.js
function RestoDetailPage({ params }: { params: Promise<{ id: string }> }) {

    const resolvedParams = React.use(params); //buka dulu promisenya pakai React.use()

    const id = Number(resolvedParams.id);
    const token = useAuthStore((state) => state.token);
    const [isMounted, setIsMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<'All' | 'Food' | 'Drink'>('All');
    
    //mulai dapatkan detail resto
    const { data, isPending, isError } = useDetailRestaurant(id, token);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return null; 
    }

    if (isPending) {
      return <div>Loading restaurant details...</div>;
    }

    if (isError) {
      return <div>Failed to load restaurant details.</div>;
    }

    // Ambil data detail dari `data.data` sesuai struktur API
    const restoDetail = data?.data;
    
    // Pisahkan menu berdasarkan tipe
    const foods = restoDetail?.menus?.filter((m: any) => m.type === 'food') || [];
    const drinks = restoDetail?.menus?.filter((m: any) => m.type === 'drink') || [];

    return (
      <div>
        <Navbar variant="solid" />

        <div className="p-4 md:p-16">
          <PhotoGrid
              photos={Array.from({ length: 4 }).map((_, idx) => ({
                id: idx + 1,

                // ambil gambar dari API, kalau engga berhasil, kita pakai gambar default saja (fallback)
                src: restoDetail?.images?.[idx] || "/app/main/featured-burger-image.png",
                alt: `${restoDetail?.name || "Restaurant"} Image ${idx + 1}`

              }))}
            />
        </div>

        
        {/* {restoDetail && (
          <div className="p-4 md:p-16">
            <h1 className="text-3xl font-bold">{restoDetail.name}</h1>
            <p className="mt-2 text-gray-600">{restoDetail.description}</p>
          </div>
        )} */}

        {/* Menambahkan max-w-md agar card tidak melebar ke seluruh layar */}
        <div className="p-4 md:px-16 md:pb-16 max-w-md">
          <RestoCard resto={restoDetail} />
        </div>

        {/* --- KOTAK DEBUGGING SEMENTARA --- */}
        {/* Hapus ini nanti jika masalah sudah ketemu */}
        {/* <div className="mx-4 md:mx-16 mb-8 p-4 bg-neutral-900 text-green-400 text-xs rounded-xl overflow-auto max-h-64">
          <p className="font-bold text-white mb-2">DEBUG: Data Menu dari API</p>
          <pre>{JSON.stringify(restoDetail?.menus, null, 2)}</pre>
        </div> */}

        {/* Daftar Menu */}
        <div className="p-4 md:px-16 md:pb-16 w-full">
          <h2 className="text-2xl font-bold mb-6">Menu</h2>

          {/* Tabs Kategori Menu */}
          <div className="flex flex-row gap-3 mb-8 overflow-x-auto scrollbar-hide">
            <Button
              variant={activeTab === 'All' ? 'default' : 'outline'}
              onClick={() => setActiveTab('All')}
              className={`rounded-full px-6 ${activeTab !== 'All' ? 'border-gray-300 text-gray-600' : ''}`}
            >
              All
            </Button>
            <Button
              variant={activeTab === 'Food' ? 'default' : 'outline'}
              onClick={() => setActiveTab('Food')}
              className={`rounded-full px-6 ${activeTab !== 'Food' ? 'border-gray-300 text-gray-600' : ''}`}
            >
              Food
            </Button>
            <Button
              variant={activeTab === 'Drink' ? 'default' : 'outline'}
              onClick={() => setActiveTab('Drink')}
              className={`rounded-full px-6 ${activeTab !== 'Drink' ? 'border-gray-300 text-gray-600' : ''}`}
            >
              Drink
            </Button>
          </div>

          {(activeTab === 'All' || activeTab === 'Food') && foods.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Foods</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods.map((menu: any) => (
                  <div key={menu.id} className="flex flex-col border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative w-full h-40 bg-gray-100 shrink-0">
                      <img src={menu.image || "/app/main/featured-burger-image.png"} alt={menu.name || menu.foodName || 'Menu'} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col p-4 flex-grow">
                      <h4 className="font-bold text-base">{menu.name || menu.foodName}</h4>
                      {menu.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{menu.description}</p>}
                      <div className="mt-4 flex flex-row items-center justify-between mt-auto">
                        <p className="text-base font-bold text-gray-900">Rp {menu.price?.toLocaleString('id-ID')}</p>
                        <Button variant="outline" size="sm" className="rounded-full px-6 border-primary text-primary hover:bg-primary hover:text-white transition-colors">Add</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === 'All' || activeTab === 'Drink') && drinks.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Drinks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drinks.map((menu: any) => (
                  <div key={menu.id} className="flex flex-col border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative w-full h-40 bg-gray-100 shrink-0">
                      <img src={menu.image || "/app/main/featured-burger-image.png"} alt={menu.name || menu.foodName || 'Menu'} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col p-4 flex-grow">
                      <h4 className="font-bold text-base">{menu.name || menu.foodName}</h4>
                      {menu.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{menu.description}</p>}
                      <div className="mt-4 flex flex-row items-center justify-between mt-auto">
                        <p className="text-base font-bold text-gray-900">Rp {menu.price?.toLocaleString('id-ID')}</p>
                        <Button variant="outline" size="sm" className="rounded-full px-6 border-primary text-primary hover:bg-primary hover:text-white transition-colors">Add</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="p-4 md:px-16 md:pb-16 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          
          {restoDetail?.reviews && restoDetail.reviews.length > 0 ? (
            <div className="flex flex-col gap-4">
              {restoDetail.reviews.map((review: any, index: number) => (
                <div key={review.id || index} className="p-4 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-800 text-base">
                      {review.user?.name || review.name || 'Anonymous'}
                    </h4>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                      <span className="text-yellow-500 text-sm">★</span>
                      <span className="font-bold text-yellow-700 text-sm">{review.star || review.rating || 0}</span>
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-gray-600 text-sm mt-2">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">Belum ada review untuk restoran ini.</p>
          )}
        </div>

        <Footer />

      </div>
    )
}

export default RestoDetailPage