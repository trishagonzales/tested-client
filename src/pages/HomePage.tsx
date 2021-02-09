import React from 'react';
import styled from 'styled-components';
import { lazy } from '../utils/dynamicImports.util';

import { Container } from '../components/common/Layout';
import { useProducts } from '../hooks/product/useProducts';
import { Product } from '../types/Product.types';

const ProductCard = lazy(() => import('../components/product/ProductCard'));
const PreviewList = lazy(() => import('../components/product/PreviewList'));
const Newsletter = lazy(() => import('../components/global/Newsletter'));

export interface HomeProps {}

const HomePage: React.FC<HomeProps> = () => {
  const { products } = useProducts();

  return (
    <>
      <Header />
      <Featured>
        <Container>
          <PreviewList title='Featured' moreLink=''>
            {products?.map((product: Product, i: number) => (
              <ProductCard key={i} product={product} />
            ))}
          </PreviewList>
        </Container>
      </Featured>

      <Newsletter />
    </>
  );
};

export default HomePage;

const Header = styled.header`
  height: 90vh;
  background: var(--main2);
`;

const Featured = styled.section``;
