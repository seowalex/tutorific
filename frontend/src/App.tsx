import React, { useEffect } from 'react';
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
import { bulb, chatbubbles, person, school } from 'ionicons/icons';
import ReactGA from 'react-ga';

import { useAppSelector } from './app/hooks';
import { usePrefetch as useTutorPrefetch } from './api/tutor';
import { usePrefetch as useTuteePrefetch } from './api/tutee';
import { usePrefetch as useProfilePrefetch } from './api/profile';
import { selectCurrentUserId } from './reducers/auth';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Tutors from './pages/tutors/Tutors';
import TutorListing from './pages/tutors/TutorListing';
import AddTutorListing from './pages/tutors/AddTutorListing';
import EditTutorListing from './pages/tutors/EditTutorListing';

import Tutees from './pages/tutees/Tutees';
import TuteeListing from './pages/tutees/TuteeListing';
import AddTuteeListing from './pages/tutees/AddTuteeListing';
import EditTuteeListing from './pages/tutees/EditTuteeListing';
import FilterTutorListings from './pages/tutors/FilterTutorListings';

import Chat from './pages/Chat';

import Profile from './pages/profile/Profile';
import CreateProfile from './pages/profile/CreateProfile';
import EditProfile from './pages/profile/EditProfile';

import './styles/main.scss';
import FilterTuteeListings from './pages/tutees/FilterTuteeListings';
import withTracker from './withTracker';

const GA_TRACKING_ID = 'UA-208131644-1';

const App: React.FC = () => {
  const currentUserId = useAppSelector(selectCurrentUserId);
  const prefetchTutorListings = useTutorPrefetch('getTutorListings');
  const prefetchTuteeListings = useTuteePrefetch('getTuteeListings');
  const prefetchProfile = useProfilePrefetch('getProfile');

  useEffect(() => {
    if (currentUserId) {
      prefetchTutorListings({});
      prefetchTuteeListings({});
      prefetchProfile(currentUserId);
    }
  }, [
    prefetchTutorListings,
    prefetchTuteeListings,
    prefetchProfile,
    currentUserId,
  ]);

  useEffect(() => {
    ReactGA.initialize(GA_TRACKING_ID);
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {!currentUserId ? (
            <Route exact path="/login" component={withTracker(Login)} />
          ) : (
            <></>
          )}
          {!currentUserId ? (
            <Route exact path="/register" component={withTracker(Register)} />
          ) : (
            <></>
          )}
          {!currentUserId ? (
            <Route
              exact
              path="/profile"
              component={withTracker(CreateProfile)}
            />
          ) : (
            <></>
          )}
          {!currentUserId ? <Redirect exact path="/" to="/login" /> : <></>}
          {!currentUserId ? (
            <Redirect to="/login" />
          ) : (
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

                  <IonTabButton tab="chat" href="/chat">
                    <IonIcon icon={chatbubbles} />
                    <IonLabel>Chat</IonLabel>
                  </IonTabButton>

                  <IonTabButton
                    tab="profile"
                    href={`/profile/${currentUserId}`}
                  >
                    <IonIcon icon={person} />
                    <IonLabel>Profile</IonLabel>
                  </IonTabButton>
                </IonTabBar>

                <IonRouterOutlet>
                  <Route exact path="/tutors" component={withTracker(Tutors)} />
                  <Route
                    exact
                    path="/tutor/:id"
                    component={withTracker(TutorListing)}
                  />
                  <Route
                    exact
                    path="/tutor/add"
                    component={withTracker(AddTutorListing)}
                  />
                  <Route
                    exact
                    path="/tutor/:id/edit"
                    component={withTracker(EditTutorListing)}
                  />
                  <Route
                    exact
                    path="/tutor/search"
                    component={withTracker(FilterTutorListings)}
                  />
                  <Route exact path="/tutees" component={withTracker(Tutees)} />
                  <Route
                    exact
                    path="/tutee/:id"
                    component={withTracker(TuteeListing)}
                  />
                  <Route
                    exact
                    path="/tutee/add"
                    component={withTracker(AddTuteeListing)}
                  />
                  <Route
                    exact
                    path="/tutee/:id/edit"
                    component={withTracker(EditTuteeListing)}
                  />
                  <Route
                    exact
                    path="/tutee/search"
                    component={withTracker(FilterTuteeListings)}
                  />
                  <Route exact path="/chat" component={withTracker(Chat)} />
                  <Route
                    exact
                    path="/profile/:id"
                    component={withTracker(Profile)}
                  />
                  <Route
                    exact
                    path="/profile/:id/edit"
                    component={withTracker(EditProfile)}
                  />
                  <Redirect exact path="/" to="/tutors" />
                  <Redirect to="/tutors" />
                </IonRouterOutlet>
              </IonTabs>
            </Route>
          )}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
