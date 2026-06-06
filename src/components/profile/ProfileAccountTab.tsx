import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUpdateProfile } from '@/lib/query/useAuth';

export interface UserProfile {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

interface ProfileAccountTabProps {
  profile: UserProfile;
}

export function ProfileAccountTab({ profile }: ProfileAccountTabProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('********');
  const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const { mutate: updateProfile, isPending: profileIsUpdating } = useUpdateProfile();

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
      setPhone(profile.phone || '');
    }
  }, [profile]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateMessage(null);

    updateProfile(
      { name, email, phone },
      {
        onSuccess: () => {
          setUpdateMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
          setTimeout(() => setUpdateMessage(null), 3000);
        },
        onError: (err: unknown) => {
          const errorResponse = err as { response?: { data?: { message?: string } } };
          const msg = errorResponse.response?.data?.message || 'Gagal memperbarui profil.';
          setUpdateMessage({ type: 'error', text: msg });
        }
      }
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
      
      {/* Photo Profile di Tengah */}
      <div className="flex flex-col items-center mb-12">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-gray-50 shadow-sm">
          <Image 
            src={profile.avatar || "/app/main/profile-image.png"} 
            alt={profile.name || 'User'}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex justify-start items-center mb-10">
        <h2 className="text-3xl font-extrabold text-neutral-950">Account Details</h2>
      </div>

      {updateMessage && (
        <div className={cn(
          "mb-8 p-4 rounded-2xl text-sm font-medium flex items-center gap-2",
          updateMessage.type === 'success' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
        )}>
          {updateMessage.type === 'success' ? <Check size={18} /> : <X size={18} />}
          {updateMessage.text}
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-400 ml-1">Full Name</label>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 font-bold text-neutral-950 outline-none focus:border-primary-100 transition-colors"
              placeholder="Full Name"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-400 ml-1">Phone Number</label>
            <input 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 font-bold text-neutral-950 outline-none focus:border-primary-100 transition-colors"
              placeholder="Phone Number"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-400 ml-1">Email Address</label>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 font-bold text-neutral-950 outline-none focus:border-primary-100 transition-colors"
              placeholder="Email Address"
              type="email"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-400 ml-1">Password</label>
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 font-bold text-neutral-950 outline-none focus:border-primary-100 transition-colors"
              placeholder="Password"
              type="password"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <Button 
            type="submit" 
            disabled={profileIsUpdating}
            className="bg-primary-100 hover:bg-primary-100/90 text-white rounded-full px-16 py-6 h-auto text-lg font-bold shadow-lg shadow-primary-100/20"
          >
            {profileIsUpdating ? 'Updating...' : 'Update Profile'}
          </Button>
        </div>
      </form>
    </div>
  );
}
