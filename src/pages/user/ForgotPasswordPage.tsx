import React from 'react';
import { useToasts } from 'react-toast-notifications';
import styled from 'styled-components';
import { Button } from '../../components/common/Button';
import { Input, Label } from '../../components/common/Form';
import { Container } from '../../components/common/Layout';
import { PageHeader, PageTitle } from '../../components/global/PageHeader';
import { useFormInput } from '../../hooks/common/useFormInput';
import { useAccountSettings } from '../../hooks/user/useAccountSettings';

export interface ForgotPasswordPageProps {}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = () => {
  const { forgotPassword } = useAccountSettings();
  const { props } = useFormInput();
  const { addToast } = useToasts();

  return (
    <>
      <PageHeader>
        <PageTitle>FORGOT PASSWORD</PageTitle>
      </PageHeader>

      <Container size='xs'>
        <Div>
          <Label>Email</Label>
          <Input {...props} fullwidth />
          <Button
            onClick={() =>
              props.value
                ? forgotPassword(props.value)
                : addToast('Email required', { appearance: 'error' })
            }
            fullwidth
            primary>
            SUBMIT
          </Button>
        </Div>
      </Container>
    </>
  );
};

export default ForgotPasswordPage;

const Div = styled.div`
  margin-top: 4em;
  padding: 0 1.5em;

  label {
    margin-bottom: 1em;
    display: block;
  }

  button {
    margin-top: 2em;
  }
`;
