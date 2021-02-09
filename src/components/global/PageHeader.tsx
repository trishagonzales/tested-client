import React from 'react';
import styled from 'styled-components';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { Container } from '../common/Layout';
import { device } from '../../theme';

export interface PageHeaderProps {}

export const PageHeader: React.FC<PageHeaderProps> = ({ children }) => {
  return (
    <Header>
      <Container>
        <div>
          <Breadcrumbs />
        </div>
        <div className='title-buttons'>{children}</div>
      </Container>
    </Header>
  );
};

const Header = styled.header`
  width: 100vw;
  padding: 0.7em 1em 0.4em 1em;
  background: var(--lightgrey);

  .title-buttons {
    margin-top: 0.5em;
    display: flex;
    align-items: center;
  }
`;

export const PageTitle = styled.h1`
  color: var(--main);
  font-size: 36px;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  text-transform: uppercase;

  @media ${device.narrow} {
    font-size: 25px;
  }
`;

export const PageHeaderButtons = styled.div`
  margin-left: auto;
  button {
    margin: 0 0.2em;
    i {
      font-size: 16px;
    }
  }
`;
