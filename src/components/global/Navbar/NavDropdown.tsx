import React from 'react';
import styled from 'styled-components';

export interface NavDropdownProps {
  isOpen: boolean;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ isOpen }) => {
  return <Div isOpen={isOpen}></Div>;
};

const Div = styled.div<{ isOpen: boolean }>`
  width: 100vw;
  height: calc(100vh - 100%);
  position: absolute;
  top: 100%;
  right: 0;
  display: ${p => (p.isOpen ? 'unset' : 'none')};
  background: var(--main);
`;
