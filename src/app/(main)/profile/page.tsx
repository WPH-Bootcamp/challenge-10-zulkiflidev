"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useProfile } from '@/lib/query/useAuth';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import { Button } from '@/components/ui/button';

// Extracted Components
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfileAccountTab } from '@/components/profile/ProfileAccountTab';
import { ProfileAddressTab } from '@/components/profile/ProfileAddressTab';
import { ProfileReviewsTab } from '@/components/profile/ProfileReviewsTab';

export default function ProfilePage() {
  const router = useRouter();
  const authToken = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const { 
    data: profileData, 
    isPending: profileIsLoading, 
    isError: profileIsError,
    error: profileError 
  } = useProfile(authToken);

  useEffect(() => {

      setIsMounted(true);
      if (isMounted && !authToken) {
        router.push('/login');
      }

  }, [authToken, isMounted, router]);

  if (!isMounted || profileIsLoading) return (
    <div className="min-h-screen flex items-center justify-center w-full bg-white">
      <div className="w-12 h-12 border-4 border-primary-300 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (profileIsError || !profileData?.success) return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full bg-white px-4">
      <p className="text-neutral-400 text-display-xl font-bold">Error!</p>
      <p className="text-neutral-400 text-display-lg text-center">
        {profileError instanceof Error ? profileError.message : "Gagal memuat profil!"}
      </p>
      <Button onClick={() => window.location.reload()} className="mt-8 bg-primary-100 rounded-full px-12">
        Coba Lagi
      </Button>
    </div>
  );

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar variant="solid" />
      
      <main className="flex-1 py-8 md:py-12 px-4 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            
            <ProfileSidebar 
              profile={profileData.data} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              handleLogout={handleLogout} 
            />

            <div className="flex-1">
              {activeTab === 'profile' && <ProfileAccountTab profile={profileData.data} />}
              {activeTab === 'address' && <ProfileAddressTab />}
              {activeTab === 'reviews' && <ProfileReviewsTab authToken={authToken} />}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}