import { useToasts, AddToast } from 'react-toast-notifications';
import { useEffect } from 'react';
import { ApolloError } from '@apollo/client';

export function useApiError(error: ApolloError | undefined) {
  const { addToast } = useToasts();

  useEffect(() => {
    if (error) {
      displayErrors(addToast, error);
    }
  }, [error]);
}

export function displayErrors(addToast: AddToast, error: ApolloError) {
  const gqlErrors = error.graphQLErrors;
  if (gqlErrors) {
    gqlErrors.map(err => {
      if (err.extensions?.code === 'INTERNAL_SERVER_ERROR') {
        addToast('Unexpected error occurred.', { appearance: 'error' });
      } else {
        addToast(err.message, { appearance: 'error' });
      }
    });
  }
  console.log('GQL Errors: ', gqlErrors);

  const netError = error.networkError;
  if (netError) addToast('Unexpected error occurred.', { appearance: 'error' });
  console.log('Network Error: ', netError);
}
