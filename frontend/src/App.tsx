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
import Tutors from './pages/Tutors';
import Tutees from './pages/Tutees';
import Chat from './pages/Chat';
import Profile from './pages/Profile';

import './styles/main.scss';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
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

          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>

        <IonRouterOutlet>
          <Redirect exact from="/" to="/tutors" />
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
        </IonRouterOutlet>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
