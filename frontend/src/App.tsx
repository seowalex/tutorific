import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { bulb, chatbubbles, person, school } from 'ionicons/icons';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Tutors from './pages/tutors/Tutors';
import Tutees from './pages/Tutees';
import Chat from './pages/Chat';
import Profile from './pages/profile/Profile';
import { useAppSelector } from './app/hooks';
import { selectCurrentUserId } from './reducers/auth';

import './styles/main.scss';
import TutorListing from './pages/tutors/TutorListing';
import AddTutorListing from './pages/tutors/AddTutorListing';
import EditTutorListing from './pages/tutors/EditTutorListing';

const App: React.FC = () => {
  const userId = useAppSelector(selectCurrentUserId);

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
          {userId ? (
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
                    <IonBadge>6</IonBadge>
                  </IonTabButton>

                  <IonTabButton tab="profile" href={`/profile/${userId}`}>
                    <IonIcon icon={person} />
                    <IonLabel>Profile</IonLabel>
                  </IonTabButton>
                </IonTabBar>

                <IonRouterOutlet>
                  <Route path="/tutors">
                    <Tutors />
                  </Route>
                  <Route path="/tutees">
                    <Tutees />
                  </Route>
                  <Route path="/chat">
                    <Chat />
                  </Route>
                  <Route path="/profile">
                    <Profile />
                  </Route>
                  <Route path="/addtutor">
                    <AddTutorListing />
                  </Route>
                  <Route path="/edittutor/:id" component={EditTutorListing} />
                  <Route path="/tutor/:id" component={TutorListing} />
                </IonRouterOutlet>
              </IonTabs>
            </Route>
          ) : (
            <Redirect to="/login" />
          )}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
