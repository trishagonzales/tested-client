import React, { useState, useCallback, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { screenSize, device } from '../theme';
import { BaseProps } from '../types/General.types';

interface UseTabsOptions {
  initialTab?: string;
  isCurrentPathTheTab?: boolean;
  disableTabClick?: boolean;
  isVertical?: boolean;
}

interface TabProps extends BaseProps {
  name: string;
}

export function useTabs({
  initialTab,
  isCurrentPathTheTab,
  disableTabClick,
  isVertical,
}: UseTabsOptions) {
  const { path } = useRouteMatch();
  const [activeTab, setActiveTab] = useState(isCurrentPathTheTab ? path.slice(1) : initialTab);
  const [vertical, setVertical] = useState(isVertical);
  let history = useHistory();

  useEffect(() => {
    if (isCurrentPathTheTab) history.push('/' + activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (isCurrentPathTheTab) setActiveTab(path.slice(1));
  }, [path]);

  //  REACT COMPONENTS

  const Tab: React.FC<TabProps> = useCallback(
    ({ name, className, children }) => {
      return (
        <TabStyle
          className={`${className} ${name === activeTab && 'active'} ${
            !disableTabClick && 'hoverable'
          }`}
          onClick={() => !disableTabClick && setActiveTab(name)}>
          {children}
        </TabStyle>
      );
    },
    [activeTab]
  );

  const TabBody: React.FC<BaseProps> = useCallback(
    ({ className, children }) => {
      return <TabBodyStyle className={className}>{children}</TabBodyStyle>;
    },
    [activeTab]
  );

  const TabContent: React.FC<TabProps> = useCallback(
    ({ name, className, children }) => {
      return (
        <TabContentStyle className={className} name={name}>
          {children}
        </TabContentStyle>
      );
    },
    [activeTab]
  );

  //  STYLED COMPONENTS

  const TabContainer = styled.div`
    width: 100vw;
    max-width: ${screenSize.md};
    display: ${vertical && 'flex'};

    @media ${device.narrow} {
      width: 100vw;
    }
  `;

  const TabHeader = styled.div`
    flex: ${vertical && '0 0 150px'};
    width: 100vw;
    max-width: ${screenSize.md};
    display: flex;
    flex-direction: ${vertical && 'column'};
  `;

  const TabStyle = styled.span`
    flex: ${!vertical && '1'};
    padding: 1em;
    text-align: center;
    font-family: Poppins;

    @media ${device.narrow} {
      font-size: 12px;
    }
  `;

  const TabBodyStyle = styled.div`
    flex: ${vertical && '1'};
    width: 100%;
    max-width: ${screenSize.md};
  `;

  const TabContentStyle = styled.div<{ name: string }>`
    width: 100%;
    height: 100%;
    display: ${p => (p.name === activeTab ? 'unset' : 'none')};
  `;

  //  RETURN

  return { TabContainer, TabHeader, Tab, TabBody, TabContent, setVertical };
}
