import React from 'react';
import styled from 'styled-components';

import { Button } from '../common/Button';
import { Container, Row } from '../common/Layout';
import { Input } from '../common/Form';
import { device } from '../../theme';

export interface NewsletterProps {
  className?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({ className }) => {
  return (
    <Div className={className}>
      <Container>
        <Row className='row'>
          <span className='text'>Subscribe to Newsletter</span>
          <span className='input-block'>
            <Row>
              <Input placeholder='Enter your email' />
              <Button primary>SUBMIT</Button>
            </Row>
          </span>
        </Row>
      </Container>
    </Div>
  );
};

export default Newsletter;

const Div = styled.div`
  width: 100vw;
  padding: 1.8em 1em;
  background: var(--main2);

  .text {
    margin-right: auto;
    color: white;
    font-size: 22px;
  }

  .input-block {
    position: relative;
    input {
      padding: 0.7em 1em;
      border-radius: 20px;
      font-size: 16px;
      opacity: 0.7;
    }
    button {
      padding: 0.8em 1.5em;
      position: absolute;
      right: 2px;
      border-radius: 20px;
    }
  }

  @media ${device.tablet} {
    .row {
      flex-direction: column;
      .text {
        margin-right: unset;
        margin-bottom: 1.2em;
      }
    }
  }

  @media ${device.phone} {
    .input-block,
    input {
      min-width: 90%;
    }
  }
`;
