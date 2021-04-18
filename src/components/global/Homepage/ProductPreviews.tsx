import React from 'react';
import styled from 'styled-components';
import { useProducts } from '../../../hooks/product/useProducts';
import { Product } from '../../../types/Product.types';

import { Container } from '../../common/Layout';
import PreviewList from '../../product/PreviewList';
import ProductCard from '../../product/ProductCard';

export interface ProductPreviewsProps {}

export const ProductPreviews: React.FC<ProductPreviewsProps> = () => {
  const { products } = useProducts();

  return (
    <Div>
      <section className='featured'>
        <Container>
          <PreviewList title='Featured' moreLink='/products'>
            {products?.map((product: Product, i: number) => (
              <ProductCard key={i} product={product} />
            ))}
          </PreviewList>
        </Container>
      </section>

      <section>
        <Container>
          <PreviewList title='New Arrivals' moreLink='/products'>
            {products?.map((product: Product, i: number) => (
              <ProductCard key={i} product={product} />
            ))}
          </PreviewList>
        </Container>
      </section>
    </Div>
  );
};

const Div = styled.div`
  .featured {
    background: var(--bg);
  }
`;
