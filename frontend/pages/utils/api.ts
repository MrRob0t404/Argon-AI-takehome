import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000",
});

interface TrialParams {
  condition?: string;
  page?: number;
  limit?: number;
}

export const getTrials = async (params: TrialParams) => {
  const { data } = await api.get("/trials", { params });
  return data;
};
