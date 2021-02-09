import React from 'react';
import { useCart } from '../../../hooks/user/useCart';
import { Button, ButtonProps } from '../../common/Button';

export interface AddToCartButtonProps extends ButtonProps {
  productID: string;
  quantity: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productID, quantity, ...btnProps }) => {
  const { addItem, removeItem, isAdded } = useCart(productID);

  return (
    <>
      {isAdded() ? (
        <Button onClick={() => removeItem()} {...btnProps} outline>
          <i className='fas fa-cart-plus'></i>
          {''} ADDED TO CART
        </Button>
      ) : (
        <Button onClick={() => addItem(quantity)} {...btnProps}>
          <i className='fas fa-cart-plus'></i>
          {''} ADD TO CART
        </Button>
      )}
    </>
  );
};

export default AddToCartButton;
