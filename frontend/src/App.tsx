import React from 'react';
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

const App: React.FC = () => {
  const currentUserId = useAppSelector(selectCurrentUserId);

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
                  <Route path="/tutors">
                    <Tutors />
                  </Route>
                  <Route path="/tutor/:id" component={TutorListing} />
                  <Route path="/addtutor">
                    <AddTutorListing />
                  </Route>
                  <Route path="/edittutor/:id" component={EditTutorListing} />
                  <Route path="/searchtutor">
                    <FilterTutorListings />
                  </Route>
                  <Route path="/tutees">
                    <Tutees />
                  </Route>
                  <Route path="/tutee/:id" component={TuteeListing} />
                  <Route path="/addtutee">
                    <AddTuteeListing />
                  </Route>
                  <Route path="/edittutee/:id" component={EditTuteeListing} />
                  <Route path="/chat">
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
