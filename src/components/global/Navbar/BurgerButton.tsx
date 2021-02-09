import React from 'react';
import styled from 'styled-components';

export interface BurgerButtonProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export const BurgerButton: React.FC<BurgerButtonProps> = ({ isOpen, setOpen, className }) => {
  return (
    <BurgerButtonStyle
      className={className + ' hoverable'}
      isOpen={isOpen}
      onClick={() => setOpen(!isOpen)}>
      <span></span>
      <span></span>
      <span></span>
    </BurgerButtonStyle>
  );
};

export const BurgerButtonStyle = styled.div<{ isOpen: boolean }>`
  width: 45px;
  padding: 0.3em;
  display: none;

  span {
    display: block;
    width: 27px;
    height: 2px;
    margin: auto;
    background: white;
  }
  span:nth-of-type(2) {
    margin: 7px auto;
  }

  @media (max-width: 850px) {
    display: unset;
  }
`;
