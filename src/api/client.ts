import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const uri = process.env.REACT_APP_API_URL;

export const client = new ApolloClient({
  link: createUploadLink({ uri, credentials: 'include' }),
  cache: new InMemoryCache(),
});
