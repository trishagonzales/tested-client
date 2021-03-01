import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../../hooks/user/useCart';
import { useQuantity } from '../../../hooks/product/useQuantity';
import { CartItemType } from '../../../types/User.types';

import { RemoveButton } from '../../common/Button';
import Price from '../common/Price';
import ProductThumbnail from '../ProductThumbnail';

export interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { deleteItem, updateItem } = useCart(item.product.id);
  const { quantity, QuantityCounter } = useQuantity(item.product.stock, item.quantity);
  const [isIncluded, setIncluded] = useState(item.isIncluded);

  useEffect(() => {
    if (item.quantity !== quantity) updateItem({ id: item.id, quantity, isIncluded });
  }, [quantity]);

  useEffect(() => {
    if (item.isIncluded !== isIncluded)
      updateItem({ id: item.id, quantity, isIncluded: !item.isIncluded });
  }, [isIncluded]);

  return (
    <Div>
      <input
        type='checkbox'
        className='checkbox'
        checked={isIncluded}
        onChange={() => setIncluded(!isIncluded)}
      />

      <Link className='thumbnail' to={'/product/' + item.product.id}>
        <ProductThumbnail src={item.product.thumbnail} />
      </Link>

      <Link className='name' to={'/product/' + item.product.id}>
        <span>{item.product.name}</span>
      </Link>

      <Price className='price' fontSize='14px'>
        {item.product.price}
      </Price>

      <QuantityCounter className='quantity-counter' />

      <RemoveButton onClick={deleteItem} />
    </Div>
  );
};

export default CartItem;

const Div = styled.div`
  width: 100%;
  height: 80px;
  margin-bottom: 0.5em;
  padding: 1em;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 5px;

  .checkbox {
    flex: 0 0 30px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .thumbnail {
    flex: 0 0 50px;
    margin: 0 1em;
  }
  .name {
    flex: 2 2 500px;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .price {
    flex: 1 1 100px;
  }
  .quantity-counter {
    flex: 0 0 120px;
  }
`;
