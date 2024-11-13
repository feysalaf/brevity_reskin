
// import { LoginPayload, User } from "../store/auth/types";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (payload: FormData) => {
  try {
    const response = await axios.post(`${apiUrl}/login_user`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data', // This is the correct header for FormData
      },
    });
    console.log({'api_resp':response})
    return response.data; // Return the response data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'An error occurred while logging in.');
    }
    throw new Error('An error occurred while logging in.');
  }
};

