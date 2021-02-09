import React from 'react';
import styled from 'styled-components';
import { useWishlist } from '../hooks/user/useWishlist';
import { lazy } from '../utils/dynamicImports.util';

import { Section, Container } from '../components/common/Layout';
import { PageHeader, PageTitle, PageHeaderButtons } from '../components/global/PageHeader';
import { Button } from '../components/common/Button';

const ProductCard = lazy(() => import('../components/product/ProductCard'));

export interface WishlistPageProps {}

const WishlistPage: React.FC<WishlistPageProps> = () => {
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
          {items.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
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
`;

// export interface WishlistItemProps {}

// export const WishlistItem: React.FC<WishlistItemProps> = () => {
//   return <ItemStyle></ItemStyle>;
// };

// const ItemStyle = styled.div``;
