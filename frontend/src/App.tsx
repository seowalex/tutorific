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

import Chats from './pages/chat/Chats';
import Chat from './pages/chat/Chat';

import Profile from './pages/profile/Profile';
import CreateProfile from './pages/profile/CreateProfile';
import EditProfile from './pages/profile/EditProfile';

import './styles/main.scss';
import FilterTuteeListings from './pages/tutees/FilterTuteeListings';

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

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {!currentUserId ? (
            <Route exact path="/login">
              <Login />
            </Route>
          ) : (
            <></>
          )}
          {!currentUserId ? (
            <Route exact path="/register">
              <Register />
            </Route>
          ) : (
            <></>
          )}
          {!currentUserId ? (
            <Route exact path="/profile">
              <CreateProfile />
            </Route>
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
                  <IonTabButton tab="chats" href="/chats">
                    <IonIcon icon={chatbubbles} />
                    <IonLabel>Chats</IonLabel>
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
                  <Route exact path="/tutors">
                    <Tutors />
                  </Route>
                  <Route exact path="/tutor/:id" component={TutorListing} />
                  <Route exact path="/tutor/add">
                    <AddTutorListing />
                  </Route>
                  <Route
                    exact
                    path="/tutor/:id/edit"
                    component={EditTutorListing}
                  />
                  <Route exact path="/tutor/search">
                    <FilterTutorListings />
                  </Route>
                  <Route exact path="/tutees">
                    <Tutees />
                  </Route>
                  <Route exact path="/tutee/:id" component={TuteeListing} />
                  <Route exact path="/tutee/add">
                    <AddTuteeListing />
                  </Route>
                  <Route
                    exact
                    path="/tutee/:id/edit"
                    component={EditTuteeListing}
                  />
                  <Route exact path="/tutee/search">
                    <FilterTuteeListings />
                  </Route>
                  <Route exact path="/chats">
                    <Chats />
                  </Route>
                  <Route exact path="/chat/:id">
                    <Chat />
                  </Route>
                  <Route exact path="/profile/:id">
                    <Profile />
                  </Route>
                  <Route exact path="/profile/:id/edit">
                    <EditProfile />
                  </Route>
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
