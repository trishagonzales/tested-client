import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { base64ToUrl } from '../../utils/files.util';
import { ReviewType } from '../../types/Product.types';
import avatarPlaceholder from '../../assets/avatar-placeholder.png';

import { Row } from '../common/Layout';
import StarRating from './common/StarRating';
import { useGlobal } from '../../hooks/useGlobal';

export interface ReviewItemProps {
  review: ReviewType;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  review: { author, rating, comment, datePosted },
}) => {
  const {
    globalState: { user },
  } = useGlobal();

  return (
    <Div>
      <div className='avatar'>
        <img src={base64ToUrl(author.avatar) ?? avatarPlaceholder} alt='author' />
      </div>
      <div className='info'>
        <Row className='author-delete' justifyContent='space-between'>
          <p className='author'>{author.username}</p>
          {author.id === user?.id && (
            <span className='remove-btn hoverable-underline error-color'>DELETE</span>
          )}
        </Row>
        <StarRating fontSize='9px' rating={rating} />
        <p className='comment'>{comment}</p>
        <p className='date'>{moment(datePosted).format('l')}</p>
      </div>
    </Div>
  );
};

export default ReviewItem;

export const Div = styled.div`
  width: 100%;
  max-width: 700px;
  height: auto;
  margin: auto;
  margin-bottom: 1em;
  padding: 1em;
  display: flex;
  background: white;
  border-radius: 5px;
  font-size: 14px;

  .avatar {
    flex: 0 0 40px;
    img {
      width: 25px;
      height: 25px;
      margin: auto;
      object-fit: contain;
      object-position: center;
      background: var(--lightgrey);
      border-radius: 50%;
    }
  }

  .info {
    flex: 1;
    .author-delete {
      .author {
        font-weight: bold;
      }
      .remove-btn {
        font-size: 11px;
      }
    }
    .rating {
      margin: 0.3em 0;
    }
    .comment {
      margin: 0.5em 0;
    }
    .date {
      font-size: 12px;
      color: var(--fg2);
    }
  }
`;
