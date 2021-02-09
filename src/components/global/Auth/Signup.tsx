import React from 'react';
import * as yup from 'yup';
import { SignupInput } from '../../../types/General.types';
import { lazy } from '../../../utils/dynamicImports.util';

import { Button } from '../../common/Button';
import { FormikField } from '../../common/FormikField';
import { PasswordInput } from '../../common/Form';
import ErrorBoundary from '../../common/ErrorBoundary';

const Formik = lazy(() => import('formik'), 'Formik');
const Form = lazy(() => import('formik'), 'Form');

const signupSchema = yup.object().shape({
  name: yup.string().max(255).min(1),
  username: yup.string().max(255).min(1),
  email: yup.string().email().max(255).min(3),
  password: yup.string().max(255).min(8),
});

export interface SignupProps {
  signup: (input: SignupInput) => void;
  className?: string;
}

const Signup: React.FC<SignupProps> = ({ signup, className }) => {
  return (
    // <ErrorBoundary>
    <Formik
      initialValues={{ name: '', username: '', email: '', password: '' }}
      validationSchema={signupSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(input: any) => signup(input)}>
      {() => (
        <Form className={className}>
          <h1>SIGNUP</h1>
          <span className='title-underline'></span>

          <FormikField name='name' placeholder='Name' required />
          <FormikField name='username' placeholder='Username' required />
          <FormikField name='email' placeholder='Email' required />
          <FormikField
            name='password'
            placeholder='Password'
            type='password'
            as={PasswordInput}
            required
          />

          <Button fullwidth primary>
            SIGNUP
          </Button>
        </Form>
      )}
    </Formik>
    // </ErrorBoundary>
  );
};

export default Signup;
