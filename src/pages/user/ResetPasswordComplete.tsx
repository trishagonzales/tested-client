import React from 'react';
import styled from 'styled-components';
import { LinkButton } from '../../components/common/Button';
import { device } from '../../theme';

export interface ResetPasswordCompletePageProps {}

const ResetPasswordCompletePage: React.FC<ResetPasswordCompletePageProps> = () => {
  return (
    <Div>
      <i className='far fa-check-circle'></i>
      <h1>Successfully reset password</h1>
      <p>Login with your new credentials</p>
      <LinkButton to='/login' fullwidth>
        Login
      </LinkButton>
    </Div>
  );
};

export default ResetPasswordCompletePage;

const Div = styled.div`
  width: 90vw;
  max-width: 400px;
  margin: auto;
  margin-top: 70px;
  padding: 2.5em 2em;
  text-align: center;
  border-radius: 5px;
  box-shadow: 1px 3px 10px #ccc;
  i {
    font-size: 50px;
    color: green;
  }
  h1 {
    margin: 1em 0;
    font-size: 22px;
  }
  p {
    margin-bottom: 3em;
  }

  @media ${device.phone} {
    margin-top: 50px;
  }
`;
