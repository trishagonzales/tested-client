/* eslint-disable import/first */
import React from 'react';
import styled from 'styled-components';
import { useEdit } from '../../../hooks/common/useEdit';
import { useModal } from '../../../hooks/portal/useModal';
import { lazy } from '../../../utils/dynamicImports.util';

import { Row } from '../../common/Layout';
import { Button } from '../../common/Button';

const Formik = lazy(() => import('formik'), 'Formik');
const Form = lazy(() => import('formik'), 'Form');
const FormikField = lazy(() => import('../../common/FormikField'), 'FormikField');

export interface AccountSettingsProps {}

const AccountSettings: React.FC<AccountSettingsProps> = () => {
  const { EditButton } = useEdit();
  const { Modal, open } = useModal();

  return (
    <Div>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={() => {}}>
        {() => (
          <Form>
            <Row className='heading' justifyContent='space-between'>
              <h1>SETTINGS</h1>
              <EditButton />
            </Row>

            <FormikField name='username' label='username' />
            <FormikField name='email' label='email' />
            <FormikField name='password' label='password' />

            <Button onClick={open}>Open modal</Button>
            <Modal>Yey</Modal>

            <Row className='actions'>
              <Button primary>SAVE CHANGES</Button>
            </Row>
          </Form>
        )}
      </Formik>
    </Div>
  );
};

export default AccountSettings;

const Div = styled.div``;
