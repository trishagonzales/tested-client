import React, { useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { displayErrors } from '../hooks/common/useApiError';
import { useFormInput } from '../hooks/common/useFormInput';
import { ReviewType } from '../types/Product.types';
import { device } from '../theme';

import { PageHeader, PageTitle } from '../components/global/PageHeader';
import { Button } from '../components/common/Button';
import { Container, Row } from '../components/common/Layout';
import { Textarea } from '../components/common/Form';

const CREATE_REVIEW = gql`
  mutation($input: CreateReviewInput!) {
    createReview(input: $input)
  }
`;

export interface LeaveReviewPageProps {}

const LeaveReviewPage: React.FC<LeaveReviewPageProps> = () => {
  const [rating, setRating] = useState(0);
  const comment = useFormInput();

  const { params } = useRouteMatch<{ id: string }>();
  const { addToast } = useToasts();
  let history = useHistory();

  const [createReview] = useMutation<{ createReview: ReviewType }>(CREATE_REVIEW, {
    onCompleted: data => {
      data.createReview && addToast('Review complete');
      history.replace('/orders');
    },
    onError: err => displayErrors(addToast, err),
  });

  return (
    <>
      <PageHeader>
        <PageTitle>LEAVE A REVIEW</PageTitle>
      </PageHeader>

      <Div>
        <Container size='sm'>
          <div className='rating'>
            <i
              className={`hoverable fas fa-star ${rating >= 1 && 'filled'}`}
              onClick={() => setRating(1)}></i>
            <i
              className={`hoverable fas fa-star ${rating >= 2 && 'filled'}`}
              onClick={() => setRating(2)}></i>
            <i
              className={`hoverable fas fa-star ${rating >= 3 && 'filled'}`}
              onClick={() => setRating(3)}></i>
            <i
              className={`hoverable fas fa-star ${rating >= 4 && 'filled'}`}
              onClick={() => setRating(4)}></i>
            <i
              className={`hoverable fas fa-star ${rating === 5 && 'filled'}`}
              onClick={() => setRating(5)}></i>
          </div>

          <Textarea
            className='comment'
            placeholder='Write a review ...'
            fullwidth
            minRows={12}
            maxRows={20}
            {...comment.props}
          />

          <Row className='actions' breakpoint='narrow'>
            <Button fullwidth>CANCEL</Button>
            <Button
              fullwidth
              onClick={() => {
                rating !== 0
                  ? createReview({
                      variables: {
                        input: { rating, comment: comment.props.value, orderID: params.id },
                      },
                    })
                  : addToast('Rating required', { appearance: 'error' });
              }}
              primary>
              SUBMIT
            </Button>
          </Row>
        </Container>
      </Div>
    </>
  );
};

export default LeaveReviewPage;

const Div = styled.div`
  padding: 40px 0;

  .rating {
    text-align: center;
    font-size: 30px;
    color: var(--darkgrey);
    i {
      margin: 0.2em;
    }
    .filled {
      color: orange;
    }
  }

  .comment {
    height: 200px;
    margin: 2em 0;
    padding: 1.5em;
  }

  .actions {
    display: flex;
    button {
      flex: 1;
    }
    button:nth-of-type(1) {
      margin-right: 1.5em;
    }
  }

  @media ${device.narrow} {
    padding-left: 20px;
    padding-right: 20px;

    .rating {
      font-size: 27px;
    }

    .actions {
      button:nth-of-type(1) {
        margin-right: 0;
        margin-bottom: 0.5em;
      }
    }
  }
`;
