import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device, DeviceSize } from '../../theme';

export interface ButtonProps {
  primary?: boolean;
  outline?: boolean;
  textOnly?: boolean;
  invert?: boolean;
  fullwidth?: boolean;
  className?: string;
  fontsize?: string;
  iconBreakpoint?: boolean | DeviceSize;
  disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  width: ${p => (p.fullwidth ? '100%' : null)};
  padding: 0.8em 1em;
  background: ${p => {
    if (p.primary) return 'var(--main)';
    if (p.outline || p.textOnly) return 'none';
    if (p.invert) return 'white';
    return 'var(--lightgrey)';
  }};
  border: ${p => (p.textOnly ? null : '1px solid var(--lightgrey)')};
  border-color: ${p => {
    if (p.primary || p.outline) return 'var(--main)';
    if (p.invert) return 'white';
    return 'var(--lightgrey)';
  }};
  border-radius: 5px;
  color: ${p => (p.primary ? 'white' : 'var(--main)')};
  text-transform: uppercase;
  font-size: ${p => (p.fontsize ? p.fontsize : '14px')};
  font-weight: bold;
  cursor: pointer;
  :hover {
    backdrop-filter: brightness(95%);
  }

  ${p =>
    p.iconBreakpoint &&
    ` i {
        display: none;
      }
      @media ${typeof p.iconBreakpoint === 'string' ? device[p.iconBreakpoint] : device.phone} {
        i {
          display: unset;
        }
        span {
          display: none;
        }
      }
    `}
`;

export interface LinkButtonProps extends ButtonProps {
  to: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ children, to, ...buttonProps }) => {
  return (
    <Link to={to}>
      <Button {...buttonProps}>{children}</Button>
    </Link>
  );
};

export interface RemoveButtonProps {
  onClick: any;
}

export const RemoveButton: React.FC<RemoveButtonProps> = ({ onClick }) => {
  return <RemoveBtnStyle className='fas fa-times' onClick={onClick}></RemoveBtnStyle>;
};

const RemoveBtnStyle = styled.i`
  padding: 0.5em 0.7em;
  background: white;
  border: 1px solid var(--main2);
  border-radius: 5px;
  box-shadow: 1px 1px 5px #ccc;
  color: var(--main2);
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  :active {
    background: var(--main2);
    color: white;
  }
`;
