"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Nama wajib diisi" }),
    email: z.string().min(1, { message: "Email wajib diisi" }).email({ message: "Format email tidak valid" }),
    phone: z.string().min(1, { message: "Nomor telepon wajib diisi" }),
    password: z.string().min(6, { message: "Password minimal 6 karakter" }),
    confirmPassword: z.string().min(1, { message: "Konfirmasi password wajib diisi" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const { mutate: registerMutate, isPending } = useRegister();

  const [error, setError] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    setError(null);

    // Pisahkan 'confirmPassword' dari payload karena API tidak membutuhkannya
    const { confirmPassword, ...registerData } = values;

    registerMutate(registerData, {

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
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <div className="flex flex-col space-y-1">
        <Input placeholder="Nama" {...formRegister("name")} />
        {errors.name && <p className="text-xs text-red-500 pl-1">{errors.name.message}</p>}
      </div>
      
      <div className="flex flex-col space-y-1">
        <Input type="email" placeholder="Email" {...formRegister("email")} />
        {errors.email && <p className="text-xs text-red-500 pl-1">{errors.email.message}</p>}
      </div>
      
      <div className="flex flex-col space-y-1">
        <Input placeholder="Nomor Telepon" {...formRegister("phone")} />
        {errors.phone && <p className="text-xs text-red-500 pl-1">{errors.phone.message}</p>}
      </div>

      <div className="flex flex-col space-y-1">
        <div className="relative">
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="pr-10"
            {...formRegister("password")}
          />
          <button type="button" onClick={() => setShowPass(!showPass)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-500 pl-1">{errors.password.message}</p>}
      </div>

      <div className="flex flex-col space-y-1">
        <div className="relative">
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Konfirmasi Password"
            className="pr-10"
            {...formRegister("confirmPassword")}
          />
          <button type="button" onClick={() => setShowPass(!showPass)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-xs text-red-500 pl-1">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Memuat..." : "Daftar"}
      </Button>
      
    </form>
  );
}