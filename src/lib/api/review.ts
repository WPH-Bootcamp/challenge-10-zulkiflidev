import apiClient from "@/lib/api/axios";
import { ReviewRequest, MyReviewParams, UpdateReviewRequest } from "@/types/review";

//Fungsi untuk membuat review baru untuk restoran...
export const createReview = async (data: ReviewRequest) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  const res = await apiClient.post("/review", data);                 
  return res.data;

};

//Fungsi untuk mengambil daftar review milik user sendiri...
export const getMyReviews = async (params?: MyReviewParams) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
    
  const queryParams = {
    page: 1,
    limit: 10,
    ...params
  };

  const res = await apiClient.get("/review/my-reviews", { params: queryParams });                 
  return res.data;

};

//Fungsi untuk mengambil daftar review dari semua user untuk satu restoran...
export const getRestaurantReviews = async (restaurantId: number, params?: MyReviewParams) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  
  const queryParams = {
    page: 1,
    limit: 10,
    ...params
  };

  const res = await apiClient.get(`/review/restaurant/${restaurantId}`, { params: queryParams });                 
  return res.data;

};

//Fungsi untuk memperbarui review yang sudah ada...
export const updateReview = async (id: number, data: UpdateReviewRequest) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  const res = await apiClient.put(`/review/${id}`, data);                 
  return res.data;

};

//Fungsi untuk menghapus review...
export const deleteReview = async (id: number) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  const res = await apiClient.delete(`/review/${id}`);                 
  return res.data;

};




















































































