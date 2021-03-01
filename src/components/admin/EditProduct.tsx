import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useProduct } from '../../hooks/product/useProduct';
import { useAdmin } from '../../hooks/useAdmin';
import { lazy } from '../../utils/dynamicImports.util';

import { PageHeader, PageTitle, PageHeaderButtons } from '../global/PageHeader';
import { Container, Row } from '../common/Layout';
import { LinkButton } from '../common/Button';
import ProductForm from './ProductForm';

const Formik = lazy(() => import('formik'), 'Formik');

export interface EditProductProps {}

const EditProduct: React.FC<EditProductProps> = () => {
  const { params } = useRouteMatch<{ id: string }>();
  const { product } = useProduct(params.id);
  const {
    updateProductProps: { updateProduct, uploadProps },
  } = useAdmin();

  useEffect(() => {
    if (product?.images) uploadProps.setFiles(product.images);
  }, [product]);

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
          enableReinitialize
          initialValues={{
            name: product?.name,
            price: product?.price,
            stock: product?.stock,
            description: product?.description,
          }}
          onSubmit={(input: any) =>
            updateProduct({ variables: { input: { id: params.id, ...input } } })
          }>
          {() => <ProductForm uploadProps={uploadProps} />}
        </Formik>
      </Container>
    </>
  );
};

export default EditProduct;
