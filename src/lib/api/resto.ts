import apiClient from "@/lib/api/axios";
import { RestaurantParams } from "@/types/resto";

//Daftar Rekomendasi restorant...
export const getRecommendedRestaurant = async () => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL); // ← tambah ini
  const res = await apiClient.get("/resto/recommended");                 
  return res.data;

};



//Detail setiap Restaurant (Menu, Gambar, dll dsb dst....)
export const getDetailRestaurant = async (id: number) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL); // ← tambah ini
  const res = await apiClient.get(`/resto/${id}`);                 
  return res.data;

};


//Ambil daftar semua restoran dengan filter dan pagination...
export const getRestaurants = async (params?: RestaurantParams) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  
  // Set default values untuk page dan limit
  const queryParams = {
    page: 1,
    limit: 20,
    ...params
  };

  const res = await apiClient.get("/resto", { params: queryParams });                 
  return res.data;

};





//Ambil daftar restoran terdekat berdasarkan lokasi...
export const getNearbyRestaurants = async (params?: { range?: number; limit?: number }) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  
  // Set default values untuk range dan limit
  const queryParams = {
    range: 10,
    limit: 20,
    ...params
  };

  const res = await apiClient.get("/resto/nearby", { params: queryParams });                 
  return res.data;

};





//Ambil daftar menu best seller...
export const getBestSellerMenus = async (params?: { page?: number; limit?: number }) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  
  // Set default values untuk page dan limit
  const queryParams = {
    page: 1,
    limit: 20,
    ...params
  };

  const res = await apiClient.get("/resto/best-seller", { params: queryParams });                 
  return res.data;

};




//Mencari restoran berdasarkan nama...
export const searchRestaurants = async (params: { q: string; page?: number; limit?: number }) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  
  // Set default values untuk page dan limit
  const queryParams = {
    page: 1,
    limit: 20,
    ...params
  };

  const res = await apiClient.get("/resto/search", { params: queryParams });                 
  return res.data;

};










