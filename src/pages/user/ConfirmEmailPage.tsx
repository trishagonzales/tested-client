import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useGlobal } from '../../hooks/common/useGlobal';
import { useAccountSettings } from '../../hooks/user/useAccountSettings';

export interface ConfirmEmailPageProps {}

const ConfirmEmailPage: React.FC<ConfirmEmailPageProps> = () => {
  const {
    globalState: { user },
  } = useGlobal();
  const { params } = useRouteMatch<{ token: string }>();
  const { confirmEmail } = useAccountSettings();

  useEffect(() => {
    if (!user?.isEmailConfirmed && params.token) confirmEmail(params.token);
  }, []);

  return <></>;
};

export default ConfirmEmailPage;
