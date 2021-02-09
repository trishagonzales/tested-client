import React from 'react';
import styled from 'styled-components';

import { LinkButton } from '../common/Button';
import { Row } from '../common/Layout';
import { device } from '../../theme';

export interface PreviewListProps {
  title: string;
  moreLink: string;
}

const PreviewList: React.FC<PreviewListProps> = ({ children, title, moreLink }) => {
  return (
    <Div>
      <Row className='title-more' justifyContent='space-between'>
        <h2>{title}</h2>
        <LinkButton to={moreLink} className='more-btn'>
          MORE
        </LinkButton>
      </Row>
      <Row className='list'>{children}</Row>
    </Div>
  );
};

export default PreviewList;

const Div = styled.div`
  padding: 30px 0;

  .title-more {
    padding-bottom: 30px;
    h2 {
      font-family: Poppins;
      font-size: 30px;
      color: var(--main);
    }
  }
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 200px));
    justify-items: center;
  }

  @media ${device.tablet} {
    padding: 20px;
  }

  @media ${device.phone} {
    .list {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
  }
`;
