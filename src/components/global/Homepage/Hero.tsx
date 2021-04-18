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
        <LinkButton to='/products'>SHOP NOW</LinkButton>
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

  button {
    width: 200px;
    font-size: 18px;
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
