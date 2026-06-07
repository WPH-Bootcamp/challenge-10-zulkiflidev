import { useQuery } from "@tanstack/react-query";
import { getRecommendedRestaurant, getDetailRestaurant, getRestaurants, getNearbyRestaurants, getBestSellerMenus, searchRestaurants } from "@/lib/api/resto";
import { RestaurantParams } from "@/types/resto";

//hook untuk rekomendasi restoran
export const useRecommendedRestaurant = (token: string | null) => {
  return useQuery({
    queryKey: ["recommended-restaurants", "recommended", "restaurant"],
    queryFn: getRecommendedRestaurant,
    enabled: !!token,
  });
};


//hook untuk detail restoran
export const useDetailRestaurant = (id: number, token: string | null) => {
  return useQuery({
    queryKey: ["detail-restaurants", id],
    queryFn: () => getDetailRestaurant(id),
    enabled: !!token,
  });
};


//hook untuk daftar semua restoran dengan filter
export const useRestaurants = (params: RestaurantParams) => {
  return useQuery({
    queryKey: ["restaurants", params],
    queryFn: () => getRestaurants(params),
  });
};


//hook untuk daftar restoran terdekat
export const useNearbyRestaurants = (params: { range?: number; limit?: number }, token: string | null) => {
  return useQuery({
    queryKey: ["restaurants", "nearby", params],
    queryFn: () => getNearbyRestaurants(params),
    enabled: !!token,
  });
};


//hook untuk menu best seller
export const useBestSellerMenus = (params: { page?: number; limit?: number }, token: string | null) => {
  return useQuery({
    queryKey: ["menus", "best-seller", params],
    queryFn: () => getBestSellerMenus(params),
    enabled: !!token,
  });
};


//hook untuk mencari restoran
export const useSearchRestaurants = (params: { q: string; page?: number; limit?: number }, token: string | null) => {
  return useQuery({
    queryKey: ["restaurants", "search", params],
    queryFn: () => searchRestaurants(params),
    enabled: !!token && !!params.q,
  });
};
