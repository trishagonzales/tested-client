import { useCallback } from 'react';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { ProductData } from '../../api/fragments/Product.fragment';
import { Product } from '../../types/Product.types';
import { useGlobal } from '../common/useGlobal';

const GET_ITEMS = gql`
  query {
    wishlistItems {
      ...ProductData
    }
  }
  ${ProductData}
`;

const ADD_ITEM = gql`
  mutation($productID: String!) {
    addWishlistItem(productID: $productID) {
      ...ProductData
    }
  }
  ${ProductData}
`;

const DELETE_ITEM = gql`
  mutation($productID: String!) {
    deleteWishlistItem(productID: $productID) {
      ...ProductData
    }
  }
  ${ProductData}
`;

const CLEAR = gql`
  mutation {
    clearWishlist
  }
`;

export function useWishlist(productID?: string) {
  const {
    globalState: { wishlist: items },
    globalDispatch,
  } = useGlobal();

  const [getWishlistItems] = useLazyQuery<{ wishlistItems: Product[] }>(GET_ITEMS, {
    onCompleted: ({ wishlistItems }) =>
      globalDispatch({ type: 'UPDATE_WISHLIST', wishlist: wishlistItems }),
  });

  const [addItemAPI] = useMutation<{ addWishlistItem: Product }>(ADD_ITEM, {
    onCompleted: ({ addWishlistItem: item }) =>
      globalDispatch({ type: 'UPDATE_WISHLIST', wishlist: [...items, item] }),
  });

  const [deleteItemAPI] = useMutation<{ deleteWishlistItem: Product }>(DELETE_ITEM, {
    onCompleted: ({ deleteWishlistItem: item }) =>
      globalDispatch({ type: 'UPDATE_WISHLIST', wishlist: items.filter(i => i.id !== item.id) }),
  });

  const [clearAPI] = useMutation(CLEAR, {
    onCompleted: () => globalDispatch({ type: 'UPDATE_WISHLIST', wishlist: [] }),
  });

  const addItem = useCallback(() => addItemAPI({ variables: { productID } }), [items]);
  const deleteItem = useCallback(() => deleteItemAPI({ variables: { productID } }), [items]);
  const clear = useCallback(() => clearAPI(), [items]);

  const isAdded = useCallback(() => !!items.find(i => i.id === productID), [items]);

  return {
    items,
    getWishlistItems,
    addItem,
    deleteItem,
    clear,
    isAdded,
  };
}
