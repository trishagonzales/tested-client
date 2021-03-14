import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useProduct } from '../../hooks/product/useProduct';

import { Container } from '../../components/common/Layout';
import ProductOverview from '../../components/product/product page/ProductOverview';
import ProductDetails from '../../components/product/product page/ProductDetails';

export interface ProductPageProps {}

const ProductPage: React.FC<ProductPageProps> = () => {
  const { params } = useRouteMatch<{ id: string }>();
  const { product } = useProduct(params.id);

  return (
    <Container>
      <ProductOverview product={product} />
      <ProductDetails product={product} />
    </Container>
  );
};

export default ProductPage;
