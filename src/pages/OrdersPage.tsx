import React, { useEffect } from 'react';
import { useOrder } from '../hooks/useOrder';
import styled from 'styled-components';
import { PageHeader, PageTitle, PageHeaderButtons } from '../components/global/PageHeader';
import ProductThumbnail from '../components/product/ProductThumbnail';
import { Row, Container } from '../components/common/Layout';
import Price from '../components/product/common/Price';
import { OrderStatus } from '../components/product/order/OrderStatus';
import { Button, LinkButton } from '../components/common/Button';
import { device } from '../theme';

export interface OrdersPageProps {}

const OrdersPage: React.FC<OrdersPageProps> = () => {
  const { orders, removeOrder, clearOrders } = useOrder();

  return (
    <>
      <PageHeader>
        <PageTitle>ORDERS</PageTitle>
        <PageHeaderButtons>
          <Button onClick={() => clearOrders()}>CLEAR ALL</Button>
        </PageHeaderButtons>
      </PageHeader>

      <Container>
        <Div>
          {orders.map((order, index) => (
            <div className='order-item' key={index}>
              <div
                className='remove-btn hoverable-underline error-color'
                onClick={() => removeOrder(order.id)}>
                DELETE
              </div>

              {order.items.map((item, index) => (
                <Row className='product' key={index}>
                  <ProductThumbnail
                    className='thumbnail'
                    src={item.product.thumbnail}
                    size='70px'
                  />

                  <div className='product-info'>
                    <div className='name'>{item.product.name}</div>
                    <div className='quantity-price'>
                      <span className='quantity'>x {item.quantity}</span>
                      <Price fontSize='14px'>{item.product.price * item.quantity}</Price>
                    </div>
                  </div>
                </Row>
              ))}

              <hr />

              <OrderStatus status={order.status} />

              <hr />

              <Row className='total-price' justifyContent='space-between'>
                {order.status === 'COMPLETED' && (
                  <LinkButton textOnly to={'/leave-review/' + order.id}>
                    Leave review
                  </LinkButton>
                )}
                <span></span>
                <Price fontSize='16px' label='Total'>
                  {order.totalPrice}
                </Price>
              </Row>
            </div>
          ))}
        </Div>
      </Container>
    </>
  );
};

export default OrdersPage;

const Div = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 0.5em;
  justify-content: center;

  .order-item {
    width: 100%;
    margin: 0.5em 0;
    padding: 1.5em 1em;
    position: relative;
    border: 2px solid var(--lightgrey);
    border-radius: 5px;

    .product {
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

    hr {
      margin: 1.2em;
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
  }

  @media ${device.narrow} {
    padding: 0 3%;
  }
`;
