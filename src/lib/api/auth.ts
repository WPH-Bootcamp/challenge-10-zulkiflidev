import apiClient from "@/lib/api/axios";

export const login = async (email: string, password: string) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL); // ← tambah ini
  const res = await apiClient.post("/auth/login", { email, password });
  return res.data;
};

export const register = async (name: string, email: string, phone:string, password: string) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL); // ← tambah ini
  const res = await apiClient.post("/auth/register", { name, email, phone, password });
  return res.data;
};






