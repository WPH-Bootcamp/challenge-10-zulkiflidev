"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

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

export default function LoginForm() {
  
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const { mutate: loginMutate, isPending: isLoginPending } = useLogin();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutate(

      { email, password },
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
    <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
      {loginError && <p className="text-sm text-red-500 text-center">{loginError}</p>}

      <Input id="email" type="email" 
                placeholder="Email" value={email} 
                onChange={(e) => setEmail(e.target.value)} />

      <div className="relative">
        
        <Input
          id="password"
          type={showPass ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="pr-10"
        />

        <button type="button" onClick={() => setShowPass(!showPass)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        
           {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
        
        </button>
      </div>

      <Button type="submit" className="w-full" disabled={isLoginPending}>
        {isLoginPending ? "Loading..." : "Login"}
      </Button>
    </form>
  );
}