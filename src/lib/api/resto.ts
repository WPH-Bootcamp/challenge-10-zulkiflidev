import apiClient from "@/lib/api/axios";

// tarik data untuk dapat info rekomendasi restorant...
export const getRecommendedRestaurant = async () => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL); // ← tambah ini
  const res = await apiClient.get("/resto/recommended");                 
  return res.data;
};







