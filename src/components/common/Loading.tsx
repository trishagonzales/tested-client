import React, { useState } from 'react';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';
import { theme } from '../../theme';

export interface LoadingProps {
  loading?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ loading }) => {
  const [altLoading] = useState(loading ?? true);

  return (
    <Div>
      <BeatLoader loading={loading ?? altLoading} color={theme.main} size={10} />
    </Div>
  );
};

const Div = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  transition: all 400ms;
`;
