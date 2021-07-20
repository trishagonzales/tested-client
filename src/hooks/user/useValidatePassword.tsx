import { gql, useMutation } from '@apollo/client';
import { useState, useCallback } from 'react';

const VALIDATE_PASSWORD = gql`
  mutation($password: String!) {
    validatePassword(password: $password)
  }
`;

export function useValidatePassword() {
  const [isValid, setValid] = useState(false);

  const [validateAPI] = useMutation<{ validatePassword: boolean }>(VALIDATE_PASSWORD, {
    onCompleted: ({ validatePassword }) => (validatePassword ? setValid(true) : setValid(false)),
    onError: () => {
      setValid(false);
    },
  });

  const validate = useCallback((password: string) => validateAPI({ variables: { password } }), []);

  return { isValid, validate };
}
