import { gql, useQuery } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { displayErrors } from '../common/useApiError';
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
  const { addToast } = useToasts();

  const { data } = useQuery<{ products: Product[] }>(GET_PRODUCTS, {
    onError: error => displayErrors(addToast, error),
    errorPolicy: 'all',
  });

  return {
    products: data?.products,
  };
}
