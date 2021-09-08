import React from 'react';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { search } from 'ionicons/icons';

import './Chat.scss';

const Chat: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Chat</IonTitle>
        <IonButtons slot="primary" collapse>
          <IonButton>
            <IonIcon slot="icon-only" icon={search} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Chat</IonTitle>
          <IonButtons slot="primary">
            <IonButton>
              <IonIcon slot="icon-only" icon={search} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonList>
        {[...Array(16)].map((_e, i) => (
          <IonItem href="/">
            <IonAvatar slot="start">
              <img
                src={`https://placekitten.com/200/200?image=${i}`}
                alt="Profile"
              />
            </IonAvatar>
            <IonLabel>
              <h2>Han</h2>
              <h3>Lorem Ipsum</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse fermentum finibus egestas.
              </p>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  </IonPage>
);

export default Chat;
