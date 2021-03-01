import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useProducts } from '../hooks/product/useProducts';

import { Container, HorizontalCenter } from '../components/common/Layout';
import ProductCard from '../components/product/ProductCard';
import { PageHeader, PageTitle } from '../components/global/PageHeader';
import { usePagination } from '../hooks/usePagination';

export interface ProductListPageProps {}

const ProductListPage: React.FC<ProductListPageProps> = () => {
  const { products } = useProducts();
  const { Pagination, setItems } = usePagination();

  useEffect(() => {
    if (products) setItems(products);
  }, [products]);

  return (
    <>
      <PageHeader>
        <PageTitle>SHOP</PageTitle>
      </PageHeader>

      <Div>
        <Container>
          {products?.map((product, i) => (
            <ProductCard product={product} key={i} />
          ))}

          <HorizontalCenter className='pagination'>
            <Pagination />
          </HorizontalCenter>
        </Container>
      </Div>
    </>
  );
};

export default ProductListPage;

const Div = styled.div`
  margin-top: 40px;
  margin-bottom: 60px;

  .pagination {
    margin-top: 50px;
  }
`;
