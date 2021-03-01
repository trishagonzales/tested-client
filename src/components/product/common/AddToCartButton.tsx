import React from 'react';
import { useCart } from '../../../hooks/user/useCart';
import { Button, ButtonProps } from '../../common/Button';

export interface AddToCartButtonProps extends ButtonProps {
  productID: string;
  quantity: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productID, quantity, ...btnProps }) => {
  const { addItem, deleteItem, isAdded } = useCart(productID);

  return (
    <>
      {isAdded() ? (
        <Button onClick={() => deleteItem()} {...btnProps} outline>
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
