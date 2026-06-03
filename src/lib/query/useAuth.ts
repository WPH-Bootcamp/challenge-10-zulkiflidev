import { useMutation } from "@tanstack/react-query";
import { login, register } from "@/lib/api/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ name, email, phone, password }: { name: string; email: string; phone: string; password: string }) =>
      register(name, email, phone, password),
  });
};