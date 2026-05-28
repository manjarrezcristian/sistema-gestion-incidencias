import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://6a1799251878294b597ba692.mockapi.io";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
