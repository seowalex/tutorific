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
import { chatbubbleEllipses } from 'ionicons/icons';

import { useGetChatsQuery } from '../../api/chat';

import OfflineCard from '../../components/OfflineCard';
import EmptyPlaceholder from '../../components/EmptyPlaceholder';

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
      <IonContent className={styles.chatsContainer} fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Chats</IonTitle>
          </IonToolbar>
        </IonHeader>
        <OfflineCard />
        {chats?.length ? (
          <IonList>
            {chats?.map((chat) => (
              <IonItem routerLink={`/chats/${chat.id}`} key={chat.id}>
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
        ) : (
          <EmptyPlaceholder
            icon={chatbubbleEllipses}
            text="You have no chats. Start a conversation with a tutor/tutee today!"
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Chats;
