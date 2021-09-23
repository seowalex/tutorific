import React from 'react';
import ReactGA, { FieldsObject } from 'react-ga';
import { useIonRouter, useIonViewWillEnter } from '@ionic/react';
import { useAppSelector } from './app/hooks';
import { selectCurrentUserId } from './reducers/auth';

interface Props {
  authenticate?: boolean;
  track?: boolean;
  path?: string;
  options?: FieldsObject;
  children?: React.ReactNode;
}

const RouteComponent: React.FC<Props> = (props) => {
  const { authenticate, track, path, options, children } = props;
  const currentUserId = useAppSelector(selectCurrentUserId);
  const router = useIonRouter();

  useIonViewWillEnter(() => {
    if (authenticate && !currentUserId) {
      router.push('/login', 'forward', 'replace');
    } else if (track) {
      ReactGA.set({ path, ...options });
      ReactGA.pageview(path ?? '');
    }
  });

  return <>{children}</>;
};

RouteComponent.defaultProps = {
  authenticate: false,
  track: false,
  path: '',
  options: {},
  children: undefined,
};

export default RouteComponent;
