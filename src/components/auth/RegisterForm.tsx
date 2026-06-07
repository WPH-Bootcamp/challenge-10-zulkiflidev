"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

import { useRegister } from "@/lib/query/useAuth";
import { useAuthStore } from "@/store/authStore";

interface AuthResponse {
  data?: { token?: string };
  token?: string;
}

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function RegisterForm() {
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);

  //Fungsi tunggal untuk cek perubahan pada semua input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validasi sederhana
    if (form.password !== form.confirmPassword) {
      return setError("Password tidak cocok");
    }

    // Pisahkan 'confirmPassword' dari payload karena API tidak membutuhkannya
    const { confirmPassword, ...registerData } = form;

    register(registerData, {

      onSuccess: (res: unknown) => {
        const response = res as AuthResponse;
        const token = response?.data?.token || response?.token;
        if (token) {
          useAuthStore.getState().setToken(token);
        }
        router.push("/");
      },
      
      onError: (err: unknown) => {
        const error = err as ApiError;
        setError(error.response?.data?.message || "Registrasi gagal. Silakan coba lagi.");
      },
      
    });
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleRegister}>
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <Input name="name" placeholder="Nama" value={form.name} 
             onChange={handleChange} required />
      
      <Input name="email" type="email" placeholder="Email" value={form.email} 
             onChange={handleChange} required />
      
      <Input name="phone" placeholder="Nomor Telepon" value={form.phone} 
             onChange={handleChange} required />

      <div className="relative">

        <Input
          name="password"
          type={showPass ? "text" : "password"}
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="button" onClick={() => setShowPass(!showPass)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>

      </div>

      <div className="relative">
        
        <Input
          name="confirmPassword"
          type={showPass ? "text" : "password"}
          placeholder="Konfirmasi Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="button" onClick={() => setShowPass(!showPass)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Memuat..." : "Daftar"}
      </Button>
      
    </form>
  );
}