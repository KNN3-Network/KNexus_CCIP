import api from "api";
import { INftCard } from "lib/types";
import useSWR from "swr";

type GetCollectionsResponse = {
  list: INftCard[];
  pageNumber?: number;
};

export function useCollections(options: any) {
  const { data, error, isLoading } = useSWR(
    ["/api/collections", options],
    ([url, options]) =>
      api.post<GetCollectionsResponse, GetCollectionsResponse>(url, options),
  );
  return {
    collections: data,
    isLoading,
    isError: error,
  };
}
