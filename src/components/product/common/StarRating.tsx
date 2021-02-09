import React from 'react';
import styled from 'styled-components';

export interface StarRatingProps {
  rating: number;
  fontSize?: string;
  reviewsCount?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, fontSize = '12px', reviewsCount }) => {
  return (
    <Rating className='rating' fontSize={fontSize}>
      <i className={`fas fa-star ${rating >= 1 && 'filled'}`}></i>
      <i className={`fas fa-star ${rating >= 2 && 'filled'}`}></i>
      <i className={`fas fa-star ${rating >= 3 && 'filled'}`}></i>
      <i className={`fas fa-star ${rating >= 4 && 'filled'}`}></i>
      <i className={`fas fa-star ${rating === 5 && 'filled'}`}></i>
      {reviewsCount && <span className='reviews-count'>({reviewsCount})</span>}
    </Rating>
  );
};

export default StarRating;

export const Rating = styled.div<{ fontSize: string }>`
  font-size: ${p => p.fontSize};
  i {
    color: var(--fg);
  }
  .filled {
    color: orange;
  }
  .reviews-count {
    margin-left: 0.4em;
    color: var(--fg2);
  }
`;
