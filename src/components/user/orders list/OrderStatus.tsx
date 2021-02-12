import React from 'react';
import styled from 'styled-components';
import { Row } from '../../common/Layout';
import { BaseProps } from '../../../types/General.types';

export interface OrderStatusProps extends BaseProps {
  status: 'CONFIRMED' | 'PROCESSING' | 'COMPLETED';
}

export const OrderStatus: React.FC<OrderStatusProps> = ({ className, status }) => {
  return (
    <Div status={status}>
      <Row className={className} justifyContent='space-evenly'>
        <div className={`status-item ${status === 'CONFIRMED' && 'active'}`}>
          <i className='fas fa-receipt' />
          <div>Confirmed</div>
        </div>

        <i className='fas fa-arrow-right'></i>

        <div className={`status-item ${status === 'PROCESSING' && 'active'}`}>
          <i className='fas fa-truck-loading' />
          <div>Processing</div>
        </div>

        <i className='fas fa-arrow-right'></i>

        <div className={`status-item ${status === 'COMPLETED' && 'active'}`}>
          <i className='fas fa-check-circle' />
          <div>Completed</div>
        </div>
      </Row>
    </Div>
  );
};

const Div = styled.div<{ status: string }>`
  color: var(--grey);

  .status-item {
    text-align: center;
    i {
      font-size: 16px;
    }
    div {
      font-size: 14px;
    }
  }

  .active {
    color: green;
  }
`;
