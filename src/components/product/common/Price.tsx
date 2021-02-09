import React from 'react';
import styled from 'styled-components';

export interface PriceProps {
  className?: string;
  fontSize?: string;
  label?: string;
}

const Price: React.FC<PriceProps> = ({ children, className, fontSize, label }) => {
  return (
    <PriceStyle className={className} fontSize={fontSize}>
      {label && <span className='label'>{`${label}:`}</span>}
      &#8369; {}
      {children}
    </PriceStyle>
  );
};

export default Price;

export const PriceStyle = styled.span<{ fontSize?: string }>`
  color: var(--accent);
  font-size: ${p => p.fontSize || '18px'};
  font-weight: bold;

  .label {
    margin-right: 0.8em;
  }
`;
