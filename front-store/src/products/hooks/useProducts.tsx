import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/actions';

type Options = {
  filterKey?: string;
};

const useProducts = ({ filterKey }: Options) => {
  const {
    isLoading,
    isError,
    error,
    data: products = [],
    isFetching,
  } = useQuery({
    queryKey: ['getProducts', { filterKey }],
    queryFn: () => getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60 * 1, // 1 hora
  });

  return {
    isLoading,
    isError,
    error,
    products,
    isFetching,
  };
};

export default useProducts;
