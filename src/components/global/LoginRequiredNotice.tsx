import React from 'react';
import styled from 'styled-components';
import { StickerNotice } from '../common/StickerNotice';

export const LoginRequiredNotice: React.FC = () => {
  return (
    <Div>
      <StickerNotice>LOGIN REQUIRED</StickerNotice>
    </Div>
  );
};

const Div = styled.div`
  height: 70vh;
`;
