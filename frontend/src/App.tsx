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
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { bulb, chatbubbles, logIn, person, school } from 'ionicons/icons';

import { useAppSelector } from './app/hooks';
import { usePrefetch as useTutorPrefetch } from './api/tutor';
import { usePrefetch as useTuteePrefetch } from './api/tutee';
import { usePrefetch as useChatPrefetch } from './api/chat';
import { usePrefetch as useProfilePrefetch } from './api/profile';
import { selectCurrentUserId } from './reducers/auth';

import withTracker from './withTracker';

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

import AuthenticatedComponent from './components/AuthenticatedRoute';

import './styles/main.scss';

const GA_TRACKING_ID = 'UA-208131644-1';

const App: React.FC = () => {
  const currentUserId = useAppSelector(selectCurrentUserId);
  const prefetchTutorListings = useTutorPrefetch('getTutorListings');
  const prefetchTuteeListings = useTuteePrefetch('getTuteeListings');
  const prefetchChats = useChatPrefetch('getChats');
  const prefetchProfile = useProfilePrefetch('getProfile');

  useEffect(() => {
    if (currentUserId) {
      prefetchTutorListings({});
      prefetchTuteeListings({});
      prefetchChats();
      prefetchProfile(currentUserId);
    }
  }, [
    prefetchTutorListings,
    prefetchTuteeListings,
    prefetchChats,
    prefetchProfile,
    currentUserId,
  ]);

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
                <Route exact path="/tutors" component={withTracker(Tutors)} />
                <Route
                  exact
                  path="/tutors/search"
                  component={withTracker(FilterTutorListings)}
                />
                <Route
                  exact
                  path="/tutors/add"
                  component={withTracker(AddTutorListing, { checkAuth: true })}
                />
                <Route
                  exact
                  path="/tutors/listing/:id"
                  component={withTracker(TutorListing)}
                />
                <Route
                  exact
                  path="/tutors/listing/:id/edit"
                  component={withTracker(EditTutorListing, { checkAuth: true })}
                />
                <Route exact path="/tutees" component={withTracker(Tutees)} />
                <Route
                  exact
                  path="/tutees/search"
                  component={withTracker(FilterTuteeListings)}
                />
                <Route
                  exact
                  path="/tutees/add"
                  component={withTracker(AddTuteeListing, { checkAuth: true })}
                />
                <Route
                  exact
                  path="/tutees/listing/:id"
                  component={withTracker(TuteeListing)}
                />
                <Route
                  exact
                  path="/tutees/listing/:id/edit"
                  component={withTracker(EditTuteeListing, { checkAuth: true })}
                />
                <Route
                  exact
                  path="/chats"
                  component={withTracker(Chats, { checkAuth: true })}
                />
                <Route
                  exact
                  path="/chats/:id"
                  component={withTracker(Chat, { checkAuth: true })}
                />
                <Route
                  exact
                  path="/profile/:id"
                  component={withTracker(Profile)}
                />
                <Route
                  exact
                  path="/profile/:id/edit"
                  component={withTracker(EditProfile, { checkAuth: true })}
                />
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
