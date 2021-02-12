import { useCallback } from 'react';
import { useMutation, gql, useLazyQuery } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';

import { useGlobal } from '../common/useGlobal';
import { displayErrors } from '../common/useApiError';
import { CartItemData } from '../../api/fragments/User.fragment';
import { CartItemType } from '../../types/User.types';
import { UpdateCartItemInput } from '../../types/Product.types';

const GET_ITEMS = gql`
  query {
    cartItems {
      ...CartItemData
    }
  }
  ${CartItemData}
`;

const ADD_ITEM = gql`
  mutation($input: AddCartItemInput!) {
    addCartItem(input: $input) {
      ...CartItemData
    }
  }
  ${CartItemData}
`;

const REMOVE_ITEM = gql`
  mutation($productID: String!) {
    removeCartItem(productID: $productID) {
      ...CartItemData
    }
  }
  ${CartItemData}
`;

const UPDATE_ITEM = gql`
  mutation($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
      ...CartItemData
    }
  }
  ${CartItemData}
`;

const CLEAR = gql`
  mutation {
    clearCart
  }
`;

export function useCart(productID?: string) {
  const {
    globalState: { cart: items },
    globalDispatch,
  } = useGlobal();
  const { addToast } = useToasts();

  const [getCartItems] = useLazyQuery<{ cartItems: CartItemType[] }>(GET_ITEMS, {
    onCompleted: ({ cartItems }) => globalDispatch({ type: 'UPDATE_CART', cart: cartItems }),
    onError: err => displayErrors(addToast, err),
  });

  const [addAPI] = useMutation<{ addCartItem: CartItemType }>(ADD_ITEM, {
    onCompleted: ({ addCartItem: item }) =>
      globalDispatch({ type: 'UPDATE_CART', cart: [...items, item] }),
    onError: err => displayErrors(addToast, err),
  });

  const [removeAPI] = useMutation<{ removeCartItem: CartItemType }>(REMOVE_ITEM, {
    onCompleted: ({ removeCartItem: item }) =>
      globalDispatch({ type: 'UPDATE_CART', cart: items.filter(i => i.id !== item.id) }),
    onError: err => displayErrors(addToast, err),
  });

  const [updateAPI] = useMutation<{ updateCartItem: CartItemType }>(UPDATE_ITEM, {
    onCompleted: ({ updateCartItem: item }) =>
      globalDispatch({ type: 'UPDATE_CART', cart: items.map(i => (i.id === item.id ? item : i)) }),
    onError: err => displayErrors(addToast, err),
  });

  const [clearAPI] = useMutation(CLEAR, {
    onCompleted: () => globalDispatch({ type: 'UPDATE_CART', cart: [] }),
    onError: err => displayErrors(addToast, err),
  });

  const addItem = useCallback(
    (quantity: number) => {
      const item = items.find(i => i.product.id === productID);
      if (item) {
        const input = {
          id: item.id,
          quantity: item.quantity + quantity,
          isIncluded: item.isIncluded,
        };
        updateAPI({ variables: { input } });
      } else {
        const input = { productID, quantity, isIncluded: true };
        addAPI({ variables: { input } });
      }
    },
    [items]
  );

  const removeItem = useCallback(() => {
    removeAPI({ variables: { productID } });
  }, [items]);

  const updateItem = useCallback(
    (input: UpdateCartItemInput) => {
      updateAPI({ variables: { input } });
    },
    [items]
  );

  const clearCart = useCallback(() => {
    clearAPI();
  }, [items]);

  const isAdded = useCallback(() => !!items.find(i => i.product.id === productID), [items]);

  const totalPrice = items
    .map(item => (item.isIncluded ? item.product.price! * item.quantity : 0))
    .reduce((total, current) => total + current, 0);

  return {
    items,
    totalPrice,
    getCartItems,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    isAdded,
  };
}
