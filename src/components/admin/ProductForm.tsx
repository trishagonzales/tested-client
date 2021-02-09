import React from 'react';
import styled from 'styled-components';
import { UploadHookReturn } from '../../hooks/useUpload';
import { lazy } from '../../utils/dynamicImports.util';
import { device } from '../../theme';

import { Label, Textarea } from '../common/Form';
import { FormikField } from '../common/FormikField';
import { UploadProductImages } from './UploadProductImages';
import { Row } from '../common/Layout';
import { Button } from '../common/Button';

const Form = lazy(() => import('formik'), 'Form');

export interface ProductFormProps {
  uploadProps: UploadHookReturn;
}

const ProductForm: React.FC<ProductFormProps> = ({ uploadProps }) => {
  return (
    <ProductFormStyle>
      <FormikField name='name' label='Name' as={Textarea} required fullwidth minRows={3} />
      <FormikField
        name='description'
        label='Description'
        as={Textarea}
        required
        fullwidth
        minRows={18}
      />

      <Row breakpoint='narrow'>
        <FormikField name='price' type='number' label='Price' required fullwidth />
        <FormikField name='stock' type='number' label='Stock' required fullwidth />
      </Row>

      <Label>Images</Label>
      <UploadProductImages {...uploadProps} />

      <Row className='actions' breakpoint='phone'>
        <Button type='button' fullwidth>
          CANCEL
        </Button>
        <Button fullwidth primary>
          SAVE
        </Button>
      </Row>
    </ProductFormStyle>
  );
};

export default ProductForm;

const ProductFormStyle = styled(Form)`
  max-width: 700px;
  margin: auto;
  padding: 2.5em 2em;

  #name {
    font-size: 18px;
    font-weight: bold;
    color: var(--fg);
  }
  .price {
    margin-right: 1em;
  }
  .actions {
    margin-top: 50px;
    button:nth-of-type(1) {
      margin-right: 1em;
    }
  }

  @media ${device.narrow} {
    .price {
      margin-right: 0;
    }
  }

  @media ${device.phone} {
    padding: 1.5em;

    .actions {
      button:nth-of-type(1) {
        margin-right: 0;
        margin-bottom: 0.5em;
      }
    }
  }
`;
