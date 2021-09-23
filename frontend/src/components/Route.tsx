import React from 'react';
import {
  Route as ReactRoute,
  RouteProps,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import ReactGA from 'react-ga';
import { useIonRouter, useIonViewWillEnter } from '@ionic/react';

import { useAppSelector } from '../app/hooks';
import { selectCurrentUserId } from '../reducers/auth';

interface Props extends RouteProps {
  authenticate?: boolean;
  track?: boolean;
}

const Route: React.FC<Props> = ({
  authenticate = false,
  track = false,
  ...props
}) => {
  const currentUserId = useAppSelector(selectCurrentUserId);
  const router = useIonRouter();
  const location = useLocation();
  const match = useRouteMatch();

  useIonViewWillEnter(() => {
    if (authenticate && !currentUserId) {
      router.push('/login', 'forward', 'replace');
    } else if (track && props.path) {
      // Workaround buggy route detection
      const path = match.url === '/' ? location.pathname : match.url;

      ReactGA.set({ userId: currentUserId });
      ReactGA.pageview(path);
    }
  });

  return <ReactRoute {...props} />;
};

// Route.defaultProps = {
//   authenticate: false,
//   track: false,
// };

export default Route;
