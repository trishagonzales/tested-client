import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation, useLazyQuery } from '@apollo/client';

import { useGlobal } from '../common/useGlobal';
import { UserData } from '../../api/fragments/User.fragment';
import { LoginInput, SignupInput } from '../../types/General.types';
import { User } from '../../types/User.types';

const IS_ADMIN = gql`
  query {
    isAdmin
  }
`;

const GET_USER_DATA = gql`
  query {
    userData {
      ...UserData
    }
  }
  ${UserData}
`;

const LOGIN = gql`
  mutation ($input: LoginInput!) {
    login(input: $input) {
      ...UserData
    }
  }
  ${UserData}
`;

const SIGNUP = gql`
  mutation ($input: SignupInput!) {
    signup(input: $input) {
      ...UserData
    }
  }
  ${UserData}
`;

const LOGOUT = gql`
  mutation {
    logout
  }
`;

export function useUser() {
  const {
    globalState: { user, isAdmin },
    globalDispatch,
  } = useGlobal();
  let history = useHistory();

  const [isAdminAPI] = useLazyQuery<{ isAdmin: boolean }>(IS_ADMIN, {
    onCompleted: data => globalDispatch({ type: 'IS_ADMIN', isAdmin: !!data.isAdmin }),
    errorPolicy: 'ignore',
  });

  const [getUserData] = useLazyQuery<{ userData: User }>(GET_USER_DATA, {
    onCompleted: data => data && globalDispatch({ type: 'LOGIN', user: data.userData }),
    errorPolicy: 'ignore',
  });

  const [loginAPI, loginRes] = useMutation<{ login: User }>(LOGIN, {
    onCompleted: ({ login }) => {
      globalDispatch({ type: 'LOGIN', user: login });
      history.replace('/');
    },
  });

  const [signupAPI, signupRes] = useMutation<{ signup: User }>(SIGNUP, {
    onCompleted: ({ signup }) => {
      globalDispatch({ type: 'LOGIN', user: signup });
      history.replace('/');
    },
  });

  const [logoutAPI, logoutRes] = useMutation(LOGOUT, {
    onCompleted: () => {
      globalDispatch({ type: 'LOGOUT' });
      globalDispatch({ type: 'IS_ADMIN', isAdmin: false });
      history.replace('/');
    },
    errorPolicy: 'all',
  });

  const login = useCallback((input: LoginInput) => loginAPI({ variables: { input } }), [user]);
  const signup = useCallback((input: SignupInput) => signupAPI({ variables: { input } }), [user]);
  const logout = useCallback(() => logoutAPI(), [user]);

  return {
    user,
    isAdmin,
    loginProps: { login, loginRes },
    signupProps: { signup, signupRes },
    logoutProps: { logout, logoutRes },
    getUserData,
    isAdminAPI,
  };
}
