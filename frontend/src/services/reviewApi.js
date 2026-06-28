import api from "./api";

const API_URL = "/reviews";

export const getProductReviews = async (productId) => {
  const response = await api.get(`${API_URL}/${productId}`);
  return response.data;
};

export const addReview = async (reviewData) => {
  const response = await api.post(API_URL, reviewData);
  return response.data;
};