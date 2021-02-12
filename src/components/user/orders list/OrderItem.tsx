import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { OrderType } from '../../../types/User.types';
import { BaseProps } from '../../../types/General.types';

import { Row } from '../../common/Layout';
import { LinkButton } from '../../common/Button';
import Price from '../../product/common/Price';
import ProductThumbnail from '../../product/ProductThumbnail';
import { OrderStatus } from './OrderStatus';

export interface OrderItemProps extends BaseProps {
  order: OrderType;
  removeOrder: any;
}

const OrderItem: React.FC<OrderItemProps> = ({ className, order, removeOrder }) => {
  return (
    <Div className={className}>
      <div
        className='remove-btn hoverable-underline error-color'
        onClick={() => removeOrder(order.id)}>
        DELETE
      </div>

      {order.items.map((item, index) =>
        item.product ? (
          <Link to={'/product/' + item.product.id}>
            <Row className='product' key={index}>
              <ProductThumbnail className='thumbnail' src={item.product?.thumbnail} size='70px' />

              <div className='product-info'>
                <div className='name'>{item.product?.name}</div>
                <div className='quantity-price'>
                  <span className='quantity'>x {item.quantity}</span>
                  <Price fontSize='14px'>{item.product?.price * item.quantity}</Price>
                </div>
              </div>
            </Row>
          </Link>
        ) : (
          <span className='product-removed' key={index}>
            <i className='fas fa-ban'></i> PRODUCT REMOVED
          </span>
        )
      )}

      <hr />

      <OrderStatus status={order.status} />

      <hr />

      <Row className='total-price' justifyContent='space-between'>
        {order.status === 'COMPLETED' && !order.isReviewed && (
          <LinkButton textOnly to={'/leave-review/' + order.id}>
            Leave review
          </LinkButton>
        )}
        <span></span>
        <Price fontSize='16px' label='Total'>
          {order.totalPrice}
        </Price>
      </Row>
    </Div>
  );
};

export default OrderItem;

const Div = styled.div`
  width: 100%;
  margin: 0.5em 0;
  padding: 1.5em 1em;
  position: relative;
  border: 2px solid var(--lightgrey);
  border-radius: 5px;

  .product {
    padding: 0.5em;

    .thumbnail {
      margin-right: 1.2em;
    }
    .name {
      margin-bottom: 0.6em;
    }
    .quantity-price {
      font-size: 14px;
      .quantity {
        margin-right: 1em;
      }
    }
  }

  .product-removed {
    margin-left: 1em;
    color: var(--fg2);
    font-size: 14px;
    font-weight: bold;
  }

  hr {
    margin: 1em 0.7em;
  }

  .total-price {
    margin-top: 1em;
    button {
      font-size: 12px;
    }
  }

  .remove-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 11px;
  }
`;
