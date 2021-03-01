import React from 'react';
import styled from 'styled-components';
import { useWishlist } from '../../../hooks/user/useWishlist';

export interface WishlistButtonProps {
  productID: string;
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ productID, className }) => {
  const { addItem, deleteItem, isAdded } = useWishlist(productID);

  return (
    <Heart
      className={`${className} ${isAdded() ? 'fas' : 'far'} fa-heart`}
      onClick={() => {
        if (isAdded()) deleteItem();
        if (!isAdded()) addItem();
      }}></Heart>
  );
};

export default WishlistButton;

export const Heart = styled.i`
  font-size: 24px;
  color: crimson;
  cursor: pointer;
`;
