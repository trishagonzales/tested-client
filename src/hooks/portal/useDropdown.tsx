import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { BaseProps } from '../../types/General.types';
import { useToggle } from './useToggle';

export function useDropdown(initialOpen = false) {
  const { ref, isOpen, open, close } = useToggle(initialOpen);

  const Dropdown: React.FC<BaseProps> = useCallback(({ className, children }) => {
    return <DropdownStyle className={className}>{children}</DropdownStyle>;
  }, []);

  const DropdownBtn: React.FC<BaseProps> = useCallback(
    ({ className, children }) => {
      return (
        <DropdownBtnStyle className={className} onClick={isOpen ? close : open}>
          {children}
        </DropdownBtnStyle>
      );
    },
    [isOpen]
  );

  const DropdownContent: React.FC<DropdownContentProps> = useCallback(
    ({ className, children, align = 'left' }) => {
      return isOpen ? (
        <DropdownContentStyle className={className} ref={ref} align={align}>
          {children}
        </DropdownContentStyle>
      ) : null;
    },
    [isOpen]
  );

  return { Dropdown, DropdownBtn, DropdownContent, isOpen, open, close };
}

const DropdownStyle = styled.div`
  position: relative;
`;
const DropdownBtnStyle = styled.div``;
const DropdownContentStyle = styled.div<{ align?: 'left' | 'right' }>`
  position: absolute;
  top: 110%;
  ${p => (p.align === 'right' ? 'right: 0' : 'left: 0')};
  z-index: 150;
`;

interface DropdownContentProps extends BaseProps {
  align?: 'left' | 'right';
}
