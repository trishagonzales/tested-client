import { gql, useMutation } from '@apollo/client';
import { useUpload } from './useUpload';
import { ProductData } from '../api/fragments/Product.fragment';
import { Product } from '../types/Product.types';
import { useToasts } from 'react-toast-notifications';
import { displayErrors } from './useApiError';
import { useHistory } from 'react-router-dom';

const ADD_PRODUCT = gql`
  mutation($input: AddProductInput!) {
    addProduct(input: $input) {
      ...ProductData
    }
  }
  ${ProductData}
`;

const EDIT_PRODUCT = gql`
  mutation($input: EditProductInput!) {
    editProduct(input: $input) {
      ...ProductData
    }
  }
  ${ProductData}
`;

const REMOVE_PRODUCT = gql`
  mutation($id: String!) {
    removeProduct(id: $id)
  }
`;

export function useAdmin(initialFiles?: string[]) {
  const addUpload = useUpload({ type: 'product' });
  const editUpload = useUpload({ type: 'product', initialFiles });
  const { addToast } = useToasts();
  let history = useHistory();

  const [addProduct] = useMutation<{ addProduct: Product }>(ADD_PRODUCT, {
    onCompleted: data => addUpload.upload(data.addProduct.id),
    onError: err => displayErrors(addToast, err),
  });

  const [editProduct] = useMutation<{ editProduct: Product }>(EDIT_PRODUCT, {
    onCompleted: data => {
      editUpload.areFilesChanged && editUpload.upload(data.editProduct.id);
    },
    onError: err => displayErrors(addToast, err),
  });

  const [removeProduct] = useMutation<{ removeProduct: boolean }>(REMOVE_PRODUCT, {
    onCompleted: data => data.removeProduct && history.go(0),
    onError: err => displayErrors(addToast, err),
  });

  return {
    addProps: { addProduct, uploadProps: addUpload },
    editProps: { editProduct, uploadProps: editUpload },
    removeProduct,
  };
}
