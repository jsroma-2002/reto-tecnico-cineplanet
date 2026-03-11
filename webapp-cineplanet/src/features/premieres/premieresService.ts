import api from "../../services/api";

export interface Premiere {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

export const fetchPremieresFromAPI = async (): Promise<Premiere[]> => {
  const response = await api.get<Premiere[]>("/premieres");
  return response.data;
};
