import { ApolloError } from '@apollo/client';
import { AddToast } from 'react-toast-notifications';
import { APIError } from '../types/APIError.types';

export function displayErrors(addToast: AddToast, error: ApolloError | APIError) {
  const gqlErrors = error.graphQLErrors;
  const netError = error.networkError;

  if (gqlErrors) {
    gqlErrors.map(err => {
      if (err.extensions?.code === 'INTERNAL_SERVER_ERROR') {
        addToast('Unexpected error occurred.', { appearance: 'error' });
      } else {
        addToast(err.message, { appearance: 'error' });
      }
    });
  } else if (netError) {
    addToast('Unexpected error occurred.', { appearance: 'error' });
  }
}
