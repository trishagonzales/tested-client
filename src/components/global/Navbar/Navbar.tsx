import React, { useState } from 'react';
import styled from 'styled-components';

import { Container } from '../../common/Layout';
import { BurgerButton } from './BurgerButton';
import { Brand } from './Brand';
import { SearchBox } from './SearchBox';
import { CartButton } from './CartButton';
import { AccountDropdown } from './AccountDropdown';
import { device } from '../../../theme';
import { NavDropdown } from './NavDropdown';

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
  const [isNavDropdownOpen, setNavDropdownOpen] = useState(false);

  return (
    <NavMobile>
      <Container className='container'>
        <BurgerButton isOpen={isNavDropdownOpen} setOpen={setNavDropdownOpen} />
        <Brand className='brand' />
        <CartButton className='cart-btn' />
        <AccountDropdown />

        <NavDropdown isOpen={isNavDropdownOpen} />
      </Container>
    </NavMobile>
  );
};

export const NavMobile = styled.nav`
  display: none;

  .container {
    width: 100vw;
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

  @media ${device.narrow} {
    display: unset;
  }
`;
