import React from 'react';
import styled from 'styled-components';
import { useTabs } from '../../../hooks/useTabs';
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
                <ReviewItem key={review.id} review={review} />
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
  .tab-header {
    .tab {
      padding: 0.7em;
      border-radius: 6px 6px 0 0;
      color: var(--grey);
      font-size: 18px;
    }
    .active {
      background: var(--main);
      color: white;
    }
  }

  .tab-body {
    min-height: 500px;
    background: var(--main);
    .tab-content {
      padding: 1em;
    }
    .description {
      margin: 1em 1.5em;
      padding: 2em;
      background: white;
      border-radius: 5px;
      font-size: 14px;
      color: var(--fg);
      white-space: pre-wrap;
      line-height: 1.7em;
    }
    .reviews {
      padding: 1em;
    }
  }

  @media ${device.narrow} {
    .body {
      width: 100vw;
    }
  }
`;
