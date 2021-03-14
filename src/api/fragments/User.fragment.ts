import { gql } from '@apollo/client';
import { ProductData } from './Product.fragment';

export const UserData = gql`
  fragment UserData on User {
    id
    name
    gender
    birthdate
    avatar
    username
    email
    isEmailConfirmed
    dateCreated
  }
`;

export const CartItemData = gql`
  fragment CartItemData on CartItem {
    id
    product {
      ...ProductData
    }
    quantity
    isIncluded
  }
  ${ProductData}
`;

export const OrderData = gql`
  fragment OrderData on Order {
    id
    items {
      id
      product {
        ...ProductData
      }
      quantity
    }
    totalPrice
    status
    date
    isReviewed
  }
  ${ProductData}
`;
