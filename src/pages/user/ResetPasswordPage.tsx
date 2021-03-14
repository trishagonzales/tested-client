import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';
import { useFormInput } from '../../hooks/common/useFormInput';
import { useAccountSettings } from '../../hooks/user/useAccountSettings';

import { Button } from '../../components/common/Button';
import { Label, PasswordInput } from '../../components/common/Form';
import { Container } from '../../components/common/Layout';
import { PageHeader, PageTitle } from '../../components/global/PageHeader';

export interface ResetPasswordPageProps {}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = () => {
  const { params } = useRouteMatch<{ token: string }>();
  const { resetPassword } = useAccountSettings();
  const newPass = useFormInput();
  const confirmPass = useFormInput();
  const { addToast } = useToasts();

  return (
    <>
      <PageHeader>
        <PageTitle>RESET PASSWORD</PageTitle>
      </PageHeader>

      <Container size='xs'>
        <Div>
          <div className='field'>
            <Label>New Password</Label>
            <PasswordInput type='password' fullwidth {...newPass.props} />
          </div>

          <div className='field'>
            <Label>Confirm Password</Label>
            <PasswordInput type='password' fullwidth {...confirmPass.props} />
          </div>

          <Button
            fullwidth
            primary
            onClick={() => {
              const newPassVal = newPass.props.value;
              const confirmPassVal = confirmPass.props.value;

              if (!newPassVal) {
                addToast('Fields empty', { appearance: 'error' });
              } else if (newPassVal === confirmPassVal) {
                resetPassword(params.token, newPassVal);
              } else if (newPassVal !== confirmPassVal) {
                addToast('Fields do not match', { appearance: 'error' });
              }
            }}>
            SUBMIT
          </Button>
        </Div>
      </Container>
    </>
  );
};

export default ResetPasswordPage;

const Div = styled.div`
  margin-top: 4em;
  padding: 0 1.5em;

  .field {
    margin: 1em 0;
  }

  label {
    margin-bottom: 1em;
    display: block;
  }

  button {
    margin-top: 2em;
  }
`;
