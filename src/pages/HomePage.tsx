import React from 'react';

import { Hero } from '../components/global/Homepage/Hero';
import { Description } from '../components/global/Homepage/Description';
import { ProductPreviews } from '../components/global/Homepage/ProductPreviews';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Description />
      <ProductPreviews />
    </>
  );
};

export default HomePage;
