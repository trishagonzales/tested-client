import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';

import { useGlobal } from '../common/useGlobal';
import { displayErrors } from '../common/useApiError';
import { OrderData } from '../../api/fragments/User.fragment';
import { OrderType } from '../../types/User.types';

const GET_ORDERS = gql`
  query {
    orders {
      ...OrderData
    }
  }
  ${OrderData}
`;

const CREATE_ORDER = gql`
  mutation($cartIDs: [String!]!) {
    createOrder(cartIDs: $cartIDs) {
      ...OrderData
    }
  }
  ${OrderData}
`;

const REMOVE_ORDER = gql`
  mutation($id: String!) {
    removeOrder(id: $id)
  }
`;

const CLEAR_ORDERS = gql`
  mutation {
    clearOrders
  }
`;

export function useOrder() {
  const {
    globalState: { cart, orders },
    globalDispatch,
  } = useGlobal();
  const { addToast } = useToasts();
  let history = useHistory();

  //  APIs

  const [getOrderItems] = useLazyQuery<{ orders: OrderType[] }>(GET_ORDERS, {
    onCompleted: data => globalDispatch({ type: 'UPDATE_ORDERS', orders: data.orders }),
    onError: err => displayErrors(addToast, err),
  });

  const [createOrderAPI] = useMutation(CREATE_ORDER, {
    onCompleted: data => {
      data && addToast('Order placed', { appearance: 'success' });
      globalDispatch({ type: 'UPDATE_CART', cart: cart.filter(i => !i.isIncluded) });
      getOrderItems();
      history.replace('/order-completed');
    },
    onError: err => displayErrors(addToast, err),
  });

  const [removeOrderAPI] = useMutation(REMOVE_ORDER, {
    onCompleted: () => getOrderItems(),
    onError: err => displayErrors(addToast, err),
  });

  const [clearOrders] = useMutation(CLEAR_ORDERS, {
    onCompleted: () => getOrderItems(),
    onError: err => displayErrors(addToast, err),
  });

  //  CALLBACKS

  const createOrder = useCallback(
    (cartIDs: string[]) => createOrderAPI({ variables: { cartIDs } }),
    []
  );
  const removeOrder = useCallback((id: string) => removeOrderAPI({ variables: { id } }), []);

  return { orders, getOrderItems, createOrder, removeOrder, clearOrders };
}
