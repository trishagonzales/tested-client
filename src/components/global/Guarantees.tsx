import React from 'react';
import styled from 'styled-components';
import { device } from '../../theme';

import { Container } from '../common/Layout';

export const Guarantees: React.FC = () => {
  return (
    <Div>
      <Container className='container'>
        <Card>
          <i className='fas fa-truck' />
          <div className='text'>
            <p className='heading'>Free delivery</p>
            <p className='descrip'>For all orders over &#8369; 200</p>
          </div>
        </Card>
        <Card>
          <i className='fas fa-exchange-alt' />
          <div className='text'>
            <p className='heading'>60 days return</p>
            <p className='descrip'>If goods have problems</p>
          </div>
        </Card>
        <Card>
          <i className='fas fa-money-check' />
          <div className='text'>
            <p className='heading'>Secure payment</p>
            <p className='descrip'>100% secure payment</p>
          </div>
        </Card>
        <Card>
          <i className='fas fa-headset' />
          <div className='text'>
            <p className='heading'>24/7 support</p>
            <p className='descrip'>Dedicated support</p>
          </div>
        </Card>
      </Container>
    </Div>
  );
};

const Div = styled.div`
  margin: 2em 0;

  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-gap: 0.5em;
  }

  @media ${device.narrow} {
    margin: 2em 1em;
  }
`;

const Card = styled.div`
  height: 90px;
  padding: 1em;
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-areas: 'icon text';
  grid-gap: 0.5em;
  align-items: center;
  border: 1px solid var(--lightgrey);

  i {
    grid-area: icon;
    justify-self: center;
    font-size: 28px;
    color: var(--main);
  }

  .text {
    grid-area: text;
    font-size: 14px;
    .heading {
      margin-bottom: 0.2em;
      font-weight: bold;
    }
    .descrip {
      font-size: 12px;
      color: var(--fg2);
    }
  }
`;
