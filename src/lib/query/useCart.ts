import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, addToCart, deleteAllCart, updateCartItem, deleteCartItem } from "@/lib/api/cart";

export const useCart = (token: string | null) => {
  return useQuery({

      queryKey: ["cart"],
      queryFn: getCart,
      enabled: !!token,

  });
};


export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { restaurantId: number; menuId: number; quantity: number }) =>
      addToCart(data),
    onSuccess: () => {

      // Invalidate cache agar data cart terbaru di-fetch ulang
      queryClient.invalidateQueries({ queryKey: ["cart"] });

    },
  });
};


//hook untuk mengosongkan item di cart
export const useDeleteAllCart = () => {
  const queryClient = useQueryClient();

  return useMutation({

      mutationFn: deleteAllCart,

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
  
  });

};

//hook untuk hapus item di cart
export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (id: number) => deleteCartItem(id),

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },

  });

};

//hook untuk update jumlah item di cart/keranjang belanja
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({

      mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>

        updateCartItem(id, quantity),
      
      onSuccess: () => {
        
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    
  });
};
