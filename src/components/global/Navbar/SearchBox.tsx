import React from 'react';
import styled from 'styled-components';
import { Input } from '../../common/Form';

export interface SearchBoxProps {
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ className }) => {
  return (
    <Div className={className}>
      <Input name='search' type='search' />
      <div className='hoverable'>
        <i className='fas fa-search'></i>
      </div>
    </Div>
  );
};

const Div = styled.div`
  height: 33px;
  flex: 0 1 500px;
  display: flex;
  align-items: center;
  input {
    height: 100%;
    flex: 1;
    border: none;
    border-radius: 5px 0 0 5px;
  }
  div {
    height: 100%;
    flex: 0 0 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--main2);
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    i {
      color: white;
      font-size: 16px;
    }
  }
`;
