import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useToggle } from './useToggle';
import { BaseProps } from '../../types/General.types';

const modalRoot = document.getElementById('modal-root');

export function useModal(initialOpen: boolean = false) {
  const rendered = useRef(false);
  const [el] = useState(document.createElement('div'));
  const { ref, isOpen, open, close } = useToggle(initialOpen);

  useEffect(() => {
    if (rendered.current) {
      if (isOpen) modalRoot?.appendChild(el);
      if (!isOpen) modalRoot?.removeChild(el);
    }
    rendered.current = true;
  }, [isOpen]);

  useEffect(() => {
    el.className = 'modal-container';
  }, []);

  const Modal: React.FC<BaseProps> = useCallback(({ className, children }) => {
    return createPortal(
      <ModalBox className={className} ref={ref}>
        <i className='x-btn fas fa-times hoverable' onClick={close}></i>
        {children}
      </ModalBox>,
      el
    );
  }, []);

  return { Modal, isOpen, open, close };
}

const ModalBox = styled.div`
  width: 95%;
  max-width: 500px;
  min-height: 300px;
  padding: 1.2em 2em;
  position: relative;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 5px;

  .x-btn {
    position: absolute;
    top: 12px;
    right: 14px;
    font-size: 22px;
    font-weight: bold;
    color: var(--grey);
  }
`;

export const ModalContent = styled.div<{ center?: boolean }>`
  flex: 1;
  width: 100%;
  display: ${p => p.center && 'flex'};
  justify-content: ${p => p.center && 'center'};
  align-items: ${p => p.center && 'center'};
  font-size: 16px;
`;

export const ModalButtons = styled.div`
  width: 100%;
  padding-top: 1em;
  display: flex;
  justify-content: space-between;
  border-top: 2px solid var(--lightgrey);

  .delete-btn {
    background: var(--error);
    color: white;
  }
`;
