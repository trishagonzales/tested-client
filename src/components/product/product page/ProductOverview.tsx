import React from 'react';
import styled from 'styled-components';
import { useQuantity } from '../../../hooks/product/useQuantity';
import { Product } from '../../../types/Product.types';
import { device } from '../../../theme';

import { Row, Column } from '../../common/Layout';
import { Button } from '../../common/Button';
import ProductImages from '../ProductImages';
import StarRating from '../common/StarRating';
import Price from '../common/Price';
import WishlistButton from '../common/WishlistButton';
import AddToCartButton from '../common/AddToCartButton';

export interface ProductOverviewProps {
  product?: Product;
}

const ProductOverview: React.FC<ProductOverviewProps> = ({ product }) => {
  const { quantity, QuantityCounter } = useQuantity(product?.stock);

  return (
    <Div>
      <Row className='row-overview' breakpoint='tablet'>
        <Column className='col product-images'>
          <ProductImages images={product?.images ?? []} />
        </Column>

        <Column className='col product-overview'>
          <h1 className='name'>{product?.name}</h1>
          <StarRating rating={product?.rating ?? 0} reviewsCount={product?.reviews?.length} />
          <Price className='price' fontSize='20px'>
            {product?.price}
          </Price>

          <Row className='quantity-wishlist'>
            <QuantityCounter />
            <WishlistButton className='wishlist-btn' productID={product?.id || ''} />
          </Row>

          <Row className='actions' breakpoint='phone'>
            <Button className='buynow-btn' primary>
              BUY NOW
            </Button>
            <AddToCartButton
              className='addtocart-btn'
              productID={product?.id ?? ''}
              quantity={quantity}
            />
          </Row>
        </Column>
      </Row>
    </Div>
  );
};

export default ProductOverview;

const Div = styled.div`
  padding: 20px 0 50px 0;

  .row-overview {
    .col {
      height: 300px;
    }
    .product-images {
      margin: auto;
    }
    .product-overview {
      margin-top: 50px;
    }
  }

  .rating,
  .price {
    margin: 1em 0;
  }
  .quantity-wishlist {
    margin: 1em 0;
    .wishlist-btn {
      margin-left: 1em;
    }
  }
  .actions {
    margin-top: 2em;
    display: flex;
    align-items: center;
    button {
      width: 180px;
      padding: 0.8em 1.2em;
      font-size: 14 px;
    }
    .addtocart-btn {
      margin: 0 1em;
    }
  }

  @media ${device.tablet} {
    .col {
      width: 80vw;
    }
  }

  @media ${device.phone} {
    .quantity-wishlist {
      .wishlist-btn {
        margin-left: auto;
      }
    }
    .actions {
      button {
        width: 100%;
      }
      button:nth-of-type(1) {
        margin-bottom: 0.5em;
      }
    }
  }
`;
