import axios from "axios";

const completeApi = axios.create({
  baseURL: import.meta.env.VITE_COMPLETE_API_URL,
});

export default completeApi;
