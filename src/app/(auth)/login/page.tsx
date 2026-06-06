"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/components/shared/logo";

import Image from "next/image";

import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";


export default function LoginPage() {
  return (    
    <div className="flex min-h-screen w-full">

      {/* Bagian Gambar (Kiri) */}
      <div className="hidden md:flex relative w-1/2">

        <Image
          src="/app/login/burger-image.png"
          alt="Gambar Burger"
          fill
          className="object-cover"
        />
      </div>

      {/* Bagian Form (Kanan) */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 py-8 md:py-0">
        <div className="flex flex-col items-start gap-4 w-full max-w-sm px-4">
          <Logo />

          <p className="text-xl font-bold">Welcome Back</p>
          <p className="text-muted-foreground text-sm mb-2">Good to see you again! Let's eat</p>

          <Tabs defaultValue="signin" className="flex flex-col w-full mt-2">
            <TabsList className="flex flex-row w-full rounded-2xl p-1 h-auto bg-zinc-100">
                
                <TabsTrigger
                  value="signin"
                  className="w-full rounded-2xl py-2 font-medium
                            data-[state=active]:bg-white data-[state=active]:text-black 
                            data-[state=active]:shadow-sm"
                >
                  Sign in
                </TabsTrigger>

                <TabsTrigger
                  value="signup"
                  className="w-full rounded-full py-2 font-medium
                            data-[state=active]:bg-white data-[state=active]:text-black 
                            data-[state=active]:shadow-sm"
                >
                  Sign up
                </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-4">
              <LoginForm />
            </TabsContent>

            <TabsContent value="signup" className="mt-4">
              <RegisterForm />
            </TabsContent>
          </Tabs>


        </div>
      </div>
    </div>
  )
}