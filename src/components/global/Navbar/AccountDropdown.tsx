import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../../../hooks/user/useUser';
import { useDropdown } from '../../../hooks/portal/useDropdown';

export interface AccountDropdownProps {}

export const AccountDropdown: React.FC<AccountDropdownProps> = () => {
  const { user, isAdmin, logoutProps } = useUser();
  const { Dropdown, DropdownBtn, DropdownContent, isOpen, close } = useDropdown();
  let history = useHistory();

  return (
    <Div isOpen={isOpen}>
      <Dropdown>
        <DropdownBtn className='dropdown-btn'>
          <i className='fas fa-user'></i>
          <i className={`fas fa-caret-${isOpen ? 'up' : 'down'}`}></i>
        </DropdownBtn>

        <DropdownContent className='dropdown-content' align='right'>
          {user ? (
            <ul>
              <Link onClick={close} to='/wishlists'>
                Wishlists
              </Link>
              <Link onClick={close} to='/orders'>
                Track Orders
              </Link>
              <Link onClick={close} to='/profile'>
                Account
              </Link>
              {isAdmin && (
                <Link onClick={close} to='/admin'>
                  Admin
                </Link>
              )}
              <br />
              <span
                onClick={() => {
                  logoutProps.logout();
                  history.push('/');
                  close();
                }}>
                Logout
              </span>
            </ul>
          ) : (
            <ul>
              <Link onClick={close} to='/login'>
                Login
              </Link>
              <Link onClick={close} to='/signup'>
                Signup
              </Link>
            </ul>
          )}
        </DropdownContent>
      </Dropdown>
    </Div>
  );
};

const Div = styled.div<{ isOpen: boolean }>`
  .dropdown-btn {
    padding: 0.5rem;
    background: ${p => (p.isOpen ? 'white' : 'none')};
    border: 1px solid var(--main2);
    border-color: ${p => (p.isOpen ? 'white' : 'var(--main2)')};
    border-radius: var(--borderRadius);
    transition: all ease-in 200ms;
    cursor: pointer;

    i {
      display: inline;
      color: ${p => (p.isOpen ? 'var(--main)' : 'white')};
      font-size: 22px;
    }
    i:nth-of-type(2) {
      margin-left: 0.3em;
      color: var(--accent);
    }
  }

  .dropdown-content {
    width: 200px;
    padding: 1.2em;
    background: white;
    border-radius: var(--borderRadius);
    box-shadow: 1px 2px 5px #ccc;
    a,
    span {
      padding: 0.5em 0.7em;
      display: block;
      border-radius: var(--borderRadius);
      cursor: pointer;
      :hover {
        background: var(--bg);
      }
    }
  }
`;
