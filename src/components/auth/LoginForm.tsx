"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useLogin } from "@/lib/query/useAuth";
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

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email wajib diisi" }).email({ message: "Format email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const { mutate: loginMutate, isPending: isLoginPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    setLoginError(null);
    
    loginMutate(
      { email: values.email, password: values.password },
      {
        
        onSuccess: (data: unknown) => {
          const response = data as AuthResponse;
          const token = response?.data?.token || response?.token;
          if (token) {
            useAuthStore.getState().setToken(token);
          }
          router.push("/");
        },

        onError: (err: unknown) => {
          const error = err as ApiError;
          const message = error.response?.data?.message || error.message || "Login failed. Please try again.";
          setLoginError(message);
        },
        
      }
    );

  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {loginError && <p className="text-sm text-red-500 text-center">{loginError}</p>}

      <div className="flex flex-col space-y-1">
        <Input id="email" type="email" placeholder="Email" {...register("email")} />
        {errors.email && <p className="text-xs text-red-500 pl-1">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col space-y-1">
        <div className="relative">
          <Input
            id="password"
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="pr-10"
            {...register("password")}
          />

          <button type="button" onClick={() => setShowPass(!showPass)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          
             {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-500 pl-1">{errors.password.message}</p>}
      </div>

      <div className="flex items-center space-x-2">

        <input
          type="checkbox"
          id="remember"
          className="w-4 h-4 rounded border-gray-300 accent-primary cursor-pointer"
          {...register("rememberMe")}
        />
        <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer select-none">
          Remember me
        </label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoginPending}>
        {isLoginPending ? "Loading..." : "Login"}
      </Button>

    </form>
  );
}