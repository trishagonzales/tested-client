import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useProduct } from '../../hooks/product/useProduct';
import { useAdmin } from '../../hooks/useAdmin';
import { lazy } from '../../utils/dynamicImports.util';

import { PageHeader, PageTitle, PageHeaderButtons } from '../global/PageHeader';
import { Container } from '../common/Layout';
import { LinkButton } from '../common/Button';
import ProductForm from './ProductForm';

const Formik = lazy(() => import('formik'), 'Formik');

export interface EditProductProps {}

const EditProduct: React.FC<EditProductProps> = () => {
  const { params } = useRouteMatch<{ id: string }>();
  const { product } = useProduct(params.id);
  const { editProps } = useAdmin(product?.images);

  return (
    <>
      <PageHeader>
        <PageTitle>EDIT PRODUCT</PageTitle>
        <PageHeaderButtons>
          <LinkButton to='/admin' outline>
            ADMIN PAGE
          </LinkButton>
        </PageHeaderButtons>
      </PageHeader>

      <Container>
        <Formik
          initialValues={{
            name: product?.name,
            price: product?.price,
            stock: product?.stock,
            description: product?.description,
          }}
          onSubmit={(input: any) => editProps.editProduct({ variables: { input } })}>
          {() => <ProductForm uploadProps={editProps.uploadProps} />}
        </Formik>
      </Container>
    </>
  );
};

export default EditProduct;
