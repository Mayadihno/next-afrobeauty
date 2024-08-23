import { useGetLatestProductQuery } from "@/redux/rtk/products";

export const useGetLastestProduct = () => {
  const { data, isLoading, isFetching } = useGetLatestProductQuery({});

  if (data) {
    return { data, isLoading, isFetching };
  }else{
    return { data: [], isLoading, isFetching };
  }
};
