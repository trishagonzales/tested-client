import React from 'react';
import styled from 'styled-components';

import { Container, Row } from '../../common/Layout';
import { Brand } from './Brand';
import { SearchBox } from './SearchBox';
import { CartButton } from './CartButton';
import { AccountDropdown } from './AccountDropdown';
import { device } from '../../../theme';
import { useDropdown } from '../../../hooks/portal/useDropdown';

export interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Nav>
      <Container className='container'>
        <Brand className='brand' />
        <SearchBox className='searchbox' />
        <CartButton className='cart' />
        <AccountDropdown />
      </Container>
    </Nav>
  );
};

export const Nav = styled.nav`
  width: 100vw;
  background: var(--main);

  .container {
    max-height: 55px;
    padding: 7px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand {
    margin-right: 1em;
  }

  @media ${device.narrow} {
    display: none;
  }
`;

//  NAVBAR MOBILE SCREEN

export interface NavbarMobileProps {}

export const NavbarMobile: React.FC<NavbarMobileProps> = () => {
  const { Dropdown, DropdownBtn, DropdownContent, close } = useDropdown();

  return (
    <NavMobile>
      <Container className='container'>
        <Brand className='brand' />

        <Dropdown className='search-dropdown'>
          <DropdownBtn className='btn'>
            <i className='fas fa-search hoverable'></i>
          </DropdownBtn>
          <DropdownContent className='content'>
            <Row justifyContent='space-between'>
              <SearchBox className='searchbox' />
              <i className='fas fa-times x-btn hoverable' onClick={close}></i>
            </Row>
          </DropdownContent>
        </Dropdown>

        <CartButton className='cart-btn' />

        <AccountDropdown />
      </Container>
    </NavMobile>
  );
};

export const NavMobile = styled.nav`
  display: none;

  .container {
    width: 100vw;
    max-height: 55px;
    position: relative;
    padding: 7px 3%;
    position: relative;
    display: flex;
    align-items: center;
    background: var(--main);
  }

  .brand {
    margin-left: 3%;
    margin-right: auto;
  }

  .search-dropdown {
    position: unset;
    .btn {
      height: 100%;
      font-size: 18px;
      color: white;
    }
    .content {
      width: 100vw;
      padding: 0.5em;
      top: 100%;
      left: 0;
      background: var(--main);
      .x-btn {
        padding: 0.5em 1em;
        font-size: 18px;
        color: white;
      }
    }
  }

  .cart-btn {
    margin: 0 0.8em;
  }

  @media ${device.narrow} {
    display: unset;
  }
`;
