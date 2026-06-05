"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

import Image from "next/image";

import {useState} from 'react';
import { useLogin, useRegister } from "@/lib/query/useAuth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

function LoginPage() {

  const router = useRouter();

  // Login States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register States
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState<string | null>(null);

  const setToken = useAuthStore((state) => state.setToken);

  const { mutate: loginMutate, isPending: isLoginPending } = useLogin();
  const { mutate: registerMutate, isPending: isRegisterPending } = useRegister();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutate(
      { email, password },
      {
        onSuccess: (data) => {
          const token = (data as any)?.data?.token || (data as any)?.token;
          if (token) {
            setToken(token);
          }
          console.log("sukses login");
          router.push("/"); 
        },
        onError: (err: any) => {
          const message = err.response?.data?.message || err.message || "Login failed. Please try again.";
          setLoginError(message);
          console.error(`gagal login: ${message}`);
        }
      }
    );
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignupError(null);

    if (signupPassword !== signupConfirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    registerMutate(
      { 
        name: signupName, 
        email: signupEmail, 
        phone: signupPhone, 
        password: signupPassword 
      },
      {
        onSuccess: (data) => {
          const token = (data as any)?.data?.token || (data as any)?.token;
          if (token) {
            setToken(token);
          }
          console.log("sukses register");
          router.push("/");
        },
        onError: (err: any) => {
          const message = err.response?.data?.message || err.message || "Registration failed. Please try again.";
          setSignupError(message);
          console.error(`gagal register: ${message}`);
        }
      }
    );
  };

  return (
    <div>
      <div className="flex min-h-screen w-full">
        <div className="hidden md:flex relative w-1/2">
            <Image  src="/app/login/burger-image.png" 
                    alt="Gambar Burger"
                    fill
                    className="object-cover"
             />
        </div>

        <div className="flex flex-col items-center justify-center w-full md:w-1/2 py-8 md:py-0">

          <div className="flex flex-col items-start gap-4 w-full max-w-sm px-4">
              <div className="flex flex-col gap-4 justify-center items-center">              
                  <div className="flex flex-row gap-4 justify-start items-center">
                    <Image src="/app/login/logo.svg" width={32} height={32} alt="Logo" />
                    <p className="text-xl font-extrabold">Foody</p>
                  </div>
              </div>
              <div>
                  <p className="text-xl font-bold">Welcome Back</p>
              </div>
              <div>
                  <p> Good to see you again! Let’s eat </p>
              </div>

              {/* Tabs Login dan register */}
              <Tabs defaultValue="signin" className="flex flex-col w-full mt-2">
                <TabsList className="flex flex-row w-full rounded-2xl p-1 h-auto bg-zinc-100">
                    <TabsTrigger value="signin" className="w-full rounded-2xl py-2 
                                font-medium data-[state=active]:bg-white 
                                  data-[state=active]:text-black data-[state=active]:shadow-sm">
                      Sign in
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="w-full rounded-full py-2 
                                font-medium data-[state=active]:bg-white 
                                data-[state=active]:text-black data-[state=active]:shadow-sm">
                      Sign up
                    </TabsTrigger>                  
                </TabsList>

                {/* Sign In atau Login */}
                <TabsContent value="signin" className="mt-4">
                    <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
                      {loginError && (
                        <p className="text-sm text-red-500 text-center">{loginError}</p>
                      )}
                      <div className="space-y-2">
                        {/* 
                          <Label htmlFor="email">Email</Label>
                        */}
                        <Input id="email" type="email" 
                              placeholder="Email" 
                              value={email}
                            onChange={(e) => setEmail(e.target.value)}
                              
                              />
                      </div>

                      <div className="space-y-2">
                        {/* 
                          <Label htmlFor="password">Password</Label>
                        */}
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPass ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          >
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Checkbox id="remember" />
                          <Label htmlFor="remember" className="font-normal text-sm">
                            Remember me
                          </Label>
                        </div>
                        <a href="#" className="text-sm text-muted-foreground hover:underline">
                          Lupa password?
                        </a>
                      </div>

                      <Button type="submit" className="w-full" 
                              disabled={isLoginPending}>
                                {isLoginPending ? "Loading..." : "Login"}
                      </Button>
                    </form>
                  </TabsContent>

                {/* Sign Up */}
                <TabsContent value="signup" className="mt-4">
                    <form className="flex flex-col space-y-4" onSubmit={handleSignup}>
                      {signupError && (
                        <p className="text-sm text-red-500 text-center">{signupError}</p>
                      )}
                      <div className=" gap-3">
                        <div className="space-y-2">
                          {/* <Label htmlFor="name">Name</Label> */}
                          <Input 
                            id="signup-name" 
                            placeholder="Name" 
                            value={signupName}
                            onChange={(e) => setSignupName(e.target.value)}
                            required
                          />
                        </div>

                        {/*
                        <div className="space-y-2">
                          <Label htmlFor="lname">Last Name</Label>
                          <Input id="lname" placeholder="Dev" />
                        </div>
                        */}

                      </div>

                      <div className="space-y-2">
                        {/* <Label htmlFor="signup-email">Email</Label> */}
                        <Input 
                          id="signup-email" 
                          type="email" 
                          placeholder="Email" 
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        {/* <Label htmlFor="name">Phone Number</Label> */}
                        <Input 
                          id="signup-phone" 
                          placeholder="Phone Number" 
                          value={signupPhone}
                          onChange={(e) => setSignupPhone(e.target.value)}
                          required
                        />
                      </div>

                      <div className="relative">
                        <div className="space-y-2">
                          {/* <Label htmlFor="signup-pass">Password</Label> */}
                          <Input id="signup-pass" 
                              type={showPass ? "text" : "password"}                           
                              placeholder="Password"
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              required
                          />

                        </div>
                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          >
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                      </div>

                      <div className="relative">
                        <div className="space-y-2">
                          {/*
                            <Label htmlFor="signup-confirm-pass">Password</Label>
                          */}
                          <Input id="signup-confirm-pass"                             
                            type={showPass ? "text" : "password"}                             
                            placeholder="Confirm Password" 
                            value={signupConfirmPassword}
                            onChange={(e) => setSignupConfirmPassword(e.target.value)}
                            required
                          />                            
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          >
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                      </div>      

                      <Button type="submit" className="w-full" disabled={isRegisterPending}>
                        {isRegisterPending ? "Loading..." : "Register"}
                      </Button>
                    </form>
                    </TabsContent>


              </Tabs>


          </div>
        </div>

      </div>
    </div>
  )
}

export default LoginPage