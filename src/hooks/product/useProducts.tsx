import { gql, useQuery } from '@apollo/client';
import { ProductData } from '../../api/fragments/Product.fragment';
import { Product } from '../../types/Product.types';

const GET_PRODUCTS = gql`
  query {
    products {
      ...ProductData
      thumbnail
    }
  }
  ${ProductData}
`;

export function useProducts() {
  const { data } = useQuery<{ products: Product[] }>(GET_PRODUCTS, {
    errorPolicy: 'all',
  });

  return {
    products: data?.products,
  };
}
