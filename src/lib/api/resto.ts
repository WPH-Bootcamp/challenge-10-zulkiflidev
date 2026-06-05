import apiClient from "@/lib/api/axios";

//Rekomendasi restorant...
export const getRecommendedRestaurant = async () => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL); // ← tambah ini
  const res = await apiClient.get("/resto/recommended");                 
  return res.data;
};

//Detail Restaurant (Menu, Gambar, dll dsb dst....)
export const getDetailRestaurant = async (id: number) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL); // ← tambah ini
  const res = await apiClient.get(`/resto/${id}`);                 
  return res.data;
};










