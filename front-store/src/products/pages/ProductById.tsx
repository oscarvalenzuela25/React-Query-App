import { useParams } from 'react-router-dom';
import useProduct from '../hooks/useProduct';
import { ProductCard } from '..';
import { useEffect } from 'react';

export const ProductById = () => {
  const { id } = useParams();
  const { isLoading, product } = useProduct({ id: +id! });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto</h1>

      {isLoading && <p>Cargando...</p>}

      {product && (
        <ProductCard key={product.id} product={product} fullDescription />
      )}
    </div>
  );
};
