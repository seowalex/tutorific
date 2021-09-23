import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonToast,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { bulb, chatbubbles, logIn, person, school } from 'ionicons/icons';

import { useAppSelector } from './app/hooks';
import { useSubscribeMutation } from './api/auth';
import { usePrefetch as useTutorPrefetch } from './api/tutor';
import { usePrefetch as useTuteePrefetch } from './api/tutee';
import { usePrefetch as useChatPrefetch } from './api/chat';
import { usePrefetch as useProfilePrefetch } from './api/profile';
import { selectCurrentUserId } from './reducers/auth';

import RouteComponent from './RouteComponent';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Tutors from './pages/tutors/Tutors';
import TutorListing from './pages/tutors/TutorListing';
import FilterTutorListings from './pages/tutors/FilterTutorListings';
import AddTutorListing from './pages/tutors/AddTutorListing';
import EditTutorListing from './pages/tutors/EditTutorListing';

import Tutees from './pages/tutees/Tutees';
import TuteeListing from './pages/tutees/TuteeListing';
import FilterTuteeListings from './pages/tutees/FilterTuteeListings';
import AddTuteeListing from './pages/tutees/AddTuteeListing';
import EditTuteeListing from './pages/tutees/EditTuteeListing';

import Chats from './pages/chat/Chats';
import Chat from './pages/chat/Chat';

import Profile from './pages/profile/Profile';
import CreateProfile from './pages/profile/CreateProfile';
import EditProfile from './pages/profile/EditProfile';

import './styles/main.scss';

const GA_TRACKING_ID = 'UA-208131644-1';

const App: React.FC = () => {
  const currentUserId = useAppSelector(selectCurrentUserId);
  const [subscribe] = useSubscribeMutation();
  const prefetchTutorListings = useTutorPrefetch('getTutorListings');
  const prefetchTuteeListings = useTuteePrefetch('getTuteeListings');
  const prefetchChats = useChatPrefetch('getChats');
  const prefetchProfile = useProfilePrefetch('getProfile');

  const [present] = useIonToast();

  useEffect(() => {
    const setupPushApi = async () => {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        const registration = await window.navigator.serviceWorker.ready;
        const subscription = await registration?.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
        });

        subscribe(subscription);
      } else {
        present({
          header: 'Notification Permission Denied',
          message:
            'You will not be able to receive push notifications or automatically update your chats',
          duration: 5000,
        });
      }
    };

    prefetchTutorListings({});
    prefetchTuteeListings({});

    if (currentUserId) {
      prefetchChats();
      prefetchProfile(currentUserId);
      setupPushApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);

  useEffect(() => {
    ReactGA.initialize(GA_TRACKING_ID, {
      debug: process.env.NODE_ENV !== 'production',
    });
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/profile">
            <CreateProfile />
          </Route>
          <Route>
            <IonTabs>
              <IonTabBar slot="bottom">
                <IonTabButton tab="tutors" href="/tutors">
                  <IonIcon icon={school} />
                  <IonLabel>Tutors</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tutees" href="/tutees">
                  <IonIcon icon={bulb} />
                  <IonLabel>Tutees</IonLabel>
                </IonTabButton>
                <IonTabButton
                  className={currentUserId ? '' : 'ion-hide'}
                  tab="chats"
                  href="/chats"
                >
                  <IonIcon icon={chatbubbles} />
                  <IonLabel>Chats</IonLabel>
                </IonTabButton>
                <IonTabButton
                  className={currentUserId ? '' : 'ion-hide'}
                  tab="profile"
                  href={`/profile/${currentUserId}`}
                >
                  <IonIcon icon={person} />
                  <IonLabel>Profile</IonLabel>
                </IonTabButton>
                <IonTabButton
                  className={currentUserId ? 'ion-hide' : ''}
                  tab="login"
                  href="/login"
                >
                  <IonIcon icon={logIn} />
                  <IonLabel>Login</IonLabel>
                </IonTabButton>
              </IonTabBar>

              <IonRouterOutlet>
                <Route exact path="/tutors">
                  <RouteComponent path="/tutors" track>
                    <Tutors />
                  </RouteComponent>
                </Route>
                <Route exact path="/tutors/search">
                  <RouteComponent path="/tutors/search" track>
                    <FilterTutorListings />
                  </RouteComponent>
                </Route>
                <Route exact path="/tutors/add">
                  <RouteComponent path="/tutors/add" authenticate track>
                    <AddTutorListing />
                  </RouteComponent>
                </Route>
                <Route exact path="/tutors/listing/:id">
                  <TutorListing />
                </Route>
                <Route exact path="/tutors/listing/:id/edit">
                  <RouteComponent authenticate>
                    <EditTutorListing />
                  </RouteComponent>
                </Route>
                <Route exact path="/tutees">
                  <RouteComponent path="/tutees" track>
                    <Tutees />
                  </RouteComponent>
                </Route>
                <Route exact path="/tutees/search">
                  <RouteComponent path="/tutees/search" track>
                    <FilterTuteeListings />
                  </RouteComponent>
                </Route>
                <Route exact path="/tutees/add">
                  <RouteComponent path="/tutees/add" authenticate track>
                    <AddTuteeListing />
                  </RouteComponent>
                </Route>
                <Route exact path="/tutees/listing/:id">
                  <TuteeListing />
                </Route>
                <Route exact path="/tutees/listing/:id/edit">
                  <RouteComponent authenticate>
                    <EditTuteeListing />
                  </RouteComponent>
                </Route>
                <Route exact path="/chats">
                  <RouteComponent path="/chats" authenticate track>
                    <Chats />
                  </RouteComponent>
                </Route>
                <Route exact path="/chats/:id">
                  <RouteComponent authenticate>
                    <Chat />
                  </RouteComponent>
                </Route>
                <Route exact path="/profile/:id">
                  <Profile />
                </Route>
                <Route exact path="/profile/:id/edit">
                  <RouteComponent authenticate>
                    <EditProfile />
                  </RouteComponent>
                </Route>
              </IonRouterOutlet>
            </IonTabs>
          </Route>

          <Redirect exact path="/" to="/tutors" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
