import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getTrials = async (params: unknown) => {
  const { data } = await api.get("/trials", { params });
  return data;
};
