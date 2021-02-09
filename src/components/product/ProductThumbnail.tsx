import React from 'react';
import styled from 'styled-components';
import { base64ToUrl } from '../../utils/files.util';
import placeholder from '../../assets/product-img-placeholder.png';
import { BaseProps } from '../../types/General.types';

export interface ProductThumbnailProps extends BaseProps {
  src?: string;
  size?: string;
}

const ProductThumbnail: React.FC<ProductThumbnailProps> = ({ className, src, size = '50px' }) => {
  return (
    <Img
      className={className}
      size={size}
      src={base64ToUrl(src) ?? placeholder}
      alt='product-thumbnail'
    />
  );
};

export default ProductThumbnail;

const Img = styled.img<{ size?: string }>`
  width: ${p => p.size};
  height: ${p => p.size};
  object-fit: contain;
  object-position: center;
`;
