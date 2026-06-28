import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

export const getDashboardStatsApi = async () => {
  const response = await axios.get(
    `${API_URL}/stats`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};