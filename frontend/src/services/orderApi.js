import api from "./api";

export const placeOrderApi = async (orderData) => {
  const { data } = await api.post("/orders/place", orderData);
  return data;
};

export const getUserOrdersApi = async (userId) => {
  const { data } = await api.get(`/orders/user/${userId}`);
  return data;
};

export const getOrderByIdApi = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

// ================= ADMIN =================

// Get All Orders
export const getAllOrdersApi = async () => {
  const { data } = await api.get("/orders");
  return data;
};

// Update Order Status
export const updateOrderStatusApi = async (id, orderStatus) => {

  const { data } = await api.put(
    `/orders/${id}/status`,
    {orderStatus}
  );

  return data;
};

// Delete Order
export const deleteOrderApi = async (id) => {
  const { data } = await api.delete(`/orders/${id}`);
  return data;
};