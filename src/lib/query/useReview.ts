import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReview, getMyReviews, getRestaurantReviews, updateReview, deleteReview } from "@/lib/api/review";
import { ReviewRequest, MyReviewParams, UpdateReviewRequest } from "@/types/review";

//hook untuk membuat review baru
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReviewRequest) => createReview(data),
    onSuccess: (_, variables) => {
      // Invalidate cache restoran terkait agar rating/review terupdate
      queryClient.invalidateQueries({ queryKey: ["detail-restaurants", variables.restaurantId] });
      queryClient.invalidateQueries({ queryKey: ["restaurant-reviews", variables.restaurantId] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
    },
  });
};


//hook untuk memperbarui review yang sudah ada
export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: UpdateReviewRequest }) => updateReview(id, data),
    onSuccess: () => {
      // Invalidate semua query review agar UI terupdate dengan data terbaru
      queryClient.invalidateQueries({ queryKey: ["detail-restaurants"] });
      queryClient.invalidateQueries({ queryKey: ["restaurant-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
    },
  });
};


//hook untuk menghapus review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteReview(id),
    onSuccess: () => {
      // Segarkan semua data terkait review setelah penghapusan
      queryClient.invalidateQueries({ queryKey: ["detail-restaurants"] });
      queryClient.invalidateQueries({ queryKey: ["restaurant-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
    },
  });
};


//hook untuk mengambil daftar review user sendiri
export const useMyReviews = (params: MyReviewParams, token: string | null) => {
  return useQuery({
    queryKey: ["my-reviews", params],
    queryFn: () => getMyReviews(params),
    enabled: !!token,
  });
};


//hook untuk mengambil daftar review semua user untuk satu restoran
export const useRestaurantReviews = (restaurantId: number, params: MyReviewParams, token: string | null) => {
  return useQuery({
    queryKey: ["restaurant-reviews", restaurantId, params],
    queryFn: () => getRestaurantReviews(restaurantId, params),
    enabled: !!token && !!restaurantId,
  });
};
