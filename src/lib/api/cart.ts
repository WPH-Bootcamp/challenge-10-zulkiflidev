import apiClient from "@/lib/api/axios";


//mendapatkan data isi cart
export const getCart = async () => {

  const res = await apiClient.get("/cart");
  return res.data;
};



//menambahkan item ke cart
export const addToCart = async (data: 
             { restaurantId: number; 
               menuId: number; 
               quantity: number }) => {

  const res = await apiClient.post("/cart", data);
  return res.data;
};


//menghapus seluruh item di cart
export const deleteAllCart = async () => {

  const res = await apiClient.delete("/cart");
  return res.data;
};


//menghapus satu item dari cart
export const deleteCartItem = async (id: number) => {

  const res = await apiClient.delete(`/cart/${id}`);
  return res.data;
};


//mengubah jumlah pesanan di cart
export const updateCartItem = async (id: number, quantity: number) => {

  const res = await apiClient.put(`/cart/${id}`, { quantity });
  return res.data;
};




