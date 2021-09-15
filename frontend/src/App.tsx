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

import Chat from './pages/Chat';
import Profile from './pages/profile/Profile';

import './styles/main.scss';

const App: React.FC = () => {
  const userId = useAppSelector(selectCurrentUserId);

  return (
    <IonApp>
      <IonReactRouter>
        {userId ? (
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
              <Route path="/tutor/:id" component={TutorListing} />
              <Route path="/addtutor">
                <AddTutorListing />
              </Route>
              <Route path="/edittutor/:id" component={EditTutorListing} />
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
              <Route path="/profile">
                <Profile />
              </Route>
              <Redirect exact path="/" to="/tutors" />
              <Redirect to="/tutors" />
            </IonRouterOutlet>
          </IonTabs>
        ) : (
          <IonRouterOutlet>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Redirect exact path="/" to="/login" />
            <Redirect to="/login" />
          </IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
