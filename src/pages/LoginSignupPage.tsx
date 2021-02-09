import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../hooks/user/useUser';

import { Loading } from '../components/common/Loading';
import { Container } from '../components/common/Layout';
import { LinkButton } from '../components/common/Button';
import Login from '../components/global/Auth/Login';
import Signup from '../components/global/Auth/Signup';

const LoginSignupPage: React.FC = () => {
  const { loginProps, signupProps } = useUser();
  const { loginRes } = loginProps;
  const { signupRes } = signupProps;
  const loading = loginRes.loading || signupRes.loading;

  if (loading) return <Loading loading={loading} />;

  return (
    <Section>
      <Container className='container'>
        <div className='side-panel'>
          <div className='buttons'>
            <LinkButton to='/login' className='login-btn' outline fullwidth>
              LOGIN
            </LinkButton>
            <LinkButton to='/signup' outline fullwidth>
              SIGNUP
            </LinkButton>
          </div>
        </div>

        <div className='form-container'>
          <Switch>
            <Route
              path='/login'
              render={p => <Login className='login form' {...p} {...loginProps} />}
            />
            <Route
              path='/signup'
              render={p => <Signup className='signup form' {...p} {...signupProps} />}
            />
          </Switch>
        </div>
      </Container>
    </Section>
  );
};

export default LoginSignupPage;

const Section = styled.section`
  width: 100vw;
  min-height: 90vh;
  padding: 20px;
  background: var(--main2);

  .container {
    min-height: 85vh;
    display: flex;
  }

  .side-panel {
    flex: 1;
    padding: 4px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--main);
    color: white;
    button {
      font-size: 16px;
      color: white;
      border-color: var(--lightgrey);
    }
    .login-btn {
      margin-bottom: 2em;
    }
  }

  .form-container {
    flex: 0 1 600px;
    padding: 40px 30px;
    background: white;
    .form {
      max-width: 400px;
      margin: auto;
    }
    h1 {
      font-size: 40px;
    }
    .title-underline {
      margin-bottom: 40px;
    }
    button {
      margin-top: 40px;
    }
  }

  @media (max-width: 840px) {
    .container {
      flex-direction: column;
    }

    .side-panel {
      .buttons {
        width: 100%;
        display: flex;
        justify-content: space-around;
        button {
          flex: 1;
          margin: 0;
          border: none;
        }
      }
    }

    .form-container {
      flex: 0 0 500px;
      padding: 25px 30px;
    }
  }
`;
