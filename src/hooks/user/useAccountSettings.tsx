import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { displayErrors } from '../common/useApiError';
import { useToasts } from 'react-toast-notifications';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const UPDATE_USERNAME = gql`
  mutation($username: String!) {
    updateUsername(username: $username)
  }
`;

const UPDATE_EMAIL = gql`
  mutation($email: String!) {
    updateEmail(email: $email)
  }
`;

const UPDATE_PASSWORD = gql`
  mutation($password: String!) {
    updatePassword(password: $password)
  }
`;

const FORGOT_PASSWORD = gql`
  query($email: String!) {
    forgotPassword(email: $email)
  }
`;

const RESET_PASSWORD = gql`
  mutation($token: String!, $newPassword: String!) {
    resetPassword(newPassword: $newPassword)
  }
`;

const SEND_EMAIL_CONFIRMATION_LINK = gql`
  query {
    sendEmailConfirmationLink
  }
`;

const CONFIRM_EMAIL = gql`
  mutation($token: String!) {
    confirmEmail(token: $token)
  }
`;

export function useAccountSettings() {
  const { addToast } = useToasts();
  let history = useHistory();

  //  API CALLS

  const [updateUsernameAPI] = useMutation(UPDATE_USERNAME, {
    onError: err => displayErrors(addToast, err),
  });

  const [updateEmailAPI] = useMutation(UPDATE_EMAIL, {
    onError: err => displayErrors(addToast, err),
  });

  const [updatePasswordAPI] = useMutation(UPDATE_PASSWORD, {
    onError: err => displayErrors(addToast, err),
  });

  const [forgotPasswordAPI] = useLazyQuery<{ forgotPassword: boolean }>(FORGOT_PASSWORD, {
    onCompleted: data => data.forgotPassword && addToast('Reset link sent', { appearance: 'info' }),
    onError: err => displayErrors(addToast, err),
  });

  const [resetPasswordAPI] = useMutation<{ resetPassword: boolean }>(RESET_PASSWORD, {
    onCompleted: data => data.resetPassword && history.replace('/password/reset/complete'),
    onError: err => displayErrors(addToast, err),
  });

  const [sendEmailConfirmationLink] = useLazyQuery<{ sendEmailConfirmationLink: boolean }>(
    SEND_EMAIL_CONFIRMATION_LINK,
    {
      onCompleted: data =>
        data.sendEmailConfirmationLink &&
        addToast('Confirmation link sent', { appearance: 'info' }),
      onError: err => displayErrors(addToast, err),
    }
  );

  const [confirmEmailAPI] = useMutation<{ confirmEmail: boolean }>(CONFIRM_EMAIL, {
    onCompleted: data =>
      data.confirmEmail && addToast('Successfully confirmed email', { appearance: 'success' }),
    onError: err => displayErrors(addToast, err),
  });

  //  FUNCTION TRIGGERS

  const updateUsername = useCallback(
    (username: string) => updateUsernameAPI({ variables: { username } }),
    []
  );
  const updateEmail = useCallback((email: string) => updateEmailAPI({ variables: { email } }), []);
  const updatePassword = useCallback(
    (password: string) => updatePasswordAPI({ variables: { password } }),
    []
  );
  const forgotPassword = useCallback(
    (email: string) => forgotPasswordAPI({ variables: { email } }),
    []
  );
  const resetPassword = useCallback(
    (token: string, newPassword: string) => resetPasswordAPI({ variables: { token, newPassword } }),
    []
  );
  const confirmEmail = useCallback(
    (token: string) => confirmEmailAPI({ variables: { token } }),
    []
  );

  return {
    updateUsername,
    updateEmail,
    updatePassword,
    forgotPassword,
    resetPassword,
    sendEmailConfirmationLink,
    confirmEmail,
  };
}
