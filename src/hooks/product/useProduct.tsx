import { gql, useQuery } from '@apollo/client';
import { ProductData, ReviewData } from '../../api/fragments/Product.fragment';
import { Product } from '../../types/Product.types';

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
  const { data } = useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { id },
    errorPolicy: 'all',
  });

  return {
    product: data?.product,
  };
}
