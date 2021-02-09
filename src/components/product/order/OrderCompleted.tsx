import React from 'react';
import { Section, Row, Center } from '../../common/Layout';
import styled from 'styled-components';
import { ActionButtons } from './ActionButtons';
import { LinkButton } from '../../common/Button';

export interface OrderCompletedProps {}

const OrderCompleted: React.FC<OrderCompletedProps> = () => {
  return (
    <Div>
      <Center>
        <div>
          <div>
            <i className='fas fa-check-circle'></i>
          </div>
          <h3>ORDER COMPLETED</h3>
          <p>You may track you orders here</p>
          <LinkButton to='/orders' outline>
            ORDERS
          </LinkButton>
        </div>
      </Center>
    </Div>
  );
};

export default OrderCompleted;

const Div = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;

  i {
    margin-bottom: 0.7em;
    color: green;
    font-size: 30px;
  }

  h3,
  p {
    color: var(--fg2);
  }

  h3 {
    font-size: 24px;
  }

  p {
    margin: 0.4em 0 1.2em 0;
  }
`;
