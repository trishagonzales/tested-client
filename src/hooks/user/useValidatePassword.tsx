import { gql, useMutation } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { displayErrors } from '../common/useApiError';
import { useState, useCallback } from 'react';

const VALIDATE_PASSWORD = gql`
  mutation($password: String!) {
    validatePassword(password: $password)
  }
`;

export function useValidatePassword() {
  const [isValid, setValid] = useState(false);
  const { addToast } = useToasts();

  const [validateAPI] = useMutation<{ validatePassword: boolean }>(VALIDATE_PASSWORD, {
    onCompleted: ({ validatePassword }) => (validatePassword ? setValid(true) : setValid(false)),
    onError: err => {
      displayErrors(addToast, err);
      setValid(false);
    },
  });

  const validate = useCallback((password: string) => validateAPI({ variables: { password } }), []);

  return { isValid, validate };
}
