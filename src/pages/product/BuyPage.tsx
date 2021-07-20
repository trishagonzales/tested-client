import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { useTabs } from '../../hooks/common/useTabs';
import { lazy } from '../../utils/dynamicImports.util';

import { Container, Section } from '../../components/common/Layout';
import { PageHeader, PageTitle } from '../../components/global/PageHeader';

const Cart = lazy(() => import('../../components/product/buy/Cart'));
const Checkout = lazy(() => import('../../components/product/buy/Checkout'));
const OrderCompleted = lazy(() => import('../../components/product/buy/OrderCompleted'));

const BuyPage: React.FC = () => {
  const { TabContainer, TabHeader, Tab, TabBody, TabContent } = useTabs({
    isCurrentPathTheTab: true,
    disableTabClick: true,
  });
  const { path } = useRouteMatch();

  return (
    <>
      <PageHeader>
        <PageTitle>{path.toUpperCase().substring(1)}</PageTitle>
      </PageHeader>

      <OrderSection>
        <Container>
          <TabContainer className='tab-container'>
            <TabHeader className='tab-header'>
              <Tab className='tab' name='cart'>
                CART
              </Tab>
              <Tab className='tab' name='checkout'>
                CHECKOUT
              </Tab>
              <Tab className='tab' name='order-completed'>
                COMPLETE
              </Tab>
            </TabHeader>

            <TabBody className='tab-body'>
              <TabContent name='cart'>
                <Cart />
              </TabContent>
              <TabContent name='checkout'>
                <Checkout />
              </TabContent>
              <TabContent name='order-completed'>
                <OrderCompleted />
              </TabContent>
            </TabBody>
          </TabContainer>
        </Container>
      </OrderSection>
    </>
  );
};

export default BuyPage;

const OrderSection = styled(Section)`
  .tab-header {
    border-bottom: none;
    .tab {
      background: var(--bg);
      color: var(--grey);
    }
    .active {
      background: var(--main);
      color: white;
    }
  }

  .tab-body {
    height: 500px;
    background: var(--bg);
  }
`;
