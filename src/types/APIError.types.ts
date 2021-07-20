import { ServerError, ServerParseError } from '@apollo/client';
import { GraphQLError } from 'graphql';

export interface APIError {
  graphQLErrors?: ReadonlyArray<GraphQLError>;
  networkError?: Error | ServerParseError | ServerError | null;
}
