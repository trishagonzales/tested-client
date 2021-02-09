import React from 'react';
import styled from 'styled-components';
import { useCart } from '../../../hooks/user/useCart';
import { lazy } from '../../../utils/dynamicImports.util';

import { LinkButton } from '../../common/Button';
import { ActionButtons } from './ActionButtons';
import { device } from '../../../theme';
import { Row } from '../../common/Layout';

const Price = lazy(() => import('../common/Price'));
const CartItem = lazy(() => import('./CartItem'));

export interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const { items, totalPrice } = useCart();

  return (
    <Div>
      {items.map(item => (
        <CartItem item={item} key={item.id} />
      ))}

      <Row className='total-price' justifyContent='flex-end'>
        <Price fontSize='20px' label='Total'>
          {totalPrice}
        </Price>
      </Row>

      <ActionButtons justifyContent='flex-end'>
        <LinkButton to='/checkout' primary disabled={items.length === 0}>
          CHECKOUT
        </LinkButton>
      </ActionButtons>
    </Div>
  );
};

export default Cart;

const Div = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em 3%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .total-price {
    margin: auto 0 75px 0;
  }

  @media ${device.phone} {
    .total-price {
      font-size: 14px;
    }
  }
`;
