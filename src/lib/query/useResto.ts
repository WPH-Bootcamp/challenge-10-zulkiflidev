import { useQuery } from "@tanstack/react-query";
import { getRecommendedRestaurant } from "@/lib/api/resto";

export const useRecommendedRestaurant = (token: string | null) => {
  return useQuery({
    queryKey: ["recommended-restaurants"],
    queryFn: getRecommendedRestaurant,
    enabled: !!token,
  });
};
