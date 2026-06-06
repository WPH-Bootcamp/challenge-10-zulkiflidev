import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut, User, MapPin, ShoppingBag, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface UserProfile {
  name?: string;
  avatar?: string;
}

interface ProfileSidebarProps {
  profile: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const menuItems = [
  { id: 'profile', label: 'Account Details', icon: <User size={20} /> },
  { id: 'address', label: 'Delivery Address', icon: <MapPin size={20} /> },
  { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={20} /> },
  { id: 'reviews', label: 'My Reviews', icon: <Star size={20} /> },
];

export function ProfileSidebar({ profile, activeTab, setActiveTab, handleLogout }: ProfileSidebarProps) {
  const router = useRouter();

  return (
    <aside className="w-full md:w-1/3 lg:w-1/4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 py-8 sticky top-24">
        
        {/* Photo Profile di Sidebar */}
        
        <div className="flex flex-col items-center mb-6 px-8">
          
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 
                          border-gray-50  shadow-sm">
            <Image 
              src={profile.avatar || "/app/main/profile-image.png"} 
              alt={profile.name || 'User'}
              fill
              className="object-cover"
            />
          </div>

        </div>

        <nav className="flex flex-col w-full">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;

            return (

              <button
                key={item.id}
                onClick={() => item.id === 'orders' ? router.push('/orders') : setActiveTab(item.id)}
                className="w-full flex items-center gap-4 transition-all group relative px-8 py-4"
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary-100 
                                  rounded-r-full" />
                )}

                <div className={cn(
                  "p-2.5 rounded-xl transition-colors",
                  isActive ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
                )}>
                  {item.icon}
                </div>
                
                <span className={cn(
                  "font-bold text-lg transition-colors",
                  isActive ? "text-neutral-950" : "text-gray-400 group-hover:text-gray-600"
                )}>{item.label}</span>
              
              </button>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 text-red-500 hover:opacity-80 transition-all px-8 
                       py-4 mt-4 group"
          >
            <div className="p-2.5 rounded-xl bg-red-50 text-red-500">
              <LogOut size={20} />
            </div>
            <span className="font-bold text-lg">Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}
