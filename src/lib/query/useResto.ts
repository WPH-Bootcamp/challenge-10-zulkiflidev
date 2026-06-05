import { useQuery } from "@tanstack/react-query";
import { getRecommendedRestaurant, getDetailRestaurant } from "@/lib/api/resto";

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



