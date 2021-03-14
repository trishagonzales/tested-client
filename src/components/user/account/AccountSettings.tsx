import React from 'react';
import styled from 'styled-components';
import { useGlobal } from '../../../hooks/common/useGlobal';
import { useAccountSettings } from '../../../hooks/user/useAccountSettings';

import { Row } from '../../common/Layout';
import { EmailConfirmed } from './EmailConfirmed';
import FormWithEditMode from './FormWithEditMode';

export interface AccountSettingsProps {}

const AccountSettings: React.FC<AccountSettingsProps> = () => {
  const {
    globalState: { user },
  } = useGlobal();
  const {
    updateUsername,
    updateEmail,
    updatePassword,
    sendEmailConfirmationLink,
  } = useAccountSettings();

  return (
    <Div>
      <Row className='heading' justifyContent='space-between'>
        <h1>SETTINGS</h1>
      </Row>

      <FormWithEditMode
        label='Username'
        data={user?.username}
        callback={updateUsername}
        withPasswordValidation
      />

      <hr />

      <FormWithEditMode
        label='Email'
        data={user?.email}
        callback={updateEmail}
        withPasswordValidation
      />

      <EmailConfirmed
        isConfirmed={user?.isEmailConfirmed ?? false}
        sendLink={sendEmailConfirmationLink}
      />

      <hr />

      <FormWithEditMode label='Password' callback={updatePassword} withPasswordValidation />
    </Div>
  );
};

export default AccountSettings;

const Div = styled.div`
  label {
    font-weight: 300;
  }

  hr {
    margin: 2em 0;
  }
`;
