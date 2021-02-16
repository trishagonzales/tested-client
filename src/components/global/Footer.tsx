import React from 'react';
import styled from 'styled-components';

import { Row, Column, Container, Center } from '../common/Layout';
import { Brand } from './Navbar/Brand';
import { Input } from '../common/Form';
import { Button } from '../common/Button';
import { device } from '../../theme';

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <FooterStyle>
      <div className='top'>
        <Container>
          <Row alignItems='flex-start' breakpoint='narrow'>
            <Column className='column'>
              <Brand />
              <Row className='social-media'>
                <i className='hoverable fab fa-facebook-f' />
                <i className='hoverable fab fa-twitter' />
                <i className='hoverable fab fa-instagram' />
                <i className='hoverable fab fa-youtube' />
              </Row>
            </Column>

            <Column className='column links'>
              <label htmlFor=''>Links</label>
              <Row alignItems='flex-start'>
                <ul>
                  <li>Products</li>
                  <li>Categories</li>
                  <li>Track order</li>
                </ul>
                <ul>
                  <li>Account</li>
                  <li>News</li>
                </ul>
              </Row>
            </Column>

            <Column className='column newsletter'>
              <label htmlFor=''>Signup to newsletter</label>
              <Input type='email' />
              <Button fullwidth outline>
                SUBMIT
              </Button>
            </Column>
          </Row>
        </Container>
      </div>

      <div className='bottom'>
        <Center>&#169; Tested 2021. All rights reserved.</Center>
      </div>
    </FooterStyle>
  );
};

const FooterStyle = styled.footer`
  height: auto;
  background: var(--main);
  color: var(--grey);
  font-size: 14px;

  .top {
    padding: 2em 1em;
    background: #232230;
    label {
      margin-bottom: 0.8em;
      display: block;
    }

    .social-media {
      margin-top: 0.4em;
      i {
        width: 35px;
        height: 35px;
        margin-right: 0.3em;
        padding: 0.5em;
        text-align: center;
        background: rgba(0, 0, 0, 0.3);
        font-size: 16px;
        color: var(--darkgrey);
        transition: background 100ms;
        :hover {
          background: #444;
          color: white;
        }
      }
    }

    .links {
      ul:nth-of-type(1) {
        margin-right: 1.5em;
      }
      li {
        margin-bottom: 0.5em;
        color: var(--darkgrey);
        :hover {
          color: var(--grey);
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }

    .newsletter {
      input {
        margin-bottom: 0.5em;
        background-color: rgba(0, 0, 0, 0.4);
        border: rgba(0, 0, 0, 0.5);
        color: white;
      }
      button {
        border-color: #666;
        color: white;
        font-size: 12px;
      }
    }
  }

  .bottom {
    height: 45px;
    background: #181721;
    color: var(--grey);
  }

  @media ${device.narrow} {
    .top {
      padding: 2em 6%;
      .column:nth-of-type(2) {
        margin-top: 1.5em;
        margin-bottom: 1.5em;
      }
    }
  }
`;
