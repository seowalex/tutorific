import React from 'react';
import { useIonRouter, useIonViewWillEnter } from '@ionic/react';

import { useAppSelector } from '../app/hooks';
import { selectCurrentUserId } from '../reducers/auth';

const AuthenticatedComponent: React.FC = ({ children }) => {
  const currentUserId = useAppSelector(selectCurrentUserId);
  const router = useIonRouter();

  useIonViewWillEnter(() => {
    if (!currentUserId) {
      router.push('/login', 'forward', 'replace');
    }
  });

  return <>{children}</>;
};

export default AuthenticatedComponent;
