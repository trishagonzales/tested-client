import { gql, useMutation } from '@apollo/client';
import { displayErrors } from '../common/useApiError';
import { useToasts } from 'react-toast-notifications';
import { useCallback } from 'react';

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

export function useAccountSettings() {
  const { addToast } = useToasts();

  const [updateUsernameAPI] = useMutation(UPDATE_USERNAME, {
    onCompleted: () => {},
    onError: err => displayErrors(addToast, err),
  });

  const [updateEmailAPI] = useMutation(UPDATE_EMAIL, {
    onCompleted: () => {},
    onError: err => displayErrors(addToast, err),
  });

  const [updatePasswordAPI] = useMutation(UPDATE_PASSWORD, {
    onCompleted: () => {},
    onError: err => displayErrors(addToast, err),
  });

  const updateUsername = useCallback(
    (username: string) => updateUsernameAPI({ variables: { username } }),
    []
  );
  const updateEmail = useCallback((email: string) => updateEmailAPI({ variables: { email } }), []);
  const updatePassword = useCallback(
    (password: string) => updatePasswordAPI({ variables: { password } }),
    []
  );

  return { updateUsername, updateEmail, updatePassword };
}
