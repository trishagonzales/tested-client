import React from 'react';
import styled from 'styled-components';
import { useOrder } from '../../../hooks/product/useOrder';
import { useCart } from '../../../hooks/user/useCart';

import { ActionButtons } from './ActionButtons';
import { LinkButton, Button } from '../../common/Button';
import Price from '../common/Price';
import ProductThumbnail from '../ProductThumbnail';
import { Row } from '../../common/Layout';
import { device } from '../../../theme';

export interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = () => {
  const { createOrder } = useOrder();
  const { items, totalPrice } = useCart();

  return (
    <Div>
      {items &&
        items
          .filter(i => i.isIncluded)
          .map((i, index) => (
            <Row className='checkout-item' key={index}>
              <ProductThumbnail className='thumbnail' src={i.product.thumbnail} size='100px' />

              <div className='info'>
                <div className='name'>{i.product.name}</div>
                <div className='quantity-price'>
                  <span className='quantity'>x {i.quantity}</span>
                  <Price>{i.product.price * i.quantity}</Price>
                </div>
              </div>
            </Row>
          ))}

      <Row className='total-price' justifyContent='flex-end'>
        <Price fontSize='20px' label='Total'>
          {totalPrice}
        </Price>
      </Row>

      <ActionButtons>
        <LinkButton to='/cart'>CANCEL</LinkButton>
        <Button
          onClick={() => createOrder(items.map(i => i.id))}
          disabled={!items || items.length === 0}
          primary>
          PLACE ORDER
        </Button>
      </ActionButtons>
    </Div>
  );
};

export default Checkout;

const Div = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em 3%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .checkout-item {
    width: 100%;
    .thumbnail {
      margin-right: 2em;
    }
    .name {
      margin-bottom: 1em;
    }
    .quantity {
      margin-right: 2em;
    }
  }

  .total-price {
    margin: auto 0 75px 0;
  }

  @media ${device.phone} {
    .thumbnail {
      width: 70px;
      height: 70px;
    }
  }
`;
