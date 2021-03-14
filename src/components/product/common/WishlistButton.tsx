import React from 'react';
import { useToasts } from 'react-toast-notifications';
import styled from 'styled-components';
import { useGlobal } from '../../../hooks/common/useGlobal';
import { useWishlist } from '../../../hooks/user/useWishlist';

export interface WishlistButtonProps {
  productID: string;
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ productID, className }) => {
  const { addItem, deleteItem, isAdded } = useWishlist(productID);
  const {
    globalState: { user },
  } = useGlobal();
  const { addToast } = useToasts();

  return (
    <Heart
      className={`${className} ${isAdded() ? 'fas' : 'far'} fa-heart`}
      onClick={() => {
        if (!user) {
          addToast('Login required', { appearance: 'error' });
        } else if (isAdded()) {
          deleteItem();
        } else if (!isAdded()) {
          addItem();
        }
      }}></Heart>
  );
};

export default WishlistButton;

export const Heart = styled.i`
  font-size: 24px;
  color: crimson;
  cursor: pointer;
`;
