import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, register, getProfile, updateProfile } from "@/lib/api/auth";

//==Hook untuk login
export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
  });
};

//==Hook untuk register
export const useRegister = () => {
  return useMutation({
    mutationFn: ({ name, email, phone, password }: { name: string; email: string; phone: string; password: string }) =>
      register(name, email, phone, password),
  });
};

//==Hook untuk get profile
export const useProfile = (token: string | null) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !!token, // Hanya jalankan query jika token tersedia
  });
};

//==Hook untuk update profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name?: string; email?: string; phone?: string; avatar?: string }) =>
      updateProfile(data),
    onSuccess: () => {
      // Invalidate cache agar data profile yang baru di-fetch ulang
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};



