import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { base64ToUrl } from '../../utils/files.util';
import { Product } from '../../types/Product.types';
import placeholder from '../../assets/product-img-placeholder.png';
import { lazy } from '../../utils/dynamicImports.util';

const WishlistButton = lazy(() => import('./common/WishlistButton'));
const StarRating = lazy(() => import('./common/StarRating'));
const Price = lazy(() => import('./common/Price'));
const AddToCartButton = lazy(() => import('./common/AddToCartButton'));

export interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card>
      <Link to={'/product/' + product.id}>
        <img
          src={base64ToUrl(product.thumbnail) || placeholder}
          alt='product-thumbnail'
          className='thumbnail'
        />
      </Link>

      <WishlistButton className='wishlist-btn' productID={product.id} />

      <Link to={'/product/' + product.id}>
        <div className='name'>{product.name}</div>

        <div className='rating-price'>
          <StarRating
            rating={product.rating ?? 0}
            reviewsCount={product.reviews?.length ?? 0}
            fontSize='9px'
          />
          <Price className='price' fontSize='14px'>
            {product.price}
          </Price>
        </div>
      </Link>

      <AddToCartButton {...{ productID: product.id, quantity: 1 }} fullwidth />
    </Card>
  );
};

export default ProductCard;

export const Card = styled.div`
  width: 180px;
  padding: 0.5em;
  position: relative;
  border: 1px solid white;
  border-radius: 5px;
  transition: border-color ease-in 100ms;
  cursor: pointer;
  :hover {
    border-color: var(--main2);
    .wishlist-btn {
      display: unset;
    }
  }

  .thumbnail {
    width: 162px;
    height: 150px;
    object-fit: cover;
    object-position: center;
  }
  .wishlist-btn {
    display: none;
    position: absolute;
    top: 9px;
    right: 9px;
    padding: 3px 4px;
    background: white;
    border-radius: 5px;
    box-shadow: 0 0 7px #ddd;
  }
  .name {
    height: 32px;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
  }
  .rating-price {
    margin: 0.4em 0;
    display: flex;
    align-items: center;
    .price {
      margin-left: auto;
    }
  }
  button {
    font-size: 12px;
  }
`;
