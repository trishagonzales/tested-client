import React from 'react';
import styled from 'styled-components';
import { BaseProps } from '../../types/General.types';

export interface StickerNoticeProps extends BaseProps {}

export const StickerNotice: React.FC<StickerNoticeProps> = ({ children, className }) => {
  return (
    <Div className={className}>
      <h1>{children}</h1>
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 28px;
    color: var(--grey);
  }
`;
