import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import { APIError } from '../types/APIError.types';
import { displayErrors } from '../utils/apiError.util';

const uri = process.env.REACT_APP_API_URL;

export const ApolloCustomProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<APIError | null>(null);
  const [errorLink] = useState<ApolloLink>(
    onError(({ graphQLErrors, networkError, response }) => {
      const path = response?.errors?.find(err => err.path?.find(path => path === 'userData'))
        ?.path?.[0];

      if (path === 'userData') {
        return;
      } else if (graphQLErrors || networkError) {
        setError({ graphQLErrors, networkError });
      }
    })
  );
  const [client] = useState<ApolloClient<NormalizedCacheObject>>(
    new ApolloClient({
      link: from([errorLink, createUploadLink({ uri, credentials: 'include' })]),
      cache: new InMemoryCache(),
    })
  );

  const { addToast } = useToasts();

  useEffect(() => {
    if (error) {
      displayErrors(addToast, error);
    }
  }, [error]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
