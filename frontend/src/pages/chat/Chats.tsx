import React, { useEffect } from 'react';
import {
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

import { useGetChatsQuery } from '../../api/chat';

import OfflineCard from '../../components/OfflineCard';

import styles from './Chats.module.scss';

const Chats: React.FC = () => {
  const { data: chats, refetch } = useGetChatsQuery();

  useEffect(
    () => window.navigator.serviceWorker.addEventListener('message', refetch),
    [refetch]
  );

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    refetch();

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
      <IonContent className={styles.chatContent} fullscreen>
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
          {chats?.map((chat, i) => (
            <IonItem routerLink={`/chat/${chat.id}`}>
              <Avatar
                className={styles.avatar}
                name={chat.otherProfile.name}
                maxInitials={2}
                size="2.5rem"
                round
              />
              <IonLabel>
                <h2>{chat.otherProfile.name}</h2>
                <p>{chat.lastMessage?.content}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Chats;
