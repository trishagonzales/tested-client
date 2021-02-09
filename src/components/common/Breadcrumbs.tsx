import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

export interface BreadcrumbsProps {}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = () => {
  let { url } = useRouteMatch();
  const [links, setLinks] = useState(['']);

  useEffect(() => {
    const linksArray = url.split('/');
    linksArray.shift();
    setLinks(linksArray);
  }, [url]);

  return (
    <Span>
      <Link to='/'>home</Link>
      {links.map((link, index) => (
        <Link key={index} to={'/' + link}>
          / {link}
        </Link>
      ))}
    </Span>
  );
};

const Span = styled.span`
  color: var(--main);
  color: var(--main);

  a {
    color: var(--main);
    font-size: 12px;
    :hover {
      text-decoration: underline;
    }
  }
`;
