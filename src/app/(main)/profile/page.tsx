"use client";

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useProfile, useUpdateProfile } from '@/lib/query/useAuth';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LogOut, User, Mail, Phone, Calendar, MapPin, ShoppingBag, ChevronRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

function ProfilePage() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Edit States
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const { data, isPending, isError } = useProfile(token);
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  useEffect(() => {
    setIsMounted(true);
    if (isMounted && !token) {
      router.push('/login');
    }
  }, [token, isMounted, router]);

  // Sync state with fetched data
  useEffect(() => {
    if (data?.success) {
      setName(data.data.name || '');
      setEmail(data.data.email || '');
      setPhone(data.data.phone || '');
    }
  }, [data]);

  if (!isMounted || isPending) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar variant="solid" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg">Loading profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar variant="solid" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-red-500 mb-4">Failed to load profile.</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const profile = data.data;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateMessage(null);

    updateProfile(
      { name, email, phone },
      {
        onSuccess: () => {
          setIsEditing(false);
          setUpdateMessage({ type: 'success', text: 'Profile updated successfully!' });
          setTimeout(() => setUpdateMessage(null), 3000);
        },
        onError: (err: any) => {
          const msg = err.response?.data?.message || 'Failed to update profile.';
          setUpdateMessage({ type: 'error', text: msg });
        }
      }
    );
  };

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: <User size={20} />, active: activeTab === 'profile' },
    { id: 'address', label: 'Delivery Address', icon: <MapPin size={20} />, active: activeTab === 'address' },
    { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={20} />, active: activeTab === 'orders' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar variant="solid" />
      
      <main className="flex-1 py-8 md:py-12 px-4 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Left Sidebar Menu */}
            <aside className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <div className="flex flex-col items-center mb-8">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-primary-100/10 mb-4">
                    <Image 
                      src={profile.avatar || "/app/main/profile-image.png"} 
                      alt={profile.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-950 text-center line-clamp-1">{profile.name}</h2>
                  <p className="text-sm text-gray-500 text-center line-clamp-1">{profile.email}</p>
                </div>

                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => item.id === 'orders' ? router.push('/orders') : setActiveTab(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-2xl transition-all group",
                        item.active 
                          ? "bg-primary-100 text-white" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-primary-100"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span className="font-semibold">{item.label}</span>
                      </div>
                      <ChevronRight size={18} className={cn(
                        "transition-transform",
                        item.active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      )} />
                    </button>
                  ))}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all mt-4 group"
                  >
                    <div className="flex items-center gap-3">
                      <LogOut size={20} />
                      <span className="font-semibold">Logout</span>
                    </div>
                    <ChevronRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </nav>
              </div>
            </aside>

            {/* Right Content Area */}
            <div className="flex-1">
              {activeTab === 'profile' && (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="h-32 bg-gray-100 w-full relative">
                    <div className="absolute inset-0 bg-black/5 opacity-10"></div>
                  </div>
                  
                  <div className="px-8 pb-8 -mt-16 relative z-10">
                    <div className="inline-block p-1 bg-white rounded-full shadow-md mb-6">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white">
                        <Image 
                          src={profile.avatar || "/app/main/profile-image.png"} 
                          alt={profile.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 -mt-8 pt-12">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-neutral-950">Account Details</h2>
                      </div>

                      {updateMessage && (
                        <div className={cn(
                          "mb-6 p-4 rounded-2xl text-sm font-medium flex items-center gap-2",
                          updateMessage.type === 'success' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                        )}>
                          {updateMessage.type === 'success' ? <Check size={18} /> : <X size={18} />}
                          {updateMessage.text}
                        </div>
                      )}

                      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Full Name</p>
                          <div className={cn(
                            "flex items-center gap-3 p-3 rounded-xl transition-all",
                            isEditing ? "bg-white border border-primary-100" : "bg-gray-50 border border-transparent"
                          )}>
                            <User size={18} className="text-primary-100" />
                            {isEditing ? (
                              <input 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent outline-none font-semibold text-neutral-950"
                                placeholder="Enter name"
                              />
                            ) : (
                              <p className="font-semibold text-neutral-950">{profile.name}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email Address</p>
                          <div className={cn(
                            "flex items-center gap-3 p-3 rounded-xl transition-all",
                            isEditing ? "bg-white border border-primary-100" : "bg-gray-50 border border-transparent"
                          )}>
                            <Mail size={18} className="text-primary-100" />
                            {isEditing ? (
                              <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent outline-none font-semibold text-neutral-950"
                                placeholder="Enter email"
                                type="email"
                              />
                            ) : (
                              <p className="font-semibold text-neutral-950">{profile.email}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Phone Number</p>
                          <div className={cn(
                            "flex items-center gap-3 p-3 rounded-xl transition-all",
                            isEditing ? "bg-white border border-primary-100" : "bg-gray-50 border border-transparent"
                          )}>
                            <Phone size={18} className="text-primary-100" />
                            {isEditing ? (
                              <input 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-transparent outline-none font-semibold text-neutral-950"
                                placeholder="Enter phone number"
                              />
                            ) : (
                              <p className="font-semibold text-neutral-950">{profile.phone || "-"}</p>
                            )}
                          </div>
                          {!isEditing && (
                            <div className="pt-2">
                              <Button 
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="w-fit bg-primary-100 hover:bg-primary/80 text-white rounded-full px-6 py-2 h-auto text-sm font-bold"
                              >
                                Update Profile
                              </Button>
                            </div>
                          )}
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Member Since</p>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <Calendar size={18} className="text-primary-100" />
                            <p className="font-semibold text-neutral-950">
                              {new Date(profile.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        {isEditing && (
                          <div className="md:col-span-2 flex gap-4 mt-4">
                            <Button 
                              type="submit" 
                              disabled={isUpdating}
                              className="bg-primary-100 hover:bg-primary/80 text-white rounded-full px-8 font-bold"
                            >
                              {isUpdating ? 'Saving...' : 'Save Changes'}
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={() => {
                                setIsEditing(false);
                                // Reset to original values
                                setName(profile.name);
                                setEmail(profile.email);
                                setPhone(profile.phone || '');
                              }}
                              className="rounded-full px-8"
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'address' && (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                  <h2 className="text-2xl font-bold text-neutral-950 mb-6">Delivery Address</h2>
                  <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <MapPin size={48} className="text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium mb-4">No address saved yet</p>
                    <Button className="rounded-full px-8">Add New Address</Button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProfilePage;
