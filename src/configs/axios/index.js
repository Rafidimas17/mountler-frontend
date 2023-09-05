import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}/api-v1/`,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle HTTP error responses (e.g., status code is not 2xx)
      console.error(
        "HTTP error:",
        error.response.status,
        error.response.statusText
      );
      // You can add more specific error handling here
    } else if (error.request) {
      // Handle network errors (e.g., request not sent)
      console.error("Network error:", error.request);
      // You can add more specific error handling here
    } else {
      // Handle other errors
      console.error("Error:", error.message);
    }
    // Throw the error to be caught in the calling code
    throw error;
  }
);

export default instance;
