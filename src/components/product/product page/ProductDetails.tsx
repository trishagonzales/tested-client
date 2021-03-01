import React from 'react';
import styled from 'styled-components';
import { useTabs } from '../../../hooks/common/useTabs';
import { Product } from '../../../types/Product.types';

import ReviewItem from './ReviewItem';
import { device } from '../../../theme';

export interface ProductDetailsProps {
  product?: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { TabContainer, TabHeader, Tab, TabBody, TabContent } = useTabs({
    initialTab: 'description',
  });

  return (
    <Div>
      <TabContainer>
        <TabHeader className='tab-header'>
          <Tab className='tab' name='description'>
            DESCRIPTION
          </Tab>
          <Tab className='tab' name='reviews'>
            REVIEWS
          </Tab>
        </TabHeader>
        <TabBody className='tab-body'>
          <TabContent className='tab-content' name='description'>
            <div className='description'>{product?.description}</div>
          </TabContent>
          <TabContent className='tab-content' name='reviews'>
            <div className='reviews'>
              {product?.reviews?.map(review => (
                <ReviewItem className='review-item' key={review.id} review={review} />
              ))}
            </div>
          </TabContent>
        </TabBody>
      </TabContainer>
    </Div>
  );
};

export default ProductDetails;

const Div = styled.div`
  margin-bottom: 50px;

  .tab-header {
    .tab {
      padding: 0.9em;
      border-radius: 6px 6px 0 0;
      color: var(--grey);
      font-size: 18px;
    }
    .active {
      border: 1px solid var(--grey);
      border-bottom: none;
      color: var(--main);
    }
  }

  .tab-body {
    min-height: 300px;
    border: 1px solid var(--grey);
    .tab-content {
      padding: 1em;
    }
    .description {
      max-width: 700px;
      margin: auto;
      padding: 2em 1em;
      background: white;
      border-radius: 5px;
      font-size: 14px;
      color: var(--fg);
      white-space: pre-wrap;
      line-height: 2em;
    }
    .reviews {
      padding: 1em;
      .review-item {
        box-shadow: 1px 1px 5px grey;
      }
    }
  }

  @media ${device.narrow} {
    .tab-body {
      width: 100vw;
    }
  }
`;
