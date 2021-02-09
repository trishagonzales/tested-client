import { gql } from '@apollo/client';

export const ProductData = gql`
  fragment ProductData on Product {
    id
    name
    description
    price
    stock
    datePosted
    rating
  }
`;

export const ReviewData = gql`
  fragment ReviewData on Review {
    id
    rating
    comment
    author {
      id
      username
      avatar
    }
    datePosted
  }
`;
