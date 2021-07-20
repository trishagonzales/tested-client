import React from 'react';
import styled from 'styled-components';
import { useWishlist } from '../../hooks/user/useWishlist';
import { lazy } from '../../utils/dynamicImports.util';

import { Section, Container } from '../../components/common/Layout';
import { PageHeader, PageTitle, PageHeaderButtons } from '../../components/global/PageHeader';
import { Button } from '../../components/common/Button';
import If from '../../components/common/If';
import { StickerNotice } from '../../components/common/StickerNotice';

const ProductCard = lazy(() => import('../../components/product/ProductCard'));

const WishlistPage: React.FC = () => {
  const { items, clear } = useWishlist();

  return (
    <>
      <PageHeader>
        <PageTitle>WISHLISTS</PageTitle>
        <PageHeaderButtons>
          <Button onClick={() => clear()}>CLEAR ALL</Button>
        </PageHeaderButtons>
      </PageHeader>

      <WishlistSection>
        <Container className='container'>
          <If
            condition={items.length > 0}
            elseRender={<StickerNotice className='empty-notice'>WISHLIST EMPTY</StickerNotice>}>
            {items.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </If>
        </Container>
      </WishlistSection>
    </>
  );
};

export default WishlistPage;

const WishlistSection = styled(Section)`
  .container {
    display: flex;
  }

  .empty-notice {
    height: 60vh;
  }
`;
