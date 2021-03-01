import React, { useState } from 'react';
import styled from 'styled-components';
import { device } from '../../theme';
import { base64ToUrl } from '../../utils/files.util';
import placeholder from '../../assets/product-img-placeholder.png';

export interface ProductImagesProps {
  images: string[];
  className?: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({ images, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Div className={className + ' product-images'}>
      <img
        className='main-view'
        src={base64ToUrl(images[currentIndex]) || placeholder}
        alt='product'
      />

      {images.length > 1 && (
        <div className='items'>
          {currentIndex === 0 ? (
            <div className='previous-btn disabled'>
              <i className='fas fa-caret-left'></i>
            </div>
          ) : (
            <div
              className='previous-btn hoverable'
              onClick={() => setCurrentIndex(currentIndex - 1)}>
              <i className='fas fa-caret-left'></i>
            </div>
          )}

          {images.map((image, index) => (
            <img
              key={index}
              className={`item ${index === currentIndex && 'active'}`}
              src={base64ToUrl(image)}
              alt='product'
              onClick={() => setCurrentIndex(index)}
            />
          ))}

          {currentIndex === images.length - 1 ? (
            <div className='next-btn disabled'>
              <i className='fas fa-caret-right'></i>
            </div>
          ) : (
            <div className='next-btn hoverable' onClick={() => setCurrentIndex(currentIndex + 1)}>
              <i className='fas fa-caret-right'></i>
            </div>
          )}
        </div>
      )}
    </Div>
  );
};

export default ProductImages;

export const Div = styled.div`
  width: 300px;

  .main-view {
    width: 250px;
    height: 250px;
    margin: auto;
    display: block;
    background: var(--bg);
    object-fit: contain;
    object-position: center;
  }

  .items {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;

    .item {
      width: 40px;
      height: 40px;
      background: var(--bg);
      border: 1px solid #eee;
      object-fit: contain;
      object-position: center;
      cursor: pointer;
    }
    .item.active {
      border: 1px solid #777;
    }
    .item:not(.active) {
      opacity: 0.7;
    }

    .previous-btn,
    .next-btn {
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--lightgrey);
      font-size: 16px;
      color: var(--main);
      cursor: pointer;
    }
    .disabled {
      background: var(--bg);
      color: var(--grey);
    }
  }

  @media ${device.phone} {
    width: 80vw;
    .main-view {
      width: 300px;
      height: 300px;
    }
  }
`;
