import React from 'react';
import styled from 'styled-components';
import { useTabs } from '../../hooks/common/useTabs';
import { lazy } from '../../utils/dynamicImports.util';
import { device } from '../../theme';

import { PageHeader, PageTitle } from '../../components/global/PageHeader';
import { Container } from '../../components/common/Layout';

const Profile = lazy(() => import('../../components/user/account/Profile'));
const AccountSettings = lazy(() => import('../../components/user/account/AccountSettings'));

export interface AccountPageProps {}

const AccountPage: React.FC<AccountPageProps> = () => {
  const { TabContainer, TabHeader, Tab, TabBody, TabContent } = useTabs({
    isCurrentPathTheTab: true,
    initialTab: 'profile',
    isVertical: true,
  });

  return (
    <>
      <PageHeader>
        <PageTitle>ACCOUNT</PageTitle>
      </PageHeader>

      <Div>
        <Container>
          <TabContainer className='tab-container'>
            <TabHeader className='tab-header'>
              <Tab className='tab' name='profile'>
                <span className='text'>Profile</span>
                <i className='fas fa-user-circle'></i>
              </Tab>
              <Tab className='tab' name='account-settings'>
                <span className='text'>Settings</span>
                <i className='fas fa-cog'></i>
              </Tab>
            </TabHeader>

            <TabBody className='tab-body'>
              <TabContent name='profile'>
                <Profile />
              </TabContent>
              <TabContent name='account-settings'>
                <AccountSettings />
              </TabContent>
            </TabBody>
          </TabContainer>
        </Container>
      </Div>
    </>
  );
};

export default AccountPage;

const Div = styled.div`
  .tab-container {
    min-height: 100vh;
  }

  .tab-header {
    padding-top: 30px;
    background: var(--bg);
    .tab {
      color: var(--fg2);
      font-family: Roboto;
      i {
        display: none;
      }
    }
    .active {
      background: white;
      border-left: 2px solid var(--main);
      color: var(--main);
      font-weight: bold;
    }
  }

  .tab-body {
    max-width: 600px;
    padding: 1.5em;
    padding-left: 7%;
    .heading {
      margin-bottom: 1.5em;
    }
    .actions {
      margin-top: 30px;
    }
  }

  @media (max-width: 760px) {
    .tab-header {
      flex: 0 0 45px;
      .tab {
        width: 50px;
        .text {
          display: none;
        }
        i {
          display: inline;
          font-size: 20px;
        }
      }
    }
  }

  @media ${device.phone} {
    .actions {
      button {
        width: 100%;
      }
    }
  }
`;
