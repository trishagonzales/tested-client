import React from 'react';
import * as yup from 'yup';
import { lazy } from '../../../utils/dynamicImports.util';

import { Button } from '../../common/Button';
import { FormikField } from '../../common/FormikField';
import { LoginInput } from '../../../types/General.types';
import { PasswordInput } from '../../common/Form';
import { Link } from 'react-router-dom';

const Formik = lazy(() => import('formik'), 'Formik');
const Form = lazy(() => import('formik'), 'Form');

const loginSchema = yup.object().shape({
  username: yup.string(),
  password: yup.string(),
});

export interface LoginProps {
  login: (input: LoginInput) => void;
  className?: string;
}

const Login: React.FC<LoginProps> = ({ login, className }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={loginSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(input: any) => login(input)}>
      {() => (
        <Form className={className}>
          <h1>LOGIN</h1>
          <span className='title-underline'></span>

          <FormikField name='username' placeholder='Username/Email' required />
          <FormikField
            name='password'
            placeholder='Password'
            type='password'
            as={PasswordInput}
            required
          />

          <Link className='forgot-password-link hoverable-text blue-color' to='/password/forgot'>
            Forgot password
          </Link>

          <Button fullwidth primary>
            LOGIN
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
