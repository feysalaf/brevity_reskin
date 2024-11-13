
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const uploadTextFile = async (payload: FormData) => {
  try {
    const response = await axios.post(`${apiUrl}/post_text`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data', 
        'Authorization': localStorage.getItem('token')
      },
    });
    console.log({'api_resp':response})
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'An error occurred while logging in.');
    }
    throw new Error('An error occurred while logging in.');
  }
};


export const uploadAudioFile = async (payload: FormData) => {
    try {
      const response = await axios.post(`${apiUrl}/post_audio`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data', 
          'Authorization': localStorage.getItem('token')
        },
      });
      console.log({'api_resp':response})
      return response.data; 
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'An error occurred while logging in.');
      }
      throw new Error('An error occurred while logging in.');
    }
  };
  


  
  export const uploadVideoFile = async (payload: FormData) => {
    try {
      const response = await axios.post(`${apiUrl}/post_video`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('token') || '',
        },
        responseType: 'blob', // Expecting binary data (PDF)
      });
  
      // Create Blob URL from the binary data
      const pdfBlobUrl = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
  
      console.log("API RESPONSE: ");
      console.log({ api_resp: response, pdfBlobUrl });
      return pdfBlobUrl; // Return Blob URL for the frontend
    } catch (error) {
      console.log("ERROR IN API ");
      if (axios.isAxiosError(error) && error.response) {
        console.log("ERROR IN API ");
        throw new Error(error.response.data.message || 'An error occurred while uploading the video.');
      }
      console.log("ERROR IN API ");
      throw new Error('An error occurred while uploading the video.');
    }
  };
  
  
  
