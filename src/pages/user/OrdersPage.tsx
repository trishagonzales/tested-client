import React from 'react';
import styled from 'styled-components';
import { useOrder } from '../../hooks/product/useOrder';
import { device } from '../../theme';

import { PageHeader, PageTitle, PageHeaderButtons } from '../../components/global/PageHeader';
import { Button } from '../../components/common/Button';
import { Container } from '../../components/common/Layout';
import OrderItem from '../../components/user/orders list/OrderItem';

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
            <OrderItem order={order} removeOrder={removeOrder} key={index} />
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

  @media ${device.narrow} {
    padding: 0 3%;
  }
`;
