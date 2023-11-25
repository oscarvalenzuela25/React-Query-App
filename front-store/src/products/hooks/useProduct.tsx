import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../services/actions';

type Options = {
  id: number;
};

const useProduct = ({ id }: Options) => {
  const {
    isLoading,
    isError,
    error,
    data: product,
    isFetching,
  } = useQuery({
    queryKey: ['getProduct', { id }],
    queryFn: () => getProduct(id),
    staleTime: 1000 * 60 * 60 * 1, // 1 hora
  });

  return {
    isLoading,
    isError,
    error,
    product,
    isFetching,
  };
};

export default useProduct;
