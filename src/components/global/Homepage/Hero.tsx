import React from 'react';
import styled from 'styled-components';
import homepageImg from '../../../assets/homepage-1.jpg';

import { Center } from '../../common/Layout';
import { LinkButton } from '../../common/Button';

export interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <Section>
      <Center>
        <div className='text'>
          <h1 className='text-1'>BE FASHIONABLE</h1>
          <h1 className='text-2'>GET YOUR ATTIRE AND ACCESSORIES NOW</h1>
          <LinkButton to='/products'>SHOP NOW</LinkButton>
        </div>
      </Center>
    </Section>
  );
};

const Section = styled.section`
  height: 90vh;
  background: url(${homepageImg}), var(--main);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply;

  .text {
    max-width: 500px;
    text-align: center;
    /* font-weight: bold; */
    .text-1 {
      font-size: 18px;
      color: var(--grey);
    }
    .text-2 {
      margin-top: 0.1em;
      margin-bottom: 1em;
      font-size: 35px;
      color: white;
    }
  }

  button {
    width: 140px;
    font-size: 16px;
    background: rgba(0, 0, 0, 0);
    color: white;
    transition: transform ease-in 200ms, color 200ms, background 100ms;
    :hover {
      transform: translateY(-2px);
      background: white;
      color: var(--main);
    }
  }
`;
