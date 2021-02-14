import React from 'react';
import styled from 'styled-components';
import { Product } from '../../types/Product.types';

import { RemoveButton, LinkButton, Button } from '../common/Button';
import { Row } from '../common/Layout';
import ProductCard from '../product/ProductCard';
import { useAdmin } from '../../hooks/useAdmin';
import { useModal, ModalButtons, ModalContent } from '../../hooks/portal/useModal';

export interface ProductCardAdminProps {
  product: Product;
}

const ProductCardAdmin: React.FC<ProductCardAdminProps> = ({ product }) => {
  const { removeProduct } = useAdmin();
  const { Modal, open, close } = useModal();

  return (
    <Div>
      <Row className='actions' justifyContent='flex-end'>
        <LinkButton to={'/admin/edit-product/' + product.id} textOnly>
          <i className='fas fa-edit'></i>
        </LinkButton>
        <Button className='remove-btn' onClick={open} textOnly>
          <i className='fas fa-times'></i>
        </Button>
      </Row>

      <ProductCard product={product} />

      <Modal>
        <ModalContent center>Are you sure you want to delete this product?</ModalContent>
        <ModalButtons>
          <Button onClick={close}>CANCEL</Button>
          <Button
            className='delete-btn'
            onClick={() => {
              removeProduct({ variables: { id: product.id } });
              close();
            }}>
            DELETE
          </Button>
        </ModalButtons>
      </Modal>
    </Div>
  );
};

export default ProductCardAdmin;

const Div = styled.div`
  .actions {
    margin-bottom: 0.4em;
    button {
      margin-right: 0.5em;
      padding: 0.5em 0.7em;
      font-size: 14px;
    }
    .remove-btn {
      color: var(--error);
    }
  }
`;
