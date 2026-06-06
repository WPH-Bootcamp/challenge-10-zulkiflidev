import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkoutOrder, getMyOrders } from "@/lib/api/order";
import { CheckoutRequest, MyOrderParams } from "@/types/order";

//hook untuk proses checkout order
export const useCheckoutOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CheckoutRequest) => checkoutOrder(data),
    onSuccess: () => {
      // Invalidate query terkait jika perlu, misalnya history order atau cart
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};


//hook untuk mengambil history order user
export const useMyOrders = (params: MyOrderParams, token: string | null) => {
  return useQuery({
    queryKey: ["orders", "my-order", params],
    queryFn: () => getMyOrders(params),
    enabled: !!token,
  });
};
