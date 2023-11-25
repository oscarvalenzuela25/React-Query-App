import { productsApi } from '..';
import { Product, ProductLike } from './../interfaces/product';

type GetProductsOptions = {
  filterKey?: string;
};

const sleep = (seconds: number) =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

export const getProducts = async ({
  filterKey,
}: GetProductsOptions): Promise<Product[]> => {
  const filterUrl = filterKey ? `category=${filterKey}` : '';

  const { data } = await productsApi.get<Product[]>(`/products?${filterUrl}`);
  return data;
};

export const getProduct = async (id: number): Promise<Product> => {
  await sleep(1);

  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};

export const createProduct = async (product: ProductLike): Promise<Product> => {
  await sleep(2);
  const { data } = await productsApi.post<Product>('/products', product);
  return data;
};
