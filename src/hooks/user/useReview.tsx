import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { RatingType, ReviewType } from '../../types/Product.types';

const CREATE_REVIEW = gql`
  mutation($input: CreateReviewInput!) {
    createReview(input: $input)
  }
`;

const DELETE_REVIEW = gql`
  mutation($id: String!) {
    deleteReview(id: $id)
  }
`;

interface ReviewInput {
  rating: RatingType;
  comment?: string;
  orderID: string;
}

export function useReview() {
  const { addToast } = useToasts();
  let history = useHistory();

  const [createReviewAPI] = useMutation<{ createReview: ReviewType }>(CREATE_REVIEW, {
    onCompleted: () => {
      addToast('Review complete', { appearance: 'success' });
      history.replace('/orders');
    },
  });

  const [deleteReviewAPI] = useMutation<{ deleteReview: ReviewType }>(DELETE_REVIEW, {
    onCompleted: () => history.go(0),
  });

  const createReview = useCallback(
    (input: ReviewInput) => createReviewAPI({ variables: { input } }),
    []
  );
  const deleteReview = useCallback((id: string) => deleteReviewAPI({ variables: { id } }), []);

  return { createReview, deleteReview };
}
