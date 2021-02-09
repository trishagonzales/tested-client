import React from 'react';
import styled from 'styled-components';
import { device } from '../theme';

import { PageHeader, PageTitle, PageHeaderButtons } from '../components/global/PageHeader';
import { LinkButton } from '../components/common/Button';
import { useProducts } from '../hooks/product/useProducts';
import { Product } from '../types/Product.types';
import { Container, Row } from '../components/common/Layout';
import ProductCardAdmin from '../components/admin/ProductCardAdmin';

export interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = () => {
  const { products } = useProducts();

  return (
    <Div>
      <PageHeader>
        <PageTitle>ADMIN PAGE</PageTitle>
        <PageHeaderButtons>
          <LinkButton to='/admin/add-product' iconBreakpoint>
            <i className='fas fa-plus'></i>
            <span>ADD PRODUCT</span>
          </LinkButton>
          <LinkButton to='/admin/settings' iconBreakpoint>
            <i className='fas fa-cog'></i>
            <span>SETTINGS</span>
          </LinkButton>
        </PageHeaderButtons>
      </PageHeader>

      <Container>
        <Row className='products'>
          {products?.map((product: Product, i: number) => (
            <ProductCardAdmin key={i} product={product} />
          ))}
        </Row>
      </Container>
    </Div>
  );
};

export default AdminPage;

const Div = styled.div`
  .products {
    padding: 30px 0;
  }

  @media ${device.tablet} {
    .products {
      padding: 20px 10px;
    }
  }
`;
