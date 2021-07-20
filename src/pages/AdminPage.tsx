import React from 'react';
import styled from 'styled-components';
import { device } from '../theme';

import { PageHeader, PageTitle, PageHeaderButtons } from '../components/global/PageHeader';
import { LinkButton } from '../components/common/Button';
import { useProducts } from '../hooks/product/useProducts';
import { Product } from '../types/Product.types';
import { Container, Row } from '../components/common/Layout';
import ProductCardAdmin from '../components/admin/ProductCardAdmin';
import If from '../components/common/If';
import { StickerNotice } from '../components/common/StickerNotice';

export interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = () => {
  const { products } = useProducts();

  return (
    <Div>
      <PageHeader>
        <PageTitle>ADMIN PAGE</PageTitle>
        <PageHeaderButtons>
          <LinkButton to='/admin/product/add' iconBreakpoint>
            <i className='fas fa-plus'></i>
            <span>ADD PRODUCT</span>
          </LinkButton>
        </PageHeaderButtons>
      </PageHeader>

      <Container>
        <If
          condition={!!products && products?.length > 0}
          elseRender={<StickerNotice className='empty-notice'>PRODUCTS EMPTY</StickerNotice>}>
          <Row className='products'>
            {products?.map((product: Product, i: number) => (
              <ProductCardAdmin key={i} product={product} />
            ))}
          </Row>
        </If>
      </Container>
    </Div>
  );
};

export default AdminPage;

const Div = styled.div`
  .products {
    padding: 30px 0;
  }

  .empty-notice {
    height: 60vh;
  }

  @media ${device.tablet} {
    .products {
      padding: 20px 10px;
    }
  }
`;
