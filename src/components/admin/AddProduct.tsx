import React from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { lazy } from '../../utils/dynamicImports.util';

import { PageHeader, PageTitle, PageHeaderButtons } from '../global/PageHeader';
import { Container } from '../common/Layout';
import { LinkButton } from '../common/Button';
import ProductForm from './ProductForm';

const Formik = lazy(() => import('formik'), 'Formik');

export interface AddProductProps {}

const AddProduct: React.FC<AddProductProps> = () => {
  const { addProps } = useAdmin();

  return (
    <>
      <PageHeader>
        <PageTitle>ADD NEW PRODUCT</PageTitle>
        <PageHeaderButtons>
          <LinkButton to='/admin'>ADMIN PAGE</LinkButton>
        </PageHeaderButtons>
      </PageHeader>

      <Container>
        <Formik
          initialValues={{ name: '', price: '', stock: '', description: '' }}
          onSubmit={(input: any) => addProps.addProduct({ variables: { input } })}>
          {() => <ProductForm uploadProps={addProps.uploadProps} />}
        </Formik>
      </Container>
    </>
  );
};

export default AddProduct;
