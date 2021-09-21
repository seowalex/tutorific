import React from 'react';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import Avatar from 'react-avatar';

import OfflineCard from '../../components/OfflineCard';

import styles from './Chats.module.scss';

const Chats: React.FC = () => {
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    console.log('refresh');

    setTimeout(() => {
      event.detail.complete();
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Chats</IonTitle>
          </IonToolbar>
        </IonHeader>
        <OfflineCard />
        <IonList>
          {[...Array(16)].map((_e, i) => (
            <IonItem routerLink={`/chat/${i}`}>
              <Avatar
                className={styles.avatar}
                name="Han"
                maxInitials={2}
                size="2.5rem"
                round
              />
              <IonLabel>
                <h2>Han</h2>
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
};

export default Chats;
