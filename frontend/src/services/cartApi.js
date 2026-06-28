import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

export const addToCartApi = async (data, token) => {
  const res = await axios.post(`${API_URL}/add`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getCartApi = async (userId, token) => {
  const res = await axios.get(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateCartApi = async (data, token) => {
  const res = await axios.put(`${API_URL}/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const removeCartApi = async (data, token) => {
  const res = await axios.delete(`${API_URL}/remove`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });

  return res.data;
};