import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const getProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/profile`,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    
    return response.data;
}


export const updateProfile = async (userData) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(`${API_URL}/profile`,
        userData,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    
    return response.data;
}

export const changePasswordApi = async (passwordData) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/change-password`,
    passwordData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};