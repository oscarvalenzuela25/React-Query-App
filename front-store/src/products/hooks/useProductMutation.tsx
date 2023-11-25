import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, ProductLike } from '../interfaces/product';
import { createProduct } from '../services/actions';

const useProductMutation = () => {
  const queryClient = useQueryClient();

  const { isPending, mutate: handleCreateProduct } = useMutation({
    mutationFn: ({ product }: { product: ProductLike }) =>
      createProduct(product),
    onMutate: ({ product }) => {
      // Cuando se hace la mutación, se agrega un producto optimista
      const optimisticProduct = { ...product, id: Math.random() };
      queryClient.setQueryData<Product[]>(
        ['getProducts', { filterKey: product.category }],
        (oldData = []) => [...oldData, optimisticProduct]
      );

      return optimisticProduct;
    },
    onSuccess: (product, _variables, context) => {
      // El product es la respuesta de la mutación
      // variables son los datos que se enviaron a la mutación
      // context es el contexto de la mutación (la infor que retorna onMutate)

      // Otra opcion para invalidar la cache
      //   queryClient.invalidateQueries({
      //     queryKey: ['getProducts', { filterKey: data.category }],
      //   });

      const previousProduct = queryClient.getQueryData([
        'getProducts',
        { filterKey: product.category },
      ]);
      queryClient.setQueryData<Product[]>(
        ['getProducts', { filterKey: product.category }],
        (oldData = []) => {
          const newOldData = oldData.filter(old => old.id !== context?.id);
          return [...newOldData, product];
        }
      );

      return previousProduct;
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData<Product[]>(
        ['getProducts', { filterKey: context?.category }],
        (oldData = []) => oldData.filter(old => old.id !== context?.id)
      );
    },
  });
  return {
    isLoading: isPending,
    handleCreateProduct,
  };
};

export default useProductMutation;
