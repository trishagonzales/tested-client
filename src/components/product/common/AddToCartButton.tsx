import React from 'react';
import { useToasts } from 'react-toast-notifications';
import { useGlobal } from '../../../hooks/common/useGlobal';
import { useCart } from '../../../hooks/user/useCart';
import { Button, ButtonProps } from '../../common/Button';

export interface AddToCartButtonProps extends ButtonProps {
  productID: string;
  quantity: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productID, quantity, ...btnProps }) => {
  const { addItem, deleteItem, isAdded } = useCart(productID);
  const {
    globalState: { user },
  } = useGlobal();
  const { addToast } = useToasts();

  return (
    <>
      {isAdded() ? (
        <Button onClick={() => deleteItem()} {...btnProps} outline>
          <i className='fas fa-cart-plus'></i>
          {''} ADDED TO CART
        </Button>
      ) : (
        <Button
          onClick={() =>
            user ? addItem(quantity) : addToast('Login required', { appearance: 'error' })
          }
          {...btnProps}>
          <i className='fas fa-cart-plus'></i>
          {''} ADD TO CART
        </Button>
      )}
    </>
  );
};

export default AddToCartButton;
