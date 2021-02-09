import styled from 'styled-components';
import { JustifyContent } from '../../common/Layout';

export const ActionButtons = styled.div<{ justifyContent?: JustifyContent }>`
  width: 100%;
  padding: 1em 3%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: ${p => (p.justifyContent ? p.justifyContent : 'space-between')};
  align-items: center;
  background: #ddd;
  button {
    font-size: 14px;
  }
`;
