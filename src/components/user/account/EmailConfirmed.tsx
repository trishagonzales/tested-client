import React from 'react';
import styled from 'styled-components';

export interface EmailConfirmedProps {
  isConfirmed: boolean;
  sendLink: () => void;
}

export const EmailConfirmed: React.FC<EmailConfirmedProps> = ({ isConfirmed, sendLink }) => {
  return (
    <Div>
      <p>
        confirmed
        {isConfirmed ? (
          <i className='fas fa-check-circle'></i>
        ) : (
          <>
            <i className='fas fa-times-circle'></i>
            <span className='send-link hoverable-text blue-color' onClick={() => sendLink()}>
              send confirmation link
            </span>
          </>
        )}
      </p>
    </Div>
  );
};

const Div = styled.div`
  font-size: 14px;
  i {
    margin: 0 1em;
    color: red;
  }
  .fa-check-circle {
    color: green;
  }
`;
