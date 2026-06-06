import apiClient from "@/lib/api/axios";


//POST --> untuk login...
export const login = async (email: string, password: string) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL); // ← tambah ini
  const res = await apiClient.post("/auth/login", { email, password });
  return res.data;
  
};


//POST --> untuk register...
export const register = async (name: string, email: string, phone:string, password: string) => {
  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL); // ← tambah ini
  const res = await apiClient.post("/auth/register", { name, email, phone, password });
  return res.data;

};


//GET --> untuk dapat user profile
//butuh token
export const getProfile = async () => {
  const res = await apiClient.get("/auth/profile");
  return res.data;

};

//PUT --> untuk update user profile
export const updateProfile = async (data: { name?: string; email?: string; phone?: string; avatar?: string }) => {
  const res = await apiClient.put("/auth/profile", data);
  return res.data;

};




