import axios from "axios";

export const getAllCategories = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/categories"
  );

  return response.data;
};