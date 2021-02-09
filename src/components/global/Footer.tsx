import React from 'react';
import styled from 'styled-components';

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return <FooterStyle></FooterStyle>;
};

const FooterStyle = styled.footer`
  height: 120px;
  background: var(--main);
`;
