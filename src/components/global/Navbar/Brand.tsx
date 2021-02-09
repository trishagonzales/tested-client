import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export interface BrandProps {
  className?: string;
}

export const Brand: React.FC<BrandProps> = ({ className }) => {
  return (
    <Link to='/' className={className}>
      <H1>TESTED</H1>
    </Link>
  );
};

const H1 = styled.h1`
  color: white;
  font-size: 22px;
  font-weight: bold;
`;
