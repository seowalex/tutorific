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
import { bulb, chatbubbles, logIn, person, school } from 'ionicons/icons';

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
                  <Tutors />
                </Route>
                <Route exact path="/tutors/search">
                  <FilterTutorListings />
                </Route>
                <Route exact path="/tutors/add">
                  <AuthenticatedComponent>
                    <AddTutorListing />
                  </AuthenticatedComponent>
                </Route>
                <Route exact path="/tutors/listing/:id">
                  <TutorListing />
                </Route>
                <Route exact path="/tutors/listing/:id/edit">
                  <AuthenticatedComponent>
                    <EditTutorListing />
                  </AuthenticatedComponent>
                </Route>

                <Route exact path="/tutees">
                  <Tutees />
                </Route>
                <Route exact path="/tutees/search">
                  <FilterTuteeListings />
                </Route>
                <Route exact path="/tutees/add">
                  <AuthenticatedComponent>
                    <AddTuteeListing />
                  </AuthenticatedComponent>
                </Route>
                <Route exact path="/tutees/listing/:id">
                  <TuteeListing />
                </Route>
                <Route exact path="/tutees/listing/:id/edit">
                  <AuthenticatedComponent>
                    <EditTuteeListing />
                  </AuthenticatedComponent>
                </Route>

                <Route exact path="/chats">
                  <AuthenticatedComponent>
                    <Chats />
                  </AuthenticatedComponent>
                </Route>
                <Route exact path="/chats/:id">
                  <AuthenticatedComponent>
                    <Chat />
                  </AuthenticatedComponent>
                </Route>

                <Route exact path="/profile/:id">
                  <Profile />
                </Route>
                <Route exact path="/profile/:id/edit">
                  <AuthenticatedComponent>
                    <EditProfile />
                  </AuthenticatedComponent>
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
