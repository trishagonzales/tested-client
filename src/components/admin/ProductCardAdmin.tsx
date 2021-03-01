import React from 'react';
import styled from 'styled-components';
import { useAdmin } from '../../hooks/useAdmin';
import { useModal, ModalButtons, ModalContent } from '../../hooks/portal/useModal';
import { Product } from '../../types/Product.types';

import { LinkButton, Button } from '../common/Button';
import { Row } from '../common/Layout';
import ProductCard from '../product/ProductCard';

export interface ProductCardAdminProps {
  product: Product;
}

const ProductCardAdmin: React.FC<ProductCardAdminProps> = ({ product }) => {
  const { deleteProduct } = useAdmin();
  const { Modal, open, close } = useModal();

  return (
    <Div>
      <Row className='actions' justifyContent='flex-end'>
        <LinkButton to={'/admin/edit-product/' + product.id} textOnly>
          <i className='fas fa-edit'></i> <span>EDIT</span>
        </LinkButton>
        <Button className='remove-btn' onClick={open} textOnly>
          <i className='fas fa-times'></i> <span>DELETE</span>
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
              deleteProduct({ variables: { id: product.id } });
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
