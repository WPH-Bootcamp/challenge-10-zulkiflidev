import apiClient from "@/lib/api/axios";
import { CheckoutRequest, MyOrderParams } from "@/types/order";

//Fungsi untuk melakukan checkout / membuat order baru...
export const checkoutOrder = async (data: CheckoutRequest) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  const res = await apiClient.post("/order/checkout", data);                 
  return res.data;

};


//Fungsi untuk mengambil history order user per transaksi...
export const getMyOrders = async (params?: MyOrderParams) => {

  console.log("URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  
  // Set default values untuk status, page dan limit
  const queryParams = {
    status: "done",
    page: 1,
    limit: 10,
    ...params
  };

  const res = await apiClient.get("/order/my-order", { params: queryParams });                 
  return res.data;

};
