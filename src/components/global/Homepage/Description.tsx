import React from 'react';
import styled from 'styled-components';
import { device } from '../../../theme';
import homepageImg from '../../../assets/homepage-2.jpg';

import { Column, Container, Row } from '../../common/Layout';

export interface DescriptionProps {}

export const Description: React.FC<DescriptionProps> = () => {
  return (
    <Container>
      <Section breakpoint='narrow'>
        <Column className='text'>
          <h2>Style</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione at eius deleniti vitae
            nostrum neque obcaecati iste quidem nesciunt necessitatibus suscipit
          </p>
        </Column>
        <Column className='image'>
          <img src={homepageImg} alt='blue denim jacket' />
        </Column>
      </Section>
    </Container>
  );
};

const Section = styled(Row)`
  padding: 4em 0;
  gap: 2em;

  .text {
    padding-left: 3em;
    color: var(--fg2);
    h2 {
      margin-bottom: 0.8em;
    }
    p {
      max-width: 350px;
      margin-left: 1em;
      line-height: 2.2em;
      color: var(--darkgrey);
    }
  }

  .image {
    img {
      width: 300px;
      height: 350px;
      margin: auto;
      display: block;
      object-fit: cover;
      object-position: center;
    }
  }

  @media ${device.tablet} {
    padding: 4em 2em;
    .text {
      padding-left: unset;
    }
  }

  @media ${device.narrow} {
    padding: 3em 2em;
    .image {
      img {
        width: 200px;
        height: 250px;
      }
    }
  }
`;
