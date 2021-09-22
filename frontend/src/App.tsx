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
import { usePrefetch as useChatPrefetch } from './api/chat';
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
              </IonTabBar>

              <IonRouterOutlet>
                <Route exact path="/tutors">
                  <Tutors />
                </Route>
                <Route exact path="/tutors/search">
                  <FilterTutorListings />
                </Route>
                <Route exact path="/tutors/add">
                  <AddTutorListing />
                </Route>
                <Route exact path="/tutors/listing/:id">
                  <TutorListing />
                </Route>
                <Route exact path="/tutors/listing/:id/edit">
                  <EditTutorListing />
                </Route>

                <Route exact path="/tutees">
                  <Tutees />
                </Route>
                <Route exact path="/tutees/search">
                  <FilterTuteeListings />
                </Route>
                <Route exact path="/tutees/add">
                  <AddTuteeListing />
                </Route>
                <Route exact path="/tutees/listing/:id">
                  <TuteeListing />
                </Route>
                <Route exact path="/tutees/listing/:id/edit">
                  <EditTuteeListing />
                </Route>

                <Route exact path="/chats">
                  <Chats />
                </Route>
                <Route exact path="/chats/:id">
                  <Chat />
                </Route>

                <Route exact path="/profile/:id">
                  <Profile />
                </Route>
                <Route exact path="/profile/:id/edit">
                  <EditProfile />
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
