import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { BaseProps } from '../types/General.types';
import { Row } from '../components/common/Layout';
import { genPages, paginateItems } from '../utils/pagination.util';

export function usePagination<T = any>(initialItems?: T[], pageSize = 12) {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState(initialItems ?? []);
  const pages = useRef<number[]>();

  useEffect(() => {
    if (items && items.length > 0) pages.current = genPages(items, pageSize);
  }, [items]);

  const Pagination: React.FC<BaseProps> = useCallback(
    ({ className }) => {
      if (pages.current && pages.current.length < 2) return null;

      return (
        <PaginationStyle className={className}>
          <Row>
            <span className='arrow prev'>
              <i className='fas fa-angle-left'></i>
            </span>

            {pages.current?.map((page, i) => (
              <span
                key={i}
                className={`page ${page === currentPage && 'active'}`}
                onClick={() => setCurrentPage(page)}>
                {page}
              </span>
            ))}

            <span className='arrow next'>
              <i className='fas fa-angle-right'></i>
            </span>
          </Row>
        </PaginationStyle>
      );
    },
    [items]
  );

  return {
    Pagination,
    paginatedItems: paginateItems(items, currentPage, pageSize),
    setItems,
  };
}

export const PaginationStyle = styled.div<PaginationProps>`
  .page,
  .arrow {
    margin: 0.4em;
    padding: 0.5em 0.7em;
    background: var(--lightgrey);
    border: 1px solid var(--lightgrey);
    border-radius: 5px;
    color: var(--darkgrey);
    font-size: ${p => p.fontsize ?? '16px'};
    cursor: pointer;
    :hover:not(.active) {
      color: var(--main);
      border-color: var(--grey);
    }
  }
  .active {
    background: var(--main);
    color: white;
  }
`;

interface PaginationProps extends BaseProps {
  fontsize?: string;
}
