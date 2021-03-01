import React from 'react';
import styled from 'styled-components';

import { Row, Column, Container } from '../common/Layout';
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
            <Column className='column' flex='.7'>
              <Brand />
              <Row className='social-media'>
                <i className='hoverable fab fa-facebook-f' />
                <i className='hoverable fab fa-twitter' />
                <i className='hoverable fab fa-instagram' />
                <i className='hoverable fab fa-youtube' />
              </Row>
            </Column>

            <Column className='column links' flex='1.3'>
              <Row className='row' alignItems='flex-start' justifyContent='space-evenly'>
                <ul>
                  <label>Account</label>
                  <li>Products</li>
                  <li>Cart</li>
                  <li>Wishlist</li>
                  <li>Profile</li>
                  <li>Settings</li>
                </ul>
                <ul>
                  <label>Company</label>
                  <li>About</li>
                  <li>Careers</li>
                  <li>Blog</li>
                  <li>Privacy Policy</li>
                  <li>Terms & Conditions</li>
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
        <Container className='container'>
          <Row justifyContent='space-between' breakpoint='narrow'>
            <span className='copyright'>&#169; Tested 2021. All rights reserved.</span>
            <span>
              <span className='hoverable-text'>Privacy Policy</span>
              <span className='divider'>|</span>
              <span className='hoverable-text'>Terms & Conditions</span>
              <span className='divider'>|</span>
              <span className='hoverable-text'>Sitemap</span>
            </span>
          </Row>
        </Container>
      </div>
    </FooterStyle>
  );
};

const FooterStyle = styled.footer`
  color: var(--grey);
  font-size: 14px;

  .top {
    min-height: 200px;
    padding: 2.2em 1em;
    background: #1d172e;
    label {
      margin-bottom: 1em;
      display: block;
    }

    .social-media {
      margin-top: 1em;
      i {
        width: 35px;
        height: 35px;
        margin-right: 0.3em;
        padding: 0.5em;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        text-align: center;
        font-size: 16px;
        color: var(--darkgrey);
        transition: background 100ms;
        :hover {
          color: white;
        }
      }
    }

    .links {
      li {
        margin-bottom: 0.5em;
        color: var(--grey);
        font-size: 12px;
        opacity: 0.6;
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
    height: 40px;
    background: #151121;
    color: var(--grey);
    font-size: 12px;
    .container {
      height: 100%;
      display: flex;
      align-items: center;
      .divider {
        margin: 0 1em;
      }
    }
  }

  @media ${device.narrow} {
    .top {
      padding: 2em 6%;
      .column {
        width: 100%;
      }
      .column:nth-of-type(2) {
        margin: 2em 0;
      }
      .links {
        ul {
          width: 50%;
        }
      }
      .newsletter {
        button {
          max-width: 400px;
        }
      }
    }
    .bottom {
      height: 60px;
      padding: 0.5em;
      .copyright {
        margin-bottom: 0.5em;
      }
    }
  }
`;
