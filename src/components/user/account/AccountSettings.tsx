import React from 'react';
import styled from 'styled-components';
import { useGlobal } from '../../../hooks/common/useGlobal';
import { useAccountSettings } from '../../../hooks/user/useAccountSettings';

import { Row } from '../../common/Layout';
import FormWithEditMode from './FormWithEditMode';

export interface AccountSettingsProps {}

const AccountSettings: React.FC<AccountSettingsProps> = () => {
  const {
    globalState: { user },
  } = useGlobal();
  const { updateUsername, updateEmail, updatePassword } = useAccountSettings();

  return (
    <Div>
      <Row className='heading' justifyContent='space-between'>
        <h1>SETTINGS</h1>
      </Row>

      <FormWithEditMode
        className='form-control'
        label='Username'
        data={user?.username}
        callback={updateUsername}
        withPasswordValidation
      />
      <FormWithEditMode
        className='form-control'
        label='Email'
        data={user?.email}
        callback={updateEmail}
        withPasswordValidation
      />
      <FormWithEditMode
        className='form-control'
        label='Password'
        callback={updatePassword}
        withPasswordValidation
      />
    </Div>
  );
};

export default AccountSettings;

const Div = styled.div`
  .form-control {
    margin-bottom: 1.5em;
  }
  label {
    font-weight: 300;
  }
`;
