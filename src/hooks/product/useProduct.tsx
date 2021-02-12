import { gql, useQuery } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { ProductData, ReviewData } from '../../api/fragments/Product.fragment';
import { Product } from '../../types/Product.types';
import { displayErrors } from '../common/useApiError';

const GET_PRODUCT = gql`
  query($id: String!) {
    product(id: $id) {
      ...ProductData
      thumbnail
      images
      reviews {
        ...ReviewData
      }
    }
  }
  ${ProductData}
  ${ReviewData}
`;

export function useProduct(id: string) {
  const { addToast } = useToasts();

  const { data } = useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { id },
    onError: error => displayErrors(addToast, error),
    errorPolicy: 'all',
  });

  return {
    product: data?.product,
  };
}
