import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import { useUpload } from './common/useUpload';
import { ProductData } from '../api/fragments/Product.fragment';
import { Product } from '../types/Product.types';

const ADD_PRODUCT = gql`
  mutation($input: AddProductInput!) {
    addProduct(input: $input) {
      ...ProductData
    }
  }
  ${ProductData}
`;

const UPDATE_PRODUCT = gql`
  mutation($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      ...ProductData
    }
  }
  ${ProductData}
`;

const DELETE_PRODUCT = gql`
  mutation($id: String!) {
    deleteProduct(id: $id)
  }
`;

export function useAdmin() {
  const addProductUpload = useUpload({ type: 'product' });
  const updateProductUpload = useUpload({ type: 'product' });
  let history = useHistory();

  const [addProduct] = useMutation<{ addProduct: Product }>(ADD_PRODUCT, {
    onCompleted: data => {
      addProductUpload.upload(data.addProduct.id);
      history.replace('/admin');
    },
  });

  const [updateProduct] = useMutation<{ updateProduct: Product }>(UPDATE_PRODUCT, {
    onCompleted: data => {
      if (updateProductUpload.areFilesChanged)
        updateProductUpload.upload(data.updateProduct.id, data.updateProduct.images);
      history.replace('/product/' + data.updateProduct.id);
    },
  });

  const [deleteProduct] = useMutation<{ deleteProduct: boolean }>(DELETE_PRODUCT, {
    onCompleted: data => data.deleteProduct && history.go(0),
  });

  return {
    addProductProps: { addProduct, uploadProps: addProductUpload },
    updateProductProps: { updateProduct, uploadProps: updateProductUpload },
    deleteProduct,
  };
}
