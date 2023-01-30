import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_SERVER_URL,
  headers: {
    common: {
      Authorization: `Bearer ${process.env.REACT_APP_BACKEND_SERVER_TOKEN}`,
    },
  },
});
