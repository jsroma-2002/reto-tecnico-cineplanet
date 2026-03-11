import candystoreApi from "../../services/candystoreApi";

export interface CandystoreProduct {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const fetchCandystoreProductsFromAPI = async (): Promise<
  CandystoreProduct[]
> => {
  const response = await candystoreApi.get<CandystoreProduct[]>(
    "/candystore/products",
  );
  return response.data;
};
