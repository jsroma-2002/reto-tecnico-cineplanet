import axios from "axios";

const candystoreApi = axios.create({
  baseURL: import.meta.env.VITE_CANDYSTORE_API_URL,
});

export default candystoreApi;
