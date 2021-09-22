import { useIonRouter } from '@ionic/react';
import React, { useEffect } from 'react';
import ReactGA, { FieldsObject } from 'react-ga';
import { RouteComponentProps } from 'react-router';
import { useAppSelector } from './app/hooks';
import { selectCurrentUserId } from './reducers/auth';

interface Options {
  checkAuth: boolean;
}

export default <P extends RouteComponentProps>(
  WrappedComponent: React.ComponentType<P>,
  options: Options = { checkAuth: false },
  gaOptions: FieldsObject = {}
) => {
  const trackPage = (page: string) => {
    ReactGA.set({ page, ...gaOptions });
    ReactGA.pageview(page);
  };

  return (props: P) => {
    const { location } = props;
    const { checkAuth } = options;
    const router = useIonRouter();
    const currentUserId = useAppSelector(selectCurrentUserId);

    useEffect(() => {
      if (checkAuth && !currentUserId) {
        trackPage('/login');
        router.push('/login', 'forward', 'replace');
      } else {
        trackPage(location.pathname);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, currentUserId, router]);

    return <WrappedComponent {...props} />;
  };
};
