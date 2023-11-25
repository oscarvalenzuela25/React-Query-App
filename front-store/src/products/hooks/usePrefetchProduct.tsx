import { useQueryClient } from '@tanstack/react-query';
import { getProduct } from '../services/actions';

const usePrefetchProduct = () => {
  const queryClient = useQueryClient();

  const prefetchProduct = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ['getProduct', { id }],
      queryFn: () => getProduct(id),
    });
  };

  return { prefetchProduct };
};

export default usePrefetchProduct;
