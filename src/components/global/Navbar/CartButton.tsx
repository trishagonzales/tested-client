import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export interface CartProps {
  className?: string;
}

export const CartButton: React.FC<CartProps> = ({ className }) => {
  let history = useHistory();

  return (
    <CartStyle className={className + ' hoverable'} onClick={() => history.push('/cart')}>
      <i className='fas fa-shopping-cart'></i>
    </CartStyle>
  );
};

export const CartStyle = styled.div`
  padding: 0.5em 1em;
  i {
    color: white;
    font-size: 20px;
  }
`;
